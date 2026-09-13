/* Native print is also the PDF exporter. The rendered page is the single source. */
let printState;
window.prepareAssignmentPrint=function(id){
  if(printState)return;
  const target=id?document.getElementById(id):null;
  if(id&&!target)throw new Error('Unknown print section: '+id);
  printState={title:document.title,details:[...document.querySelectorAll('details')].map(e=>[e,e.open])};
  document.documentElement.classList.add('printing');
  if(target){target.classList.add('print-target');document.documentElement.classList.add('print-selected');document.title='MPBrand Direction - Jerio - '+id;}
  document.querySelectorAll('.service-row').forEach(e=>e.open=true);
};
window.finishAssignmentPrint=function(){
  if(!printState)return;
  document.title=printState.title;printState.details.forEach(([e,open])=>e.open=open);
  document.documentElement.classList.remove('printing','print-selected');document.querySelectorAll('.print-target').forEach(e=>e.classList.remove('print-target'));printState=null;
};
window.printAssignment=function(id){window.prepareAssignmentPrint(id);window.print();};
window.addEventListener('beforeprint',()=>window.prepareAssignmentPrint());
window.addEventListener('afterprint',window.finishAssignmentPrint);
document.querySelectorAll('main>.section-pad[id],main>.motion-stage[id]').forEach(section=>{
  const button=document.createElement('button');button.type='button';button.className='print-control section-print';button.textContent='Save section as PDF ↗';button.addEventListener('click',()=>window.printAssignment(section.id));section.append(button);
});
