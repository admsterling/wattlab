<template>
  <v-container fluid class="px-4">
    <v-row>
      <v-col
        cols="12"
        class="rounded teal lighten-2 white--text text-h5"
        justify="center"
      >
        You are connected to:
        <span
          v-if="this.accountType === 'STUDENT'"
          class="ml-3 font-weight-bold"
        >
          {{ this.privateChat.staff }}
        </span>
        <span v-else class="ml-3 font-weight-bold">
          {{ this.privateChat.student }}
        </span>
        <v-btn class="float-right" @click="closeHelp"> Close Help </v-btn>
        <v-btn
          v-if="this.accountType === 'HELPER'"
          class="mr-2 float-right"
          @click="callStudent"
        >
          Call Student
          <v-icon small class="ml-2"> mdi-phone </v-icon>
        </v-btn>
        <v-dialog v-model="callingDialog" max-width="400">
          <v-card>
            <v-card-title class="headline">
              A Lab Helper is trying to contact you on teams
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="my-2 justify-center">
              Please open teams and accept the call.
            </v-card-text>
            <v-card-actions class="mb-2 justify-center">
              <v-btn class="purple lighten-1" dark @click="openTeams">
                Open Microsoft Teams
                <v-icon class="ml-2"> mdi-account-group </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <RatingComponent
          v-if="this.accountType === 'STUDENT'"
          :rating="rating"
          ref="ratingDialog"
          @confirmed="confirmed"
          @cancelled="cancelled"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <div>
          <v-sheet
            id="chatWindow"
            color="grey lighten-4"
            class="rounded border"
            style="overflow-y: auto; height: calc(100vh - 370px)"
          >
            <v-container fluid>
              <v-row
                v-for="(msg, i) in privateChatMessages"
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
                    <div style="white-space: nowrap; width: 215px; !important">
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
                    <div style="white-space: nowrap; width: 215px; !important">
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
import axios from "axios";
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
  components: {
    RatingComponent: () => import("./RatingComponent"),
  },
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
      rating: {
        value: 0,
        feedback: "",
      },
      callingDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      username: "socket/username",
      lab_id: "socket/lab_id",
      accountType: "socket/accountType",
      gettingSupport: "socket/gettingSupport",
      privateChat: "socket/privateChat",
      privateChatMessages: "socket/privateChatMessages",
      volume: "application/volume",
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
  sockets: {
    stopHelp: function () {
      this.$toast.info("Other person closed help request");
      if (this.accountType === "STUDENT") {
        this.$refs.ratingDialog.open();
      } else {
        this.$store.dispatch("socket/stopHelp");
      }
    },
    updateCodeBlock: function (data) {
      document.querySelector(".CodeMirror").CodeMirror.setOption("value", data);
    },
    newPrivateMessage: function (data) {
      this.$store.dispatch("socket/addPrivateMessage", data);
    },
    newCall: function () {
      this.callingDialog = true;
    },
  },
  methods: {
    scrollToEnd() {
      let container = this.$el.querySelector("#chatWindow");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      this.messageSending = true;
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation createPrivateMessage($sender: String!, $accountType: accountType!, $text: String!, $private_id: String!){
                createPrivateMessage(privateMessageInput: {
                    sender: $sender
                    accountType: $accountType
                    text: $text
                    private_id: $private_id
                }) {
                    sender
                    accountType
                    text
                    createdAt
                }
              }
            `,
          variables: {
            sender: this.username,
            accountType: this.accountType,
            text: this.message,
            private_id: this.privateChat._id,
          },
        },
      })
        .then((res) => {
          this.message = "";
          const messageData = res.data.data.createPrivateMessage;
          const socketData = {
            reciever: this.gettingSupport.reciever,
            message: messageData,
          };
          this.$store.dispatch("socket/addPrivateMessage", messageData);
          this.$socket.emit("newPrivateMessage", socketData);
        })
        .catch((error) => {
          if (error.response) {
            this.errorList = error.response.data.errors;
            for (let i = 0; i < this.errorList.length; i++) {
              this.$toast.error(this.errorList[i].message);
            }
          } else {
            console.log("Error", error.message);
          }
        })
        .finally(() => {
          this.messageSending = false;
        });
    },
    closeHelp() {
      if (this.accountType === "STUDENT") {
        this.$socket.emit("stopHelp", this.gettingSupport.reciever);
        this.$refs.ratingDialog.open();
      } else {
        this.$socket.emit("stopHelp", this.gettingSupport.reciever);
        this.$store.dispatch("socket/stopHelp");
      }
    },
    callStudent() {
      console.log(this.privateChat._id);
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation requireCall($private_chat_id: ID!){
                requireCall(private_chat_id: $private_chat_id)
              }
            `,
          variables: {
            private_chat_id: this.privateChat._id,
          },
        },
      })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$socket.emit("callStudent", this.gettingSupport.reciever);
          const username = this.privateChat.student;
          const url = "callto:" + username + "@hw.ac.uk";

          window.open(url, "_blank");
        });
    },
    openTeams() {
      const url = "https://teams.microsoft.com";

      const win = window.open(url, "_blank");
      win.focus();
    },
    confirmed() {
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation sendFeedback ($id: ID!, $value: Int!, $feedback: String!){
                sendFeedback(id: $id, value: $value, feedback: $feedback)
              }
          `,
          variables: {
            id: this.privateChat._id,
            value: this.rating.value,
            feedback: this.rating.feedback,
          },
        },
      })
        .then(() => {
          this.$toast.success("Feedback Recieved!");
        })
        .catch((error) => {
          if (error.response) {
            this.errorList = error.response.data.errors;
            for (let i = 0; i < this.errorList.length; i++) {
              this.$toast.error(this.errorList[i].message);
            }
          } else {
            console.log("Error", error.message);
          }
        })
        .finally(() => {
          this.rating.value = 0;
          this.rating.feedback = "";
          this.$store.dispatch("socket/stopHelp");
        });
    },
    cancelled() {
      this.rating.value = 0;
      this.rating.feedback = "";
      this.$store.dispatch("socket/stopHelp");
    },
  },
  mounted() {
    this.scrollToEnd();

    if (this.volume) {
      const audio = new Audio(require("../../../assets/helper_connected.mp3"));
      audio.play();
    }

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
      dragDrop: false,
      extraKeys: {
        F11: function (cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        Esc: function (cm) {
          cm.setOption("fullScreen", false);
        },
      },
    }).on("keyup", (editor) => {
      let codeData = {
        reciever: this.gettingSupport.reciever,
        code: editor.getValue(),
      };
      this.$socket.emit("updateCodeBlock", codeData);
    });

    document
      .querySelector(".CodeMirror")
      .CodeMirror.setOption(
        "value",
        "// Select the editor and use F11 to toggle Full Screen Editing\n"
      );
    document.querySelector(".CodeMirror").CodeMirror.focus();
    document
      .querySelector(".CodeMirror")
      .CodeMirror.setCursor({ line: 3, ch: 0 });
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
  height: calc(100vh - 455px) !important;
  border: 1px solid grey !important;
}
.CodeMirror-fullscreen {
  width: 100% !important;
  height: 100% !important;
}
</style>