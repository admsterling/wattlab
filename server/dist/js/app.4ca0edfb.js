(function(e){function n(n){for(var a,c,u=n[0],i=n[1],s=n[2],d=0,f=[];d<u.length;d++)c=u[d],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&f.push(r[c][0]),r[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);h&&h(n);while(f.length)f.shift()();return o.push.apply(o,s||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],a=!0,c=1;c<t.length;c++){var u=t[c];0!==r[u]&&(a=!1)}a&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var a={},c={app:0},r={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-573c4e92":"fa996dd0","chunk-12108212":"5e798335","chunk-2d21af29":"52d4749c","chunk-41d3db51":"e52fc9a1","chunk-7e3fb4f6":"fca89aa6","chunk-1a88815e":"1b405f8d","chunk-6c71d745":"269a3e31","chunk-bb02ba04":"99222448","chunk-07fc68c4":"2e8239d6","chunk-2d0d0540":"7cc7c235","chunk-7efec134":"34fd4421","chunk-e9fe4c08":"d6fc6e01","chunk-7dd3fd86":"c1d6c917","chunk-b4031610":"5b938d92","chunk-60f8607a":"2a836579","chunk-435d2f2b":"93414785","chunk-9f977a14":"39633131","chunk-2d0b9823":"5d52083b","chunk-2d0be0de":"88df204d","chunk-2d0c4206":"4a0200ec","chunk-15b21b26":"75100ef0","chunk-38339793":"7a7b8154","chunk-1c8486c4":"aa48a3ae","chunk-2d0da6d8":"7cb0267a","chunk-e6f6c86c":"bc15f619","chunk-2d0d5fcc":"e8021e91","chunk-e367a31e":"0f39a2d0"}[e]+".js"}function i(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-573c4e92":1,"chunk-12108212":1,"chunk-41d3db51":1,"chunk-7e3fb4f6":1,"chunk-1a88815e":1,"chunk-6c71d745":1,"chunk-bb02ba04":1,"chunk-07fc68c4":1,"chunk-7efec134":1,"chunk-e9fe4c08":1,"chunk-7dd3fd86":1,"chunk-b4031610":1,"chunk-60f8607a":1,"chunk-15b21b26":1,"chunk-38339793":1,"chunk-1c8486c4":1,"chunk-e6f6c86c":1,"chunk-e367a31e":1};c[e]?n.push(c[e]):0!==c[e]&&t[e]&&n.push(c[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-573c4e92":"04cb4dd2","chunk-12108212":"cbdbeadb","chunk-2d21af29":"31d6cfe0","chunk-41d3db51":"4b83cbbc","chunk-7e3fb4f6":"85e964b6","chunk-1a88815e":"fba5bb1e","chunk-6c71d745":"df1c2509","chunk-bb02ba04":"df1c2509","chunk-07fc68c4":"9bfcd596","chunk-2d0d0540":"31d6cfe0","chunk-7efec134":"46053e0c","chunk-e9fe4c08":"e20e5162","chunk-7dd3fd86":"bdf70c1d","chunk-b4031610":"cce48b1d","chunk-60f8607a":"ff2d1a18","chunk-435d2f2b":"31d6cfe0","chunk-9f977a14":"31d6cfe0","chunk-2d0b9823":"31d6cfe0","chunk-2d0be0de":"31d6cfe0","chunk-2d0c4206":"31d6cfe0","chunk-15b21b26":"fba5bb1e","chunk-38339793":"21473867","chunk-1c8486c4":"2242c310","chunk-2d0da6d8":"31d6cfe0","chunk-e6f6c86c":"4c442003","chunk-2d0d5fcc":"31d6cfe0","chunk-e367a31e":"532a3e71"}[e]+".css",r=i.p+a,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===a||d===r))return n()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],d=s.getAttribute("data-href");if(d===a||d===r)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var a=n&&n.target&&n.target.src||r,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete c[e],h.parentNode.removeChild(h),t(o)},h.href=r;var l=document.getElementsByTagName("head")[0];l.appendChild(h)})).then((function(){c[e]=0})));var a=r[e];if(0!==a)if(a)n.push(a[2]);else{var o=new Promise((function(n,t){a=r[e]=[n,t]}));n.push(a[2]=o);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=u(e);var f=new Error;s=function(n){d.onerror=d.onload=null,clearTimeout(h);var t=r[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+a+": "+c+")",f.name="ChunkLoadError",f.type=a,f.request=c,t[1](f)}r[e]=void 0}};var h=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(n)},i.m=e,i.c=a,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=n,s=s.slice();for(var f=0;f<s.length;f++)n(s[f]);var h=d;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var a=t("2b0e"),c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-app",{staticClass:"grey lighten-4"},[t("v-main",[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view")],1)],1),t("v-footer",{attrs:{absolute:"",color:"teal"}},[t("v-spacer"),t("div",{staticClass:"white--text"},[e._v("© Adam Sterling "+e._s((new Date).getFullYear())+" - "),t("span",{staticClass:"font-weight-light"},[e._v("as317@hw.ac.uk")])])],1)],1)},r=[],o={name:"App"},u=o,i=(t("fcde"),t("2877")),s=t("6544"),d=t.n(s),f=t("7496"),h=t("553a"),l=t("f6c4"),b=t("2fa4"),p=Object(i["a"])(u,c,r,!1,null,"75feb4e9",null),m=p.exports;d()(p,{VApp:f["a"],VFooter:h["a"],VMain:l["a"],VSpacer:b["a"]});var k=t("f309");a["a"].use(k["a"]);var g=new k["a"]({}),v=t("6c42"),E=(t("da96"),t("2f62")),_=(t("c975"),function(){return{token:void 0,profData:{}}}),T=_(),S={isLoggedIn:function(e){return!!e.token},fullName:function(e){return e.profData.fname+" "+e.profData.lname},email:function(e){return e.profData.email},username:function(e){if(e.profData.email)return e.profData.email.substring(0,e.profData.email.indexOf("@"))}},P={RESET_STATE:function(e){Object.assign(e,_())},SET_LOGIN:function(e,n){var t=n.token,a=n.prof;e.token=t,e.profData=a}},L={resetState:function(e){var n=e.commit;n("RESET_STATE")},loginProf:function(e,n){var t=e.commit;t("SET_LOGIN",n)}},A={namespaced:!0,state:T,getters:S,actions:L,mutations:P},O=(t("caad"),t("2532"),t("bc3a")),w=t.n(O),y=function(){return{joinedLabFlag:!1,queWaiting:!1,lab:{},accountType:null,username:null,member_id:null,gettingSupport:{flag:!1,reciever:null},privateChat:{},submission:!1}},C=y(),j={labInfo:function(e){return{title:e.lab.title,desc:e.lab.desc,url:e.lab.url}},lab_id:function(e){return e.lab._id},labCode:function(e){return e.lab.code},member_id:function(e){return e.member_id},username:function(e){return e.username},accountType:function(e){return e.accountType},messages:function(e){return e.lab.messages},submission:function(e){return e.lab.submission},joinedLabFlag:function(e){return e.joinedLabFlag},queWaiting:function(e){return e.queWaiting},gettingSupport:function(e){return e.gettingSupport},privateChat:function(e){return e.privateChat},privateChatMessages:function(e){return e.privateChat.messages}},N={RESET_STATE:function(e){Object.assign(e,y())},SET_LAB:function(e,n){e.lab=n.lab,e.username=n.username,e.member_id=n.member_id,e.accountType=n.accountType,e.joinedLabFlag=!0},NEW_GROUP_MESSAGE:function(e,n){e.lab.messages.push(n)},JOIN_QUE:function(e){e.queWaiting=!0},LEAVE_QUE:function(e){e.queWaiting=!1},START_HELP:function(e,n){e.gettingSupport.reciever=n,e.gettingSupport.flag=!0},STOP_HELP:function(e){e.gettingSupport.reciever=null,e.gettingSupport.flag=!1,e.privateChat={}},START_PRIVATE_CHAT:function(e,n){e.privateChat=n},ADD_PRIVATE_MESSAGE:function(e,n){e.privateChat.messages.push(n)}},D={resetState:function(e){var n=e.commit,t=e.rootGetters;return w()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n              mutation memberLeaveLab($id: ID!){\n                memberLeaveLab(id: $id)\n              }\n          ",variables:{id:t["socket/member_id"]}}}).then((function(){n("RESET_STATE")}))},setLab:function(e,n){var t=e.commit,a=e.rootGetters;return w()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n        mutation joinLab($code: String!, $username: String!, $socketid: String!) {\n          joinLab(code: $code, username: $username, socketid: $socketid) {\n            lab {\n              _id\n              title\n              helpers\n              status\n              messages {\n                text\n                sender\n                accountType\n                createdAt\n              }\n              labMembers {\n                username\n                socketid\n              }\n              code\n              desc\n              url\n              creator {\n                fname\n                lname\n              }\n              submission\n            }\n            memberid\n          }\n        }\n          ",variables:{code:n.code,username:n.username,socketid:n.socketid}}}).then((function(e){if(!e.data.data.joinLab.lab.status){var c=new Error("Lab has not started");throw c}var r;r=a["prof/isLoggedIn"]?"PROFESSOR":e.data.data.joinLab.lab.helpers.includes(n.username)?"HELPER":"STUDENT";var o={lab:e.data.data.joinLab.lab,username:n.username,member_id:e.data.data.joinLab.memberid,accountType:r};t("SET_LAB",o)}))},newGroupMessage:function(e,n){var t=e.commit;t("NEW_GROUP_MESSAGE",n)},joinQue:function(e){var n=e.commit;n("JOIN_QUE")},leaveQue:function(e){var n=e.commit;n("LEAVE_QUE")},stopHelp:function(e){var n=e.commit;n("STOP_HELP")},privateChatInfo:function(e,n){var t=e.commit,a=e.rootGetters;return w()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n              mutation createPrivateChat($lab_id: ID!, $student: String!, $staff: String!){\n                createPrivateChat(lab_id: $lab_id, student: $student, staff: $staff){\n                  _id\n                  student\n                  staff\n                  messages {\n                    _id\n                  }\n                }\n              }\n            ",variables:{lab_id:a["socket/lab_id"],student:a["socket/username"],staff:n.staff}}}).then((function(e){t("START_HELP",n.reciever),t("START_PRIVATE_CHAT",e.data.data.createPrivateChat)}))},setprivateChatInfo:function(e,n){var t=e.commit;t("START_HELP",n.reciever),t("START_PRIVATE_CHAT",n.privateChat)},addPrivateMessage:function(e,n){var t=e.commit;t("ADD_PRIVATE_MESSAGE",n)}},R={namespaced:!0,state:C,getters:j,actions:D,mutations:N};a["a"].use(E["a"]);var I=!1,V=new E["a"].Store({modules:{prof:A,socket:R},strict:I}),$=(t("d3b7"),t("8c4f"));a["a"].use($["a"]);var q=a["a"].component("Login",(function(){return Promise.all([t.e("chunk-573c4e92"),t.e("chunk-7e3fb4f6"),t.e("chunk-07fc68c4"),t.e("chunk-2d0d0540")]).then(t.bind(null,"6808"))})),x=a["a"].component("Register",(function(){return Promise.all([t.e("chunk-573c4e92"),t.e("chunk-41d3db51"),t.e("chunk-7e3fb4f6"),t.e("chunk-1a88815e")]).then(t.bind(null,"6e29"))})),U=a["a"].component("Join",(function(){return Promise.all([t.e("chunk-573c4e92"),t.e("chunk-7e3fb4f6"),t.e("chunk-07fc68c4"),t.e("chunk-7efec134")]).then(t.bind(null,"5483"))})),G=a["a"].component("TeacherView",(function(){return t.e("chunk-e9fe4c08").then(t.bind(null,"da3b"))})),H=a["a"].component("CreateLabView",(function(){return Promise.all([t.e("chunk-573c4e92"),t.e("chunk-41d3db51"),t.e("chunk-7e3fb4f6"),t.e("chunk-6c71d745")]).then(t.bind(null,"a306"))})),M=a["a"].component("ViewLabs",(function(){return Promise.all([t.e("chunk-573c4e92"),t.e("chunk-12108212")]).then(t.bind(null,"afa2"))})),F=a["a"].component("EditLab",(function(){return Promise.all([t.e("chunk-573c4e92"),t.e("chunk-41d3db51"),t.e("chunk-7e3fb4f6"),t.e("chunk-bb02ba04")]).then(t.bind(null,"b2d3"))})),B=a["a"].component("NotFound",(function(){return Promise.all([t.e("chunk-573c4e92"),t.e("chunk-2d21af29")]).then(t.bind(null,"be4d"))})),W=function(e,n,t){V.getters["prof/isLoggedIn"]?t():t("/login")},Q=function(e,n,t){V.getters["socket/joinedLabFlag"]?t():t("/login")},J=[{path:"/",redirect:"/login"},{path:"/join/:labCode",beforeEnter:Q,component:U},{path:"/login",component:q},{path:"/register",component:x},{path:"/prof",beforeEnter:W,component:G,redirect:"/viewLabs",children:[{path:"/createLab",component:H},{path:"/viewLabs",component:M},{path:"/edit/:labCode",component:F}]},{path:"*",component:B}],K=new $["a"]({mode:"history",routes:J}),Y=K,z=t("5132"),X=t.n(z),Z=t("8e27"),ee=t.n(Z),ne=Object({NODE_ENV:"production",VUE_APP_ENDPOINT:"https://watt-lab-api.herokuapp.com/graphql",BASE_URL:"/"}).VUE_APP_SOCKETIO_CONNECTION||window.location.hostname,te=ee()(ne),ae=Object({NODE_ENV:"production",VUE_APP_ENDPOINT:"https://watt-lab-api.herokuapp.com/graphql",BASE_URL:"/"}).VUE_APP_DEV_FLAG||!1;a["a"].use(new X.a({debug:ae,connection:te,vuex:{store:V,actionPrefix:"socket/SOCKET_",mutationPrefix:"socket/SOCKET_"}}),V);var ce={timeout:5e3,position:"top-right",closeOnClick:!0,pauseOnHover:!0,rtl:!1,showCloseButtonOnHover:!1,hideProgressBar:!1,closeButton:"button",icon:!0,maxToasts:5,newestOnTop:!0};a["a"].use(v["a"],ce),a["a"].use(t("2ead")),new a["a"]({vuetify:g,store:V,router:Y,render:function(e){return e(m)}}).$mount("#app")},5862:function(e,n,t){},fcde:function(e,n,t){"use strict";t("5862")}});
//# sourceMappingURL=app.4ca0edfb.js.map