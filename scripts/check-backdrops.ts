import assert from 'node:assert/strict'
import { backdropProducts } from '../src/lib/backdrop-products'
const expected: Record<string, number[]> = {
 'step-repeat-8x8':[319,349,159,239,199], 'step-repeat-10x8':[349,399,189,329,199],
 'eurofit-8x8':[649,399,279], 'eurofit-10x8':[719,449,309],
 'popup-8x8':[649,379,319], 'popup-10x8':[699,379,329], 'popup-20x8':[1495,749,849],
 'seg-10x8':[1249,1449,459,749,749], 'seg-8x10':[1249,1449,459,749,749], 'seg-20x8':[2395,2795,899,1549,1495],
}
let count=0
for (const [slug,p] of Object.entries(backdropProducts)) {
 assert.equal(p.showQuantity,true)
 assert.equal(p.pricingTable?.length,1)
 const seen=new Set<string>()
 for(const r of p.pricingRules!) {
  const s=r.selections, pack=s.Package, b=expected[slug], idx=['kit','graphic','hardware'].indexOf(pack)
  assert.ok(idx>=0)
  const actualGroups=p.optionGroups.filter(g=>!g.packages || g.packages.includes(pack))
  assert.deepEqual(Object.keys(s).sort(),actualGroups.map(g=>g.label).sort())
  const key=JSON.stringify(s);assert.ok(!seen.has(key));seen.add(key)
  let price=0
  if(slug.startsWith('step')) price=pack==='hardware'?b[4]:b[(pack==='graphic'?2:0)+(s.Material==='fabric'?1:0)]
  else if(slug.startsWith('seg')) price=pack==='hardware'?b[4]:b[(pack==='graphic'?2:0)+(s.Sides==='double'?1:0)]
  else price=b[idx]
  if(s['Bottom zipper']==='zipper')price+=49
  if(s.Style==='wrap')price+=slug==='popup-20x8'?80:40
  if(s.Fabric==='black')price+=slug==='popup-20x8'?149:79
  price+=({'0':0,'1':99,'2':199,'3':299,'4':399} as Record<string,number>)[s.LED??'0']
  assert.equal(r.pricingTable[0].standardPrice,price,slug+' '+key)
  assert.equal(r.pricingTable[0].rushPrice,Math.round(price*140)/100)
  for(const qty of [1,2,5,100])assert.equal(Math.round(price*100)*qty,price*qty*100)
  count++
 }
 const combinations=['kit','graphic','hardware'].reduce((sum,pack)=>sum+p.optionGroups.slice(1).filter(g=>g.packages?.includes(pack)).reduce((n,g)=>n*g.options.length,1),0)
 assert.equal(seen.size,combinations)
 assert.ok(!/Orlando|Hollywood|CMYK|economy|7-day/i.test(JSON.stringify(p)))
 if(!slug.startsWith('step')) assert.ok(!/vinyl/i.test(JSON.stringify(p)))
 if(slug.startsWith('seg')||slug.startsWith('step'))assert.ok(!p.optionGroups.some(g=>g.label==='LED'))
}
function price(slug:string,s:Record<string,string>,qty=1,rush=false) {
 const row=backdropProducts[slug].pricingRules!.find(r=>Object.entries(r.selections).every(([k,v])=>s[k]===v))!.pricingTable[0]
 return Math.round((rush?row.rushPrice!:row.standardPrice)*100)*qty/100
}
assert.equal(price('step-repeat-8x8',{Package:'kit',Material:'vinyl'}),319)
assert.equal(price('step-repeat-8x8',{Package:'kit',Material:'vinyl'},1,true),446.6)
assert.equal(price('eurofit-10x8',{Package:'kit',Sides:'double','Bottom zipper':'zipper',LED:'2'}),967)
assert.equal(price('popup-20x8',{Package:'kit',Style:'wrap',Fabric:'black',LED:'4'}),2123)
assert.equal(price('seg-10x8',{Package:'kit',Sides:'double'},2),2898)
console.log('PASS: '+count+' combinations, all package/add-on/rush prices, quantity boundaries, complete rules, 5 sanity values and prohibited-copy checks.')
