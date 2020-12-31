<template>
  <codemirror v-model="code" :options="cmOption" />
</template>

<script>
  import dedent from 'dedent'
  import { codemirror } from 'vue-codemirror'

  // language
  import 'codemirror/mode/javascript/javascript.js'

  // theme css
  import 'codemirror/theme/monokai.css'

  // require active-line.js
  import'codemirror/addon/selection/active-line.js'

  // styleSelectedText
  import'codemirror/addon/selection/mark-selection.js'
  import'codemirror/addon/search/searchcursor.js'

  // hint
  import'codemirror/addon/hint/show-hint.js'
  import'codemirror/addon/hint/show-hint.css'
  import'codemirror/addon/hint/javascript-hint.js'
  import'codemirror/addon/selection/active-line.js'

  // highlightSelectionMatches
  import'codemirror/addon/scroll/annotatescrollbar.js'
  import'codemirror/addon/search/matchesonscrollbar.js'
  import'codemirror/addon/search/searchcursor.js'
  import'codemirror/addon/search/match-highlighter.js'

  // keyMap
  import'codemirror/mode/clike/clike.js'
  import'codemirror/addon/edit/matchbrackets.js'
  import'codemirror/addon/comment/comment.js'
  import'codemirror/addon/dialog/dialog.js'
  import'codemirror/addon/dialog/dialog.css'
  import'codemirror/addon/search/searchcursor.js'
  import'codemirror/addon/search/search.js'
  import'codemirror/keymap/sublime.js'

  // foldGutter
  import'codemirror/addon/fold/foldgutter.css'
  import'codemirror/addon/fold/brace-fold.js'
  import'codemirror/addon/fold/comment-fold.js'
  import'codemirror/addon/fold/foldcode.js'
  import'codemirror/addon/fold/foldgutter.js'
  import'codemirror/addon/fold/indent-fold.js'
  import'codemirror/addon/fold/markdown-fold.js'
  import'codemirror/addon/fold/xml-fold.js'
  
  export default {
    name: 'codemirror-example-javascript',
    title: 'Mode: text/javascript & Theme: monokai',
    components: {
      codemirror
    },
    data() {
      return {
        code: dedent`
          import someResource from 'codemirror/some-resource'
          export default {
            data () {
              // è¿æ¯ä¸ä¸ªåå«ãä»£ç æç¤ºãæå ãéä¸­ãsublimeæ¨¡å¼...çç¼è¾å¨
              // æä¸Ctrlé®å¯ä»¥ä½éªä»£ç æç¤º
              // å¯ä»¥å°è¯sublimeä¸çå¿«æ·é®æä½
              return {
                exampleCode: 'const a = 10',
                cmOption: {
                  tabSize: 4,
                  styleActiveLine: true,
                  lineNumbers: true,
                  line: true,
                  mode: 'text/javascript',
                  lineWrapping: true,
                  theme: 'default'
                }
              }
            },
            components: examples
          }
        `,
        cmOption: {
          tabSize: 4,
          styleActiveLine: false,
          lineNumbers: true,
          styleSelectedText: false,
          line: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          mode: 'text/javascript',
          // hint.js options
          hintOptions:{
            // å½å¹éåªæä¸é¡¹çæ¶åæ¯å¦èªå¨è¡¥å¨
            completeSingle: false
          },
          //å¿«æ·é® å¯æä¾ä¸ç§æ¨¡å¼ sublimeãemacsãvim
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "monokai",
          extraKeys: { "Ctrl": "autocomplete" }
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.styleSelectedText = true,
        this.cmOption.styleActiveLine = true
      }, 1800)
    }
  }
</script>

<style>
  .CodeMirror-focused .cm-matchhighlight {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVQI12NgYGBgkKzc8x9CMDAwAAAmhwSbidEoSQAAAABJRU5ErkJggg==);
    background-position: bottom;
    background-repeat: repeat-x;
  }
  .cm-matchhighlight {
    background-color: lightgreen;
  }
  .CodeMirror-selection-highlight-scrollbar {
    background-color: green;
  }
</style>