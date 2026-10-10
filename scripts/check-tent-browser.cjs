const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const output=process.env.TENT_QA_DIR || '/tmp/lp-tent-browser';fs.mkdirSync(output,{recursive:true});
 for(const viewport of [{width:1440,height:1100},{width:390,height:844}]) {
  const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  // No application submissions or external service traffic during local QA.
  await page.route('**/*',route=>{ const url=new URL(route.request().url());return ['localhost','127.0.0.1'].includes(url.hostname)?route.continue():route.abort() });
  for(const [size,base,rush] of [['10x10','$789.00','$1,109.00'],['20x10','$1,419.00','$1,849.00']]) {
   await page.goto(`http://127.0.0.1:3109/services/signage/tents/${size}`);
   await page.getByTestId('tent-total').waitFor();assert.equal(await page.getByTestId('tent-total').innerText(),base);
   await page.getByLabel('Production',{exact:false}).selectOption('next-day');assert.equal(await page.getByTestId('tent-total').innerText(),rush);
   await page.getByLabel('Backwall',{exact:false}).selectOption('double');
   await page.getByLabel('Sidewalls (pair)',{exact:false}).selectOption('full-double');
   await page.getByLabel('Flag holder hardware',{exact:false}).selectOption('2');
   await page.getByLabel('Premium wheel bag',{exact:false}).check();
   await page.getByLabel('Quantity',{exact:true}).fill('2');
   assert.equal(await page.getByTestId('tent-total').innerText(),size==='10x10'?'$7,778.00':'$10,378.00');
   await page.getByRole('button',{name:'Add to Cart',exact:true}).click();
   await page.getByRole('link',{name:'View Cart',exact:true}).waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);
   await page.screenshot({path:`${output}/${size}-${viewport.width}.png`,fullPage:true});
   await page.getByRole('link',{name:'View Cart',exact:true}).click();
   await page.waitForURL('**/cart');
   await page.reload();
   await page.getByText('Next-day production after proof approval (not delivery)',{exact:false}).first().waitFor();
  }

  for (const size of ['10x10','20x10']) {
   for (const pkg of ['frame-only','top-only']) {
    const checkPage=await browser.newPage({viewport});checkPage.on('pageerror',e=>errors.push(e.message));
    await checkPage.route('**/*',route=>{const url=new URL(route.request().url());return ['localhost','127.0.0.1'].includes(url.hostname)?route.continue():route.abort()});
    await checkPage.goto(`http://127.0.0.1:3109/services/signage/tents/${size}`);
    await checkPage.getByLabel('Backwall',{exact:false}).selectOption('double');
    await checkPage.getByLabel('Premium wheel bag',{exact:false}).check();
    await checkPage.getByLabel('Package',{exact:false}).selectOption(pkg);
    assert.equal(await checkPage.getByLabel('Backwall',{exact:false}).count(),0);
    const expected=size==='10x10'?'$429.00':pkg==='frame-only'?'$859.00':'$849.00';
    assert.equal(await checkPage.getByTestId('tent-total').innerText(),expected);
    await checkPage.getByRole('button',{name:'Add to Cart',exact:true}).click();
    await checkPage.getByRole('link',{name:'View Cart',exact:true}).click();
    await checkPage.waitForURL('**/cart');
    await checkPage.reload();
    await checkPage.getByText(pkg==='frame-only'?'Frame only — no artwork required.':'Upload artwork',{exact:true}).first().waitFor();
    assert.equal(await checkPage.getByRole('button',{name:'Proceed to payment',exact:true}).isEnabled(),pkg==='frame-only');
    assert.equal(await checkPage.getByText('Frame only — no artwork required.',{exact:true}).count(),pkg==='frame-only'?1:0);
    assert.equal(await checkPage.getByText('Upload artwork',{exact:true}).count(),pkg==='top-only'?1:0);
    assert.equal(await checkPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await checkPage.close();
   }
  }
  await page.goto('http://127.0.0.1:3109/services/signage');
  for(const name of ['Canopy Tents','Banners','Backdrops']) assert.equal(await page.getByRole('heading',{name,exact:true}).count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);
  await page.screenshot({path:`${output}/signage-${viewport.width}.png`,fullPage:true});
  assert.deepEqual(errors,[]);await page.close();
 }
 await browser.close();console.log('PASS: desktop/mobile pages, default and configured prices, rush, cart persistence, signage cards, no overflow or page errors');
})().catch(e=>{console.error(e);process.exitCode=1});
