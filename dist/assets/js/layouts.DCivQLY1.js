function e(){dataLayer.push(arguments)}document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll('img[loading="lazy"]'),t=new IntersectionObserver(((e,t)=>{e.forEach((e=>{if(e.isIntersecting){const n=e.target;n.src=n.dataset.src,n.classList.add("loaded"),t.unobserve(n)}}))}));e.forEach((e=>{t.observe(e)}))})),window.dataLayer=window.dataLayer||[],e("js",new Date),e("config","G-J0LHEBVP2S");