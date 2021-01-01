<template>
  <v-container fluid class="px-4">
    <v-row>
      <v-col cols="12" class="rounded teal lighten-2" justify="center">
        <span class="white--text text-h5">
          You are being helped by: {{ helper.name }}
        </span>
        <v-btn class="float-right"> Close Help </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="6" class="px-1">
              <v-select
                :items="modes"
                v-model="defaultMode"
                item-text="name"
                item-value="mode"
                label="Select a language:"
              ></v-select>
            </v-col>
            <v-col cols="6" class="px-1">
              <v-select
                :items="themes"
                v-model="defaultTheme"
                item-text="name"
                item-value="theme"
                label="Select a theme:"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <textarea id="editor"> </textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="6">
        <div>
          <v-sheet
            id="chatWindow"
            color="grey lighten-4"
            class="rounded border"
            style="overflow-y: auto; height: calc(100vh - 350px)"
          >
            <v-container fluid>
              <v-row
                v-for="(msg, i) in messages"
                :key="i"
                class="my-2"
                align="center"
                no-gutters
              >
                <v-col cols="12">
                  <div v-if="msg.sender === username" class="wrapperRight">
                    <div class="mx-2 text-bubble lighten-4 deep-orange">
                      {{ msg.text }}
                    </div>
                    <div style="white-space: nowrap">
                      <span class="ml-2 grey--text text--lighten-1">
                        {{ msg.createdAt | moment("HH:MM") }}
                        <span
                          class="text-lighten-2"
                          :class="[
                            msg.accountType === 'STUDENT' ? 'green--text' : '',
                            msg.accountType === 'HELPER' ? 'orange--text' : '',
                            msg.accountType === 'PROFESSOR'
                              ? 'purple--text'
                              : '',
                          ]"
                          >({{ msg.accountType }})</span
                        >
                      </span>
                      <span class="ml-2">{{ msg.sender }}:</span>
                    </div>
                  </div>
                  <div v-else class="wrapperLeft">
                    <div style="white-space: nowrap">
                      <span class="ml-2 grey--text text--lighten-1">
                        {{ msg.createdAt | moment("HH:MM") }}
                        <span
                          class="text-lighten-2"
                          :class="[
                            msg.accountType === 'STUDENT' ? 'green--text' : '',
                            msg.accountType === 'HELPER' ? 'orange--text' : '',
                            msg.accountType === 'PROFESSOR'
                              ? 'purple--text'
                              : '',
                          ]"
                          >({{ msg.accountType }})</span
                        >
                      </span>
                      <span class="ml-2">{{ msg.sender }}:</span>
                    </div>
                    <div class="mx-2 text-bubble lighten-4 blue">
                      {{ msg.text }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
          <v-text-field
            v-model="message"
            label="Message:"
            type="text"
            no-details
            outlined
            append-icon="mdi-send"
            @keyup.enter="sendMessage"
            @click:append="sendMessage"
            :loading="messageSending"
            :disabled="messageSending"
            hide-details
            class="mt-2"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CodeMirror from "codemirror";
import { mapGetters } from "vuex";

// Code Mirror Lib
import "codemirror/lib/codemirror.css";
// Code Mirror Themes
import "codemirror/theme/eclipse.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/monokai.css";
// Code Mirror Modes
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
// Code Mirror Addons
import "codemirror/addon/display/fullscreen.js";
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";

export default {
  data() {
    return {
      modes: [
        { name: "Java", mode: "text/x-java" },
        { name: "Java-Script", mode: "text/javascript" },
      ],
      defaultMode: {
        name: "Java",
        mode: "text/x-java",
      },
      themes: [
        { name: "Abcdef", theme: "abcdef" },
        { name: "Colorforth", theme: "colorforth" },
        { name: "Eclipse", theme: "eclipse" },
        { name: "Lucario", theme: "lucario" },
        { name: "Monokai", theme: "monokai" },
      ],
      defaultTheme: {
        name: "Eclipse",
        theme: "eclipse",
      },
      loadingOverlay: false,
      message: "",
      messageSending: false,
      messages: [],
      helper: {
        name: "as317",
        socketid: "24234234234",
      },
    };
  },
  computed: {
    ...mapGetters({
      username: "socket/username",
      accountType: "socket/accountType",
    }),
  },
  watch: {
    defaultMode: (v) => {
      document.querySelector(".CodeMirror").CodeMirror.setOption("mode", v);
    },
    defaultTheme: (v) => {
      document.querySelector(".CodeMirror").CodeMirror.setOption("theme", v);
    },
  },
  sockets: {},
  methods: {
    scrollToEnd() {
      let container = this.$el.querySelector("#chatWindow");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      this.messageSending = true;
    },
  },
  mounted() {
    this.scrollToEnd();
    console.log(this.defaultTheme.theme);
    CodeMirror.fromTextArea(document.getElementById("editor"), {
      value: "let i = 0;",
      mode: this.defaultMode.mode,
      theme: this.defaultTheme.theme,
      autoRefresh: true,
      tabSize: 2,
      lineWrapping: true,
      lineNumbers: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      styleActiveLine: true,
      fullScreen: false,
      extraKeys: {
        F11: function (cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        Esc: function (cm) {
          cm.setOption("fullScreen", false);
        },
      },
    }).on("change", (editor) => {
      this.$socket.emit("codeChange", editor.getValue());
    });
  },
};
</script>

<style scoped>
.wrapperLeft {
  display: flex;
  align-items: center;
}
.wrapperRight {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapperRight:first-of-type > div:last-child {
  order: -1;
}

.text-bubble {
  border-radius: 20px;
  max-width: 60%;
  padding: 8px 15px;
}
</style>

<style>
.CodeMirror {
  height: calc(100vh - 380px) !important;
  border: 1px solid grey !important;
}
.CodeMirror-fullscreen {
  width: 100% !important;
  height: 100% !important;
}
</style>