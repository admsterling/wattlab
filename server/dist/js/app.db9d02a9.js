(function(e){function n(n){for(var a,c,s=n[0],u=n[1],i=n[2],f=0,d=[];f<s.length;f++)c=s[f],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&d.push(r[c][0]),r[c]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);b&&b(n);while(d.length)d.shift()();return o.push.apply(o,i||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],a=!0,c=1;c<t.length;c++){var s=t[c];0!==r[s]&&(a=!1)}a&&(o.splice(n--,1),e=u(u.s=t[0]))}return e}var a={},c={app:0},r={app:0},o=[];function s(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-41d3db51":"e52fc9a1","chunk-5c9c021a":"d9efaecb","chunk-7e3fb4f6":"fca89aa6","chunk-1a88815e":"82e08aee","chunk-6c71d745":"eabc1376","chunk-bb02ba04":"09fa9c99","chunk-2d21af29":"30e5ed36","chunk-61fb1f49":"03267468","chunk-07fc68c4":"2e8239d6","chunk-2d0d0540":"594ac546","chunk-86bf3fd8":"658e47b3","chunk-e9fe4c08":"34a88308","chunk-75a7ad6a":"b88fc7f5","chunk-60f8607a":"1941898b","chunk-ccdc5c30":"efb8d50b","chunk-84955fac":"5c729415","chunk-3e12fc76":"7e201584","chunk-ef9fcc88":"4f20913b","chunk-2d0b9823":"62b67cab","chunk-2d0be0de":"a9adaeed","chunk-2d0c4206":"5e8e58bc","chunk-15b21b26":"39f9eea3","chunk-959d7f04":"673ea8ee","chunk-ddf1c92a":"69e7f94c","chunk-275ed7d2":"090bf772","chunk-7626a56f":"bf2bcbe5","chunk-3d3c8979":"b9ba7f7b","chunk-60c2cec6":"4bff1816","chunk-0e519ffd":"edf1f6b6"}[e]+".js"}function u(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t={"chunk-41d3db51":1,"chunk-5c9c021a":1,"chunk-7e3fb4f6":1,"chunk-1a88815e":1,"chunk-6c71d745":1,"chunk-bb02ba04":1,"chunk-61fb1f49":1,"chunk-07fc68c4":1,"chunk-86bf3fd8":1,"chunk-e9fe4c08":1,"chunk-75a7ad6a":1,"chunk-60f8607a":1,"chunk-ccdc5c30":1,"chunk-15b21b26":1,"chunk-959d7f04":1,"chunk-ddf1c92a":1,"chunk-275ed7d2":1,"chunk-7626a56f":1,"chunk-3d3c8979":1,"chunk-60c2cec6":1,"chunk-0e519ffd":1};c[e]?n.push(c[e]):0!==c[e]&&t[e]&&n.push(c[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-41d3db51":"4b83cbbc","chunk-5c9c021a":"1bbdaac2","chunk-7e3fb4f6":"85e964b6","chunk-1a88815e":"fba5bb1e","chunk-6c71d745":"df1c2509","chunk-bb02ba04":"df1c2509","chunk-2d21af29":"31d6cfe0","chunk-61fb1f49":"cbdbeadb","chunk-07fc68c4":"9bfcd596","chunk-2d0d0540":"31d6cfe0","chunk-86bf3fd8":"64532eec","chunk-e9fe4c08":"e20e5162","chunk-75a7ad6a":"05e3e5a7","chunk-60f8607a":"ff2d1a18","chunk-ccdc5c30":"1d1a6e59","chunk-84955fac":"31d6cfe0","chunk-3e12fc76":"31d6cfe0","chunk-ef9fcc88":"31d6cfe0","chunk-2d0b9823":"31d6cfe0","chunk-2d0be0de":"31d6cfe0","chunk-2d0c4206":"31d6cfe0","chunk-15b21b26":"fba5bb1e","chunk-959d7f04":"76de4435","chunk-ddf1c92a":"c8dbe990","chunk-275ed7d2":"dd103c74","chunk-7626a56f":"ea9d0558","chunk-3d3c8979":"0d1764e1","chunk-60c2cec6":"a88c6662","chunk-0e519ffd":"e058c5e6"}[e]+".css",r=u.p+a,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var i=o[s],f=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(f===a||f===r))return n()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){i=d[s],f=i.getAttribute("data-href");if(f===a||f===r)return n()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=n,b.onerror=function(n){var a=n&&n.target&&n.target.src||r,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete c[e],b.parentNode.removeChild(b),t(o)},b.href=r;var l=document.getElementsByTagName("head")[0];l.appendChild(b)})).then((function(){c[e]=0})));var a=r[e];if(0!==a)if(a)n.push(a[2]);else{var o=new Promise((function(n,t){a=r[e]=[n,t]}));n.push(a[2]=o);var i,f=document.createElement("script");f.charset="utf-8",f.timeout=120,u.nc&&f.setAttribute("nonce",u.nc),f.src=s(e);var d=new Error;i=function(n){f.onerror=f.onload=null,clearTimeout(b);var t=r[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+c+")",d.name="ChunkLoadError",d.type=a,d.request=c,t[1](d)}r[e]=void 0}};var b=setTimeout((function(){i({type:"timeout",target:f})}),12e4);f.onerror=f.onload=i,document.head.appendChild(f)}return Promise.all(n)},u.m=e,u.c=a,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)u.d(t,a,function(n){return e[n]}.bind(null,a));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],f=i.push.bind(i);i.push=n,i=i.slice();for(var d=0;d<i.length;d++)n(i[d]);var b=f;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"33b0":function(e,n,t){"use strict";t("e402")},4678:function(e,n,t){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function c(e){var n=r(e);return t(n)}function r(e){if(!t.o(a,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return a[e]}c.keys=function(){return Object.keys(a)},c.resolve=r,e.exports=c,c.id="4678"},"56d7":function(e,n,t){"use strict";t.r(n);t("4de4"),t("e260"),t("e6cf"),t("cca6"),t("a79d");var a=t("2b0e"),c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-app",{staticClass:"grey lighten-4"},[t("v-main",[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view")],1)],1),t("v-footer",{attrs:{absolute:"",color:"teal"}},[this.volume?t("v-btn",{attrs:{outlined:"",small:"",color:"white"},on:{click:e.flipVolume}},[e._v(" Volume On"),t("v-icon",{staticClass:"ml-2",attrs:{small:""}},[e._v("mdi-volume-high")])],1):t("v-btn",{attrs:{outlined:"",small:"",color:"white"},on:{click:e.flipVolume}},[e._v(" Volume Off"),t("v-icon",{staticClass:"ml-2",attrs:{small:""}},[e._v("mdi-volume-off")])],1),t("v-spacer"),t("div",{staticClass:"white--text"},[e._v(" © Adam Sterling "+e._s((new Date).getFullYear())+" - "),t("span",{staticClass:"font-weight-light"},[e._v("as317@hw.ac.uk")])])],1)],1)},r=[],o=t("5530"),s=t("2f62"),u={name:"App",computed:Object(o["a"])({},Object(s["b"])({volume:"application/volume"})),methods:{flipVolume:function(){this.$store.dispatch("application/flip_volume")}}},i=u,f=(t("33b0"),t("2877")),d=t("6544"),b=t.n(d),l=t("7496"),h=t("8336"),m=t("553a"),p=t("132d"),j=t("f6c4"),k=t("2fa4"),v=Object(f["a"])(i,c,r,!1,null,"37edb7fc",null),g=v.exports;b()(v,{VApp:l["a"],VBtn:h["a"],VFooter:m["a"],VIcon:p["a"],VMain:j["a"],VSpacer:k["a"]});var _=t("f309");a["a"].use(_["a"]);var E=new _["a"]({}),T=t("6c42"),S=(t("da96"),t("c975"),function(){return{token:void 0,profData:{}}}),y=S(),P={isLoggedIn:function(e){return!!e.token},fullName:function(e){return e.profData.fname+" "+e.profData.lname},email:function(e){return e.profData.email},username:function(e){if(e.profData.email)return e.profData.email.substring(0,e.profData.email.indexOf("@"))}},O={RESET_STATE:function(e){Object.assign(e,S())},SET_LOGIN:function(e,n){var t=n.token,a=n.prof;e.token=t,e.profData=a}},w={resetState:function(e){var n=e.commit;n("RESET_STATE")},loginProf:function(e,n){var t=e.commit;t("SET_LOGIN",n)}},L={namespaced:!0,state:y,getters:P,actions:w,mutations:O},A=(t("caad"),t("2532"),t("bc3a")),C=t.n(A),N=function(){return{joinedLabFlag:!1,queWaiting:!1,lab:{},accountType:null,username:null,member_id:null,gettingSupport:{flag:!1,reciever:null},privateChat:{},submission:!1}},I=N(),V={labInfo:function(e){return{title:e.lab.title,desc:e.lab.desc,url:e.lab.url}},lab_id:function(e){return e.lab._id},labCode:function(e){return e.lab.code},member_id:function(e){return e.member_id},username:function(e){return e.username},accountType:function(e){return e.accountType},messages:function(e){return e.lab.messages},submission:function(e){return e.lab.submission},joinedLabFlag:function(e){return e.joinedLabFlag},queWaiting:function(e){return e.queWaiting},gettingSupport:function(e){return e.gettingSupport},privateChat:function(e){return e.privateChat},privateChatMessages:function(e){return e.privateChat.messages}},D={RESET_STATE:function(e){Object.assign(e,N())},SET_LAB:function(e,n){e.lab=n.lab,e.username=n.username,e.member_id=n.member_id,e.accountType=n.accountType,e.joinedLabFlag=!0},NEW_GROUP_MESSAGE:function(e,n){e.lab.messages.push(n)},JOIN_QUE:function(e){e.queWaiting=!0},LEAVE_QUE:function(e){e.queWaiting=!1},START_HELP:function(e,n){e.gettingSupport.reciever=n,e.gettingSupport.flag=!0},STOP_HELP:function(e){e.gettingSupport.reciever=null,e.gettingSupport.flag=!1,e.privateChat={}},START_PRIVATE_CHAT:function(e,n){e.privateChat=n},ADD_PRIVATE_MESSAGE:function(e,n){e.privateChat.messages.push(n)}},R={resetState:function(e){var n=e.commit,t=e.rootGetters;return C()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n              mutation memberLeaveLab($id: ID!){\n                memberLeaveLab(id: $id)\n              }\n          ",variables:{id:t["socket/member_id"]}}}).then((function(){n("RESET_STATE")}))},setLab:function(e,n){var t=e.commit,a=e.rootGetters;return C()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n        mutation joinLab($code: String!, $username: String!, $helperPIN: Int, $socketid: String!) {\n          joinLab(code: $code, username: $username, helperPIN: $helperPIN, socketid: $socketid) {\n            lab {\n              _id\n              title\n              helpers\n              status\n              messages {\n                text\n                sender\n                accountType\n                createdAt\n              }\n              labMembers {\n                username\n                socketid\n              }\n              code\n              desc\n              url\n              creator {\n                fname\n                lname\n              }\n              submission\n            }\n            memberid\n          }\n        }\n          ",variables:{code:n.code,username:n.username,helperPIN:n.helperPIN,socketid:n.socketid}}}).then((function(e){if(!e.data.data.joinLab.lab.status){var c=new Error("Lab has not started");throw c}var r;r=a["prof/isLoggedIn"]?"PROFESSOR":e.data.data.joinLab.lab.helpers.includes(n.username)?"HELPER":"STUDENT";var o={lab:e.data.data.joinLab.lab,username:n.username,member_id:e.data.data.joinLab.memberid,accountType:r};t("SET_LAB",o)}))},newGroupMessage:function(e,n){var t=e.commit;t("NEW_GROUP_MESSAGE",n)},joinQue:function(e){var n=e.commit;n("JOIN_QUE")},leaveQue:function(e){var n=e.commit;n("LEAVE_QUE")},stopHelp:function(e){var n=e.commit;n("STOP_HELP")},privateChatInfo:function(e,n){var t=e.commit,a=e.rootGetters;return C()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n              mutation createPrivateChat($lab_id: ID!, $student: String!, $staff: String!){\n                createPrivateChat(lab_id: $lab_id, student: $student, staff: $staff){\n                  _id\n                  student\n                  staff\n                  messages {\n                    _id\n                  }\n                }\n              }\n            ",variables:{lab_id:a["socket/lab_id"],student:a["socket/username"],staff:n.staff}}}).then((function(e){t("START_HELP",n.reciever),t("START_PRIVATE_CHAT",e.data.data.createPrivateChat)}))},setprivateChatInfo:function(e,n){var t=e.commit;t("START_HELP",n.reciever),t("START_PRIVATE_CHAT",n.privateChat)},addPrivateMessage:function(e,n){var t=e.commit;t("ADD_PRIVATE_MESSAGE",n)}},z={namespaced:!0,state:I,getters:V,actions:R,mutations:D},x=function(){return{volume:!0}},$=x(),U={volume:function(e){return e.volume}},q={RESET_STATE:function(e){Object.assign(e,x())},FLIP_VOLUME:function(e){e.volume=!e.volume}},M={resetState:function(e){var n=e.commit;n("RESET_STATE")},flip_volume:function(e){var n=e.commit;n("FLIP_VOLUME")}},F={namespaced:!0,state:$,getters:U,actions:M,mutations:q};a["a"].use(s["a"]);var G=!1,H=new s["a"].Store({modules:{prof:L,socket:z,application:F},strict:G}),B=(t("d3b7"),t("8c4f"));a["a"].use(B["a"]);var W=a["a"].component("Login",(function(){return Promise.all([t.e("chunk-5c9c021a"),t.e("chunk-7e3fb4f6"),t.e("chunk-07fc68c4"),t.e("chunk-2d0d0540")]).then(t.bind(null,"6808"))})),Q=a["a"].component("Register",(function(){return Promise.all([t.e("chunk-41d3db51"),t.e("chunk-5c9c021a"),t.e("chunk-7e3fb4f6"),t.e("chunk-1a88815e")]).then(t.bind(null,"6e29"))})),J=a["a"].component("Join",(function(){return Promise.all([t.e("chunk-5c9c021a"),t.e("chunk-7e3fb4f6"),t.e("chunk-07fc68c4"),t.e("chunk-86bf3fd8")]).then(t.bind(null,"5483"))})),K=a["a"].component("TeacherView",(function(){return t.e("chunk-e9fe4c08").then(t.bind(null,"da3b"))})),Y=a["a"].component("CreateLabView",(function(){return Promise.all([t.e("chunk-41d3db51"),t.e("chunk-5c9c021a"),t.e("chunk-7e3fb4f6"),t.e("chunk-6c71d745")]).then(t.bind(null,"a306"))})),X=a["a"].component("ViewLabs",(function(){return Promise.all([t.e("chunk-5c9c021a"),t.e("chunk-61fb1f49")]).then(t.bind(null,"afa2"))})),Z=a["a"].component("EditLab",(function(){return Promise.all([t.e("chunk-41d3db51"),t.e("chunk-5c9c021a"),t.e("chunk-7e3fb4f6"),t.e("chunk-bb02ba04")]).then(t.bind(null,"b2d3"))})),ee=a["a"].component("NotFound",(function(){return Promise.all([t.e("chunk-5c9c021a"),t.e("chunk-2d21af29")]).then(t.bind(null,"be4d"))})),ne=function(e,n,t){H.getters["prof/isLoggedIn"]?t():t("/login")},te=function(e,n,t){H.getters["socket/joinedLabFlag"]?t():t("/login")},ae=[{path:"/",redirect:"/login"},{path:"/join/:labCode",beforeEnter:te,component:J},{path:"/login",component:W},{path:"/register",component:Q},{path:"/prof",beforeEnter:ne,component:K,redirect:"/viewLabs",children:[{path:"/createLab",component:Y},{path:"/viewLabs",component:X},{path:"/edit/:labCode",component:Z}]},{path:"*",component:ee}],ce=new B["a"]({mode:"history",routes:ae}),re=ce,oe=t("5132"),se=t.n(oe),ue=t("8e27"),ie=t.n(ue),fe=t("c1df"),de=t.n(fe),be=Object({NODE_ENV:"production",VUE_APP_ENDPOINT:"https://watt-lab-api.herokuapp.com/graphql",BASE_URL:"/"}).VUE_APP_SOCKETIO_CONNECTION||window.location.hostname,le=ie()(be),he=Object({NODE_ENV:"production",VUE_APP_ENDPOINT:"https://watt-lab-api.herokuapp.com/graphql",BASE_URL:"/"}).VUE_APP_DEV_FLAG||!1;a["a"].use(new se.a({debug:he,connection:le,vuex:{store:H,actionPrefix:"socket/SOCKET_",mutationPrefix:"socket/SOCKET_"}}),H);var me={timeout:5e3,position:"top-right",closeOnClick:!0,pauseOnHover:!0,rtl:!1,showCloseButtonOnHover:!1,hideProgressBar:!1,closeButton:"button",icon:!0,maxToasts:5,newestOnTop:!0};a["a"].use(T["a"],me),a["a"].use(t("2ead")),a["a"].prototype.moment=de.a,a["a"].filter("momentAgo",(function(e){var n=Date.now(),t=n-new Date(e);return de()(t).format("mm:ss")})),new a["a"]({vuetify:E,store:H,router:re,render:function(e){return e(g)}}).$mount("#app")},e402:function(e,n,t){}});
//# sourceMappingURL=app.db9d02a9.js.map