async (page) => {
 const base='http://127.0.0.1:8768/mpbrand-assignment-jerio/';
 const failures=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const cdp=await page.context().newCDPSession(page);
 await cdp.send('Emulation.setFocusEmulationEnabled',{enabled:true});
 await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await page.bringToFront();await page.emulateMedia({reducedMotion:'no-preference'});
 const moving=async selector=>{
   const a=await page.locator(selector+':visible').first().evaluate(e=>getComputedStyle(e).transform);
   await page.waitForTimeout(800);
   const b=await page.locator(selector+':visible').first().evaluate(e=>getComputedStyle(e).transform);
   return a!==b;
 };
 for(const route of ['','phase.html?task=grid','phase.html?task=applications','homepage.html?logo=editorial','homepage.html?logo=signal','homepage.html?logo=studio']){
   await page.setViewportSize({width:390,height:844});await page.goto(base+route);
   await page.locator('.abstract-mouth').first().waitFor({state:'attached'});
   await page.waitForTimeout(6200);
   if(!await moving('.lip-upper'))failures.push(route+': no idle mouth movement');
   if(await page.evaluate(()=>document.body.textContent.includes('\u2733')))failures.push(route+': emoji character');
   for(const width of [320,390,768,1440]){
     await page.setViewportSize({width,height:900});
     if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))failures.push(route+': overflow '+width);
     const overlaps=await page.locator('.social-art:visible').evaluateAll(nodes=>nodes.filter(n=>n.querySelector('.symbol')).map(n=>{
       const h=n.querySelector('.headline').getBoundingClientRect(),m=n.querySelector('.abstract-mouth').getBoundingClientRect(),c=n.querySelector('.small-copy').getBoundingClientRect();
       return {id:n.dataset.design,overlap:h.bottom>m.top||m.bottom>c.top};
     }).filter(x=>x.overlap));
     if(overlaps.length)failures.push({route,width,overlaps});
   }
   if(route.startsWith('homepage')){
     await page.locator('#identity-select').selectOption('signal');
     await page.waitForTimeout(5000);
     if(!await moving('.lip-upper'))failures.push(route+': selection stopped loop');
   }
   await page.locator('.motion-pause').click();
   if(await moving('.lip-upper'))failures.push(route+': pause failed');
   await page.locator('.motion-pause').click();
   if(!await moving('.lip-upper'))failures.push(route+': resume failed');
   if(await page.evaluate(()=>document.getAnimations().some(a=>!('animationName' in a)&&a.playState==='running')))failures.push(route+': resume replayed an entrance');
   await page.emulateMedia({reducedMotion:'reduce'});
   if(await page.evaluate(()=>document.getAnimations().length))failures.push(route+': reduced motion failed');
   await page.emulateMedia({reducedMotion:'no-preference'});
   if(!await moving('.lip-upper'))failures.push(route+': preference recovery failed');
 }
 await page.goto(base+'quotation.html');
 if(await page.locator('.motion-pause').count())failures.push('inert control on quotation');
 await page.emulateMedia({reducedMotion:'no-preference'});
 return {failures,errors};
}
