const routeData = [
  {id:'editorial', title:'01 / Editorial', idea:'Bold meets light. One connected name.', why:'The contrast makes both parts of the name readable without adding a separate symbol. It feels like a studio signature and leaves room for expressive photography and large headlines.', use:'Choose this for a flexible main identity across the website, proposals and social content.', motion:'Keep the logo still. Let the image move behind it.'},
  {id:'signal', title:'02 / Signal', idea:'Rounded. Upright. Contained.', why:'A contained meta and rounded upright lettering replace the heavy underline. The contrast creates a readable signature over footage; the small red stop adds a point of focus without an italic slant.', use:'Choose this for a stronger campaign signature, particularly on film titles and high-contrast social posts.', motion:'Reveal the contained word once, then hold the complete name.'},
  {id:'studio', title:'03 / Studio', idea:'A compact MP mark with a quiet name lockup.', why:'This replaces the wide stacked block. The initials give the identity a compact anchor; the divider and lighter full name keep the complete lockup clear without stretching the letters.', use:'Choose this when small signatures, corner placements and production credits matter most.', motion:'Reveal the initials, then the divider and full name.'}
];
const formats = [
  ['feed-1','Feed 01','See the whole\npicture.','photos/aerial-bay-lagoon.jpg','Film, photography and virtual experiences.'],
  ['feed-2','Feed 02','A place.\nNot just a pin.','photos/aerial-site-building.jpg','Show the surroundings before the selling points.'],
  ['feed-3','Feed 03','Room to\nlook around.','work/kohsamui-fpv.jpg','A closer look at the spaces that connect.'],
  ['carousel-1','Carousel 01','BEYOND\nTHE PIN.','photos/aerial-site-building.jpg','Three ways to give a place more context.'],
  ['carousel-2','Carousel 02','Show the\napproach.','photos/aerial-parkland-coast.jpg','Start with the surroundings. Give people their bearings.'],
  ['carousel-3','Carousel 03','LET THEM\nLOOK AROUND.','work/kohsamui-fpv.jpg','Give people a way to explore the space themselves.'],
  ['reel-1','Reel 01','START WIDE.\nGET CLOSER.','photos/aerial-site-overview.jpg','A route should reveal something.'],
  ['reel-2','Reel 02','FOLLOW\nTHE ROUTE.','photos/aerial-parkland-coast.jpg','The approach is part of the story.'],
  ['reel-3','Reel 03','STAY FOR\nTHE DETAILS.','work/kohsamui-fpv.jpg','Look at the light. Then look at the space.'],
  ['story-1','Story 01','WHAT WOULD YOU\nLOOK AT FIRST?','work/kohsamui-fpv.jpg','A closer look starts with a question.'],
  ['story-2','Story 02','BEFORE\nTHE VISIT.','photos/aerial-site-overview.jpg','Explore the setting before you arrive.'],
  ['story-3','Story 03','YOUR NEXT\nSTEP IS INSIDE.','work/kohsamui-fpv.jpg','Move through the space at your own pace.']
];
function make(tag, cls, text) { const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n; }
function art(route, format) {
  const [id,label,title,photo,copy]=format, type=id.split('-')[0], portrait=['reel','story'].includes(type);
  const box=make('div',`art ${type} ${id}${portrait?' portrait':''}`);box.dataset.export=`${route.id}-${id}`;box.setAttribute('aria-label',`${route.title} ${label}`);
  const image=make('img','photo');image.src='assets/'+photo;image.alt='Meta Pacific project photography';
  const logo=make('img','logo');logo.src=`logos/${route.id}-${portrait?'paper':'ink'}.svg`;logo.alt=`Meta Pacific ${route.id} logo`;
  box.append(image,logo,make('span','headline',title),make('span','copy',copy));
  if(type==='carousel')box.append(make('span','counter',id.slice(-1)+' / 3'));
  if(type==='reel')box.append(make('span','caption',['THE PLACE. THE ROUTE. THE DETAILS.','FROM THE SETTING TO THE SPACE.','LIGHT. TEXTURE. PERSPECTIVE.'][Number(id.slice(-1))-1]));
  if(type==='story'){
    if(id==='story-1'){const a=make('div','answers');['The setting.','The space.','The details.'].forEach(t=>a.append(make('span','',t)));box.append(a);}
    else box.append(make('div','story-link',id==='story-2'?'See the project ':'Open the tour '));
  }
  return box;
}
for(const route of routeData){
  const section=make('section','route '+route.id);section.id=route.id;
  const overview=make('div','route-overview');const head=make('div','route-title');const left=make('div');left.append(make('h2','',route.title),make('p','',route.idea));
  const right=make('div');right.append(make('p','',route.use));head.append(left,right);
  const board=make('div','logo-board');board.dataset.logo=route.id;const logo=make('img');logo.src=`logos/${route.id}-ink.svg`;logo.alt=`Meta Pacific ${route.id} wordmark`;board.append(logo);
  const why=make('div','route-why');const reasoning=make('div');reasoning.append(make('h3','','Why this direction'),make('p','',route.why));const motion=make('div');motion.append(make('h3','','Motion principle'),make('p','',route.motion));why.append(reasoning,motion);
  const links=make('div','logo-downloads');for(const variant of ['ink','paper']){const a=make('a','',`Outlined SVG / ${variant}`);a.href=`logos/${route.id}-${variant}.svg`;a.download='';links.append(a);}
  const print=make('button','print-control','Save this direction as PDF ');print.type='button';print.addEventListener('click',()=>window.printAssignment(route.id));links.append(print);
  overview.append(head,board,why,links);section.append(overview);
  for(const [type,label] of [['feed','Feed posts'],['carousel','Carousel slides'],['reel','Reel frames'],['story','Story frames']]){
    const group=make('section','application-group');group.id=route.id+'-'+type;
    const heading=make('div','group-heading');heading.append(make('h3','',route.title+' / '+label));
    const print=make('button','print-control','Save PDF ');print.type='button';print.addEventListener('click',()=>window.printAssignment(group.id));heading.append(print);group.append(heading);
    const grid=make('div','application-grid');
    formats.filter(f=>f[0].startsWith(type+'-')).forEach(format=>{const wrap=make('div','application-item');wrap.append(art(route,format));const a=make('a','download','Download PNG ');a.href=`artwork/assignment/${route.id}-${format[0]}.png`;a.download='';wrap.append(a);grid.append(wrap);});
    group.append(grid);section.append(group);
  }
  document.querySelector('#routes').append(section);
}
