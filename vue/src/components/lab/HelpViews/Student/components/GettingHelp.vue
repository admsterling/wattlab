<template>
  <v-container>
    <v-row class="mx-4">
      <v-col cols="12" class="rounded teal lighten-2" justify="center">
        <span class="white--text text-h5">
          You are chatting with: {{ helper.name }}</span
        >
        <v-btn class="float-right"> Close Help </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div class="codeArea">
          <textarea id="editor">
          </textarea>
        </div>
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

require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css");
require("codemirror/mode/htmlmixed/htmlmixed");
import "codemirror/addon/display/fullscreen";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";

export default {
  data() {
    return {
      loadingOverlay: false,
      message: "",
      messageSending: false,
      helper: {
        name: "as317",
        socketid: "24234234234",
      },
    };
  },
  computed: {
    ...mapGetters({
      messages: "socket/messages",
      lab_id: "socket/lab_id",
      username: "socket/username",
      accountType: "socket/accountType",
    }),
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

    this.editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
      value: "",
      tabSize: 2,
      lineNumbers: true,
      mode: "text/javascript",
      theme: "eclipse",
      extraKeys: {
        F11: function (cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        Esc: function (cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
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
  height: calc(100vh - 285px) !important;
  border: 1px solid grey !important;
}
</style>