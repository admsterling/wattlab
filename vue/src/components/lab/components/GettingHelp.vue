<template>
  <div>
    <v-container fluid class="px-4">
      <v-row>
        <v-col
          cols="12"
          class="rounded teal lighten-2 white--text text-h5"
          justify="center"
        >
          <v-tooltip bottom v-if="this.gitLink">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                large
                class="mr-3 hover-hand"
                @click="followLink"
              >
                mdi-github
              </v-icon>
            </template>
            <span>Go to Code Link</span>
          </v-tooltip>
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
          <div class="float-right">
            <v-btn
              v-if="
                this.accountType !== 'STUDENT' &&
                !this.inCall &&
                this.micPerm &&
                this.studentMic
              "
              class="mr-2"
              @click="nativeCall"
              :disabled="connecting"
              :loading="connecting"
            >
              Site Audio Call
              <v-icon small class="ml-2"> mdi-phone </v-icon>
            </v-btn>
            <v-btn
              v-if="this.inCall"
              dark
              class="deep-orange lighten-2 mr-2"
              @click="closeCall"
            >
              Close Site Call
              <v-icon small class="ml-2"> mdi-cancel </v-icon>
            </v-btn>
            <v-btn
              v-if="this.accountType !== 'STUDENT'"
              class="mr-2"
              @click="callStudent"
            >
              Call on Teams
              <v-icon small class="ml-2"> mdi-phone </v-icon>
            </v-btn>
            <v-btn @click="closeHelp" class="red lighten-2 white--text">
              Close Help
            </v-btn>
          </div>

          <v-dialog v-model="callingDialog" max-width="400">
            <v-card>
              <v-card-title class="headline">
                A Lab Helper is trying to contact you on teams
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="my-2 justify-center text-center">
                <v-container no-gutters>
                  <v-row>
                    <v-col cols="12">
                      Please accept the call within your Teams application.
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12"> OR </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn class="my-2 purple lighten-1" dark @click="openTeams">
                  Open Microsoft Teams Web App
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
              id="privateChatWindow"
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
                      <div
                        style="white-space: nowrap; width: 215px; !important"
                      >
                        <span class="ml-2 grey--text text--lighten-1">
                          {{ msg.createdAt | moment("HH:MM") }}
                          <span
                            class="text-lighten-2"
                            :class="[
                              msg.accountType === 'STUDENT'
                                ? 'green--text'
                                : '',
                              msg.accountType === 'HELPER'
                                ? 'orange--text'
                                : '',
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
                      <div
                        style="white-space: nowrap; width: 215px; !important"
                      >
                        <span class="ml-2 grey--text text--lighten-1">
                          {{ msg.createdAt | moment("HH:MM") }}
                          <span
                            class="text-lighten-2"
                            :class="[
                              msg.accountType === 'STUDENT'
                                ? 'green--text'
                                : '',
                              msg.accountType === 'HELPER'
                                ? 'orange--text'
                                : '',
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
    <video id="videoStream" width="160" height="120"></video>
  </div>
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
import "codemirror/mode/sql/sql";
// Code Mirror Addons
import "codemirror/addon/display/fullscreen.js";
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";

function addStream(stream) {
  const video = document.getElementById("videoStream");
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
}

export default {
  components: {
    RatingComponent: () => import("./RatingComponent"),
  },
  data() {
    return {
      inCall: false,
      modes: [
        { name: "Java", mode: "text/x-java" },
        { name: "Java-Script", mode: "text/javascript" },
        { name: "SQL", mode: "text/x-sql" },
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
      connecting: false,
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
      peerid: "socket/peerid",
      volume: "application/volume",
      studentMic: "socket/studentMic",
      gitLink: "socket/gitLink",
      micPerm: "application/micPerm",
    }),
  },
  watch: {
    defaultMode: function (v) {
      document.querySelector(".CodeMirror").CodeMirror.setOption("mode", v);
    },
    defaultTheme: function (v) {
      document.querySelector(".CodeMirror").CodeMirror.setOption("theme", v);

      if (this.$cookies.get("theme")) {
        let pos = this.themes
          .map((m) => {
            return m.theme;
          })
          .indexOf(v);
        this.$cookies.set("theme", this.themes[pos], "28d");
      }
    },
  },
  sockets: {
    stopHelp: function () {
      if (this.call) {
        this.call.close();
      }
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
      this.$store.dispatch("socket/addPrivateMessage", data).then(() => {
        this.scrollToEnd();
      });
    },
    newCall: function () {
      this.callingDialog = true;
    },
    closeCall: function () {
      if (this.call) {
        this.call.close();
        this.inCall = false;
      }
    },
    disconnectUser: function (id) {
      if (id === this.gettingSupport.reciever) {
        this.$toast.info("The other person has disconnected");

        this.closeHelp();
      }
    },
    gitLink: function (data) {
      this.$store.dispatch("socket/gitLink", data);
    },
  },
  methods: {
    scrollToEnd() {
      let container = this.$el.querySelector("#privateChatWindow");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      this.messageSending = true;
      if (!this.message.length > 0) {
        this.$toast.error("Please enter a message");
        this.messageSending = false;
      } else {
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
            this.$store
              .dispatch("socket/addPrivateMessage", messageData)
              .then(() => {
                this.scrollToEnd();
              });
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
            this.scrollToEnd();
          });
      }
    },
    closeHelp() {
      if (this.call) {
        this.call.close();
      }

      if (this.$store.getters["socket/gitLink"].length > 0) {
        this.$store.dispatch("socket/gitLink", null);
      }

      const data = {
        socketid: this.gettingSupport.reciever,
        priv_id: this.privateChat._id,
      };

      this.$socket.emit("stopHelp", data);

      if (this.accountType === "STUDENT") {
        this.$refs.ratingDialog.open();
      } else {
        this.$store.dispatch("socket/stopHelp");
      }
    },
    callStudent() {
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
    nativeCall() {
      this.connecting = true;

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
          const getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

          getUserMedia(
            { video: false, audio: true },
            (stream) => {
              this.stream = stream;
              this.call = this.$peer.call(this.peerid, stream);
              this.call.on("stream", (remoteStream) => {
                this.inCall = true;
                this.connecting = false;
                addStream(remoteStream);
              });
              this.call.on("close", () => {
                stream.getTracks().forEach(function (track) {
                  track.stop();
                });
              });
              this.call.on("error", (err) => {
                console.error(err);
              });
            },
            (err) => {
              console.log("Failed to get local stream", err);
            }
          );
        });
    },
    closeCall() {
      if (this.call) {
        this.call.close();
        this.$socket.emit("closeCall", this.gettingSupport.reciever);
        this.inCall = false;
      }
    },
    followLink() {
      console.log(this.gitLink);
      const win = window.open(this.gitLink, "_blank");
      win.focus();
    },
  },
  created() {
    if (this.$cookies.get("username")) {
      if (this.$cookies.get("theme")) {
        this.defaultTheme = this.$cookies.get("theme");
      } else {
        this.$cookies.set("theme", this.defaultTheme, "28d");
      }
    }
  },
  mounted() {
    this.scrollToEnd();

    this.$store.dispatch("socket/queWaiting", false);

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

    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    this.$peer.on("call", (call) => {
      getUserMedia(
        { video: false, audio: true },
        (stream) => {
          this.stream = stream;
          this.call = call;
          this.call.answer(stream);
          this.call.on("stream", (remoteStream) => {
            this.inCall = true;
            addStream(remoteStream);
          });
          this.call.on("close", () => {
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          });
          this.call.on("error", (err) => {
            console.error(err);
          });
        },
        (err) => {
          console.log("Failed to get local stream", err);
        }
      );
    });
  },
  beforeDestroy() {
    this.stream.getTracks().forEach(function (track) {
      track.stop();
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

.hover-hand {
  cursor: pointer;
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