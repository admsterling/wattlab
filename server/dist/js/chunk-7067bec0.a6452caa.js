(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7067bec0"],{"0790":function(e,t,s){"use strict";s("fc48f")},"6e10":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("v-sheet",{staticClass:"rounded border",staticStyle:{"overflow-y":"auto",height:"calc(100vh - 300px)"},attrs:{id:"chatWindow",color:"grey lighten-4"}},[s("v-container",{attrs:{fluid:""}},e._l(e.messages,(function(t,a){return s("v-row",{key:a,staticClass:"my-2",attrs:{align:"center","no-gutters":""}},[s("v-col",{attrs:{cols:"12"}},[t.sender===e.username?s("div",{staticClass:"wrapperRight"},[s("div",{staticClass:"mx-2 text-bubble lighten-4 deep-orange"},[e._v(" "+e._s(t.text)+" ")]),s("div",{staticStyle:{"white-space":"nowrap",width:"215px"}},[s("span",{staticClass:"ml-2 grey--text text--lighten-1"},[e._v(" "+e._s(e._f("moment")(t.createdAt,"HH:MM"))+" "),s("span",{staticClass:"text-lighten-2",class:["STUDENT"===t.accountType?"green--text":"","HELPER"===t.accountType?"orange--text":"","PROFESSOR"===t.accountType?"purple--text":""]},[e._v("("+e._s(t.accountType)+")")])]),s("span",{staticClass:"ml-2"},[e._v(e._s(t.sender)+":")])])]):s("div",{staticClass:"wrapperLeft"},[s("div",{staticStyle:{"white-space":"nowrap",width:"215px"}},[s("span",{staticClass:"ml-2 grey--text text--lighten-1"},[e._v(" "+e._s(e._f("moment")(t.createdAt,"HH:MM"))+" "),s("span",{staticClass:"text-lighten-2",class:["STUDENT"===t.accountType?"green--text":"","HELPER"===t.accountType?"orange--text":"","PROFESSOR"===t.accountType?"purple--text":""]},[e._v("("+e._s(t.accountType)+")")])]),s("span",{staticClass:"ml-2"},[e._v(e._s(t.sender)+":")])]),s("div",{staticClass:"mx-2 text-bubble lighten-4 blue"},[e._v(" "+e._s(t.text)+" ")])])])],1)})),1)],1),"PROFESSOR"!==e.accountType?s("v-text-field",{ref:"messageField",staticClass:"mt-2",attrs:{label:"Message:",type:"text","no-details":"",outlined:"","append-icon":"mdi-send",loading:e.messageSending,disabled:e.messageSending,"hide-details":""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.sendMessage(t)},"click:append":e.sendMessage},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}):s("v-text-field",{ref:"messageField",staticClass:"mt-2",attrs:{label:"Message:",type:"text","no-details":"",outlined:"","append-icon":"mdi-send","append-outer-icon":"mdi-alert-circle",loading:e.messageSending,disabled:e.messageSending,"hide-details":""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.sendMessage(t)},"click:append-outer":e.sendAlert,"click:append":e.sendMessage},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}})],1)},n=[],i=(s("d3b7"),s("96cf"),s("1da1")),r=s("5530"),o=s("bc3a"),c=s.n(o),l=s("2f62"),d={data:function(){return{loadingOverlay:!1,message:"",messageSending:!1}},computed:Object(r["a"])({},Object(l["b"])({messages:"socket/messages",lab_id:"socket/lab_id",labCode:"socket/labCode",username:"socket/username",accountType:"socket/accountType"})),sockets:{newGroupMessage:function(e){var t=this;this.$store.dispatch("socket/newGroupMessage",e).then((function(){t.scrollToEnd()}))},newGroupAlert:function(e){this.$toast.info(e.message,e.options)}},methods:{scrollToEnd:function(){var e=this.$el.querySelector("#chatWindow");e.scrollTop=e.scrollHeight},sendMessage:function(){var e=this;this.messageSending=!0,!this.message.length>0?(this.$toast.error("Please enter a message"),this.messageSending=!1):c()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n              mutation createMessage($sender: String!, $accountType: accountType!, $text: String!, $lab_id: String!){\n                createMessage(messageInput: {\n                    sender: $sender\n                    accountType: $accountType\n                    text: $text\n                    lab_id: $lab_id\n                }) {\n                    sender\n                    accountType\n                    text\n                    createdAt\n                    labCode\n                }\n              }\n            ",variables:{sender:this.username,accountType:this.accountType,text:this.message,lab_id:this.lab_id}}}).then((function(t){e.message="";var s=t.data.data.createMessage;e.$socket.emit("newGroupMessage",s)})).catch((function(t){if(t.response){e.errorList=t.response.data.errors;for(var s=0;s<e.errorList.length;s++)e.$toast.error(e.errorList[s].message)}else console.log("Error",t.message)})).finally((function(){e.messageSending=!1,e.$nextTick((function(){return e.$refs.messageField.focus()}))}))},sendAlert:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.message.length>0)){t.next=8;break}return e.messageSending=!0,s={labCode:e.labCode,message:e.message,options:{position:"top-right",timeout:!1,hideProgressBar:!0}},t.next=5,e.$socket.emit("alertGroup",s);case 5:a=t.sent,a?(e.message="",e.$toast.success("Alert was sent successfully")):e.$toast.error("Unable to send alert"),e.messageSending=!1;case 8:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.scrollToEnd()}},u=d,g=(s("0790"),s("2877")),p=s("6544"),m=s.n(p),h=s("62ad"),f=s("a523"),y=s("0fd9"),b=s("8dd9"),x=s("8654"),v=Object(g["a"])(u,a,n,!1,null,"2ae0d70d",null);t["default"]=v.exports;m()(v,{VCol:h["a"],VContainer:f["a"],VRow:y["a"],VSheet:b["a"],VTextField:x["a"]})},fc48f:function(e,t,s){}}]);
//# sourceMappingURL=chunk-7067bec0.a6452caa.js.map