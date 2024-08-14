const FADE_UP = "fade-up";
const FADE_DOWN = "fade-down";
const FADE_LEFT = "fade-left";
const FADE_RIGHT = "fade-right";
const FADE = "fade";
const ANIM_WIDTH = "width";

const animateScrollElements = document.querySelectorAll(`[konimate-type]`);

/** create init style before run animation */
const createInitStyleScroll = (styleType, element) => {
  switch(styleType) {
    case FADE: {
      element.style.opacity = 0;
      break;
    }
    case FADE_UP: {
      element.style.transform = `translateY(200px)`;
      element.style.opacity = 0;
      break;
    }
    case FADE_DOWN: {
      element.style.transform = `translateY(-200px)`;
      element.style.opacity = 0;
      break;
    }
    case FADE_RIGHT: {
      element.style.transform = `translateX(-200px)`;
      element.style.opacity = 0;
      break;
    }
    case FADE_LEFT: {
      element.style.transform = `translateX(200px)`;
      element.style.opacity = 0;
      break;
    }
    case ANIM_WIDTH: {
      const elWidth = element.getBoundingClientRect().width;
      element.setAttribute("konimate-width", elWidth);
      element.style.width = "0";
      break;
    }
  }
}

/** create first load animation */
const animateScroll = (el) => {
  el.setAttribute("konimate-show", true);
  const styleType = el.getAttribute("konimate-type");
  const delay = el.getAttribute("konimate-delay");
  switch (styleType) {
    case FADE: {
      el.style.opacity = 1;
      el.style.transition = `all .4s ease-in`;
      if(delay){
        el.style.transitionDelay = delay;
      }
      break;
    }
    case FADE_UP: {
      el.style.transform = `translateY(0)`;
      el.style.opacity = 1;
      el.style.transition = `all .4s ease-in`;
      if(delay){
        el.style.transitionDelay = delay;
      }
      break;
    }
    case FADE_DOWN: {
      el.style.transform = `translateY(0)`;
      el.style.opacity = 1;
      el.style.transition = `all .4s ease-in`;
      if(delay){
        el.style.transitionDelay = delay;
      }
      break;
    }
    case FADE_RIGHT: {
      el.style.transform = `translateX(0)`;
      el.style.opacity = 1;
      el.style.transition = `all .4s ease-in`;
      if(delay){
        el.style.transitionDelay = delay;
      }
      break;
    }
    case FADE_LEFT: {
      el.style.transform = `translateX(0)`;
      el.style.opacity = 1;
      el.style.transition = `all .4s ease-in`;
      if(delay){
        el.style.transitionDelay = delay;
      }
      break;
    }
    case ANIM_WIDTH: {
      const elWidth = el.getAttribute("konimate-width");
      el.style.width = `${elWidth}px`;
      el.style.transition = `all .4s ease-in`;
      if(delay){
        el.style.transitionDelay = delay;
      }
      break;
    }
  }
}

var elRects = [];
var currentY = window.innerHeight;
for(let el of animateScrollElements){
  const rectY = el.getBoundingClientRect().y;
  const styleType = el.getAttribute("konimate-type");
  
  /** creating init style to all element */
  createInitStyleScroll(styleType, el);

  elRects = [...elRects, {
    position: rectY,
    element: el
  }]
}

const jumpToAnimate = () => {
  const hash = window.location.hash;
  if(!hash) {
    return false;
  }
  const hashRect = document.querySelector(hash);
  if(!hashRect){ return false }
  const hashY = hashRect.getBoundingClientRect().y;
  window.scrollTo({
    behavior: "smooth",
    top: hashY
  })
}

const clickToAnimate = () => {
  const buttons = document.querySelectorAll(`[konimate-scroll]`);
  buttons.forEach(v=>{
    v.addEventListener("click", e => {
      const target = document.querySelector(e.target.getAttribute("konimate-scroll"));
      if(target){
        window.scrollTo({
          behavior: "smooth",
          top: target.getBoundingClientRect().y
        })
      }
    })
  })
}

const clickToTopAnimate = () => {
  const buttons = document.querySelectorAll(`[konimate-scroll-top]`)
  buttons.forEach(v=> {
    v.addEventListener("click", e => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  })
}

window.onload = () => {
  /** initialize load animation */
  for(let rect of elRects) {
    if(rect.position < currentY){
      animateScroll(rect.element);
    }
  }
  /** load animation on scroll */
  window.addEventListener(`scroll`, e => {
    let currHeight = currentY + window.scrollY;
    elRects.filter(v => v.position <= currHeight).forEach(v=> {
      const rect = v.element;
      if(!rect.hasAttribute("konimate-show")){
        animateScroll(v.element);
      }
    });
  })

  /** handle jump to content animation */
  jumpToAnimate();
  clickToAnimate();
  clickToTopAnimate();
}


