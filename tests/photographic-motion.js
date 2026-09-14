async(page)=>{
 const base='http://127.0.0.1:8768/mpbrand-assignment-jerio/',failures=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setFocusEmulationEnabled',{enabled:true});await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await page.bringToFront();
 await page.emulateMedia({media:'screen',reducedMotion:'no-preference'});
 const moving=async selector=>{const sample=()=>page.locator(selector).first().evaluate(e=>{const s=getComputedStyle(e);return [s.scale,s.translate,s.clipPath,s.filter].join('|');});const a=await sample();await page.waitForTimeout(1000);return a!==await sample();};
 for(const route of ['','phase.html?task=grid','phase.html?task=applications','logo-routes.html','homepage.html?logo=editorial','homepage.html?logo=signal','homepage.html?logo=studio']){
  await page.setViewportSize({width:390,height:844});await page.goto(base+route);await page.waitForTimeout(6100);
  const selector=route===''?'.hero-art>img':route.startsWith('homepage')?'.hero-window img':route.includes('grid')?'.layout-negative:visible .photo':'.portrait:visible .photo';
  if(!await moving(selector))failures.push(route+': idle motion stopped');
  const glyphs=await page.locator('body').innerText();if(/[\u2190-\u21ff\u2600-\u27bf]|\p{Extended_Pictographic}/u.test(glyphs))failures.push(route+': emoji-capable glyph');
  if(await page.locator('.abstract-mouth').count())failures.push(route+': legacy mouth');
  await page.locator('.motion-pause').click();if(await moving(selector))failures.push(route+': pause failed');
  await page.locator('.motion-pause').click();if(!await moving(selector))failures.push(route+': resume failed');
  await page.emulateMedia({reducedMotion:'reduce'});if(await page.evaluate(()=>document.getAnimations().some(a=>a.playState==='running')))failures.push(route+': reduced motion');
  await page.emulateMedia({reducedMotion:'no-preference'});if(!await moving(selector))failures.push(route+': preference recovery');
 }
 await page.goto(base+'quotation.html');if(await page.locator('.motion-pause').count())failures.push('quotation: inert pause');
 await page.emulateMedia({reducedMotion:'no-preference'});return {failures,errors};
}
