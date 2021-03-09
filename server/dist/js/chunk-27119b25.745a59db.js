(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27119b25"],{1681:function(t,e,i){},"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var n=i("5530"),a=i("58df"),s=i("7e2b"),r=i("3206");e["a"]=Object(a["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=i(t)))})):n.valid=i(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},5311:function(t,e,i){"use strict";var n=i("5607"),a=i("2b0e");e["a"]=a["a"].extend({name:"rippleable",directives:{ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"6ca7":function(t,e,i){},8547:function(t,e,i){"use strict";var n=i("2b0e"),a=i("80d2");e["a"]=n["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:a["j"]}}})},"9d26":function(t,e,i){"use strict";var n=i("132d");e["a"]=n["a"]},a306:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-form",{ref:"createLabForm",attrs:{"lazy-validation":""},on:{submit:function(t){t.preventDefault()}}},[i("v-card",[i("v-card-title",[t._v("Create a new lab:")]),i("v-card-text",[i("v-container",[i("v-row",{attrs:{"no-gutter":""}},[i("v-col",[i("v-text-field",{attrs:{rules:t.titleRules,label:"Lab Title:",loading:t.submitted,disabled:t.submitted},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit(e)}},model:{value:t.lab.title,callback:function(e){t.$set(t.lab,"title",e)},expression:"lab.title"}})],1)],1),i("v-row",{attrs:{"no-gutter":""}},[i("v-col",[i("LabHelperField",{attrs:{submitted:t.submitted,labHelpers:t.lab.labHelpers}})],1)],1),i("v-row",{attrs:{"no-gutter":""}},[i("v-col",[i("URLHelperFrield",{attrs:{submitted:t.submitted,URLTitles:t.lab.urlTitles,URLLinks:t.lab.urlLinks}})],1)],1),i("v-row",{attrs:{"no-gutter":""}},[i("v-col",[i("v-textarea",{attrs:{clearable:"","clear-icon":"mdi-close-circle",label:"Description:",loading:t.submitted,disabled:t.submitted},model:{value:t.lab.desc,callback:function(e){t.$set(t.lab,"desc",e)},expression:"lab.desc"}})],1)],1),i("v-row",{attrs:{dense:""}},[i("v-col",[i("v-checkbox",{attrs:{label:"Add Lab Submission Page",dense:""},model:{value:t.lab.submission,callback:function(e){t.$set(t.lab,"submission",e)},expression:"lab.submission"}}),i("v-checkbox",{attrs:{label:"Allow Professor Only Queue Requests",dense:""},model:{value:t.lab.profOnlyQue,callback:function(e){t.$set(t.lab,"profOnlyQue",e)},expression:"lab.profOnlyQue"}})],1)],1),i("v-row",{attrs:{align:"center","no-gutter":""}},[i("v-col",{staticClass:"text-center"},[i("v-btn",{staticClass:"success",attrs:{loading:t.submitted,disabled:t.submitted},on:{click:t.submit}},[t._v("Create Lab ")]),i("ConfirmModal",{ref:"confirm",attrs:{lab:t.lab},on:{confirmed:t.confirmed,cancelled:t.cancelled}})],1)],1)],1)],1)],1)],1)},a=[],s=(i("d3b7"),i("bc3a")),r=i.n(s),o={components:{LabHelperField:function(){return Promise.all([i.e("chunk-75a7ad6a"),i.e("chunk-60f8607a")]).then(i.bind(null,"bd16"))},URLHelperFrield:function(){return Promise.all([i.e("chunk-75a7ad6a"),i.e("chunk-7be77a61")]).then(i.bind(null,"1d2d"))},ConfirmModal:function(){return i.e("chunk-7dd3fd86").then(i.bind(null,"cb6b"))}},data:function(){return{submitted:!1,errorList:void 0,lab:{title:"Test Data",labHelpers:["as317","bd12"],desc:"This is a test description for the lab.\nAcross multiple lines.",urlTitles:["test"],urlLinks:["http://www.google.com"],submission:!1,profOnlyQue:!1},titleRules:[function(t){return!!t||"Required"}],urlRules:[function(t){return/^$|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(t)||"Incorrect Format"}]}},methods:{submit:function(){this.$refs.createLabForm.validate()&&(this.submitted=!0,this.errorList=void 0,this.$refs.confirm.open())},confirmed:function(){var t=this;r()("https://watt-lab-api.herokuapp.com/graphql",{method:"POST",data:{query:"\n              mutation createLab ($title: String!, $helpers: [String!]!, $desc: String!, $urlTitles: [String!]!, $urLinks: [String!]!, $submission: Boolean!, $profOnlyQue: Boolean!){\n                createLab(labInput: {title: $title, helpers: $helpers, desc: $desc, urlTitles: $urlTitles, urlLinks: $urLinks, submission: $submission, profOnlyQue: $profOnlyQue})\n              }\n          ",variables:{title:this.lab.title,helpers:this.lab.labHelpers,desc:this.lab.desc,urlTitles:this.lab.urlTitles,urLinks:this.lab.urlLinks,submission:this.lab.submission,profOnlyQue:this.lab.profOnlyQue}},headers:{Authorization:"Bearer ".concat(this.$store.state.prof.token)}}).then((function(){t.$toast.success("Lab Created!"),t.$router.push("/viewLabs")})).catch((function(e){if(e.response){t.errorList=e.response.data.errors;for(var i=0;i<t.errorList.length;i++)t.$toast.error(t.errorList[i].message)}else console.log("Error",e.message)})).finally((function(){t.submitted=!1}))},cancelled:function(){this.submitted=!1}}},l=o,u=i("2877"),c=i("6544"),d=i.n(c),h=i("8336"),p=i("b0af"),f=i("99d9"),b=i("ac7c"),m=i("62ad"),v=i("a523"),g=i("4bd4"),w=i("0fd9"),k=i("8654"),y=i("a844"),$=Object(u["a"])(l,n,a,!1,null,null,null);e["default"]=$.exports;d()($,{VBtn:h["a"],VCard:p["a"],VCardText:f["c"],VCardTitle:f["d"],VCheckbox:b["a"],VCol:m["a"],VContainer:v["a"],VForm:g["a"],VRow:w["a"],VTextField:k["a"],VTextarea:y["a"]})},a844:function(t,e,i){"use strict";i("a9e3");var n=i("5530"),a=(i("1681"),i("8654")),s=i("58df"),r=Object(s["a"])(a["a"]);e["a"]=r.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(n["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},a["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){a["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},ac7c:function(t,e,i){"use strict";i("d3b7"),i("25f0");var n=i("5530"),a=(i("6ca7"),i("ec29"),i("9d26")),s=i("c37a"),r=i("fe09");e["a"]=r["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},dc22:function(t,e,i){"use strict";function n(t,e){var i=e.value,n=e.options||{passive:!0};window.addEventListener("resize",i,n),t._onResize={callback:i,options:n},e.modifiers&&e.modifiers.quiet||i()}function a(t){if(t._onResize){var e=t._onResize,i=e.callback,n=e.options;window.removeEventListener("resize",i,n),delete t._onResize}}var s={inserted:n,unbind:a};e["a"]=s},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i("4de4"),i("45fc"),i("d3b7"),i("25f0");var n=i("c37a"),a=i("5311"),s=i("8547"),r=i("58df");function o(t){t.preventDefault()}e["a"]=Object(r["a"])(n["a"],a["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:o},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:o},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===n&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-27119b25.745a59db.js.map