(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3eef5ff3"],{"166a":function(t,e,i){},"604c":function(t,e,i){"use strict";i.d(e,"a",(function(){return u}));i("4de4"),i("7db0"),i("c740"),i("4160"),i("caad"),i("c975"),i("fb6a"),i("a434"),i("a9e3"),i("2532"),i("159b");var n=i("5530"),a=(i("166a"),i("a452")),s=i("7560"),r=i("58df"),l=i("d9bd"),u=Object(r["a"])(a["a"],s["a"]).extend({name:"base-item-group",props:{activeClass:{type:String,default:"v-item--active"},mandatory:Boolean,max:{type:[Number,String],default:null},multiple:Boolean},data:function(){return{internalLazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,items:[]}},computed:{classes:function(){return Object(n["a"])({"v-item-group":!0},this.themeClasses)},selectedIndex:function(){return this.selectedItem&&this.items.indexOf(this.selectedItem)||-1},selectedItem:function(){if(!this.multiple)return this.selectedItems[0]},selectedItems:function(){var t=this;return this.items.filter((function(e,i){return t.toggleMethod(t.getValue(e,i))}))},selectedValues:function(){return null==this.internalValue?[]:Array.isArray(this.internalValue)?this.internalValue:[this.internalValue]},toggleMethod:function(){var t=this;if(!this.multiple)return function(e){return t.internalValue===e};var e=this.internalValue;return Array.isArray(e)?function(t){return e.includes(t)}:function(){return!1}}},watch:{internalValue:"updateItemsState",items:"updateItemsState"},created:function(){this.multiple&&!Array.isArray(this.internalValue)&&Object(l["c"])("Model must be bound to an array if the multiple property is true.",this)},methods:{genData:function(){return{class:this.classes}},getValue:function(t,e){return null==t.value||""===t.value?e:t.value},onClick:function(t){this.updateInternalValue(this.getValue(t,this.items.indexOf(t)))},register:function(t){var e=this,i=this.items.push(t)-1;t.$on("change",(function(){return e.onClick(t)})),this.mandatory&&!this.selectedValues.length&&this.updateMandatory(),this.updateItem(t,i)},unregister:function(t){if(!this._isDestroyed){var e=this.items.indexOf(t),i=this.getValue(t,e);this.items.splice(e,1);var n=this.selectedValues.indexOf(i);if(!(n<0)){if(!this.mandatory)return this.updateInternalValue(i);this.multiple&&Array.isArray(this.internalValue)?this.internalValue=this.internalValue.filter((function(t){return t!==i})):this.internalValue=void 0,this.selectedItems.length||this.updateMandatory(!0)}}},updateItem:function(t,e){var i=this.getValue(t,e);t.isActive=this.toggleMethod(i)},updateItemsState:function(){var t=this;this.$nextTick((function(){if(t.mandatory&&!t.selectedItems.length)return t.updateMandatory();t.items.forEach(t.updateItem)}))},updateInternalValue:function(t){this.multiple?this.updateMultiple(t):this.updateSingle(t)},updateMandatory:function(t){if(this.items.length){var e=this.items.slice();t&&e.reverse();var i=e.find((function(t){return!t.disabled}));if(i){var n=this.items.indexOf(i);this.updateInternalValue(this.getValue(i,n))}}},updateMultiple:function(t){var e=Array.isArray(this.internalValue)?this.internalValue:[],i=e.slice(),n=i.findIndex((function(e){return e===t}));this.mandatory&&n>-1&&i.length-1<1||null!=this.max&&n<0&&i.length+1>this.max||(n>-1?i.splice(n,1):i.push(t),this.internalValue=i)},updateSingle:function(t){var e=t===this.internalValue;this.mandatory&&e||(this.internalValue=e?void 0:t)}},render:function(t){return t("div",this.genData(),this.$slots.default)}});u.extend({name:"v-item-group",provide:function(){return{itemGroup:this}}})},"9d26":function(t,e,i){"use strict";var n=i("132d");e["a"]=n["a"]},a434:function(t,e,i){"use strict";var n=i("23e7"),a=i("23cb"),s=i("a691"),r=i("50c4"),l=i("7b0b"),u=i("65f0"),d=i("8418"),o=i("1dde"),c=i("ae40"),h=o("splice"),f=c("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,p=Math.min,v=9007199254740991,g="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!h||!f},{splice:function(t,e){var i,n,o,c,h,f,V=l(this),y=r(V.length),I=a(t,y),x=arguments.length;if(0===x?i=n=0:1===x?(i=0,n=y-I):(i=x-2,n=p(m(s(e),0),y-I)),y+i-n>v)throw TypeError(g);for(o=u(V,n),c=0;c<n;c++)h=I+c,h in V&&d(o,c,V[h]);if(o.length=n,i<n){for(c=I;c<y-n;c++)h=c+n,f=c+i,h in V?V[f]=V[h]:delete V[f];for(c=y;c>y-n+i;c--)delete V[c-1]}else if(i>n)for(c=y-n;c>I;c--)h=c+n-1,f=c+i-1,h in V?V[f]=V[h]:delete V[f];for(c=0;c<i;c++)V[c+I]=arguments[c+2];return V.length=y-n+i,o}})},c740:function(t,e,i){"use strict";var n=i("23e7"),a=i("b727").findIndex,s=i("44d2"),r=i("ae40"),l="findIndex",u=!0,d=r(l);l in[]&&Array(1)[l]((function(){u=!1})),n({target:"Array",proto:!0,forced:u||!d},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),s(l)},f8cf:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-list",{staticStyle:{height:"calc(100vh - 360px)","overflow-y":"scroll"},attrs:{width:"100%","two-line":"",subheader:"",dense:""}},[t._l(t.messages,(function(e,n){return[n%2==1?i("v-divider",{key:n}):i("v-list-item",{key:n},[i("v-list-item-content",[i("v-list-item-title",{staticClass:"text-wrap"},[t._v(" "+t._s(e.text)+" ")]),i("v-list-item-subtitle",[i("span",{staticClass:"purple--text"},[t._v(t._s(e.sender))]),t._v(" - "+t._s(t._f("moment")(e.createdAt,"kk:mm"))+" ")])],1)],1)]}))],2)],1)},a=[],s={props:["messages"],data:function(){return{}}},r=s,l=i("2877"),u=i("6544"),d=i.n(u),o=i("ce7e"),c=i("8860"),h=i("da13"),f=i("5d23"),m=Object(l["a"])(r,n,a,!1,null,null,null);e["default"]=m.exports;d()(m,{VDivider:o["a"],VList:c["a"],VListItem:h["a"],VListItemContent:f["a"],VListItemSubtitle:f["b"],VListItemTitle:f["c"]})}}]);
//# sourceMappingURL=chunk-3eef5ff3.ec6007ae.js.map