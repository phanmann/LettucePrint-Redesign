const { chromium } = require('playwright');
const fs = require('fs');
const routes = [
'/shop/marketing-materials/postcards/standard',
'/shop/marketing-materials/business-cards/standard',
'/shop/marketing-materials/business-cards/premium',
'/shop/stickers/die-cut', '/shop/stickers/clear', '/shop/roll-labels/circle', '/shop/spot-uv',
'/shop/marketing-materials/posters/art-print', '/shop/signage/banners/vinyl-banner',
'/shop/signage/backdrops/seg-10x8', '/shop/signage/tents/10x10', '/shop/signage/tents/20x10',
'/shop/packaging/boxes/mailer-box', '/shop/packaging/mylar-bags/standard',
'/shop/packaging/custom-packaging', '/shop/packaging/mylar-bags',
'/shop/apparel/screenprint', '/shop/apparel/embroidery', '/shop/apparel/dtg', '/shop/apparel/dtf',
'/lp/roll-labels'];
const output = process.env.QA_OUTPUT || '/tmp/lp-sticky-qa';
fs.mkdirSync(output,{recursive:true});
const results=[];
function check(value,message){if(!value)throw Error(message)}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage();
 // No write requests are permitted, including accidental form submissions.
 await page.route('**/*',r=> !['GET','HEAD'].includes(r.request().method()) ? r.abort() : r.continue());
 for(const route of routes){
  for(const viewport of [{width:1440,height:900},{width:1024,height:600},{width:390,height:844},{width:320,height:640}]){
   const entry={route,viewport};
   try{
    await page.setViewportSize(viewport);
    const response=await page.goto('http://localhost:3116'+route,{waitUntil:'networkidle'});
    check(response.status()===200,'HTTP '+response.status());
    await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow at top');
    if(viewport.width>=1024){
     const panel=page.locator('.product-order-panel:visible');
     check(await panel.count()===1,'exactly one desktop scroll owner');
     const doc=await panel.evaluate(el=>{const r=el.getBoundingClientRect();const p=el.parentElement;return {top:r.top+scrollY,parentBottom:p.getBoundingClientRect().bottom+scrollY-parseFloat(getComputedStyle(p).paddingBottom),height:r.height}});
     entry.geometry=[];
     for(const amount of [0,doc.top+150,doc.parentBottom-doc.height-100,doc.parentBottom-100]){
      await page.evaluate(y=>scrollTo(0,Math.max(0,y)),amount);
      await page.waitForTimeout(70);
      const g=await panel.evaluate(el=>{const r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight,y:scrollY,position:getComputedStyle(el).position,footer:document.querySelector('footer').getBoundingClientRect().top}});
      check(g.position==='sticky','not sticky');
      check(g.height<=viewport.height-103,'panel exceeds viewport');
      if(g.y>doc.top && g.y<doc.parentBottom-doc.height-88)check(Math.abs(g.top-88)<2,'panel not pinned: '+JSON.stringify(g));
      check(g.bottom<=g.footer+2,'overlaps footer');
      entry.geometry.push(g);
     }
     const faq=page.locator('section[aria-labelledby="faq-heading"] details').first();
     if(await faq.count()){
      await faq.locator('summary').click();
      await faq.scrollIntoViewIfNeeded();
      const faqPanel=await panel.boundingBox();
      const footer=await page.locator('footer').boundingBox();
      if(footer.y>viewport.height+100)check(Math.abs(faqPanel.y-88)<2,'module leaves viewport while FAQ is visible');
     }
     await page.evaluate(y=>scrollTo(0,Math.max(0,y)),Math.min(doc.top+100,doc.parentBottom-doc.height-88));
     if(route.includes('/apparel/')) {
      await panel.locator('#detail-garmentType').selectOption('T-shirt');
      await panel.locator('#detail-quantity').fill('48');
      await panel.locator('#detail-printLocations').selectOption('1');
      const colors=panel.locator('#location1Colors');
      if(await colors.count())await colors.selectOption({index:1});
     }
     const last=panel.locator('button:visible:enabled,a:visible,input:visible:enabled,select:visible:enabled,textarea:visible:enabled').last();
     await last.focus();
     await page.waitForTimeout(50);
     const box=await last.boundingBox();
     check(box.y>=72 && box.y+box.height<=viewport.height+1,'last control not keyboard reachable');
     await panel.evaluate(el=>el.scrollTop=0);
     await page.screenshot({path:output+'/'+route.replaceAll('/','_')+'-'+viewport.width+'.png'});
    }else{
     const target=page.locator('[data-mobile-order-module]');
     check(await target.count()===1,'one mobile module');
     const pos=await target.evaluate(el=>{const r=el.getBoundingClientRect();return {top:r.top+scrollY,bottom:r.bottom+scrollY}});
     // Return shortcut visible while browsing below form, or at top when form starts below viewport.
     await page.evaluate(y=>scrollTo(0,y),pos.bottom+100);
     await page.waitForTimeout(150);
     if(!await page.locator('.product-order-shortcut button').isVisible()){
      await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(150);
     }
     const shortcut=page.locator('.product-order-shortcut button');
     check(await shortcut.isVisible(),'shortcut not visible outside module');
     const b=await shortcut.boundingBox();
     check(b.x>=0&&b.x+b.width<=viewport.width&&b.y>=72&&b.y+b.height<=viewport.height,'shortcut outside safe bounds');
     await page.screenshot({path:output+'/'+route.replaceAll('/','_')+'-'+viewport.width+'.png'});
     await shortcut.click();
     await page.waitForTimeout(100);
     check(await target.evaluate(el=>document.activeElement===el),'shortcut did not focus existing module');
     const t=await target.boundingBox();check(t.y>=72&&t.y<150,'target hidden beneath navbar');
     check(!await shortcut.isVisible(),'shortcut overlaps active form');
     check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow at module');
     await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(100);
     check(!await shortcut.isVisible(),'shortcut overlaps footer');
    }
    entry.pass=true;
   }catch(error){entry.pass=false;entry.error=error.message;await page.screenshot({path:output+'/FAIL-'+route.replaceAll('/','_')+'-'+viewport.width+'.png'}).catch(()=>{});}
   results.push(entry);console.log(entry.pass?'PASS':'FAIL',route,viewport.width,entry.error||'');
  }
 }
 await browser.close();fs.writeFileSync(output+'/results.json',JSON.stringify(results,null,2));
 if(results.some(x=>!x.pass))process.exitCode=1;
})();
