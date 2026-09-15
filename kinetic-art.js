// ponytail: one original SVG composition, animated by the browser rather than a video runtime.
(()=>{
 const hosts=[...document.querySelectorAll('.hero-window,.assignment-hero .hero-art,.landing-motion-preview')];
 if(!hosts.length)return;
 const closed='M 200 300 C 330 230 420 210 510 266 C 548 290 568 290 604 266 C 700 210 825 245 960 300 C 825 380 708 425 610 355 C 572 330 548 325 510 350 C 410 417 305 374 200 300 Z';
 const open='M 200 300 C 325 142 405 118 508 195 C 548 226 568 225 605 192 C 715 113 825 162 960 300 C 825 465 710 505 612 419 C 577 389 545 386 508 417 C 408 497 302 445 200 300 Z';
 const skew='M 200 300 C 345 140 440 182 510 235 C 548 263 575 255 612 218 C 716 116 831 218 960 300 C 808 401 702 462 610 374 C 570 337 544 343 505 382 C 402 490 290 385 200 300 Z';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),print=matchMedia('print');
 hosts.forEach((host,index)=>{
  const poster=document.createElement('div');poster.className='motion-poster';poster.setAttribute('aria-hidden','true');
  const id='kinetic-aperture-'+index;
  const contours=Array.from({length:18},(_,i)=>{const s=.37+i*.047;return `<path class="mouth-contour" d="${closed}" transform="translate(580 300) scale(${s}) translate(-580 -300)" stroke-width="${5/s}"><animate attributeName="d" values="${closed};${open};${skew};${closed}" dur="8s" begin="-${i*.055}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.36;.7;1" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1"/></path>`;}).join('');
  poster.innerHTML=`<div class="poster-type poster-type-top">LOOK</div><div class="poster-type poster-type-bottom">AGAIN.</div><div class="poster-color-cut"></div><img class="poster-film-cut" src="assets/photos/aerial-parkland-coast.jpg" alt=""><svg class="contour-stage" viewBox="0 0 1160 600" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${id}"><path d="${closed}" transform="translate(580 300) scale(.35) translate(-580 -300)"><animate attributeName="d" values="${closed};${open};${skew};${closed}" dur="8s" repeatCount="indefinite"/></path></clipPath></defs><g class="contour-turn"><image href="assets/photos/aerial-bay-lagoon.jpg" x="370" y="165" width="420" height="285" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/><g fill="none" stroke="currentColor">${contours}</g></g></svg><div class="poster-credit">Film. Form. Perspective.</div>`;
  host.append(poster);host.classList.add('has-motion-art');
  const svg=poster.querySelector('svg');let visible=true;
  function sync(){const paused=reduced.matches||print.matches||document.hidden||!visible||document.body.classList.contains('motion-paused');poster.classList.toggle('art-paused',paused);if(paused)svg.pauseAnimations();else svg.unpauseAnimations();if(reduced.matches||print.matches)svg.setCurrentTime(1.6);}
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(poster);
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
  reduced.addEventListener('change',sync);print.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
 });
})();
