/** Read-only browser QA. Run against an isolated local build; never submits forms. */
const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const { chromium } = require('playwright')
const base = process.env.FAQ_QA_URL || 'http://127.0.0.1:3116'
const output = path.resolve('launch/department-product-faqs')
const departments = ['marketing-materials', 'signage', 'packaging']
const inventory = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(file)
    else if (entry.name === 'page.tsx') {
      const source = fs.readFileSync(file, 'utf8')
      const route = '/' + path.dirname(file).replace(/^src\/app\//, '')
      let kind = 'product'
      if (/\/(checkout|quote)$/.test(route)) kind = 'utility'
      else if (/redirect\(/.test(source)) kind = 'redirect'
      else if (route.split('/').length === 3 || /\/(business-cards|flyers|brochures|postcards|banners|backdrops|mylar-bags)$/.test(route)) kind = 'category'
      const template = source.match(/import (\w+(?:OrderPage|PageLayout)|ProductOrderPage) from/)?.[1] || (route.includes('/tents/') ? 'TentPage' : route.endsWith('/custom-packaging') ? 'CustomPackagingPage' : 'standalone')
      if (route.endsWith('/tents/[size]')) for (const size of ['10x10', '20x10']) inventory.push({ route: route.replace('[size]', size), kind, template, source: file })
      else inventory.push({ route, kind, template, source: file })
    }
  }
}
departments.forEach(d => walk(`src/app/shop/${d}`))
// next.config.ts aliases without page files; category targets aren't extra products.
for (const [route, target] of [
  ['marketing-materials/postcards/premium','marketing-materials/postcards'],
  ['marketing-materials/flyers/tabloid','marketing-materials/flyers/full-page?size=tabloid'],
  ['marketing-materials/brochures/bi-fold-tabloid','marketing-materials/brochures/bi-fold-letter'],
  ['marketing-materials/posters','marketing-materials/flyers#posters'],
  ['marketing-materials/booklets','marketing-materials/brochures#booklets'],
  ['signage/banners/double-sided-banner','signage/banners'],
  ['packaging/boxes','packaging'],
]) inventory.push({ route: '/shop/'+route, target:'/shop/'+target, kind:'config-redirect', source:'next.config.ts' })
fs.mkdirSync(output, { recursive: true })
fs.writeFileSync(path.join(output,'inventory.json'), JSON.stringify(inventory,null,2))
if (process.argv.includes('--inventory')) { console.log(JSON.stringify(inventory.reduce((a,r)=>(a[r.kind]=(a[r.kind]||0)+1,a),{}))); process.exit(0) }
;(async()=>{
 const browser=await chromium.launch({headless:true, executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || '/usr/bin/chromium'})
 const page=await browser.newPage()
 const results=[]
 const errors=[]
 page.on('pageerror',e=>errors.push(e.message))
 // GET-only guard: do not allow business writes, uploads or form submissions.
 await page.route('**/*',route=> !['GET','HEAD'].includes(route.request().method()) ? route.abort() : route.continue())
 const products=inventory.filter(r=>r.kind==='product')
 try {
 for(const product of products){
  const response=await page.goto(base+product.route,{waitUntil:'networkidle'})
  assert.equal(response.status(),200,product.route)
  const section=page.locator('section[aria-labelledby="faq-heading"]')
  assert.equal(await section.count(),1,product.route+' one FAQ section')
  const visible=await section.locator('details').evaluateAll(nodes=>nodes.map(n=>({q:n.querySelector('h3').textContent,a:n.querySelector('p').textContent})))
  assert.ok(visible.length>=4 && visible.length<=6,product.route+' FAQ count')
  assert.ok(visible.every(f=>f.q && f.a && !/undefined|^\./.test(f.a)),product.route+' complete answers')
  const schemas=await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.map(n=>JSON.parse(n.textContent)).filter(j=>j['@type']==='FAQPage'))
  assert.equal(schemas.length,1,product.route+' one FAQ schema')
  assert.deepEqual(schemas[0].mainEntity.map(f=>({q:f.name,a:f.acceptedAnswer.text})),visible,product.route+' schema matches answers')
  const placement=await section.evaluate(el=>{
    const before = text => [...document.querySelectorAll('main h2, main summary')].filter(n=>n.textContent.includes(text)).every(n=>Boolean(n.compareDocumentPosition(el)&Node.DOCUMENT_POSITION_FOLLOWING))
    const after = text => [...document.querySelectorAll('main h2')].filter(n=>n.textContent.includes(text)).every(n=>Boolean(el.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING))
    return before('Specifications')&&before('Artwork Requirements')&&after('Need something custom?')&&after('Related products')
  })
  assert.ok(placement,product.route+' FAQ placement')
  results.push({...product,questions:visible.length,status:'PASS',answers:visible})
 }
 const representatives=[
  '/shop/marketing-materials/flyers/full-page','/shop/marketing-materials/brochures/tri-fold-legal','/shop/marketing-materials/brochures/bi-fold-letter',
  '/shop/marketing-materials/booklets/perfect-bound-6x9','/shop/marketing-materials/posters/art-print',
  '/shop/marketing-materials/business-cards/standard','/shop/marketing-materials/business-cards/premium','/shop/marketing-materials/postcards/standard',
  '/shop/marketing-materials/brochures/bi-fold','/shop/signage/banners/vinyl-banner','/shop/signage/banners/retractable-standard','/shop/signage/backdrops/seg-10x8',
  '/shop/signage/tents/10x10','/shop/signage/tents/20x10','/shop/packaging/boxes/mailer-box','/shop/packaging/mylar-bags/standard','/shop/packaging/custom-packaging',
 ]
 const interactions=[]
 for(const width of [390,1440]) for(const route of representatives){
  await page.setViewportSize({width,height:900})
  await page.goto(base+route,{waitUntil:'networkidle'})
  const faq=page.locator('section[aria-labelledby="faq-heading"]')
  const details=faq.locator('details').first(), summary=details.locator('summary')
  await summary.focus(); await page.keyboard.press('Enter')
  assert.equal(await details.getAttribute('open'),'')
  assert.ok(await details.locator('p').isVisible())
  await page.keyboard.press('Space');assert.equal(await details.getAttribute('open'),null)
  await summary.click();assert.equal(await details.getAttribute('open'),'')
  assert.equal(await page.locator('#faq-heading').count(),1)
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth)
  assert.equal(overflow,false,`${route} ${width} overflow`)
  await faq.screenshot({path:path.join(output,route.replaceAll('/','_')+`-${width}.png`)})
  interactions.push({route,width,keyboard:'Enter opens / Space closes',pointer:'opens',overflow:false,status:'PASS'})
 }
 fs.writeFileSync(path.join(output,'browser-results.json'),JSON.stringify({base,results,interactions,errors},null,2))
 assert.deepEqual(errors,[],'no browser runtime errors')
 console.log(`PASS: ${results.length} product routes, unique matching FAQ schema, placement; ${interactions.length} desktop/mobile keyboard/pointer/overflow checks.`)
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1})
