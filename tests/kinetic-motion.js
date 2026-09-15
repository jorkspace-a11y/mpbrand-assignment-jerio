async(page)=>{
 const base=await page.evaluate(()=>new URL('./',location.href).href),failures=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setFocusEmulationEnabled',{enabled:true});await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await page.emulateMedia({media:'screen',reducedMotion:'no-preference'});
 const sample=()=>page.locator('.contour-stage').evaluate(s=>({time:s.getCurrentTime(),paused:s.animationsPaused(),length:s.querySelector('.mouth-contour').getTotalLength(),cut:getComputedStyle(document.querySelector('.poster-film-cut')).transform}));
 const changes=async()=>{const a=await sample();await page.waitForTimeout(700);const b=await sample();return {time:Math.abs(b.time-a.time),shape:Math.abs(b.length-a.length),cut:a.cut!==b.cut};};
 for(const route of ['','phase.html?task=landing','homepage.html?logo=editorial','homepage.html?logo=signal','homepage.html?logo=studio']){
  await page.setViewportSize({width:390,height:844});await page.goto(base+route);await page.locator('.motion-poster').scrollIntoViewIfNeeded();await page.waitForTimeout(6200);
  if(await page.locator('.mouth-contour').count()!==18)failures.push(route+': composition missing');
  let delta=await changes();if(delta.time<.3||delta.shape<.1||!delta.cut)failures.push({route,idle:delta});
  if(await page.locator('.poster-film-cut').evaluate(e=>getComputedStyle(e).animationName)!=='film-cut')failures.push(route+': old photo style collision');
  for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:1000});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))failures.push({route,width,overflow:true});}
  // Clicking the footer scrolls the hero out of view. Return before testing user pause.
  await page.locator('.motion-pause').click();await page.locator('.motion-poster').scrollIntoViewIfNeeded();await page.waitForTimeout(100);delta=await changes();if(delta.time>.02||delta.shape>.01||delta.cut)failures.push({route,pause:delta});
  await page.locator('.motion-pause').click();await page.locator('.motion-poster').scrollIntoViewIfNeeded();await page.waitForTimeout(100);delta=await changes();if(delta.time<.3)failures.push({route,resume:delta});
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);delta=await changes();if(delta.time>.02||delta.shape>.01||delta.cut)failures.push({route,reduced:delta});
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(100);delta=await changes();if(delta.time<.3)failures.push({route,recovery:delta});
  await page.locator('footer').scrollIntoViewIfNeeded();await page.waitForTimeout(100);if((await changes()).time>.02)failures.push(route+': offscreen SVG running');
  await page.locator('.motion-poster').scrollIntoViewIfNeeded();await page.emulateMedia({media:'print'});await page.waitForTimeout(100);if((await changes()).time>.02)failures.push(route+': print SVG running');await page.emulateMedia({media:'screen'});
 }
 return {routes:5,failures,errors};
}
