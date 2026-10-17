(function(){
const x=a=>a.replace(/^\s*\{\{|\}\}\s*$/g,'');
const ev=(e,s)=>new Function('__s','with(__s){return('+e+')}')(s);
const it=(t,s)=>t.replace(/\{\{([\s\S]+?)\}\}/g,(_,e)=>{const v=ev(e,s);return v==null?'':v});
const exl=(l,s)=>[...l].flatMap(n=>ex(n,s));
function ex(n,s){
if(n.nodeType===3)return[document.createTextNode(it(n.nodeValue,s))];
if(n.nodeType!==1)return[];
const t=n.tagName.toLowerCase();
if(t==='sc-if')return ev(x(n.getAttribute('value')),s)?exl(n.childNodes,s):[];
if(t==='sc-for'){const as=n.getAttribute('as');return (ev(x(n.getAttribute('list')),s)||[]).flatMap(v=>exl(n.childNodes,Object.assign({},s,{[as]:v})))}
const el=n.cloneNode(false);
for(const a of [...n.attributes]){
if(a.name.startsWith('hint-')){el.removeAttribute(a.name);continue}
if(a.name==='onclick'){el.removeAttribute('onclick');el.onclick=ev(x(a.value),s);continue}
if(a.value.includes('{{'))el.setAttribute(a.name,it(a.value,s))}
el.append(...exl(n.childNodes,s));return[el]}
window.DCLogic=class{constructor(p){this.props=p||{};this.state={}}setState(o){Object.assign(this.state,o);window.__render()}};
window.boot=C=>{const c=new C({}),t=document.getElementById('tpl').content,a=document.getElementById('app');window.__render=()=>a.replaceChildren(...exl(t.childNodes,c.renderVals()));window.__render()};
})();
