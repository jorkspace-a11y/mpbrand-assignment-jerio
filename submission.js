// ponytail: recompose the existing source-backed frames; exports use this same DOM.
(()=>{
 const layouts=['cinema','immersive','negative','architecture','founder','route','evidence','process','space','case','arrival','compare','edit','type','closing'];
 const notes=['Property / Setting','FPV / The approach','A closer look','Virtual tour / Navigation','Christobal Grego / Interview prompt','Aerial / Location','Captured image / Label the source','Route planning / Before the shoot','Hospitality / Interior','Case study / Brief, decision, image','Access / The way in','Virtual tour / Explore','Editing / What stays out','How To / The edit','Project / Closing frame'];
 const photos=['photos/aerial-site-building.jpg','photos/aerial-bay-lagoon.jpg','photos/aerial-parkland-coast.jpg','work/kohsamui-fpv.jpg','photos/hero-band.jpg','photos/aerial-parkland-coast.jpg','photos/aerial-site-overview.jpg','photos/aerial-parkland-coast.jpg','work/kohsamui-fpv.jpg','photos/aerial-site-overview.jpg','photos/aerial-parkland-coast.jpg','work/invest-vt.jpg','photos/hero-band.jpg','work/minimap-fpv.jpg','work/sardine-fpv.jpg'];
 const specific={'direction-place':0,'direction-optical':2,'direction-founder':4,'carousel-1':0,'carousel-2':3,'carousel-3':8,'reel':1,'story':8,'project':9,'innovation':6,'innovation-use':7,'facebook':1,'linkedin':3};
 const formatIndex={'feed-1':0,'feed-2':9,'feed-3':8,'carousel-1':0,'carousel-2':3,'carousel-3':8,'reel-1':1,'reel-2':5,'reel-3':8,'story-1':8,'story-2':1,'story-3':11};
 document.querySelectorAll('.social-art,.art[data-export]').forEach(frame=>{
   const key=frame.dataset.design||'',format=(frame.dataset.export||'').replace(/^(editorial|signal|studio)-/,'');
   let index=key.startsWith('grid-')?Number(key.slice(5))-1:specific[key];
   if(index===undefined)index=formatIndex[format];
   if(index===undefined)index=frame.classList.contains('yellow')?4:frame.classList.contains('orange')?7:frame.classList.contains('optical')?2:frame.classList.contains('paper')?3:1;
   frame.classList.add('campaign-frame','layout-'+layouts[index]);
   frame.querySelectorAll('.symbol,.caption,.answers,.counter,.story-link').forEach(e=>e.remove());
   let photo=frame.querySelector('.photo');if(!photo){photo=document.createElement('img');photo.className='photo';photo.src='assets/'+photos[index];photo.alt='Meta Pacific project image';photo.loading='lazy';frame.prepend(photo);}
   const logo=frame.querySelector('.brand,.logo'),route=frame.closest('.route')?.id||'editorial';
   const light=['cinema','architecture','process','compare','closing'].includes(layouts[index]);
   if(logo)logo.src='logos/'+route+'-'+(light?'ink':'paper')+'.svg';
   const note=document.createElement('span');note.className='frame-note';note.textContent=notes[index];frame.append(note);
 });
})();
