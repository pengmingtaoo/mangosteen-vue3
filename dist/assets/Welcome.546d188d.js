import{by as i,bA as h,bt as E,bp as w,bF as x,bU as W,bV as S,bG as o,bE as c,bS as C,bW as y,bJ as L,bD as M}from"./vendor.0754813b.js";import{I as z}from"./index.f4b0f905.js";import"./vant.4f25bc8f.js";const V=(a,e)=>{const t=i(),u=i(),s=i(!1),d=h(()=>!t.value||!u.value?null:{x:u.value.x-t.value.x,y:u.value.y-t.value.y}),n=h(()=>{if(!d.value)return"";const{x:r,y:l}=d.value;return Math.abs(r)>Math.abs(l)?r>0?"right":"left":l>0?"down":"up"}),m=r=>{var l,f;(l=e==null?void 0:e.beforeStart)==null||l.call(e,r),s.value=!0,u.value=t.value={x:r.touches[0].screenX,y:r.touches[0].screenY},(f=e==null?void 0:e.afterStart)==null||f.call(e,r)},_=r=>{var l,f;(l=e==null?void 0:e.beforeMove)==null||l.call(e,r),t.value&&(u.value={x:r.touches[0].screenX,y:r.touches[0].screenY},(f=e==null?void 0:e.afterMove)==null||f.call(e,r))},b=r=>{var l,f;(l=e==null?void 0:e.beforeEnd)==null||l.call(e,r),s.value=!1,(f=e==null?void 0:e.afterEnd)==null||f.call(e,r)};return E(()=>{!a.value||(a.value.addEventListener("touchstart",m),a.value.addEventListener("touchmove",_),a.value.addEventListener("touchend",b))}),w(()=>{!a.value||(a.value.removeEventListener("touchstart",m),a.value.removeEventListener("touchmove",_),a.value.removeEventListener("touchend",b))}),{swiping:s,direction:n,distance:d}},g=(a,e)=>{let t;return(...u)=>{t||(a(...u),t=setTimeout(()=>{t=void 0},e))}},F="_wrapper_6za3y_1",R="_slide_fade_enter_active_6za3y_32",T="_slide_fade_leave_active_6za3y_33",j="_slide_fade_enter_from_6za3y_42",A="_slide_fade_leave_to_6za3y_46",v={wrapper:F,slide_fade_enter_active:R,slide_fade_leave_active:T,slide_fade_enter_from:j,slide_fade_leave_to:A};function B(a){return typeof a=="function"||Object.prototype.toString.call(a)==="[object Object]"&&!M(a)}const O=x({setup:(a,e)=>{const t=i(),{direction:u,swiping:s}=V(t,{beforeStart:_=>_.preventDefault()}),d=W(),n=S(),m=g(()=>{d.name==="Welcome1"?n.push("/Welcome/2"):d.name==="Welcome2"?n.push("/Welcome/3"):d.name==="Welcome3"?n.push("/Welcome/4"):d.name==="Welcome4"&&n.push("/start")},500);return o(()=>{s.value&&u.value==="left"&&m()}),()=>c("div",{class:v.wrapper},[c("header",null,[c(z,{name:"fast",class:v.icon},null),c("h1",null,[C("\u5FEB\u901F\u8BB0\u8D26")])]),c("main",{class:v.main,ref:t},[c(y,{name:"main"},{default:({Component:_,route:b})=>c(L,{enterFromClass:v.slide_fade_enter_from,enterActiveClass:v.slide_fade_enter_active,leaveToClass:v.slide_fade_leave_to,leaveActiveClass:v.slide_fade_leave_active},B(_)?_:{default:()=>[_]})})]),c("footer",null,[c(y,{name:"footer"},null)])])}});export{O as Welcome,O as default};
