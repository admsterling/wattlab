(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ea31338"],{"166a":function(t,e,i){},"604c":function(t,e,i){"use strict";i.d(e,"a",(function(){return u}));i("4de4"),i("7db0"),i("c740"),i("4160"),i("caad"),i("c975"),i("fb6a"),i("a434"),i("a9e3"),i("2532"),i("159b");var r=i("5530"),n=(i("166a"),i("a452")),a=i("7560"),s=i("58df"),o=i("d9bd"),u=Object(s["a"])(n["a"],a["a"]).extend({name:"base-item-group",props:{activeClass:{type:String,default:"v-item--active"},mandatory:Boolean,max:{type:[Number,String],default:null},multiple:Boolean},data:function(){return{internalLazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,items:[]}},computed:{classes:function(){return Object(r["a"])({"v-item-group":!0},this.themeClasses)},selectedIndex:function(){return this.selectedItem&&this.items.indexOf(this.selectedItem)||-1},selectedItem:function(){if(!this.multiple)return this.selectedItems[0]},selectedItems:function(){var t=this;return this.items.filter((function(e,i){return t.toggleMethod(t.getValue(e,i))}))},selectedValues:function(){return null==this.internalValue?[]:Array.isArray(this.internalValue)?this.internalValue:[this.internalValue]},toggleMethod:function(){var t=this;if(!this.multiple)return function(e){return t.internalValue===e};var e=this.internalValue;return Array.isArray(e)?function(t){return e.includes(t)}:function(){return!1}}},watch:{internalValue:"updateItemsState",items:"updateItemsState"},created:function(){this.multiple&&!Array.isArray(this.internalValue)&&Object(o["c"])("Model must be bound to an array if the multiple property is true.",this)},methods:{genData:function(){return{class:this.classes}},getValue:function(t,e){return null==t.value||""===t.value?e:t.value},onClick:function(t){this.updateInternalValue(this.getValue(t,this.items.indexOf(t)))},register:function(t){var e=this,i=this.items.push(t)-1;t.$on("change",(function(){return e.onClick(t)})),this.mandatory&&!this.selectedValues.length&&this.updateMandatory(),this.updateItem(t,i)},unregister:function(t){if(!this._isDestroyed){var e=this.items.indexOf(t),i=this.getValue(t,e);this.items.splice(e,1);var r=this.selectedValues.indexOf(i);if(!(r<0)){if(!this.mandatory)return this.updateInternalValue(i);this.multiple&&Array.isArray(this.internalValue)?this.internalValue=this.internalValue.filter((function(t){return t!==i})):this.internalValue=void 0,this.selectedItems.length||this.updateMandatory(!0)}}},updateItem:function(t,e){var i=this.getValue(t,e);t.isActive=this.toggleMethod(i)},updateItemsState:function(){var t=this;this.$nextTick((function(){if(t.mandatory&&!t.selectedItems.length)return t.updateMandatory();t.items.forEach(t.updateItem)}))},updateInternalValue:function(t){this.multiple?this.updateMultiple(t):this.updateSingle(t)},updateMandatory:function(t){if(this.items.length){var e=this.items.slice();t&&e.reverse();var i=e.find((function(t){return!t.disabled}));if(i){var r=this.items.indexOf(i);this.updateInternalValue(this.getValue(i,r))}}},updateMultiple:function(t){var e=Array.isArray(this.internalValue)?this.internalValue:[],i=e.slice(),r=i.findIndex((function(e){return e===t}));this.mandatory&&r>-1&&i.length-1<1||null!=this.max&&r<0&&i.length+1>this.max||(r>-1?i.splice(r,1):i.push(t),this.internalValue=i)},updateSingle:function(t){var e=t===this.internalValue;this.mandatory&&e||(this.internalValue=e?void 0:t)}},render:function(t){return t("div",this.genData(),this.$slots.default)}});u.extend({name:"v-item-group",provide:function(){return{itemGroup:this}}})},"8ce9":function(t,e,i){},"9d26":function(t,e,i){"use strict";var r=i("132d");e["a"]=r["a"]},"9d65":function(t,e,i){"use strict";var r=i("d9bd"),n=i("2b0e");e["a"]=n["a"].extend().extend({name:"bootable",props:{eager:Boolean},data:function(){return{isBooted:!1}},computed:{hasContent:function(){return this.isBooted||this.eager||this.isActive}},watch:{isActive:function(){this.isBooted=!0}},created:function(){"lazy"in this.$attrs&&Object(r["e"])("lazy",this)},methods:{showLazyContent:function(t){return this.hasContent&&t?t():[this.$createElement()]}}})},a434:function(t,e,i){"use strict";var r=i("23e7"),n=i("23cb"),a=i("a691"),s=i("50c4"),o=i("7b0b"),u=i("65f0"),l=i("8418"),c=i("1dde"),d=i("ae40"),h=c("splice"),f=d("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,m=Math.min,v=9007199254740991,g="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!h||!f},{splice:function(t,e){var i,r,c,d,h,f,V=o(this),y=s(V.length),b=n(t,y),x=arguments.length;if(0===x?i=r=0:1===x?(i=0,r=y-b):(i=x-2,r=m(p(a(e),0),y-b)),y+i-r>v)throw TypeError(g);for(c=u(V,r),d=0;d<r;d++)h=b+d,h in V&&l(c,d,V[h]);if(c.length=r,i<r){for(d=b;d<y-r;d++)h=d+r,f=d+i,h in V?V[f]=V[h]:delete V[f];for(d=y;d>y-r+i;d--)delete V[d-1]}else if(i>r)for(d=y-r;d>b;d--)h=d+r-1,f=d+i-1,h in V?V[f]=V[h]:delete V[f];for(d=0;d<i;d++)V[d+b]=arguments[d+2];return V.length=y-r+i,c}})},c66d:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{align:"center"}},[i("v-card",{attrs:{"max-width":"700px"}},[i("v-card-title",[t._v("Approve / Reject New Professors")]),i("v-divider"),i("v-card-text",{staticStyle:{height:"calc(100vh - 200px)","overflow-y":"auto"},attrs:{align:"center"}},[i("v-list",{attrs:{"two-line":""}},t._l(t.profs,(function(e,r){return i("v-list-item",{key:r},[i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:t._s(t.name(e.fname,e.lname))}}),i("v-list-item-subtitle",{domProps:{textContent:t._s(e.email)}})],1),i("v-list-item-action",[i("v-btn",{staticClass:"my-1 green white--text",attrs:{width:"120px"},on:{click:function(i){return t.approve(e._id)}}},[t._v(" Approve "),i("v-icon",[t._v("mdi-check")])],1),i("v-btn",{staticClass:"my-1 red white--text",attrs:{width:"120px"},on:{click:function(i){return t.reject(e._id)}}},[t._v(" Reject "),i("v-icon",[t._v("mdi-close")])],1)],1)],1)})),1)],1)],1)],1)},n=[],a=(i("c975"),i("d81d"),i("a434"),i("bc3a")),s=i.n(a),o={data:function(){return{profs:[]}},methods:{name:function(t,e){return t+" "+e},approve:function(t){var e=this;s()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n            mutation approveProf($prof_id: ID!){\n                approveProf(prof_id: $prof_id)\n            }\n            ",variables:{prof_id:t}},headers:{Authorization:"Bearer ".concat(this.$store.state.prof.token)}}).then((function(){e.$toast.success("Account Approved"),e.removeLocal(t)})).catch((function(t){if(t.response){e.errorList=t.response.data.errors;for(var i=0;i<e.errorList.length;i++)e.$toast.error(e.errorList[i].message)}else console.log("Error",t.message)}))},reject:function(t){var e=this;console.log(t),s()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n            mutation rejectProf($prof_id: ID!){\n                rejectProf(prof_id: $prof_id)\n            }\n            ",variables:{prof_id:t}},headers:{Authorization:"Bearer ".concat(this.$store.state.prof.token)}}).then((function(){e.$toast.success("Account Rejected"),e.removeLocal(t)})).catch((function(t){if(t.response){e.errorList=t.response.data.errors;for(var i=0;i<e.errorList.length;i++)e.$toast.error(e.errorList[i].message)}else console.log("Error",t.message)}))},removeLocal:function(t){var e=this.profs.map((function(t){return t._id})).indexOf(t);this.profs.splice(e,1)}},created:function(){"cd32@hw.ac.uk"!==this.$store.state.prof.profData.email&&(this.$toast.error("You do not have permission to approve / reject new accounts"),this.$router.push("/viewLabs"))},mounted:function(){var t=this;s()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n            query getAccounts{\n                getAccounts{\n                  _id\n                  fname\n                  lname\n                  email\n                }\n            }\n            "},headers:{Authorization:"Bearer ".concat(this.$store.state.prof.token)}}).then((function(e){t.profs=e.data.data.getAccounts})).catch((function(e){if(e.response){t.errorList=e.response.data.errors;for(var i=0;i<t.errorList.length;i++)t.$toast.error(t.errorList[i].message)}else console.log("Error",e.message)}))}},u=o,l=i("2877"),c=i("6544"),d=i.n(c),h=i("8336"),f=i("b0af"),p=i("99d9"),m=i("ce7e"),v=i("132d"),g=i("8860"),V=i("da13"),y=i("1800"),b=i("5d23"),x=Object(l["a"])(u,r,n,!1,null,null,null);e["default"]=x.exports;d()(x,{VBtn:h["a"],VCard:f["a"],VCardText:p["c"],VCardTitle:p["d"],VDivider:m["a"],VIcon:v["a"],VList:g["a"],VListItem:V["a"],VListItemAction:y["a"],VListItemContent:b["a"],VListItemSubtitle:b["b"],VListItemTitle:b["c"]})},c740:function(t,e,i){"use strict";var r=i("23e7"),n=i("b727").findIndex,a=i("44d2"),s=i("ae40"),o="findIndex",u=!0,l=s(o);o in[]&&Array(1)[o]((function(){u=!1})),r({target:"Array",proto:!0,forced:u||!l},{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),a(o)},ce7e:function(t,e,i){"use strict";var r=i("5530"),n=(i("8ce9"),i("7560"));e["a"]=n["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(r["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(r["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})}}]);
//# sourceMappingURL=chunk-4ea31338.fba0c7e8.js.map