(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0da6d8"],{"6c0e":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-container",{attrs:{"no-gutters":""}},[i("v-row",[i("v-col",{attrs:{cols:"12",align:"center",justify:"center"}},[e._v(" People in que: "),i("span",{staticClass:"purple--text lighten-text-1"},[e._v(e._s(e.queLength))]),i("br"),e._v(" Average Wait Time: "),i("span",{staticClass:"purple--text lighten-text-1"},[e._v(e._s(e.queTime))])])],1),i("v-row",[i("v-col",{attrs:{cols:"12",align:"center",justify:"center"}},[i("v-btn",{attrs:{loading:e.waiting,disabled:e.waiting},on:{click:e.getHelp}},[e._v("Get Help")])],1)],1),e.waiting?i("v-row",[i("v-col",{attrs:{cols:"12",align:"center",justify:"center"}},[e._v(" You are "),i("span",{staticClass:"purple--text lighten-text-1"},[e._v(e._s(e.quePosition))]),e._v(" in the que "),i("br"),e._v(" "+e._s(e.formattedElapsedTime)),i("br"),i("v-btn",{staticClass:"deep-orange lighten-2",attrs:{dark:""},on:{click:e.cancelHelp}},[i("v-icon",{staticClass:"mr-1"},[e._v("mdi-cancel")]),e._v("Cancel ")],1)],1)],1):e._e()],1)},n=[],s=(i("c975"),i("d3b7"),i("25f0"),i("5530")),r=i("bc3a"),o=i.n(r),c=i("2f62"),l={data:function(){return{elapsedTime:0,timer:void 0,waiting:!1,que:[]}},computed:Object(s["a"])(Object(s["a"])({},Object(c["b"])({lab_id:"socket/lab_id",labCode:"socket/labCode",username:"socket/username",privateChat:"socket/privateChat",gettingSupport:"socket/gettingSupport",queWaiting:"socket/queWaiting"})),{},{formattedElapsedTime:function(){var e=new Date(null);e.setSeconds(this.elapsedTime/1e3);var t=e.toUTCString();return t.substr(t.indexOf(":")+1,5)},quePosition:function(){if(this.que.length>0){var e;switch(this.que.indexOf(this.$socket.id)){case 0:e="1st";break;case 1:e="2nd";break;case 2:e="3rd";break;default:e=(this.que.indexOf(this.$socket.id)+1).toString()+"th"}return e}return null},queLength:function(){return this.que.length},queTime:function(){return"x:xx"}}),methods:{getHelp:function(){var e=this;this.waiting=!0,this.timer=setInterval((function(){e.elapsedTime+=1e3}),1e3);var t={lab_id:this.lab_id,labCode:this.labCode,socketid:this.$socket.id};this.$store.dispatch("socket/joinQue").then((function(){e.$socket.emit("joinQue",t)}))},cancelHelp:function(){var e=this;this.waiting=!1;var t={lab_id:this.lab_id,labCode:this.labCode,socketid:this.$socket.id};this.$store.dispatch("socket/leaveQue").then((function(){e.$socket.emit("leaveQue",t),clearInterval(e.timer),e.elapsedTime=0}))}},sockets:{updateQue:function(e){this.que=e},startHelp:function(e){var t=this;this.$store.dispatch("socket/privateChatInfo",e).then((function(){var e={sendTo:t.gettingSupport.reciever,reciever:t.$socket.id,privateChat:t.privateChat};t.$socket.emit("startHelper",e)}))}},mounted:function(){var e=this;o()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n              query getQue($lab_id: ID!){\n                getQue(lab_id: $lab_id)\n              }\n            ",variables:{lab_id:this.lab_id}}}).then((function(t){e.que=t.data.data.getQue})).catch((function(t){if(t.response){e.errorList=t.response.data.errors;for(var i=0;i<e.errorList.length;i++)e.$toast.error(e.errorList[i].message)}else console.log("Error",t.message)}))}},u=l,d=i("2877"),h=i("6544"),p=i.n(h),v=i("8336"),g=i("62ad"),b=i("a523"),f=i("132d"),k=i("0fd9"),m=Object(d["a"])(u,a,n,!1,null,null,null);t["default"]=m.exports;p()(m,{VBtn:v["a"],VCol:g["a"],VContainer:b["a"],VIcon:f["a"],VRow:k["a"]})}}]);
//# sourceMappingURL=chunk-2d0da6d8.7cb0267a.js.map