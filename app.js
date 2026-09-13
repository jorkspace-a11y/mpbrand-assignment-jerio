const $ = selector => document.querySelector(selector);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const viewer = $('#viewer');
let returnFocus;
let assets = [];
let filter = 'All';
const projects = {
  anjuna: {title:'Anjuna Bay', video:'https://www.youtube.com/embed/5pOwZ8CzTmA', tour:'https://chris75.viewin360.co/share/collection/7Ktxh?logo=-1&info=0&fs=1&vr=0&gyro=0&thumbs=-1&inst=0&keys=0'},
  kohsamui: {title:'Villa Koh Samui', video:'https://www.youtube.com/embed/1XJsmIawz3k'},
  sakti: {title:'Sakti', video:'https://www.youtube.com/embed/05NSIqvD2KE'},
  'anjuna-tour': {title:'Anjuna Bay virtual tour', tour:'https://chris75.viewin360.co/share/collection/7Ktxh?logo=-1&info=0&fs=1&vr=0&gyro=0&thumbs=-1&inst=0&keys=0'}
};
const posters = [
  ['LOOK\nAGAIN.','Film / Reel cover','loud','photos/aerial-bay-lagoon.jpg','A different angle on a real place.'],
  ['THE\nWHOLE\nPICTURE.','Property / campaign','acid','photos/aerial-site-overview.jpg','Land. Access. Surroundings. Context matters.'],
  ['Room to\nbreathe.','Interiors / editorial','editorial','work/kohsamui-fpv.jpg','A room tells you more when you can move through it.'],
  ['GET\nCLOSER.','FPV / campaign','split','work/sakti-fpv.jpg','People and places, beyond the establishing shot.'],
  ['WHY\nTHIS\nROUTE?','How To / carousel cover','type','photos/aerial-site-building.jpg','Show the approach before you show the destination.'],
  ['air. space.\nperspective.','Property / quiet editorial','quiet','photos/aerial-parkland-coast.jpg','Aerial photography / Meta Pacific'],
  ['A PLACE.\nNOT A\nPIN.','Property / campaign','loud','photos/aerial-site-building.jpg','There is more to a location than an address.'],
  ['START\nOUTSIDE.','How To / carousel 2','editorial','photos/aerial-site-overview.jpg','Establish the surroundings. Give the viewer their bearings.'],
  ['THEN\nGO IN.','How To / carousel 3','editorial','work/kohsamui-fpv.jpg','Move from context to detail. Let the route make sense.'],
  ['BEFORE\nTHE\nSHOOT.','Founder / type-led cover','founder',null,'A question for the founder: what makes a location worth a second look?'],
  ['WALK\nTHROUGH.','Virtual tour / campaign','acid','photos/aerial-bay-lagoon.jpg','See the space. Choose your own direction.'],
  ['Form.\nLight.\nSpace.','Interiors / editorial','quiet','work/kohsamui-fpv.jpg','Look at how the room fits together.'],
  ['THIS IS\nTHE\nAPPROACH.','Property / route study','split','photos/aerial-parkland-coast.jpg','Make the arrival part of the story.'],
  ['MORE\nTHAN A\nFLYOVER.','FPV / Story cover','type','photos/aerial-site-building.jpg','A route should reveal something.'],
  ['Keep the\ncontext.','Property / educational','editorial','photos/aerial-site-overview.jpg','Wide shot first. Detail second. The location stays clear.'],
  ['THE\nPEOPLE\nBEHIND IT.','Studio / portrait-needed cover','founder',null,'Type-led study. Replace with an approved team portrait before publication.'],
  ['FROM\nHERE.','Place / editorial','loud','work/sardine-fpv.jpg','A closer look at the place and its surroundings.'],
  ['Another\npoint of view.','Studio / editorial','quiet','photos/hero-band.jpg','Film, photography and virtual experiences. Meta Pacific.']
];
function el(tag, className, text) { const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node; }
function posterNode(data) {
  const [title,,style,file,sub]=data;
  const node=el('div',`poster ${style}`);
  if(file){const img=el('img');img.src=`assets/${file}`;img.alt='';img.loading='lazy';node.append(img);node.style.setProperty('--poster-image',`url('assets/${file}')`);}
  node.append(el('span','poster-brand','META\nPACIFIC'),el('span','poster-title',title),el('span','poster-sub',sub));
  node.querySelectorAll('.poster-title,.poster-brand').forEach(n=>n.style.whiteSpace='pre-line');
  return node;
}
function openViewer(title,content){returnFocus=document.activeElement;$('#viewer-title').textContent=title;$('#viewer-body').replaceChildren(content);viewer.showModal();$('#close-viewer').focus();}
$('#close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('close',()=>{$('#viewer-body').replaceChildren();returnFocus?.focus();});
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();}});

posters.forEach((data,index)=>{
  const button=el('button','poster-card');button.setAttribute('aria-label',`Open artwork ${index+1}: ${data[0].replaceAll('\n',' ')}`);
  button.append(posterNode(data),el('span','',data[1]));
  button.addEventListener('click',()=>{const content=el('div');const download=el('a','','Download 1080 × 1350 PNG');download.href=`artwork/meta-pacific-study-${String(index+1).padStart(2,'0')}.png`;download.download='';content.append(posterNode(data),download,el('p','',data[1]+'. Proposed artwork using the existing Meta Pacific image library. Not a published or approved campaign.'));openViewer(data[0].replaceAll('\n',' '),content);});
  $('#poster-track').append(button);
});
function shiftPoster(direction){$('#poster-track').scrollBy({left:direction*($('.poster-card').getBoundingClientRect().width+28),behavior:reduced.matches||document.body.classList.contains('motion-paused')?'instant':'smooth'});}
$('#previous-poster').addEventListener('click',()=>shiftPoster(-1));$('#next-poster').addEventListener('click',()=>shiftPoster(1));
$('#feed-toggle').addEventListener('click',()=>{const feed=$('#poster-track').classList.toggle('feed-layout');$('#feed-toggle').setAttribute('aria-pressed',String(feed));$('#feed-toggle').textContent=feed?'View carousel':'View feed';$('#previous-poster').hidden=feed;$('#next-poster').hidden=feed;});
$('#poster-track').addEventListener('keydown',e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();shiftPoster(e.key==='ArrowRight'?1:-1);}});

document.querySelectorAll('[data-route]').forEach(button=>button.addEventListener('click',()=>{
  const route=button.dataset.route;document.querySelectorAll('[data-route]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  $('#route-logo').src=`logos/${route}-paper.svg`;$('#route-logo').alt=`Meta Pacific ${route} wordmark`;$('.usage-mark').src=$('#route-logo').src;$('#logo-download').href=$('#route-logo').src;
  $('#route-description').textContent={editorial:'EDITORIAL: bold and light letterforms make the complete name clear. The dot connects both parts while leaving the photography room to lead.',signal:'SIGNAL: upright bold lettering, grounded by a straight underline. Keeps the presence without an italic slant. The line carries into film titles and transitions.',studio:'STUDIO: compact MP initials with a divider and a lighter full name. A clear signature for corner placements, production credits and small applications.'}[route];
}));

function showMedia(project,key){
  const mount=$('#media-mount');mount.replaceChildren();
  const description=el('div','media-loading');description.append(el('p','',`This ${key==='tour'?'virtual tour':'film'} loads from the existing external project source. Playback depends on that service and your connection.`));
  const load=el('button','',`Load ${key==='tour'?'virtual tour':'film'}`);description.append(load);mount.append(description);
  const link=el('a','',`Open source in a new tab ↗`);link.href=project[key];link.target='_blank';link.rel='noopener';mount.append(link);
  load.addEventListener('click',()=>{const frame=el('iframe');frame.title=`${project.title} ${key}`;frame.src=project[key];frame.allow='autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer';frame.allowFullscreen=true;description.replaceWith(frame);mount.append(el('p','media-status','If the player stays blank or reports an error, use the source link. An embedded frame loading does not confirm playback.'));});
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const project=projects[button.dataset.project];const content=el('div');const tabs=el('div','media-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Project media type');
  const mount=el('div');mount.id='media-mount';
  Object.keys(project).filter(key=>key!=='title').forEach((key,index)=>{const tab=el('button','',key==='tour'?'Virtual tour':'Film');tab.setAttribute('aria-pressed',String(index===0));tab.addEventListener('click',()=>{tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===tab)));showMedia(project,key);});tabs.append(tab);});
  content.append(tabs,mount);openViewer(project.title,content);showMedia(project,project.video?'video':'tour');
}));

function renderAssets(){
  const selected=assets.filter(asset=>filter==='All'||asset.group===filter);$('#asset-grid').replaceChildren();
  selected.forEach(asset=>{const button=el('button');const img=el('img');img.src=asset.file;img.alt=asset.name;img.loading='lazy';button.append(img,el('span','',asset.name));button.addEventListener('click',()=>{const content=el('div');const full=img.cloneNode();const a=el('a','','Open original file ↗');a.href=asset.file;a.target='_blank';a.rel='noopener';content.append(full,a,el('p','',`${asset.group}. Original asset from the existing local website. File name preserved; final publication rights and selection need approval.`));openViewer(asset.name,content);});$('#asset-grid').append(button);});
  $('#asset-count').textContent=`${selected.length} of ${assets.length} work previews`;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderAssets();}));
fetch('assets.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{assets=data;renderAssets();}).catch(()=>{$('#asset-count').textContent='Work previews could not load. Refresh the page or restart the local preview.';});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(node=>observer.observe(node));
function setMotion(paused){document.body.classList.toggle('motion-paused',paused);$('#motion').textContent=paused?'Enable motion':'Pause motion';$('#motion').setAttribute('aria-pressed',String(paused));$('.hero-image').style.translate='';}
setMotion(reduced.matches);reduced.addEventListener('change',event=>setMotion(event.matches));$('#motion').addEventListener('click',()=>setMotion(!document.body.classList.contains('motion-paused')));
$('.hero').addEventListener('pointermove',event=>{if(reduced.matches||document.body.classList.contains('motion-paused')||event.pointerType==='touch')return;const r=event.currentTarget.getBoundingClientRect();$('.hero-image').style.translate=`${(event.clientX/r.width-.5)*16}px ${(event.clientY-r.top)/r.height*12-6}px`;});
$('.hero').addEventListener('pointerleave',()=>{$('.hero-image').style.translate='';});

