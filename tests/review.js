async (page) => {
  const cdp=await page.context().newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
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
  return {results,failures,errors};
}
