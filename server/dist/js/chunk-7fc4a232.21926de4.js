(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fc4a232"],{"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("d3b7");function r(t,e,n,r,i,o,a){try{var s=t[o](a),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var a=t.apply(e,n);function s(t){r(a,i,o,s,c,"next",t)}function c(t){r(a,i,o,s,c,"throw",t)}s(void 0)}))}}},5483:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-card",[n("v-card-title",{staticClass:"text-center teal py-6",staticStyle:{position:"relative"}},[n("div",{staticStyle:{display:"block",margin:"auto"}},[n("h1",{staticClass:"font-weight-bold display-3 white--text"},[t._v("WATTLAB")])]),t.gettingSupport.flag?t._e():n("v-btn",{staticStyle:{position:"absolute",right:"20px"},attrs:{color:"red lighten-2 white--text"},on:{click:t.leaveLab}},[n("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v("mdi-close")]),t._v("Leave Lab ")],1)],1),n("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("v-tabs-slider",{attrs:{color:"grey"}}),n("v-tab",[t._v(" Main Room ")]),n("v-tab",[t._v(" Get Help / Marking")]),this.studentSubmission?n("v-tab",[t._v(" Submit Work ")]):t._e()],1),n("v-tabs-items",{attrs:{height:"100%"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("v-tab-item",[n("div",{staticClass:"tab-item-wrapper"},[n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"4"}},[n("LabInformationComponent")],1),n("v-col",{attrs:{cols:"8"}},[n("LabGCWindow")],1)],1)],1)],1)]),n("v-tab-item",[n("div",{staticClass:"tab-item-wrapper"},["STUDENT"===this.accountType?n("StudentHelpView"):n("LabHelperView")],1)]),this.studentSubmission?n("v-tab-item",[n("div",{staticClass:"tab-item-wrapper"},[this.studentSubmission?n("SubmissionPage"):t._e()],1)]):t._e()],1)],1)],1)},i=[],o=(n("d3b7"),n("96cf"),n("1da1")),a=n("5530"),s=n("2f62"),c={components:{LabInformationComponent:function(){return n.e("chunk-2d0be0de").then(n.bind(null,"2f2f"))},LabGCWindow:function(){return Promise.all([n.e("chunk-7bc073a6"),n.e("chunk-959d7f04")]).then(n.bind(null,"6e10"))},StudentHelpView:function(){return n.e("chunk-2d0b9823").then(n.bind(null,"32f4"))},LabHelperView:function(){return n.e("chunk-2d0c4206").then(n.bind(null,"3a02"))},SubmissionPage:function(){return Promise.all([n.e("chunk-7bc073a6"),n.e("chunk-15b21b26")]).then(n.bind(null,"bc70"))}},data:function(){return{tab:null}},computed:Object(a["a"])(Object(a["a"])({},Object(s["b"])({queWaiting:"socket/queWaiting",labCode:"socket/labCode",lab_id:"socket/lab_id",labInfo:"socket/labInfo",memberid:"socket/member_id",accountType:"socket/accountType",submission:"socket/submission",gettingSupport:"socket/gettingSupport",privateChat:"socket/privateChat"})),{},{studentSubmission:function(){return this.submission&&"STUDENT"===this.accountType}}),sockets:{endLab:function(){this.$toast.warning("The lab has stopped"),this.$router.push("/login")}},methods:{leaveLab:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.gettingSupport.flag&&(n={socketid:t.gettingSupport.reciever,priv_id:t.privateChat._id},t.$socket.emit("stopHelp",n)),!t.queWaiting){e.next=6;break}return r={lab_id:t.lab_id,labCode:t.labCode,socketid:t.$socket.id},console.log(r),e.next=6,t.$socket.emit("leaveQue",r);case 6:t.$socket.emit("leaveRoom",t.labCode),t.$store.dispatch("socket/resetState").then((function(){t.$router.push("/")}));case 8:case"end":return e.stop()}}),e)})))()}},beforeDestroy:function(){this.labCode&&this.$socket.emit("leaveRoom",this.labCode)}},u=c,l=(n("c7c4"),n("2877")),h=n("6544"),d=n.n(h),f=n("8336"),p=n("b0af"),v=n("99d9"),m=n("62ad"),b=n("a523"),w=n("132d"),g=n("0fd9"),y=n("71a3"),T=n("c671"),k=n("fe57"),x=n("aac8"),L=n("9a96"),C=Object(l["a"])(u,r,i,!1,null,"2a039aca",null);e["default"]=C.exports;d()(C,{VBtn:f["a"],VCard:p["a"],VCardTitle:v["d"],VCol:m["a"],VContainer:b["a"],VIcon:w["a"],VRow:g["a"],VTab:y["a"],VTabItem:T["a"],VTabs:k["a"],VTabsItems:x["a"],VTabsSlider:L["a"]})},7654:function(t,e,n){},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch($){c=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var i=e&&e.prototype instanceof m?e:m,o=Object.create(i.prototype),a=new G(r||[]);return o._invoke=C(t,n,a),o}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch($){return{type:"throw",arg:$}}}t.wrap=u;var h="suspendedStart",d="suspendedYield",f="executing",p="completed",v={};function m(){}function b(){}function w(){}var g={};g[o]=function(){return this};var y=Object.getPrototypeOf,T=y&&y(y(O([])));T&&T!==n&&r.call(T,o)&&(g=T);var k=w.prototype=m.prototype=Object.create(g);function x(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function n(i,o,a,s){var c=l(t[i],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,a,s)}),(function(t){n("throw",t,a,s)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return n("throw",t,a,s)}))}s(c.arg)}var i;function o(t,r){function o(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(o,o):o()}this._invoke=o}function C(t,e,n){var r=h;return function(i,o){if(r===f)throw new Error("Generator is already running");if(r===p){if("throw"===i)throw o;return j()}n.method=i,n.arg=o;while(1){var a=n.delegate;if(a){var s=_(a,n);if(s){if(s===v)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var c=l(t,e,n);if("normal"===c.type){if(r=n.done?p:d,c.arg===v)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}function _(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,_(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=l(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,v;var o=i.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function G(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function O(t){if(t){var n=t[o];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function n(){while(++i<t.length)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:j}}function j(){return{value:e,done:!0}}return b.prototype=k.constructor=w,w.constructor=b,b.displayName=c(w,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,c(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},x(L.prototype),L.prototype[a]=function(){return this},t.AsyncIterator=L,t.async=function(e,n,r,i,o){void 0===o&&(o=Promise);var a=new L(u(e,n,r,i),o);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(k),c(k,s,"Generator"),k[o]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=O,G.prototype={constructor:G,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),E(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;E(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:O(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=r}catch(i){Function("r","regeneratorRuntime = r")(r)}},"9d65":function(t,e,n){"use strict";var r=n("d9bd"),i=n("2b0e");e["a"]=i["a"].extend().extend({name:"bootable",props:{eager:Boolean},data:function(){return{isBooted:!1}},computed:{hasContent:function(){return this.isBooted||this.eager||this.isActive}},watch:{isActive:function(){this.isBooted=!0}},created:function(){"lazy"in this.$attrs&&Object(r["e"])("lazy",this)},methods:{showLazyContent:function(t){return this.hasContent&&t?t():[this.$createElement()]}}})},c671:function(t,e,n){"use strict";var r=n("9d65"),i=n("4e82"),o=n("c3f0"),a=n("80d2"),s=n("58df"),c=Object(s["a"])(r["a"],Object(i["a"])("windowGroup","v-window-item","v-window")),u=c.extend().extend().extend({name:"v-window-item",directives:{Touch:o["a"]},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?"undefined"!==typeof this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:"undefined"!==typeof this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(a["g"])(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var e=this;this.inTransition&&this.$nextTick((function(){e.computedTransition&&e.inTransition&&(e.windowGroup.transitionHeight=Object(a["g"])(t.clientHeight))}))}},render:function(t){var e=this;return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((function(){return[e.genWindowItem()]})))}});e["a"]=u.extend({name:"v-tab-item",props:{id:String},methods:{genWindowItem:function(){var t=u.options.methods.genWindowItem.call(this);return t.data.domProps=t.data.domProps||{},t.data.domProps.id=this.id||this.value,t}}})},c7c4:function(t,e,n){"use strict";n("7654")}}]);
//# sourceMappingURL=chunk-7fc4a232.21926de4.js.map