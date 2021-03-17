(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-143d46c2"],{1681:function(t,e,i){},"16b7":function(t,e,i){"use strict";i("a9e3");var n=i("2b0e");e["a"]=n["a"].extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:function(){return{openTimeout:void 0,closeTimeout:void 0}},methods:{clearDelay:function(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay:function(t,e){var i=this;this.clearDelay();var n=parseInt(this["".concat(t,"Delay")],10);this["".concat(t,"Timeout")]=setTimeout(e||function(){i.isActive={open:!0,close:!1}[t]},n)}}})},"21be":function(t,e,i){"use strict";i("99af"),i("caad"),i("2532");var n=i("2909"),a=i("2b0e"),s=i("80d2");e["a"]=a["a"].extend().extend({name:"stackable",data:function(){return{stackElement:null,stackExclude:null,stackMinZIndex:0,isActive:!1}},computed:{activeZIndex:function(){if("undefined"===typeof window)return 0;var t=this.stackElement||this.$refs.content,e=this.isActive?this.getMaxZIndex(this.stackExclude||[t])+2:Object(s["v"])(t);return null==e?e:parseInt(e)}},methods:{getMaxZIndex:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=this.$el,i=[this.stackMinZIndex,Object(s["v"])(e)],a=[].concat(Object(n["a"])(document.getElementsByClassName("v-menu__content--active")),Object(n["a"])(document.getElementsByClassName("v-dialog__content--active"))),r=0;r<a.length;r++)t.includes(a[r])||i.push(Object(s["v"])(a[r]));return Math.max.apply(Math,i)}}})},"4ad4":function(t,e,i){"use strict";i("caad"),i("45fc"),i("b0c0"),i("b64b");var n=i("53ca"),a=i("16b7"),s=i("f2e7"),r=i("58df"),o=i("80d2"),c=i("d9bd"),u=Object(r["a"])(a["a"],s["a"]);e["a"]=u.extend({name:"activatable",props:{activator:{default:null,validator:function(t){return["string","object"].includes(Object(n["a"])(t))}},disabled:Boolean,internalActivator:Boolean,openOnHover:Boolean,openOnFocus:Boolean},data:function(){return{activatorElement:null,activatorNode:[],events:["click","mouseenter","mouseleave","focus"],listeners:{}}},watch:{activator:"resetActivator",openOnFocus:"resetActivator",openOnHover:"resetActivator"},mounted:function(){var t=Object(o["u"])(this,"activator",!0);t&&["v-slot","normal"].includes(t)&&Object(c["b"])('The activator slot must be bound, try \'<template v-slot:activator="{ on }"><v-btn v-on="on">\'',this),this.addActivatorEvents()},beforeDestroy:function(){this.removeActivatorEvents()},methods:{addActivatorEvents:function(){if(this.activator&&!this.disabled&&this.getActivator()){this.listeners=this.genActivatorListeners();for(var t=Object.keys(this.listeners),e=0,i=t;e<i.length;e++){var n=i[e];this.getActivator().addEventListener(n,this.listeners[n])}}},genActivator:function(){var t=Object(o["t"])(this,"activator",Object.assign(this.getValueProxy(),{on:this.genActivatorListeners(),attrs:this.genActivatorAttributes()}))||[];return this.activatorNode=t,t},genActivatorAttributes:function(){return{role:"button","aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genActivatorListeners:function(){var t=this;if(this.disabled)return{};var e={};return this.openOnHover?(e.mouseenter=function(e){t.getActivator(e),t.runDelay("open")},e.mouseleave=function(e){t.getActivator(e),t.runDelay("close")}):e.click=function(e){var i=t.getActivator(e);i&&i.focus(),e.stopPropagation(),t.isActive=!t.isActive},this.openOnFocus&&(e.focus=function(e){t.getActivator(e),e.stopPropagation(),t.isActive=!t.isActive}),e},getActivator:function(t){if(this.activatorElement)return this.activatorElement;var e=null;if(this.activator){var i=this.internalActivator?this.$el:document;e="string"===typeof this.activator?i.querySelector(this.activator):this.activator.$el?this.activator.$el:this.activator}else if(1===this.activatorNode.length||this.activatorNode.length&&!t){var n=this.activatorNode[0].componentInstance;e=n&&n.$options.mixins&&n.$options.mixins.some((function(t){return t.options&&["activatable","menuable"].includes(t.options.name)}))?n.getActivator():this.activatorNode[0].elm}else t&&(e=t.currentTarget||t.target);return this.activatorElement=e,this.activatorElement},getContentSlot:function(){return Object(o["t"])(this,"default",this.getValueProxy(),!0)},getValueProxy:function(){var t=this;return{get value(){return t.isActive},set value(e){t.isActive=e}}},removeActivatorEvents:function(){if(this.activator&&this.activatorElement){for(var t=Object.keys(this.listeners),e=0,i=t;e<i.length;e++){var n=i[e];this.activatorElement.removeEventListener(n,this.listeners[n])}this.listeners={}}},resetActivator:function(){this.removeActivatorEvents(),this.activatorElement=null,this.getActivator(),this.addActivatorEvents()}}})},"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var n=i("5530"),a=i("58df"),s=i("7e2b"),r=i("3206");e["a"]=Object(a["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=i(t)))})):n.valid=i(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},5311:function(t,e,i){"use strict";var n=i("5607"),a=i("2b0e");e["a"]=a["a"].extend({name:"rippleable",directives:{ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"6c0e":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{"no-gutters":""}},[i("v-row",{attrs:{"no-gutters":""}},[i("v-col"),i("v-col",{staticClass:"text-center",attrs:{cols:"8",sm:"11",md:"11",lg:"10",xl:"8"}},[t.loading?i("v-card",{staticStyle:{height:"calc(100vh - 240px)","overflow-y":"auto"},attrs:{width:"100%"}},[i("v-card-title",{staticClass:"justify-center"},[i("div",{staticClass:"text-h3"},[t._v(" You are "),i("span",{staticClass:"purple--text lighten-2"},[t._v(" "+t._s(t.quePosition)+" ")]),t._v(" out of "),i("span",{staticClass:"purple--text lighten-2"},[t._v(" "+t._s(t.queLength)+" ")]),t._v(" in queue ")])]),i("div",{staticClass:"text-h4"},[t._v(" Average Wait Time "),i("span",{staticClass:"purple--text lighten-text-1"},[t._v(t._s(t._f("mmss")(t.averageTime)))])]),t.times.length>3?i("v-card-text",{staticStyle:{height:"calc(100vh - 430px)","overflow-y":"auto"}},[i("v-sparkline",{key:String(t.averageTime),attrs:{value:t.times,gradient:["#ea1f1f","#ffd200","#1fea5c"],"stroke-linecap":"round",color:"grey",padding:"10",smooth:"","auto-draw":"","auto-draw-duration":3e3,height:"70%"}}),i("div",{staticClass:"text-subtitle-1 font-weight-bold",attrs:{"fill-width":""}},[i("span",{staticClass:"float-left"},[t._v(" Start of Lab ")]),i("span",{staticClass:"float-right"},[t._v(" Now ")])]),i("div",{staticClass:"text-h4 my-2"},[t._v("Lab Wait Times")])],1):t._e(),i("v-card-actions",{staticClass:"justify-center"},[i("v-btn",{staticClass:"mb-2 deep-orange lighten-2",attrs:{dark:""},on:{click:t.cancelHelp}},[i("v-icon",{staticClass:"mr-1"},[t._v("mdi-cancel")]),t._v("Cancel ")],1)],1)],1):i("v-card",{staticStyle:{height:"calc(100vh - 250px)","overflow-y":"auto"}},[i("v-form",{ref:"helpForm"},[i("v-card-title",[t._v("Please fill out the form:")]),i("v-divider"),i("v-card-text",[i("v-select",{attrs:{dense:"",items:t.labOptions,label:"I need:",outlined:""},model:{value:t.helpObj.queType,callback:function(e){t.$set(t.helpObj,"queType",e)},expression:"helpObj.queType"}}),i("v-text-field",{attrs:{dense:"",rules:[t.rules.required,t.rules.notempty],label:"Please enter Lab/Coursework Title:"},model:{value:t.helpObj.title,callback:function(e){t.$set(t.helpObj,"title",e)},expression:"helpObj.title"}}),i("v-text-field",{attrs:{dense:"",rules:[t.rules.url],label:"Link to your code:"},model:{value:t.gitLink,callback:function(e){t.gitLink=e},expression:"gitLink"}}),this.profOnlyQue?i("v-checkbox",{attrs:{dense:"",label:"I need to speak to the Professor",hint:"Warning: Wait times may be longer","persistent-hint":""},model:{value:t.helpObj.requireProf,callback:function(e){t.$set(t.helpObj,"requireProf",e)},expression:"helpObj.requireProf"}}):t._e(),"Help"==t.helpObj.queType?i("v-textarea",{attrs:{label:"Description:",rules:[t.rules.required],counter:"200",maxlength:"200",rows:"2"},model:{value:t.helpObj.desc,callback:function(e){t.$set(t.helpObj,"desc",e)},expression:"helpObj.desc"}}):t._e()],1),i("v-card-actions",{staticClass:"justify-center"},[i("v-btn",{staticClass:"mb-2 green white--text",attrs:{loading:t.loading,disabled:t.loading},on:{click:t.getHelp}},[t._v(" Start Request ")])],1)],1)],1)],1),i("v-col")],1)],1)},a=[],s=(i("c740"),i("96cf"),i("1da1")),r=i("5530"),o=i("bc3a"),c=i.n(o),u=i("2f62"),l={data:function(){return{labOptions:["Help","Marking"],helpObj:{queType:"Help",title:"",desc:"",requireProf:!1},gitLink:"",que:[],averageTime:0,loading:!1,rules:{required:function(t){return!!t||"Required Field"},notempty:function(t){return t.length>0||"Required Field"},url:function(t){return/^$|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(t)||"Incorrect Format"}}}},computed:Object(r["a"])(Object(r["a"])({},Object(u["b"])({lab_id:"socket/lab_id",labCode:"socket/labCode",username:"socket/username",privateChat:"socket/privateChat",gettingSupport:"socket/gettingSupport",queWaiting:"socket/queWaiting",profOnlyQue:"socket/profOnlyQue",micPerm:"application/micPerm"})),{},{queLength:function(){return this.que.length},quePosition:function(){var t=this,e=this.que.findIndex((function(e){return e.socketid===t.$socket.id}))+1,i=e%10,n=e%100;return 1==i&&11!=n?e+"st":2==i&&12!=n?e+"nd":3==i&&13!=n?e+"rd":e+"th"}}),watch:{"helpObj.queType":{handler:function(){this.helpObj.desc=""},deep:!0}},methods:{getHelp:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$refs.helpForm.validate()){e.next=7;break}return t.loading=!0,t.$store.dispatch("socket/gitLink",t.gitLink),i=Object(r["a"])(Object(r["a"])({},t.helpObj),{},{lab_id:t.lab_id,labCode:t.labCode,socketid:t.$socket.id}),e.next=6,t.$socket.emit("joinQue",i);case 6:t.$store.dispatch("socket/joinQue").then((function(){t.helpObj={queType:"Help",title:"",desc:"",requireProf:!1},t.gitLink=""}));case 7:case"end":return e.stop()}}),e)})))()},cancelHelp:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i={lab_id:t.lab_id,labCode:t.labCode,socketid:t.$socket.id},t.$store.dispatch("socket/gitLink",null),t.$store.dispatch("socket/leaveQue").then((function(){t.$socket.emit("leaveQue",i),t.loading=!1}));case 3:case"end":return e.stop()}}),e)})))()}},sockets:{updateQue:function(t){this.que=t.que,this.averageTime=t.averageTime,this.times=t.times},startHelp:function(t){var e=this;this.$store.dispatch("socket/privateChatInfo",t).then((function(){var t={sendTo:e.gettingSupport.reciever,reciever:e.$socket.id,privateChat:e.privateChat,peerid:e.$peer._id,student_mic:e.micPerm,gitLink:e.$store.getters["socket/gitLink"]};e.$socket.emit("startHelper",t)}))},gitLink:function(t){this.$store.dispatch("gitLink",t)}},mounted:function(){var t=this;c()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n              query getQue($lab_id: ID!){\n                getQue(lab_id: $lab_id){\n                  que {\n                    socketid\n                  }\n                  averageTime\n                  times\n                }\n              }\n            ",variables:{lab_id:this.lab_id}}}).then((function(e){t.que=e.data.data.getQue.que,t.averageTime=e.data.data.getQue.averageTime,t.times=e.data.data.getQue.times})).catch((function(e){if(e.response){t.errorList=e.response.data.errors;for(var i=0;i<t.errorList.length;i++)t.$toast.error(t.errorList[i].message)}else console.log("Error",e.message)}))}},h=l,d=i("2877"),f=i("6544"),p=i.n(f),v=i("8336"),m=i("b0af"),g=i("99d9"),b=i("ac7c"),y=i("62ad"),x=i("a523"),w=i("ce7e"),k=i("4bd4"),O=i("132d"),$=i("0fd9"),A=i("b974"),C=(i("99af"),i("cb29"),i("caad"),i("d81d"),i("fb6a"),i("a9e3"),i("d3b7"),i("25f0"),i("53ca")),j=i("a9ad"),_=i("58df"),S=i("2909");function L(t,e){var i=e.minX,n=e.maxX,a=e.minY,s=e.maxY,r=t.length,o=Math.max.apply(Math,Object(S["a"])(t)),c=Math.min.apply(Math,Object(S["a"])(t)),u=(n-i)/(r-1),l=(s-a)/(o-c||1);return t.map((function(t,e){return{x:i+e*u,y:s-(t-c)*l,value:t}}))}function T(t,e){var i=e.minX,n=e.maxX,a=e.minY,s=e.maxY,r=t.length,o=Math.max.apply(Math,Object(S["a"])(t)),c=Math.min.apply(Math,Object(S["a"])(t));c>0&&(c=0),o<0&&(o=0);var u=n/r,l=(s-a)/(o-c||1),h=s-Math.abs(c*l);return t.map((function(t,e){var n=Math.abs(l*t);return{x:i+e*u,y:h-n+ +(t<0)*n,height:n,value:t}}))}i("a15b");function D(t){return parseInt(t,10)}function I(t,e,i){return D(t.x+i.x)===D(2*e.x)&&D(t.y+i.y)===D(2*e.y)}function E(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function N(t,e,i){var n={x:t.x-e.x,y:t.y-e.y},a=Math.sqrt(n.x*n.x+n.y*n.y),s={x:n.x/a,y:n.y/a};return{x:e.x+s.x*i,y:e.y+s.y*i}}function V(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:75,a=t.shift(),s=t[t.length-1];return(i?"M".concat(a.x," ").concat(n-a.x+2," L").concat(a.x," ").concat(a.y):"M".concat(a.x," ").concat(a.y))+t.map((function(i,n){var s=t[n+1],r=t[n-1]||a,o=s&&I(s,i,r);if(!s||o)return"L".concat(i.x," ").concat(i.y);var c=Math.min(E(r,i),E(s,i)),u=c/2<e,l=u?c/2:e,h=N(r,i,l),d=N(s,i,l);return"L".concat(h.x," ").concat(h.y,"S").concat(i.x," ").concat(i.y," ").concat(d.x," ").concat(d.y)})).join("")+(i?"L".concat(s.x," ").concat(n-a.x+2," Z"):"")}var B=Object(_["a"])(j["a"]).extend({name:"VSparkline",inheritAttrs:!1,props:{autoDraw:Boolean,autoDrawDuration:{type:Number,default:2e3},autoDrawEasing:{type:String,default:"ease"},autoLineWidth:{type:Boolean,default:!1},color:{type:String,default:"primary"},fill:{type:Boolean,default:!1},gradient:{type:Array,default:function(){return[]}},gradientDirection:{type:String,validator:function(t){return["top","bottom","left","right"].includes(t)},default:"top"},height:{type:[String,Number],default:75},labels:{type:Array,default:function(){return[]}},labelSize:{type:[Number,String],default:7},lineWidth:{type:[String,Number],default:4},padding:{type:[String,Number],default:8},showLabels:Boolean,smooth:{type:[Boolean,Number,String],default:!1},type:{type:String,default:"trend",validator:function(t){return["trend","bar"].includes(t)}},value:{type:Array,default:function(){return[]}},width:{type:[Number,String],default:300}},data:function(){return{lastLength:0}},computed:{parsedPadding:function(){return Number(this.padding)},parsedWidth:function(){return Number(this.width)},parsedHeight:function(){return parseInt(this.height,10)},parsedLabelSize:function(){return parseInt(this.labelSize,10)||7},totalHeight:function(){var t=this.parsedHeight;return this.hasLabels&&(t+=1.5*parseInt(this.labelSize,10)),t},totalWidth:function(){var t=this.parsedWidth;return"bar"===this.type&&(t=Math.max(this.value.length*this._lineWidth,t)),t},totalValues:function(){return this.value.length},_lineWidth:function(){if(this.autoLineWidth&&"trend"!==this.type){var t=this.parsedPadding*(this.totalValues+1);return(this.parsedWidth-t)/this.totalValues}return parseFloat(this.lineWidth)||4},boundary:function(){if("bar"===this.type)return{minX:0,maxX:this.totalWidth,minY:0,maxY:this.parsedHeight};var t=this.parsedPadding;return{minX:t,maxX:this.totalWidth-t,minY:t,maxY:this.parsedHeight-t}},hasLabels:function(){return Boolean(this.showLabels||this.labels.length>0||this.$scopedSlots.label)},parsedLabels:function(){for(var t=[],e=this._values,i=e.length,n=0;t.length<i;n++){var a=e[n],s=this.labels[n];s||(s="object"===Object(C["a"])(a)?a.value:a),t.push({x:a.x,value:String(s)})}return t},normalizedValues:function(){return this.value.map((function(t){return"number"===typeof t?t:t.value}))},_values:function(){return"trend"===this.type?L(this.normalizedValues,this.boundary):T(this.normalizedValues,this.boundary)},textY:function(){var t=this.parsedHeight;return"trend"===this.type&&(t-=4),t},_radius:function(){return!0===this.smooth?8:Number(this.smooth)}},watch:{value:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){if(t.autoDraw&&"bar"!==t.type&&t.$refs.path){var e=t.$refs.path,i=e.getTotalLength();t.fill?(e.style.transformOrigin="bottom center",e.style.transition="none",e.style.transform="scaleY(0)",e.getBoundingClientRect(),e.style.transition="transform ".concat(t.autoDrawDuration,"ms ").concat(t.autoDrawEasing),e.style.transform="scaleY(1)"):(e.style.transition="none",e.style.strokeDasharray=i+" "+i,e.style.strokeDashoffset=Math.abs(i-(t.lastLength||0)).toString(),e.getBoundingClientRect(),e.style.transition="stroke-dashoffset ".concat(t.autoDrawDuration,"ms ").concat(t.autoDrawEasing),e.style.strokeDashoffset="0"),t.lastLength=i}}))}}},methods:{genGradient:function(){var t=this,e=this.gradientDirection,i=this.gradient.slice();i.length||i.push("");var n=Math.max(i.length-1,1),a=i.reverse().map((function(e,i){return t.$createElement("stop",{attrs:{offset:i/n,"stop-color":e||"currentColor"}})}));return this.$createElement("defs",[this.$createElement("linearGradient",{attrs:{id:this._uid,gradientUnits:"userSpaceOnUse",x1:"left"===e?"100%":"0",y1:"top"===e?"100%":"0",x2:"right"===e?"100%":"0",y2:"bottom"===e?"100%":"0"}},a)])},genG:function(t){return this.$createElement("g",{style:{fontSize:"8",textAnchor:"middle",dominantBaseline:"mathematical",fill:"currentColor"}},t)},genPath:function(){var t=L(this.normalizedValues,this.boundary);return this.$createElement("path",{attrs:{d:V(t,this._radius,this.fill,this.parsedHeight),fill:this.fill?"url(#".concat(this._uid,")"):"none",stroke:this.fill?"none":"url(#".concat(this._uid,")")},ref:"path"})},genLabels:function(t){var e=this,i=this.parsedLabels.map((function(i,n){return e.$createElement("text",{attrs:{x:i.x+t+e._lineWidth/2,y:e.textY+.75*e.parsedLabelSize,"font-size":Number(e.labelSize)||7}},[e.genLabel(i,n)])}));return this.genG(i)},genLabel:function(t,e){return this.$scopedSlots.label?this.$scopedSlots.label({index:e,value:t.value}):t.value},genBars:function(){if(this.value&&!(this.totalValues<2)){var t=T(this.normalizedValues,this.boundary),e=(Math.abs(t[0].x-t[1].x)-this._lineWidth)/2;return this.$createElement("svg",{attrs:{display:"block",viewBox:"0 0 ".concat(this.totalWidth," ").concat(this.totalHeight)}},[this.genGradient(),this.genClipPath(t,e,this._lineWidth,"sparkline-bar-"+this._uid),this.hasLabels?this.genLabels(e):void 0,this.$createElement("g",{attrs:{"clip-path":"url(#sparkline-bar-".concat(this._uid,"-clip)"),fill:"url(#".concat(this._uid,")")}},[this.$createElement("rect",{attrs:{x:0,y:0,width:this.totalWidth,height:this.height}})])])}},genClipPath:function(t,e,i,n){var a=this,s="number"===typeof this.smooth?this.smooth:this.smooth?2:0;return this.$createElement("clipPath",{attrs:{id:"".concat(n,"-clip")}},t.map((function(t){return a.$createElement("rect",{attrs:{x:t.x+e,y:t.y,width:i,height:t.height,rx:s,ry:s}},[a.autoDraw?a.$createElement("animate",{attrs:{attributeName:"height",from:0,to:t.height,dur:"".concat(a.autoDrawDuration,"ms"),fill:"freeze"}}):void 0])})))},genTrend:function(){return this.$createElement("svg",this.setTextColor(this.color,{attrs:Object(r["a"])(Object(r["a"])({},this.$attrs),{},{display:"block","stroke-width":this._lineWidth||1,viewBox:"0 0 ".concat(this.width," ").concat(this.totalHeight)})}),[this.genGradient(),this.hasLabels&&this.genLabels(-this._lineWidth/2),this.genPath()])}},render:function(t){if(!(this.totalValues<2))return"trend"===this.type?this.genTrend():this.genBars()}}),M=i("8654"),q=i("a844"),W=Object(d["a"])(h,n,a,!1,null,null,null);e["default"]=W.exports;p()(W,{VBtn:v["a"],VCard:m["a"],VCardActions:g["a"],VCardText:g["c"],VCardTitle:g["d"],VCheckbox:b["a"],VCol:y["a"],VContainer:x["a"],VDivider:w["a"],VForm:k["a"],VIcon:O["a"],VRow:$["a"],VSelect:A["a"],VSparkline:B,VTextField:M["a"],VTextarea:q["a"]})},"6ca7":function(t,e,i){},"75eb":function(t,e,i){"use strict";i("4160"),i("159b");var n=i("ade3"),a=i("53ca"),s=i("9d65"),r=i("80d2"),o=i("58df"),c=i("d9bd");function u(t){var e=Object(a["a"])(t);return"boolean"===e||"string"===e||t.nodeType===Node.ELEMENT_NODE}e["a"]=Object(o["a"])(s["a"]).extend({name:"detachable",props:{attach:{default:!1,validator:u},contentClass:{type:String,default:""}},data:function(){return{activatorNode:null,hasDetached:!1}},watch:{attach:function(){this.hasDetached=!1,this.initDetach()},hasContent:function(){this.$nextTick(this.initDetach)}},beforeMount:function(){var t=this;this.$nextTick((function(){if(t.activatorNode){var e=Array.isArray(t.activatorNode)?t.activatorNode:[t.activatorNode];e.forEach((function(e){if(e.elm&&t.$el.parentNode){var i=t.$el===t.$el.parentNode.firstChild?t.$el:t.$el.nextSibling;t.$el.parentNode.insertBefore(e.elm,i)}}))}}))},mounted:function(){this.hasContent&&this.initDetach()},deactivated:function(){this.isActive=!1},beforeDestroy:function(){try{if(this.$refs.content&&this.$refs.content.parentNode&&this.$refs.content.parentNode.removeChild(this.$refs.content),this.activatorNode){var t=Array.isArray(this.activatorNode)?this.activatorNode:[this.activatorNode];t.forEach((function(t){t.elm&&t.elm.parentNode&&t.elm.parentNode.removeChild(t.elm)}))}}catch(e){console.log(e)}},methods:{getScopeIdAttrs:function(){var t=Object(r["q"])(this.$vnode,"context.$options._scopeId");return t&&Object(n["a"])({},t,"")},initDetach:function(){var t;this._isDestroyed||!this.$refs.content||this.hasDetached||""===this.attach||!0===this.attach||"attach"===this.attach||(t=!1===this.attach?document.querySelector("[data-app]"):"string"===typeof this.attach?document.querySelector(this.attach):this.attach,t?(t.appendChild(this.$refs.content),this.hasDetached=!0):Object(c["c"])("Unable to locate target ".concat(this.attach||"[data-app]"),this))}}})},a844:function(t,e,i){"use strict";i("a9e3");var n=i("5530"),a=(i("1681"),i("8654")),s=i("58df"),r=Object(s["a"])(a["a"]);e["a"]=r.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(n["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},a["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){a["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},ac7c:function(t,e,i){"use strict";i("d3b7"),i("25f0");var n=i("5530"),a=(i("6ca7"),i("ec29"),i("9d26")),s=i("c37a"),r=i("fe09");e["a"]=r["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},b848:function(t,e,i){"use strict";var n=i("2909"),a=i("58df");function s(t){for(var e=[],i=0;i<t.length;i++){var a=t[i];a.isActive&&a.isDependent?e.push(a):e.push.apply(e,Object(n["a"])(s(a.$children)))}return e}e["a"]=Object(a["a"])().extend({name:"dependent",data:function(){return{closeDependents:!0,isActive:!1,isDependent:!0}},watch:{isActive:function(t){if(!t)for(var e=this.getOpenDependents(),i=0;i<e.length;i++)e[i].isActive=!1}},methods:{getOpenDependents:function(){return this.closeDependents?s(this.$children):[]},getOpenDependentElements:function(){for(var t=[],e=this.getOpenDependents(),i=0;i<e.length;i++)t.push.apply(t,Object(n["a"])(e[i].getClickableDependentElements()));return t},getClickableDependentElements:function(){var t=[this.$el];return this.$refs.content&&t.push(this.$refs.content),this.overlay&&t.push(this.overlay.$el),t.push.apply(t,Object(n["a"])(this.getOpenDependentElements())),t}}})},ec29:function(t,e,i){},f573:function(t,e,i){"use strict";i("a9e3"),i("d3b7");var n=i("5530"),a=i("fe6c"),s=i("21be"),r=i("4ad4"),o=i("58df"),c=i("80d2"),u=Object(o["a"])(s["a"],a["a"],r["a"]);e["a"]=u.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,openOnClick:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:function(){return{absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}},computed:{computedLeft:function(){var t=this.dimensions.activator,e=this.dimensions.content,i=(!1!==this.attach?t.offsetLeft:t.left)||0,n=Math.max(t.width,e.width),a=0;if(a+=this.left?i-(n-t.width):i,this.offsetX){var s=isNaN(Number(this.maxWidth))?t.width:Math.min(t.width,Number(this.maxWidth));a+=this.left?-s:t.width}return this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),a},computedTop:function(){var t=this.dimensions.activator,e=this.dimensions.content,i=0;return this.top&&(i+=t.height-e.height),!1!==this.attach?i+=t.offsetTop:i+=t.top+this.pageYOffset,this.offsetY&&(i+=this.top?-t.height:t.height),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),i},hasActivator:function(){return!!this.$slots.activator||!!this.$scopedSlots.activator||!!this.activator||!!this.inputActivator}},watch:{disabled:function(t){t&&this.callDeactivate()},isActive:function(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount:function(){this.hasWindow="undefined"!==typeof window},methods:{absolutePosition:function(){return{offsetTop:0,offsetLeft:0,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate:function(){},calcLeft:function(t){return Object(c["h"])(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop:function(){return Object(c["h"])(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow:function(t,e){var i=t+e-this.pageWidth+12;return t=(!this.left||this.right)&&i>0?Math.max(t-i,0):Math.max(t,12),t+this.getOffsetLeft()},calcYOverflow:function(t){var e=this.getInnerHeight(),i=this.pageYOffset+e,n=this.dimensions.activator,a=this.dimensions.content.height,s=t+a,r=i<s;return r&&this.offsetOverflow&&n.top>a?t=this.pageYOffset+(n.top-a):r&&!this.allowOverflow?t=i-a-12:t<this.pageYOffset&&!this.allowOverflow&&(t=this.pageYOffset+12),t<12?12:t},callActivate:function(){this.hasWindow&&this.activate()},callDeactivate:function(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset:function(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed:function(){if(!1===this.attach){var t=this.getActivator();while(t){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1}},deactivate:function(){},genActivatorListeners:function(){var t=this,e=r["a"].options.methods.genActivatorListeners.call(this),i=e.click;return e.click=function(e){t.openOnClick&&i&&i(e),t.absoluteX=e.clientX,t.absoluteY=e.clientY},e},getInnerHeight:function(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft:function(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop:function(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect:function(t){var e=t.getBoundingClientRect();return{top:Math.round(e.top),left:Math.round(e.left),bottom:Math.round(e.bottom),right:Math.round(e.right),width:Math.round(e.width),height:Math.round(e.height)}},measure:function(t){if(!t||!this.hasWindow)return null;var e=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){var i=window.getComputedStyle(t);e.left=parseInt(i.marginLeft),e.top=parseInt(i.marginTop)}return e},sneakPeek:function(t){var e=this;requestAnimationFrame((function(){var i=e.$refs.content;i&&"none"===i.style.display?(i.style.display="inline-block",t(),i.style.display="none"):t()}))},startTransition:function(){var t=this;return new Promise((function(e){return requestAnimationFrame((function(){t.isContentActive=t.hasJustFocused=t.isActive,e()}))}))},updateDimensions:function(){var t=this;this.hasWindow="undefined"!==typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;var e={activator:Object(n["a"])({},this.dimensions.activator),content:Object(n["a"])({},this.dimensions.content)};if(!this.hasActivator||this.absolute)e.activator=this.absolutePosition();else{var i=this.getActivator();if(!i)return;e.activator=this.measure(i),e.activator.offsetLeft=i.offsetLeft,!1!==this.attach?e.activator.offsetTop=i.offsetTop:e.activator.offsetTop=0}this.sneakPeek((function(){t.$refs.content&&(e.content=t.measure(t.$refs.content)),t.dimensions=e}))}}})},fe09:function(t,e,i){"use strict";i("4de4"),i("45fc"),i("d3b7"),i("25f0");var n=i("c37a"),a=i("5311"),s=i("8547"),r=i("58df");function o(t){t.preventDefault()}e["a"]=Object(r["a"])(n["a"],a["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:o},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:o},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===n&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-143d46c2.28a2a08d.js.map