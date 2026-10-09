import assert from 'node:assert/strict'
import { calculateBannerPrice as calc, defaultBannerConfiguration as base, type BannerConfiguration, type BannerKind } from '../src/lib/banner-pricing'
import { authoritativeBannerPrice } from '../src/lib/banner-checkout'
const rows: { product: string; size: string; computed: number; expected: number }[] = []
for (const [kind, cases] of [
  ['vinyl', [[2,3,39],[2,4,43],[2,6,52],[3,6,66],[4,6,80],[4,8,98],[4,10,116],[5,10,139]]],
  ['double-sided', [[2,3,59],[2,4,69],[3,6,119],[4,8,189],[5,10,279]]],
] as [BannerKind, number[][]][]) {
  for (const [w,h,expected] of cases) {
    const computed = calc({...base(kind),width:w*12,height:h*12}).totalCents/100
    assert.equal(computed,expected); rows.push({product:kind,size:`${w}×${h} ft`,computed,expected})
  }
}
const kit = {...base('double-sided'),width:18,height:36,poleKit:true,pockets:'instead',pocketSize:3} as BannerConfiguration
assert.equal(calc(kit).totalCents,17800);rows.push({product:'double-sided + kit',size:'18×36 in',computed:178,expected:178})
const small = {...base('vinyl'),width:48,height:72}
const large = {...small,height:73}
assert.equal(calc({...small,grommets:'12'}).addons,10)
assert.equal(calc({...large,grommets:'12'}).addons,20)
assert.equal(calc({...small,pockets:'instead'}).addons,10)
assert.equal(calc({...large,pockets:'instead'}).addons,15)
assert.equal(calc({...small,pockets:'with'}).addons,15)
assert.equal(calc({...large,pockets:'with'}).addons,25)
assert.equal(calc({...small,pockets:'with',grommets:'12'}).addons,25)
assert.equal(calc({...base('vinyl'),edge:'webbing'}).addons,20)
assert.equal(calc({...base('vinyl'),edge:'rings'}).addons,50)
assert.equal(calc({...base('vinyl'),edge:'rope'}).addons,25)
assert.equal(calc({...base('vinyl'),windSlits:true,grommets:'corners'}).totalCents,3900)
for(const [quantity,discount] of [[1,0],[2,.05],[4,.05],[5,.1],[9,.1],[10,.15],[24,.15],[25,.2],[49,.2]]) {
  const p=calc({...base('vinyl'),quantity,grommets:'12'})
  assert.equal(p.discount,discount)
  assert.equal(p.totalCents,Math.round(49*quantity*(1-discount)*100))
}
assert.equal(calc({...base('vinyl'),turnaround:'economy'}).totalCents,3705)
assert.equal(calc({...base('vinyl'),turnaround:'rush'}).totalCents,6400)
assert.equal(calc({...base('vinyl'),quantity:2,grommets:'12',turnaround:'rush'}).totalCents,13034)
assert.equal(calc({...base('vinyl'),quantity:2,grommets:'12',turnaround:'economy'}).totalCents,8845)
for (const patch of [{width:127},{width:120,height:121},{quantity:50},{quantity:1.5},{width:0},{width:NaN},{height:0},{quantity:Infinity}]) assert.ok(calc({...base('vinyl'),...patch}).quoteReason)
assert.equal(calc({...base('vinyl'),width:120,height:120}).quoteReason,null)
assert.equal(calc({...base('vinyl'),width:126}).quoteReason,null)
assert.ok(calc({...kit,width:37}).quoteReason)
assert.ok(calc({...kit,pocketSize:2}).quoteReason)
assert.ok(calc({...base('double-sided'),edge:'rope'}).quoteReason)
assert.equal(authoritativeBannerPrice({product:'Vinyl Banner',qty:1,bannerConfiguration:base('vinyl')}),3900)
assert.throws(()=>authoritativeBannerPrice({product:'Vinyl Banner',qty:2,bannerConfiguration:base('vinyl')}))
assert.throws(()=>authoritativeBannerPrice({product:'Vinyl Banner',qty:1}))
assert.equal(authoritativeBannerPrice({product:'Fabric Banner',qty:1}),null)
console.table(rows)
console.log('PASS: all 14 supplied sanity prices; finishing, discount boundaries, turnaround sequencing, quote gates, kit constraints and authoritative pricing.')
