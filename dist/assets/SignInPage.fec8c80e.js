import{u as B,B as F,I as k,F as w,a as c,b as x,M as I,v as N,h as j,c as p}from"./index.d626b7c6.js";import{by as g,bF as D,bx as m,bR as M,bQ as E,bE as e,bU as f}from"./vendor.78372706.js";import"./vant.cb96953f.js";const L="_logo_1ctqe_1",O="_icon_1ctqe_8",R="_appName_1ctqe_12",U="_space_1ctqe_18",r={logo:L,icon:O,appName:R,space:U,return:"_return_1ctqe_22"},T=u=>{const t=g(u);return{ref:t,toggle:()=>t.value!=t.value,on:()=>t.value=!0,off:()=>t.value=!1}},z=D({setup(u,t){const b=B(),o=m({email:"",code:""}),s=m({email:[],code:[]}),_=M(),y=E(),v=async a=>{var n;if(a.preventDefault(),Object.assign(s,{email:[],code:[]}),Object.assign(s,N(o,[{key:"email",type:"required",message:"\u5FC5\u586B"},{key:"email",type:"pattern",regex:/.+@.+/,message:"\u5FC5\u987B\u662F\u90AE\u7BB1\u683C\u5F0F"},{key:"code",type:"required",message:"\u5FC5\u586B"}])),!j(s)){const l=await p.post("/session",o,{_autoLoading:!0}).catch(i);localStorage.setItem("jwt",l.data.jwt);const V=(n=y.query.return_to)==null?void 0:n.toString();b.refreshMe(),_.push(V||"/")}},i=a=>{throw a.response.status===422&&Object.assign(s,a.response.data.errors),a},d=g(),{ref:h,on:q,off:C}=T(!1),S=async()=>{q(),await p.post("/validation_codes",{email:o.email},{_autoLoading:!0}).catch(i).finally(C),d.value.startCount()};return()=>e(I,null,{title:()=>"\u767B\u5F55",icon:()=>e(F,null,null),default:()=>e("div",{class:r.wrapper},[e("div",{class:r.logo},[e(k,{name:"mangosteen",class:r.icon},null),e("h1",{class:r.appName},[f("\u5C71\u7AF9\u8BB0\u8D26")])]),e(w,{onSubmit:v},{default:()=>{var a,n;return[e(c,{label:"\u90AE\u7BB1\u5730\u5740",type:"text",placeholder:"\u8BF7\u8F93\u5165\u90AE\u7BB1\uFF0C\u7136\u540E\u70B9\u51FB\u53D1\u9001\u9A8C\u8BC1\u7801",modelValue:o.email,"onUpdate:modelValue":l=>o.email=l,error:(a=s.email)==null?void 0:a[0]},null),e(c,{label:"\u9A8C\u8BC1\u7801",ref:d,type:"validationCode",countFrom:5,placeholder:"\u8BF7\u8F93\u5165\u516D\u4F4D\u6570\u5B57 ",onClick:S,disabled:h.value,modelValue:o.code,"onUpdate:modelValue":l=>o.code=l,error:(n=s.code)==null?void 0:n[0]},null),e(c,{class:r.space},{default:()=>[e(x,{type:"submit"},{default:()=>[f("\u767B\u5F55")]})]})]}})])})}});export{z as SignInPage,z as default};
