(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7efec134"],{"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,s,"next",t)}function s(t){n(a,o,i,c,s,"throw",t)}c(void 0)}))}}},5483:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-card",[r("v-card-title",{staticClass:"text-center teal py-6",staticStyle:{position:"relative"}},[r("div",{staticStyle:{display:"block",margin:"auto"}},[r("h1",{staticClass:"font-weight-bold display-3 white--text"},[t._v("WATTLAB")])]),r("v-btn",{staticStyle:{position:"absolute",right:"20px"},attrs:{color:"red lighten-2 white--text"},on:{click:t.leaveLab}},[r("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v("mdi-close")]),t._v("Leave Lab ")],1)],1),r("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[r("v-tabs-slider",{attrs:{color:"grey"}}),r("v-tab",[t._v(" Main Room ")]),r("v-tab",[t._v(" Get Help ")]),this.studentSubmission?r("v-tab",[t._v(" Submit Work ")]):t._e()],1),r("v-tabs-items",{attrs:{height:"100%"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[r("v-tab-item",[r("div",{staticClass:"tab-item-wrapper"},[r("v-container",{attrs:{fluid:""}},[r("v-row",[r("v-col",{attrs:{cols:"4"}},[r("LabInformationComponent")],1),r("v-col",{attrs:{cols:"8"}},[r("LabGCWindow")],1)],1)],1)],1)]),r("v-tab-item",[r("div",{staticClass:"tab-item-wrapper"},["STUDENT"===this.accountType?r("StudentHelpView"):"HELPER"===this.accountType?r("LabHelperView"):t._e()],1)]),this.studentSubmission?r("v-tab-item",[r("div",{staticClass:"tab-item-wrapper"},[this.studentSubmission?r("SubmissionPage"):t._e()],1)]):t._e()],1)],1)],1)},o=[],i=(r("d3b7"),r("96cf"),r("1da1")),a=r("5530"),c=r("2f62"),s={components:{LabInformationComponent:function(){return r.e("chunk-2d0be0de").then(r.bind(null,"2f2f"))},LabGCWindow:function(){return Promise.all([r.e("chunk-41d3db51"),r.e("chunk-f7fd520c")]).then(r.bind(null,"6e10"))},StudentHelpView:function(){return r.e("chunk-2d0b9823").then(r.bind(null,"32f4"))},LabHelperView:function(){return r.e("chunk-2d0c4206").then(r.bind(null,"3a02"))},SubmissionPage:function(){return Promise.all([r.e("chunk-41d3db51"),r.e("chunk-15b21b26")]).then(r.bind(null,"bc70"))}},data:function(){return{tab:null}},computed:Object(a["a"])(Object(a["a"])({},Object(c["b"])({queWaiting:"socket/queWaiting",labCode:"socket/labCode",lab_id:"socket/lab_id",labInfo:"socket/labInfo",memberid:"socket/member_id",accountType:"socket/accountType",submission:"socket/submission"})),{},{studentSubmission:function(){return this.submission&&"STUDENT"===this.accountType}}),sockets:{endLab:function(){this.$toast.warning("The lab has stopped"),this.$router.push("/login")}},methods:{leaveLab:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$socket.emit("leaveRoom",t.labCode);case 2:if(!t.queWaiting){e.next=7;break}return r={lab_id:t.lab_id,labCode:t.labCode,socketid:t.$socket.id},console.log(r),e.next=7,t.$socket.emit("cancelHelp",r);case 7:t.$store.dispatch("socket/resetState").then((function(){t.$router.push("/")}));case 8:case"end":return e.stop()}}),e)})))()}},beforeDestroy:function(){this.labCode&&this.$socket.emit("leaveRoom",this.labCode)}},u=s,l=(r("850d"),r("2877")),h=r("6544"),f=r.n(h),d=r("8336"),p=r("b0af"),v=r("99d9"),b=r("62ad"),m=r("a523"),y=r("132d"),g=r("0fd9"),w=r("71a3"),L=r("c671"),k=r("fe57"),x=r("aac8"),_=r("9a96"),E=Object(l["a"])(u,n,o,!1,null,"ecf86398",null);e["default"]=E.exports;f()(E,{VBtn:d["a"],VCard:p["a"],VCardTitle:v["d"],VCol:b["a"],VContainer:m["a"],VIcon:y["a"],VRow:g["a"],VTab:w["a"],VTabItem:L["a"],VTabs:k["a"],VTabsItems:x["a"],VTabsSlider:_["a"]})},"850d":function(t,e,r){"use strict";r("d3ce")},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(P){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof b?e:b,i=Object.create(o.prototype),a=new O(n||[]);return i._invoke=E(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}t.wrap=u;var h="suspendedStart",f="suspendedYield",d="executing",p="completed",v={};function b(){}function m(){}function y(){}var g={};g[i]=function(){return this};var w=Object.getPrototypeOf,L=w&&w(w(j([])));L&&L!==r&&n.call(L,i)&&(g=L);var k=y.prototype=b.prototype=Object.create(g);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function r(o,i,a,c){var s=l(t[o],t,i);if("throw"!==s.type){var u=s.arg,h=u.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,c)}))}c(s.arg)}var o;function i(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function E(t,e,r){var n=h;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return V()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var c=T(a,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var s=l(t,e,r);if("normal"===s.type){if(n=r.done?p:f,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=p,r.method="throw",r.arg=s.arg)}}}function T(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,T(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function j(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:V}}function V(){return{value:e,done:!0}}return m.prototype=k.constructor=y,y.constructor=m,m.displayName=s(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,c,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},x(_.prototype),_.prototype[a]=function(){return this},t.AsyncIterator=_,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new _(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(k),s(k,c,"Generator"),k[i]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(C),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),C(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;C(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},d3ce:function(t,e,r){}}]);
//# sourceMappingURL=chunk-7efec134.795a548e.js.map