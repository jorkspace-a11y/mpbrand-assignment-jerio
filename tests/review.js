async (page) => {
  const cdp=await page.context().newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await page.emulateMedia({reducedMotion:'reduce'});
  const base='http://127.0.0.1:8768/mpbrand-assignment-jerio/';
  const output='C:/Users/hp/OneDrive/Documents/ChatGPT/Meta Pacific Projects/output/playwright/task-qa/';
  const root='C:/Users/hp/Projects/mpbrand-assignment-jerio/';
  const failures=[],errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.waitForFunction(()=>window.assignmentTasks);
  const tasks=await page.evaluate(()=>window.assignmentTasks);
  const results=[];
  for(const [i,task] of tasks.entries()){
    const id=task[0];await page.setViewportSize({width:1440,height:1000});
    await page.goto(base+'phase.html?task='+id);
    await page.locator('.phase-block:not(.print-grid-overview)').first().waitFor();
    await page.evaluate(async()=>{document.querySelectorAll('img').forEach(x=>x.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(x=>x.decode().catch(()=>{})));});
    const missing=await page.evaluate(()=>[...document.images].filter(x=>!x.naturalWidth).map(x=>x.getAttribute('src')));
    if(missing.length)failures.push({id,missing});
    if(/Jerio|area\.lab|boncei|invent\.|Warhol|Oddly|Adobe/.test(await page.locator('body').innerText()))failures.push({id,unwantedCredit:true});
    if(await page.locator('.reason,.motion-toggle,.reference-shelf').count())failures.push({id,removedUI:true});
    await page.screenshot({path:output+id+'-desktop.png',fullPage:true});
    const pdf=String(i+1).padStart(2,'0')+'-'+id+'-Jerio.pdf';
    await page.pdf({path:root+'pdf/'+pdf,preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false});
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
    await page.pdf({path:root+`pdf/quotation-${logo}-${layout}-Jerio.pdf`,preferCSSPageSize:true,printBackground:true});
  }
  await page.locator('[name=mode]').selectOption('invoice');
  if(!await page.locator('.document-top').innerText().then(t=>t.includes('INVOICE / EXAMPLE')))failures.push('invoice label');
  await page.pdf({path:root+'pdf/invoice-studio-spatial-Jerio.pdf',preferCSSPageSize:true,printBackground:true});
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
      const geometry=await page.evaluate(()=>{const image=document.querySelector('.hero-film').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth+1,overlap:[...document.querySelectorAll('#landing-headline,.hero-bottom')].some(el=>el.getBoundingClientRect().bottom>image.top)};});
      if(geometry.overflow||geometry.overlap)failures.push({logo,width,...geometry});
    }
    await page.locator('[data-project=sakti]').click();if(!await page.locator('dialog').evaluate(d=>d.open))failures.push('dialog open');
    await page.keyboard.press('Escape');if(!await page.locator('[data-project=sakti]').evaluate(b=>b===document.activeElement))failures.push('dialog focus return');
    await page.locator('.service-lines details').nth(1).locator('summary').click();if(!await page.locator('.service-lines details').nth(1).evaluate(d=>d.open))failures.push('service disclosure');
    const next=logo==='studio'?'editorial':'studio';await page.locator('#identity-select').selectOption(next);
    if(!page.url().includes('logo='+next)||await page.locator('body').getAttribute('data-identity')!==next)failures.push('identity selection');
    if(!await page.locator('.brand-link img').getAttribute('src').then(s=>s.includes(next)))failures.push('identity logo');
    await page.locator('#identity-select').selectOption(logo);await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(4600);
    if(await page.evaluate(()=>document.getAnimations().some(a=>a.playState==='running')))failures.push('motion did not settle');
    await page.screenshot({path:output+'landing-'+logo+'-full.png',fullPage:true});
    await page.setViewportSize({width:390,height:844});await page.screenshot({path:output+'landing-'+logo+'-mobile.png',fullPage:true});
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
  if(await page.evaluate(()=>document.getAnimations().length))failures.push('reduced motion');
  await page.locator('.preview-bar a').click();if(!page.url().includes('task=landing'))failures.push('return to task');
  await page.locator('.review-nav a[href="./#tasks"]').click();if(await page.locator('.task-link').count()!==13)failures.push('return to hub');
  return {results,failures,errors};
}
