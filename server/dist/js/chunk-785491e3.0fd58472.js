(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-785491e3"],{6808:function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("v-container",[i("v-row",[i("v-col"),i("v-col",{staticClass:"text-center",attrs:{cols:"8",lg:"6",xl:"5"}},[i("v-card",[i("v-card-title",{staticClass:"text-uppercase grey--text justify-center"},[i("span",{staticClass:"font-weight-light"},[t._v("watt")]),i("span",[t._v("lab")])]),i("v-tabs",{attrs:{"fixed-tabs":"",dark:"","background-color":"teal lighten-1"},model:{value:t.tab,callback:function(n){t.tab=n},expression:"tab"}},[i("v-tab",{attrs:{disabled:t.tabDisable}},[t._v("Student / Helper")]),i("v-tab",{attrs:{disabled:t.tabDisable}},[t._v("Teacher")])],1),i("v-tabs-items",{staticClass:"py-2 px-6",model:{value:t.tab,callback:function(n){t.tab=n},expression:"tab"}},[i("v-tab-item",[i("StudentHelperLogin",{on:{"flip-tabs":t.flipTabs}})],1),i("v-tab-item",[i("ProfessorLogin",{on:{"flip-tabs":t.flipTabs}})],1)],1)],1)],1),i("v-col")],1)],1)],1)},o=[],s=(i("d3b7"),{components:{StudentHelperLogin:function(){return Promise.all([i.e("chunk-41d3db51"),i.e("chunk-ccdc5c30"),i.e("chunk-5794971e")]).then(i.bind(null,"bfbe"))},ProfessorLogin:function(){return Promise.all([i.e("chunk-41d3db51"),i.e("chunk-ef9fcc88")]).then(i.bind(null,"344d"))}},data:function(){return{tab:null,tabDisable:!1}},methods:{flipTabs:function(){this.tabDisable=!this.tabDisable}},mounted:function(){this.$store.getters["prof/isLoggedIn"]?this.$router.push("/prof"):this.$store.dispatch("socket/resetState")},created:function(){var t=Object({NODE_ENV:"production",VUE_APP_ENDPOINT:"https://watt-lab-api.herokuapp.com/graphql",BASE_URL:"/"}).VUE_APP_DEV_FLAG||!1;this.$isMobile()&&!t&&this.$router.push("/mobile")}}),a=s,r=i("2877"),d=i("6544"),c=i.n(d),u=i("b0af"),l=i("99d9"),h=i("62ad"),f=i("a523"),p=i("0fd9"),b=i("71a3"),v=i("c671"),w=i("fe57"),m=i("aac8"),T=Object(r["a"])(a,e,o,!1,null,null,null);n["default"]=T.exports;c()(T,{VCard:u["a"],VCardTitle:l["d"],VCol:h["a"],VContainer:f["a"],VRow:p["a"],VTab:b["a"],VTabItem:v["a"],VTabs:w["a"],VTabsItems:m["a"]})},"9d65":function(t,n,i){"use strict";var e=i("d9bd"),o=i("2b0e");n["a"]=o["a"].extend().extend({name:"bootable",props:{eager:Boolean},data:function(){return{isBooted:!1}},computed:{hasContent:function(){return this.isBooted||this.eager||this.isActive}},watch:{isActive:function(){this.isBooted=!0}},created:function(){"lazy"in this.$attrs&&Object(e["e"])("lazy",this)},methods:{showLazyContent:function(t){return this.hasContent&&t?t():[this.$createElement()]}}})},c671:function(t,n,i){"use strict";var e=i("9d65"),o=i("4e82"),s=i("c3f0"),a=i("80d2"),r=i("58df"),d=Object(r["a"])(e["a"],Object(o["a"])("windowGroup","v-window-item","v-window")),c=d.extend().extend().extend({name:"v-window-item",directives:{Touch:s["a"]},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?"undefined"!==typeof this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:"undefined"!==typeof this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(a["g"])(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var n=this;this.inTransition&&this.$nextTick((function(){n.computedTransition&&n.inTransition&&(n.windowGroup.transitionHeight=Object(a["g"])(t.clientHeight))}))}},render:function(t){var n=this;return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((function(){return[n.genWindowItem()]})))}});n["a"]=c.extend({name:"v-tab-item",props:{id:String},methods:{genWindowItem:function(){var t=c.options.methods.genWindowItem.call(this);return t.data.domProps=t.data.domProps||{},t.data.domProps.id=this.id||this.value,t}}})}}]);
//# sourceMappingURL=chunk-785491e3.0fd58472.js.map