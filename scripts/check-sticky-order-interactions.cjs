const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
let browser;
(async()=>{
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage();
 const results=[];
 await page.route('**/*',r=>['GET','HEAD'].includes(r.request().method())?r.continue():r.abort());
 for(const route of ['/shop/marketing-materials/postcards/standard','/shop/stickers/die-cut','/shop/stickers/clear','/shop/roll-labels/circle','/shop/packaging/custom-packaging','/shop/apparel/dtf']){
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://localhost:3116'+route,{waitUntil:'networkidle'});
  await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  const module=page.locator('[data-mobile-order-module]');
  const select=module.locator('select:visible').first();
  let selected;
  if(await select.count()){
   const options=await select.locator('option').evaluateAll(els=>els.filter(e=>!e.disabled).map(e=>e.value));
   selected=options.at(-1);await select.selectOption(selected);
  }
  if(route.includes('stickers/clear'))assert.equal(await module.getByLabel('Select a finish').count(),0);
  if(route.includes('roll-labels')){
   await module.getByRole('button',{name:/With a machine/}).click();
   await module.getByRole('button',{name:'Top first',exact:true}).click();
   assert.equal(await module.getByRole('button',{name:'Top first',exact:true}).getAttribute('aria-pressed'),'true');
   assert.equal(await module.getByRole('button',{name:/With a machine/}).getAttribute('aria-pressed'),'true');
  }
  const faq=page.locator('section[aria-labelledby="faq-heading"] details').first();
  if(await faq.count()){
   await faq.locator('summary').focus();await page.keyboard.press('Enter');assert.notEqual(await faq.getAttribute('open'),null);
   await page.keyboard.press('Space');assert.equal(await faq.getAttribute('open'),null);
  }
  await page.evaluate(()=>{const el=document.querySelector('[data-mobile-order-module]');scrollTo(0,el.getBoundingClientRect().bottom+scrollY+100)});
  await page.waitForTimeout(150);
  const shortcut=page.locator('.product-order-shortcut button');
  if(await shortcut.isVisible())await shortcut.click();
  else await module.evaluate(el=>el.scrollIntoView({block:'start'}));
  if(selected!==undefined)assert.equal(await select.inputValue(),selected,'selection survives scroll/shortcut');
  if(route.includes('roll-labels'))assert.equal(await module.getByRole('button',{name:'Top first',exact:true}).getAttribute('aria-pressed'),'true');
  results.push({route,mobile:'selection, FAQ keyboard, existing module preserved'});
 }
 for(const route of ['/shop/marketing-materials/postcards/standard','/shop/stickers/die-cut','/shop/roll-labels/circle','/shop/signage/tents/10x10','/shop/packaging/custom-packaging','/shop/apparel/dtf']){
  await page.setViewportSize({width:1440,height:600});await page.goto('http://localhost:3116'+route,{waitUntil:'networkidle'});
  await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  const panel=page.locator('.product-order-panel:visible');
  await panel.evaluate(el=>{scrollTo(0,el.getBoundingClientRect().top+scrollY);el.scrollTop=el.scrollHeight});
  const pos=await panel.boundingBox();const before=await page.evaluate(()=>scrollY);
  await page.mouse.move(pos.x+pos.width/2,Math.max(100,pos.y+pos.height/2));await page.mouse.wheel(0,200);await page.waitForTimeout(250);
  assert.ok(await page.evaluate(()=>scrollY)>before,'wheel chains into document at panel bottom');
  const faq=page.locator('section[aria-labelledby="faq-heading"] details').first();
  if(await faq.count()){
   await faq.locator('summary').click();
   await faq.scrollIntoViewIfNeeded();
   const pb=await panel.boundingBox();const footer=await page.locator('footer').boundingBox();
   assert.ok(pb.y+pb.height<=footer.y+1,'FAQ expansion keeps panel out of footer');
  }
  results.push({route,desktop:'wheel chaining, expanded FAQ containment'});
 }
 await browser.close();fs.writeFileSync('/tmp/lp-sticky-qa/interactions.json',JSON.stringify(results,null,2));console.log('PASS',results.length,'interaction cases');
})().catch(async e=>{console.error(e);await browser?.close();process.exitCode=1});
