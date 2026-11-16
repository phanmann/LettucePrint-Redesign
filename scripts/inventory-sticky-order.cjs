const fs=require('fs'),path=require('path');const inventory=[];
function walk(dir){for(const d of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,d.name);if(d.isDirectory())walk(file);else if(d.name==='page.tsx'){
 const source=fs.readFileSync(file,'utf8');const route='/'+path.dirname(file).replace('src/app/','');let owner;
 if(source.includes('<ProductOrderPage'))owner='ProductOrderPage';
 else if(source.includes('<TypeProductPage'))owner='TypeProductPage';
 else if(source.includes('<PrintSheetOrderPage')||source.includes('<FlyersOrderPage')||source.includes('<PostersOrderPage')||source.includes('<TriFoldOrderPage')||source.includes('<BookletsOrderPage'))owner='ProductOrderPage via marketing adapter';
 else if(source.includes('product-order-panel'))owner=route.includes('tents')?'TentPage':route.includes('apparel')?'ApparelServicePage':route.includes('packaging')?'Packaging quote layout':'Standalone calculator';
 inventory.push({route,source:file,owner:owner||null,exclusion:owner?undefined:/redirect\(/.test(source)?'Redirect':/checkout/.test(route)?'Checkout, not product browsing':route.endsWith('/quote')?'Dedicated intake form, no product browsing content':'Category/service overview with links; no inline order module'});
}}}
walk('src/app/shop');inventory.push({route:'/lp/roll-labels',source:'src/app/lp/roll-labels/page.tsx',owner:'Standalone RollLabelCalculator landing page'});
const list=[];for(const row of inventory){if(row.route.includes('[type]'))for(const slug of ['die-cut','kiss-cut','circle','square','rectangle','oval','clear','holographic'])list.push({...row,route:row.route.replace('[type]',slug)});else if(row.route.includes('[shape]'))for(const slug of ['rectangle','circle','square','oval'])list.push({...row,route:row.route.replace('[shape]',slug)});else if(row.route.includes('[size]'))for(const slug of ['10x10','20x10'])list.push({...row,route:row.route.replace('[size]',slug)});else if(row.route.includes('[slug]')&&row.owner==='ApparelServicePage')for(const slug of ['screenprint','embroidery','dtg','dtf'])list.push({...row,route:row.route.replace('[slug]',slug)});else list.push(row)}
fs.writeFileSync('launch/sticky-order-20261116/inventory.json',JSON.stringify(list,null,2));console.log(list.filter(x=>x.owner).length,'product routes covered;',list.filter(x=>!x.owner).length,'excluded routes');
