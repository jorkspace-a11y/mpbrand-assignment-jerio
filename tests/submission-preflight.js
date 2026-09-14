async(page)=>{
 const base=await page.evaluate(()=>new URL('./',location.href).href),failures=[],downloads=new Set(),out='C:/Users/hp/OneDrive/Documents/ChatGPT/Meta Pacific Projects/output/playwright/';
 await page.emulateMedia({media:'screen',reducedMotion:'reduce'});await page.goto(base);
 const tasks=await page.evaluate(()=>window.assignmentTasks.map(t=>t[0]));
 const routes=['',...tasks.map(t=>'phase.html?task='+t),'library.html','logo-routes.html','quotation.html'];
 for(const route of routes){
  await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
  const text=await page.locator('body').innerText();if(/[\u2190-\u21ff\u2600-\u27bf\u{1f300}-\u{1faff}]/u.test(text))failures.push({route,glyph:true});
  (await page.locator('a[download]').evaluateAll(es=>es.map(e=>e.href))).forEach(u=>downloads.add(u));
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:900});
   const issues=await page.locator('.campaign-frame:visible').evaluateAll(frames=>frames.flatMap(f=>{
    const nodes=[...f.querySelectorAll('.brand,.logo,.headline,.small-copy,.copy,.frame-note')].filter(e=>getComputedStyle(e).display!=='none');const found=[];
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i].getBoundingClientRect(),b=nodes[j].getBoundingClientRect();if(a.width&&b.width&&a.left<b.right-.5&&a.right>b.left+.5&&a.top<b.bottom-.5&&a.bottom>b.top+.5)found.push({frame:f.dataset.design||f.dataset.export,a:nodes[i].className,b:nodes[j].className});}
    return found;
   }));
   if(issues.length)failures.push({route,width,issues});
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))failures.push({route,width,overflow:true});
  }
 }
 for(const logo of ['editorial','signal','studio'])for(const layout of ['scope','spatial'])downloads.add(base+`pdf/quotation-${logo}-${layout}-Jerio.pdf`);
 downloads.add(base+'pdf/invoice-studio-spatial-Jerio.pdf');
 for(const url of downloads){const response=await page.request.head(url);if(!response.ok())failures.push({url,status:response.status()});}
 await page.setViewportSize({width:390,height:844});
 for(const logo of ['editorial','signal','studio']){await page.goto(base+'homepage.html?logo='+logo);await page.evaluate(async()=>{await document.fonts.ready;await document.querySelector('.hero-window img').decode();});await page.screenshot({path:out+'submission-'+logo+'-phone.png'});}
 await page.goto(base);await page.locator('#commercial-work').scrollIntoViewIfNeeded();await page.screenshot({path:out+'submission-commercial-phone.png'});
 await page.emulateMedia({media:'screen',reducedMotion:'no-preference'});await page.goto(base+'homepage.html?logo=editorial');
 return {routes:routes.length,downloads:downloads.size,failures};
}
