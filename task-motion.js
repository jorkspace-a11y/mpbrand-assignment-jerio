// ponytail: one native controller, with a different graphic study for each assignment.
(()=>{
 const task=document.body.dataset.task;
 const extra=document.querySelector('.library-page')?'library':document.querySelector('#routes')?'marks':document.querySelector('#quote-form')?'quote':null;
 const id=task||extra;if(!id||id==='landing')return;
 const studies={
  audit:['aperture','What stays in the frame?','KEEP',[
   ['Keep','Keep the name, project footage and sense of place.','KEEP'],['Evolve','Make the hierarchy, source labels and next step clearer.','EVOLVE'],['Remove','Remove competing styles and unsupported claims.','REMOVE']]],
  direction:['ribbon','Change the visual volume.','MORE',[
   ['Image','Cinematic footage supplies the evidence. Give the setting room.','IMAGE'],['Type','A complete thought, at a scale that changes the pace.','TYPE'],['Form','Graphic interruption introduces a question. It does not replace the work.','FORM']]],
  logos:['marks','Try each signature.','META',[
   ['Editorial','Recommended primary. A clear signature beside expressive work.','editorial'],['Signal','Rounded, upright and contained. A stronger campaign signature.','signal'],['Studio','Compact MP lockup for credits and smaller placements.','studio']]],
  system:['spectrum','Choose the colour relationship.','COLOUR',[
   ['Ink + red','Ink carries the reading. Red marks the interruption.','INK'],['Blue + white','Blue carries the field. White keeps the statement legible.','BLUE'],['Yellow + ink','Yellow takes the stage. Black gives the message its weight.','YELLOW']]],
  grid:['sequence','Try the rhythm of the feed.','FIFTEEN',[
   ['Image-led','Open with the range of locations and production work.','IMAGE'],['Graphic-led','Break the photographic rhythm with a complete graphic statement.','IDEA'],['Mixed pace','Let image, process and people take turns. Each post still stands alone.','RANGE']]],
  applications:['formats','Change the frame, keep the idea.','FRAME',[
   ['Feed / 4:5','A cover earns the stop; the following frames reward the swipe.','4:5'],['Story / 9:16','Keep the message and native interaction zone separate.','9:16'],['Wide / 16:9','Give the setting more room for project context.','16:9']]],
  founder:['voice','Build the conversation.','WHY?',[
   ['The frame','Proposed question: What did this shot need to explain?','FRAME'],['The decision','Proposed question: Why this angle, route or interaction?','WHY?'],['The consequence','Show the footage that supports the answer. No invented founder quotation.','PROOF']]],
  review:['shutter','Choose what to inspect.','FOCUS',[
   ['Cover','Inspect the first reading: what does the viewer understand at a glance?','FOCUS'],['Caption','Give the image a complete thought and useful context.','CONTEXT'],['Next step','Make the next action clear without competing with the image.','ACTION']]],
  pillars:['orbits','Move between the six territories.','SIX',[
   ['Places','Property, hospitality, access and surroundings.','PLACE'],['Process','Planning, production, editing and How To.','PROCESS'],['Experiences','Virtual tours, navigation and spatial storytelling.','ENTER'],['Projects','Brief, decision and evidence.','PROJECT'],['People','The people and judgment behind the work.','PEOPLE'],['Technology','Explain the use and label captured, rendered or synthetic material.','SEE']]],
  annotations:['crop','Give the edit a job.','LOOK',[
   ['Context','Start wide enough to understand the setting.','CONTEXT'],['Detail','Direct attention to one relevant feature.','DETAIL'],['Label','Name the source or proposed state without covering the evidence.','LABEL']]],
  anjuna:['tour','Move from land to proposed space.','EXPLORE',[
   ['Master view','Existing tour master scene. Start with orientation.','MASTER'],['Palms phase','Supplied Palms scene, labelled September 2026.','PHASE'],['Proposed villa','Proposed interior visualisation, not a photograph of completed construction.','PROPOSED']]],
  commercial:['ledger','Follow the commercial reading order.','SCOPE',[
   ['Scope','Group the original deliverables so the client can scan the offer.','SCOPE'],['Price','Keep quotation #578 values intact. Do not invent discounts or terms.','PRICE'],['Identity','Let the signature work without relying on a beautiful photograph.','SIGN']]],
  library:['sequence','Explore the working collection.','WORK',[
   ['Campaigns','Fifteen campaign frames. Download the individual artwork below.','CAMPAIGN'],['Marks','Compare three signatures across thirty-six applications.','IDENTITY'],['Documents','Six quotation treatments and the invoice example remain available.','SCOPE']]],
  marks:['marks','Try the signature before the applications.','META',[
   ['Editorial','Clear contrast between meta. and pacific.','editorial'],['Signal','Upright contained lettering, with the red stop.','signal'],['Studio','Compact initials with the full name attached.','studio']]],
  quote:['ledger','A document with a clear reading order.','SCOPE',[
   ['Scope','The source services stay intact. Edit client details in the form below.','SCOPE'],['Price','Original amounts stay fixed. This preview does not issue an invoice.','PRICE'],['Signature','Use the form to compare the three logos and two source layouts.','SIGN']]]
 };
 const config=studies[id];if(!config)return;
 const [kind,title,word,choices]=config;
 const shell=document.createElement('section');shell.className='task-motion';shell.dataset.kind=kind;shell.dataset.choice='0';shell.setAttribute('aria-labelledby','study-title');
 const photo='assets/photos/aerial-parkland-coast.jpg';
 const image=(src,cls)=>`<img class="${cls}" src="${src}" alt="">`;
 const repeat=(n,fn)=>Array.from({length:n},(_,i)=>fn(i)).join('');
 const graphic={
  aperture:`${image(photo,'study-photo')}<div class="aperture-lines">${repeat(12,i=>`<i style="--i:${i}"></i>`)}</div>`,
  ribbon:`${image('assets/photos/aerial-bay-lagoon.jpg','study-photo')}<svg class="ribbon-drawing" viewBox="0 0 1000 400"><g fill="none" stroke="currentColor" stroke-width="4">${repeat(20,i=>`<path style="--i:${i}" d="M -150 ${60+i*11} C 150 ${-150+i*11} 310 ${580-i*10} 560 ${200+i*8} S 940 ${-20+i*11} 1180 ${180+i*10}"/>`)}</g></svg>`,
  marks:`<div class="mark-track">${repeat(9,i=>`<i style="--i:${i}"></i>`)}</div>${image('logos/editorial-paper.svg','study-mark')}`,
  spectrum:`<div class="spectrum-bars">${repeat(16,i=>`<i style="--i:${i}"></i>`)}</div>`,
  sequence:`<div class="sequence-grid">${repeat(15,i=>`<div class="sequence-tile" style="--i:${i}">${i%3===0?image(photo,''):i%3===1?'<span>MORE</span>':'<i></i>'}</div>`)}</div>`,
  formats:`<div class="format-echo"></div><div class="format-frame">${image('assets/photos/aerial-bay-lagoon.jpg','')}<span class="format-label">4:5</span></div>`,
  voice:`<div class="voice-bars">${repeat(35,i=>`<i style="--i:${i};--height:${25+Math.abs(Math.sin(i*1.7))*75}%"></i>`)}</div><span class="study-disclaimer">Graphic rhythm / not recorded audio</span>`,
  shutter:`${image(photo,'study-photo')}<div class="shutter-blades">${repeat(8,i=>`<i style="--i:${i}"></i>`)}</div>`,
  orbits:`<div class="territories">${repeat(6,i=>`<i style="--i:${i}" data-territory="${i}"><span>${i+1}</span></i>`)}</div>`,
  crop:`${image(photo,'study-photo')}<div class="crop-frame"><i></i><i></i><i></i><i></i></div>`,
  tour:`${image('artwork/anjuna-master-live.png','study-photo')}<div class="tour-rings">${repeat(8,i=>`<i style="--i:${i}"></i>`)}</div>`,
  ledger:`<div class="ledger-sheets">${repeat(3,i=>`<div class="ledger-sheet" style="--i:${i}"><b>${['SCOPE','PRICE','SIGN'][i]}</b>${repeat(5,j=>`<i style="--i:${j}"></i>`)}</div>`)}</div>`
 }[kind];
 shell.innerHTML=`<h2 id="study-title">${title}</h2><div class="study-stage" aria-hidden="true"><div class="study-word">${word}</div>${graphic}</div><div class="study-controls" role="group" aria-label="${title}">${choices.map(([label],i)=>`<button type="button" data-study-choice="${i}" aria-pressed="${i===0}">${label}</button>`).join('')}</div><p class="study-caption" aria-live="polite">${choices[0][1]}</p>`;
 const anchor=document.querySelector('.phase-head,.library-jumps,.intro,.creator-controls>p');anchor.after(shell);document.body.classList.add('has-task-motion');
 let action;
 if(extra){action=document.createElement('a');action.className='study-action';shell.append(action);}
 function updateAction(i){if(!action)return;action.href=extra==='library'?['#library-art','logo-routes.html','quotation.html'][i]:extra==='marks'?'#'+choices[i][2]:'#quote-form';action.textContent=extra==='library'?['Browse campaign artwork','Compare logo applications','Open the document creator'][i]:extra==='marks'?'See these applications':'Edit the document';}updateAction(0);
 shell.querySelectorAll('[data-study-choice]').forEach(button=>button.addEventListener('click',()=>{
  const i=Number(button.dataset.studyChoice);shell.dataset.choice=i;
  shell.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  shell.querySelector('.study-caption').textContent=choices[i][1];shell.querySelector('.study-word').textContent=kind==='marks'?'META':choices[i][2];
  if(kind==='marks')shell.querySelector('.study-mark').src=`logos/${choices[i][2]}-paper.svg`;
  if(kind==='formats')shell.querySelector('.format-label').textContent=choices[i][2];
  if(kind==='tour')shell.querySelector('.study-photo').src='artwork/'+['anjuna-master-live.png','anjuna-palms-live.png','anjuna-interior-live.png'][i];
  updateAction(i);
 }));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=true;
 function sync(){shell.classList.toggle('study-paused',!visible||document.hidden||reduced.matches||document.body.classList.contains('motion-paused'));}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(shell);
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
})();
