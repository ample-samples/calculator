(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();new Audio("./assets/lostinmusic.mp3");const y=document.querySelector("#display");if(!y)throw new Error("Oopsie");let t={display:null,operation:null,memory:null,lastInput:null,theme:"light"};const s=()=>{t.display?y.innerText=t.display:y.innerText="0"},K=()=>{console.log("clearing"),t.display=null,t.memory=null,t.operation=null,s()},c=n=>{if(/[0-9]|\./.test(n)){const o=t.display;o?t={...t,display:o+n}:t={...t,display:n},t.lastInput=Number(t.display)}else n==="π"&&(t={...t,display:Math.PI.toString()});s()},j=()=>{console.log("backspace"),t.display===null||t.display.length===1?t.display=null:t={...t,display:t.display.substring(0,t.display.length-1)},s()},a=n=>{let{operation:o,display:i,memory:u,lastInput:e}=t;o=n,u=Number(t.display??t.memory),e=Number(t.display??t.lastInput),i=null,t={...t,operation:o,display:i,memory:u,lastInput:e}},z=()=>{if(!t.memory)return null;const n=t.memory;let o;if(t.display!==null)o=Number(t.display);else if(t.lastInput!==null)o=t.lastInput;else return;switch(t.operation){case"divide":t={...t,display:(n/o).toString()};break;case"multiply":t={...t,display:(n*o).toString()};break;case"subtract":t={...t,display:(n-o).toString()};break;case"add":t={...t,display:(n+o).toString()};break;case"power":t={...t,display:(n**o).toString()};break;default:throw new Error("Operation not supported")}t.memory=Number(t.display),s(),t.display=null},l=document.querySelector(".calculator");if(!l)throw new Error("Calculator not found");const d=document.querySelector("audio");if(!d)throw new Error("Audio not found");const b=document.querySelector("#disco-ball");if(!b)throw new Error("Groove not found");const _=n=>{switch(n){case"dark":t={...t,theme:"dark"},l.classList.remove("theme-disco"),l.classList.remove("theme-light"),l.classList.add("theme-dark"),b.style.display="none",d.pause();break;case"disco":t={...t,theme:"disco"},l.classList.add("theme-disco"),l.classList.remove("theme-light"),l.classList.remove("theme-dark"),b.style.display="block",d.play();break;case"light":t={...t,theme:"light"},l.classList.remove("theme-disco"),l.classList.add("theme-light"),l.classList.remove("theme-dark"),b.style.display="none",d.pause();break}},f=document.querySelector(".calculator__button--button-1"),h=document.querySelector(".calculator__button--button-2"),v=document.querySelector(".calculator__button--button-3"),k=document.querySelector(".calculator__button--button-4"),L=document.querySelector(".calculator__button--button-5"),S=document.querySelector(".calculator__button--button-6"),E=document.querySelector(".calculator__button--button-7"),g=document.querySelector(".calculator__button--button-8"),q=document.querySelector(".calculator__button--button-9"),w=document.querySelector(".calculator__button--button-0"),O=document.querySelector(".calculator__button--button-period"),N=document.querySelector(".calculator__button--button-add"),I=document.querySelector(".calculator__button--button-subtract"),P=document.querySelector(".calculator__button--button-multiply"),A=document.querySelector(".calculator__button--button-divide"),T=document.querySelector(".calculator__button--button-power"),x=document.querySelector(".calculator__button--button-clear"),C=document.querySelector(".calculator__button--button-backspace"),D=document.querySelector(".calculator__button--button-evaluate"),M=document.querySelector(".calculator__button--button-pi"),B=document.querySelector(".calculator__button--button-theme1"),F=document.querySelector(".calculator__button--button-theme2"),G=document.querySelector(".calculator__button--button-theme3"),p=document.querySelector(".debug");if(!f||!h||!v||!k||!L||!S||!E||!g||!q||!w||!M)throw new Error("Oopsie, a number button wasn't found");if(!O||!N||!I||!P||!A||!T||!x||!C||!D||!B||!F||!G)throw new Error("Oopsie, an operator button wasn't found");f.addEventListener("click",()=>c("1"));h.addEventListener("click",()=>{c("2")});v.addEventListener("click",()=>{c("3")});k.addEventListener("click",()=>{c("4")});L.addEventListener("click",()=>{c("5")});S.addEventListener("click",()=>{c("6")});E.addEventListener("click",()=>{c("7")});g.addEventListener("click",()=>{c("8")});q.addEventListener("click",()=>{c("9")});w.addEventListener("click",()=>{c("0")});O.addEventListener("click",()=>{c(".")});M.addEventListener("click",()=>{c("π")});N.addEventListener("click",()=>{a("add")});I.addEventListener("click",()=>{a("subtract")});P.addEventListener("click",()=>{a("multiply")});A.addEventListener("click",()=>{a("divide")});T.addEventListener("click",()=>{a("power")});B.addEventListener("click",()=>{_("light")});F.addEventListener("click",()=>{_("dark")});G.addEventListener("click",()=>{_("disco")});x.addEventListener("click",K);C.addEventListener("click",j);D.addEventListener("click",z);p==null||p.addEventListener("click",()=>{console.log(t)});s();
