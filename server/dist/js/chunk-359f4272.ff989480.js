(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-359f4272"],{"3d6a":function(e,a,t){},af5f:function(e,a,t){"use strict";t("3d6a")},e6bb:function(e,a,t){"use strict";t.r(a);var o=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-dialog",{attrs:{"max-width":"600px",scrollable:""},model:{value:e.dialogShow,callback:function(a){e.dialogShow=a},expression:"dialogShow"}},[t("v-card",[t("v-card-title",{staticClass:"headline grey lighten-2"},[e._v("Allow Mic")]),t("v-card-text",{staticClass:"pa-2"},[t("v-container",[t("v-row",[t("v-col",{attrs:{cols:"12"}},[e._v(" Click "),t("span",{staticClass:"blue--text font-weight-bold text-decoration-underline hover-hand",on:{click:e.getMic}},[e._v("here")]),e._v(" to allow access ")])],1),t("v-row",{attrs:{"no-gutters":""}},[t("v-col",{attrs:{cols:"12"}},[e._v(" We ask for you to allow this site to use the microphone so that the lab helpers can quickly talk to you through this website. ")])],1),t("v-row",{staticClass:"mt-2",attrs:{"no-gutters":""}},[t("v-col",{attrs:{cols:"12"}},[e._v(" If you are uncomfortable with this, login and when you speak to a lab helper message them you would want be called on teams. ")])],1),t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("ul",[t("li",[e._v("Your voice will not be recorded.")]),t("li",[e._v("Your voice will only be shared with the lab helper.")]),t("li",[e._v("You do not need to share webcamera access.")])])])],1),t("v-row",[t("v-col",{attrs:{cols:"12"}},[e._v(" Or follow these steps: "),t("br"),t("v-expansion-panels",{attrs:{accordion:"",popout:""}},e._l(e.panels,(function(a,o){return t("v-expansion-panel",{key:o},[t("v-expansion-panel-header",[e._v(" "+e._s(a.header)+" ")]),t("v-expansion-panel-content",[t("v-img",{attrs:{src:a.src,"lazy-src":a.lazy,width:a.width,height:a.height,contain:"",eager:""}})],1)],1)})),1)],1)],1)],1)],1),t("v-divider"),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"deep-orange lighten-2",dark:""},on:{click:function(a){return e.cancel()}}},[e._v(" Close ")])],1)],1)],1)},i=[],n=(t("4160"),t("159b"),{data:function(){return{dialogShow:!1,panels:[{header:"1) Click on the lock icon beside the URL Address Bar",lazy:"mic1-min.jpg",src:"mic1.jpg",width:600,height:448},{header:"2) Change your site microphone settings to 'Allow'",lazy:"mic2-min.jpg",src:"mic2.jpg",width:600,height:362},{header:"3) Now please click on Reload to reload the page.",lazy:"mic3-min.jpg",src:"mic3.jpg",width:600,height:134}]}},methods:{open:function(){this.dialogShow=!0},cancel:function(){this.dialogShow=!1},getMic:function(){navigator.getUserMedia||(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia),navigator.getUserMedia?navigator.getUserMedia({audio:!0},(function(e){e.getTracks().forEach((function(e){e.stop()}))}),(function(){alert("Error capturing audio.")})):alert("getUserMedia not supported in this browser.")}}}),r=n,s=(t("af5f"),t("2877")),l=t("6544"),c=t.n(l),d=t("8336"),h=t("b0af"),g=t("99d9"),v=t("62ad"),u=t("a523"),p=t("169a"),w=t("ce7e"),f=t("cd55"),b=t("49e2"),m=t("c865"),k=t("0393"),x=t("adda"),V=t("0fd9"),_=t("2fa4"),y=Object(s["a"])(r,o,i,!1,null,"5f3c35f4",null);a["default"]=y.exports;c()(y,{VBtn:d["a"],VCard:h["a"],VCardActions:g["a"],VCardText:g["c"],VCardTitle:g["d"],VCol:v["a"],VContainer:u["a"],VDialog:p["a"],VDivider:w["a"],VExpansionPanel:f["a"],VExpansionPanelContent:b["a"],VExpansionPanelHeader:m["a"],VExpansionPanels:k["a"],VImg:x["a"],VRow:V["a"],VSpacer:_["a"]})}}]);
//# sourceMappingURL=chunk-359f4272.ff989480.js.map