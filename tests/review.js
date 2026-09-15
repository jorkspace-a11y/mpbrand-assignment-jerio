async (page) => {
  const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setFocusEmulationEnabled',{enabled:true});await page.bringToFront();await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await page.emulateMedia({media:'screen',reducedMotion:'reduce'});
  const base='http://127.0.0.1:8768/mpbrand-assignment-jerio/';
  const output='C:/Users/hp/OneDrive/Documents/ChatGPT/Meta Pacific Projects/output/playwright/task-qa/';
  const root='C:/Users/hp/Projects/mpbrand-assignment-jerio/';
  const failures=[],errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.waitForFunction(()=>window.assignmentTasks);
  const tasks=await page.evaluate(()=>window.assignmentTasks);
  const results=[];
  if(await page.locator('.task-chapter').count()!==4)failures.push('four chapters');
  await page.locator('.brief-map summary').click();
  if(await page.locator('#brief-coverage a').count()!==13)failures.push('brief coverage links');
  for(const [i,task] of tasks.entries()){
    const id=task[0];await page.setViewportSize({width:1440,height:1000});
    await page.goto(base+'phase.html?task='+id);
    await page.locator('.phase-block:not(.print-grid-overview)').first().waitFor();
    await page.evaluate(async()=>{document.querySelectorAll('img').forEach(x=>x.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(x=>x.decode().catch(()=>{})));});
    const sections=await page.locator('.response-nav select option[value]:not([value=""])').count();
    if(!sections)failures.push({id,missingJump:true});
    else {await page.locator('.response-nav select').selectOption('response-'+sections);if(!await page.locator('#response-'+sections+' h2').evaluate(e=>e===document.activeElement))failures.push({id,jumpFocus:true});await page.locator('.response-nav select').selectOption('response-1');if(!await page.locator('#response-1 h2').evaluate(e=>e===document.activeElement))failures.push({id,firstJump:true});await page.evaluate(()=>scrollTo(0,0));}
    const crowded=await page.locator('.campaign-frame:visible').evaluateAll(nodes=>nodes.filter(n=>{const h=n.querySelector('.headline')?.getBoundingClientRect(),c=n.querySelector('.small-copy,.copy')?.getBoundingClientRect();return h&&c&&h.left<c.right&&h.right>c.left&&h.top<c.bottom&&h.bottom>c.top;}).map(n=>n.dataset.design||n.dataset.export));
    if(crowded.length)failures.push({id,textOverlap:crowded});
    const missing=await page.evaluate(()=>[...document.images].filter(x=>!x.naturalWidth).map(x=>x.getAttribute('src')));
    if(missing.length)failures.push({id,missing});
    if(/Jerio|area\.lab|boncei|invent\.|Warhol|Oddly|Adobe/.test(await page.locator('body').innerText()))failures.push({id,unwantedCredit:true});
    if(await page.locator('.reason,.motion-toggle,.reference-shelf').count())failures.push({id,removedUI:true});
    await page.screenshot({path:output+id+'-desktop.png',fullPage:true});
    const pdf=String(i+1).padStart(2,'0')+'-'+id+'-Jerio.pdf';
    await page.emulateMedia({media:'print'});
    await page.pdf({path:root+'pdf/'+pdf,preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false});
    await page.emulateMedia({media:'screen'});
    for(const width of [320,390,768,1024,1440]){
      await page.setViewportSize({width,height:900});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
      if(overflow)failures.push({id,width,overflow});
    }
    await page.setViewportSize({width:390,height:844});await page.screenshot({path:output+id+'-mobile.png',fullPage:true});
    results.push({id,pdf});
  }
  for(const logo of ['editorial','signal','studio'])for(const layout of ['scope','spatial']){
    await page.setViewportSize({width:1440,height:1000});await page.goto(base+`quotation.html?logo=${logo}&layout=${layout}`);
    await page.locator('.document-service').last().waitFor();await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(x=>x.decode()));});
    const prices=await page.locator('.service-price strong').allTextContents();
    const expected=layout==='scope'?['15,000,000','8,000,000']:['8,000,000','10,000,000'];
    if(JSON.stringify(prices)!==JSON.stringify(expected))failures.push({logo,layout,prices});
    await page.emulateMedia({media:'print'});
    await page.pdf({path:root+`pdf/quotation-${logo}-${layout}-Jerio.pdf`,preferCSSPageSize:true,printBackground:true});
    await page.emulateMedia({media:'screen'});
  }
  await page.locator('[name=mode]').selectOption('invoice');
  if(!await page.locator('.document-top').innerText().then(t=>t.includes('INVOICE / EXAMPLE')))failures.push('invoice label');
    await page.emulateMedia({media:'print'});
  await page.pdf({path:root+'pdf/invoice-studio-spatial-Jerio.pdf',preferCSSPageSize:true,printBackground:true});
    await page.emulateMedia({media:'screen'});
  await page.locator('[name=client]').fill('<img src=x onerror=alert(1)>');
  if(await page.locator('.document-meta img').count())failures.push('HTML injection');
  await page.locator('#quote-reset').click();
  if(await page.locator('[name=client]').inputValue()!=='PRIVATE OWNER')failures.push('reset');
  for(const path of ['','library.html','quotation.html','logo-routes.html','homepage.html']){
    await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
    for(const width of [320,390,768,1440]){
      await page.setViewportSize({width,height:900});
      if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))failures.push({path,width,overflow:true});
    }
  }
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const logo of ['editorial','signal','studio']){
    await page.goto(base+'homepage.html?logo='+logo);
    if(!await page.evaluate(()=>document.getAnimations().length))failures.push({logo,automaticMotion:false});
    await page.evaluate(async()=>{document.querySelectorAll('img[src]').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.querySelectorAll('img[src]')].map(i=>i.decode()));});
    for(const width of [320,390,768,1024,1440]){
      await page.setViewportSize({width,height:1000});
      const geometry=await page.evaluate(()=>{const image=document.querySelector('.hero-film').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth+1,overlap:[...document.querySelectorAll('#landing-headline,.hero-bottom')].some(el=>(()=>{const r=el.getBoundingClientRect();return r.left<image.right&&r.right>image.left&&r.top<image.bottom&&r.bottom>image.top;})())};});
      if(geometry.overflow||geometry.overlap)failures.push({logo,width,...geometry});
    }
    await page.setViewportSize({width:1440,height:1000});
    await page.locator('[data-tour-view="2"]').click();
    await page.evaluate(()=>dispatchEvent(new Event('scroll')));await page.waitForTimeout(300);
    if(!await page.locator('#tour-preview').getAttribute('src').then(s=>s.includes('interior')))failures.push('tour manual selection');
    await page.locator('.tour-step[data-tour="1"]').scrollIntoViewIfNeeded();
    await page.evaluate(()=>{const r=document.querySelector('.tour-step[data-tour="1"]').getBoundingClientRect();scrollBy(0,r.top-innerHeight*.3)});
    await page.waitForTimeout(1100);
    if(!await page.locator('#tour-preview').getAttribute('src').then(s=>s.includes('palms')))failures.push('tour scroll sequence');
    await page.setViewportSize({width:390,height:844});
    if(await page.locator('.tour-step img:visible').count()!==3)failures.push('mobile tour sequence');
    await page.setViewportSize({width:1440,height:1000});
    await page.locator('[data-project=sakti]').click();if(!await page.locator('dialog').evaluate(d=>d.open))failures.push('dialog open');
    await page.keyboard.press('Escape');if(!await page.locator('[data-project=sakti]').evaluate(b=>b===document.activeElement))failures.push('dialog focus return');
    await page.locator('.service-lines details').nth(1).locator('summary').click();if(!await page.locator('.service-lines details').nth(1).evaluate(d=>d.open))failures.push('service disclosure');
    const next=logo==='studio'?'editorial':'studio';await page.locator('#identity-select').selectOption(next);
    if(!page.url().includes('logo='+next)||await page.locator('body').getAttribute('data-identity')!==next)failures.push('identity selection');
    if(!await page.locator('.brand-link img').getAttribute('src').then(s=>s.includes(next)))failures.push('identity logo');
    await page.locator('#identity-select').selectOption(logo);await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(4600);
    const artTime=await page.locator('.contour-stage').evaluate(s=>s.getCurrentTime());await page.waitForTimeout(500);
    if(await page.locator('.contour-stage').evaluate(s=>s.getCurrentTime())<=artTime)failures.push('automatic graphic motion stopped');
    await page.screenshot({path:output+'landing-'+logo+'-full.png',fullPage:true});
    await page.setViewportSize({width:390,height:844});await page.screenshot({path:output+'landing-'+logo+'-mobile.png',fullPage:true});
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
  if(await page.evaluate(()=>document.getAnimations().length))failures.push('reduced motion');
  await page.locator('.preview-bar a').click();if(!page.url().includes('task=landing'))failures.push('return to task');
  await page.locator('.review-nav a[href="./#tasks"]').click();if(await page.locator('.task-link').count()!==13)failures.push('return to hub');
  await page.emulateMedia({reducedMotion:'no-preference'});
  return {results,failures,errors};
}
