const FADE_UP = "fade-up";
const FADE_DOWN = "fade-down";
const FADE_LEFT = "fade-left";
const FADE_RIGHT = "fade-right";
const FADE = "fade";
const ANIM_WIDTH = "width";
const ANIM_TYPING ="typing";

const animateScrollElements = document.querySelectorAll(`[konimate-type]`);

/** create init style before run animation */
const createInitStyle = (styleType, element) => {
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
    case ANIM_TYPING: {
      element.style.display = "none";
    }
  }
}

/** create first load animation */
const animate = (el) => {
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
    case ANIM_TYPING: {
      const text = el.innerText;
      el.innerText = "";
      el.style.display = "block";
      let initDelay = 300
      let delay = 50;
      for(let i = 0; i < text.length; i++){
        initDelay += delay
        window.setTimeout(()=>{
          el.innerHTML += text[i];
        }, initDelay)
        initDelay += delay;
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
  createInitStyle(styleType, el);

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

/** handle animation on scroll */
const konimateScrollHandler = () => {
  for(let rect of elRects) {
    if(rect.position < currentY){
      const isScroll = !rect.element.hasAttribute("konimate-for");
      if(isScroll) {
        animate(rect.element);
      }
    }
  }

  /** load animation on scroll */
  window.addEventListener(`scroll`, e => {
    let currHeight = currentY + window.scrollY;
    elRects.filter(v => v.position <= currHeight).forEach(v=> {
      const rect = v.element;
      if(!rect.hasAttribute("konimate-show")){
        const isScroll = !rect.hasAttribute("konimate-for");
        if(isScroll) {
          animate(rect);
        }
      }
    });
  })
}

/** handle animation on click trigger */
const konimateButtonHandler = () => {
  const buttons = document.querySelectorAll(`[konimate-button]`);
  buttons.forEach(v=>{
    const type = v.getAttribute(`konimate-button`);
    const id = v.getAttribute("id");
    const target = document.querySelectorAll(`[konimate-for="#${id}"]`);
    v.addEventListener("click", e => {
      e.preventDefault();
      target.forEach(v=> {
        const vStyleType = v.getAttribute("konimate-type");
        if(type == "show") {
          animate(v);
        }
        else if(type == "hide"){
          createInitStyle(vStyleType, v);
        }
      })     
    })
  })
}

window.onload = () => {
  /** initialize load scroll animation */
  konimateScrollHandler();

  /** load animation onclick */
  konimateButtonHandler();

  /** handle jump to content animation */
  jumpToAnimate();
  clickToAnimate();
  clickToTopAnimate();
}


