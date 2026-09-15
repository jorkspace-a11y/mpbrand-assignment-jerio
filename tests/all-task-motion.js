async(page)=>{
 const base=await page.evaluate(()=>new URL('./',location.href).href),failures=[],errors=[],results=[];
 const out='C:/Users/hp/OneDrive/Documents/ChatGPT/Meta Pacific Projects/output/playwright/';
 const cdp=await page.context().newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Emulation.setFocusEmulationEnabled',{enabled:true});page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({media:'screen',reducedMotion:'no-preference'});await page.goto(base);
 const tasks=await page.evaluate(()=>window.assignmentTasks.map(t=>t[0]).filter(t=>t!=='landing'));
 const routes=[...tasks.map(t=>'phase.html?task='+t),'library.html','logo-routes.html','quotation.html'];
 const moving=async()=>{const sample=()=>page.locator('.study-stage').evaluate(stage=>[...stage.querySelectorAll('*')].map(e=>{const s=getComputedStyle(e);return [s.transform,s.translate,s.rotate].join('/');}).join('|'));const a=await sample();await page.waitForTimeout(360);return a!==await sample();};
 for(const route of routes){
  const name=route.includes('task=')?route.split('task=')[1]:route.split('.')[0];
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+route);await page.locator('.task-motion').scrollIntoViewIfNeeded();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(700);
  if(!await moving())failures.push({route,automatic:false});
  const controls=page.locator('[data-study-choice]'),count=await controls.count();
  let before=await page.locator('.study-caption').innerText();
  for(let i=1;i<count;i++){await controls.nth(i).click();const after=await page.locator('.study-caption').innerText();if(after===before||await controls.nth(i).getAttribute('aria-pressed')!=='true')failures.push({route,choice:i});before=after;await page.locator('.study-stage img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));if(name==='applications'){const ratio=await page.locator('.format-frame').evaluate(e=>e.offsetWidth/e.offsetHeight);if(Math.abs(ratio-[.8,9/16,16/9][i])>.02)failures.push({route,ratio,i});}}
  await controls.first().focus();await page.keyboard.press('Enter');if(await controls.first().getAttribute('aria-pressed')!=='true')failures.push({route,keyboard:true});
  const missing=await page.locator('.study-stage img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));if(missing.length)failures.push({route,missing});
  await page.locator('.task-motion').screenshot({path:out+'motion-study-'+name+'-desktop.png'});
  for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))failures.push({route,width,overflow:true});}
  await page.setViewportSize({width:390,height:844});await page.locator('.task-motion').scrollIntoViewIfNeeded();await page.locator('.task-motion').screenshot({path:out+'motion-study-'+name+'-phone.png'});
  await page.locator('.motion-pause').click();await page.locator('.task-motion').scrollIntoViewIfNeeded();if(await moving())failures.push({route,pause:true});
  await page.locator('.motion-pause').click();await page.locator('.task-motion').scrollIntoViewIfNeeded();await page.waitForTimeout(100);if(!await moving())failures.push({route,resume:true});
  await page.emulateMedia({reducedMotion:'reduce'});if(await moving())failures.push({route,reduced:true});
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(100);if(!await moving())failures.push({route,recovery:true});
  await page.emulateMedia({media:'print'});if(await page.locator('.task-motion').isVisible())failures.push({route,printStudy:true});await page.emulateMedia({media:'screen'});
  results.push({route,choices:count,kind:await page.locator('.task-motion').getAttribute('data-kind')});
 }
 await page.goto(base+'phase.html?task=landing');if(await page.locator('.motion-poster').count()!==1)failures.push('landing composition lost');
 return {results,failures,errors};
}
