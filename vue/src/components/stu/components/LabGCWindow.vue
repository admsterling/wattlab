<template>
  <div>
    <v-sheet
      id="chatWindow"
      color="grey lighten-4"
      class="rounded border"
      style="overflow-y: auto; height: calc(100vh - 300px)"
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
            <div class="wrapper">
              <div style="white-space: nowrap">
                <span class="ml-2 grey--text text--lighten-1">
                  {{ msg.createdAt | moment("HH:MM") }} ({{ msg.accountType }})
                </span>
                <span class="mr-2">{{ msg.sender }}:</span>
              </div>
              <div
                class="mx-2 text-bubble lighten-4"
                :class="msg.accountType !== 'STUDENT' ? 'deep-orange' : 'blue'"
              >
                {{ msg.text }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-text-field
      v-if="accountType !== 'PROFESSOR'"
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
    <v-text-field
      v-else
      v-model="message"
      label="Message:"
      type="text"
      no-details
      outlined
      append-icon="mdi-send"
      append-outer-icon="mdi-alert-circle"
      @keyup.enter="sendMessage"
      @click:append-outer="sendAlert"
      @click:append="sendMessage"
      :loading="messageSending"
      :disabled="messageSending"
      hide-details
      class="mt-2"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loadingOverlay: false,
      message: "",
      messageSending: false,
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
  sockets: {
    newGroupMessage: function (data) {
      this.$store.dispatch("socket/newGroupMessage", data);
    },
    newGroupAlert: function (data) {
      this.$toast.info(data.message, data.options);
    },
  },
  methods: {
    scrollToEnd() {
      let container = this.$el.querySelector("#chatWindow");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      this.messageSending = true;
      axios("http://localhost:4000/graphql", {
        method: "POST",
        data: {
          query: `
              mutation createMessage($sender: String!, $accountType: accountType!, $text: String!, $lab_id: String!){
                createMessage(messageInput: {
                    sender: $sender
                    accountType: $accountType
                    text: $text
                    lab_id: $lab_id
                }) {
                    sender
                    accountType
                    text
                    createdAt
                    labCode
                }
              }
            `,
          variables: {
            sender: this.username,
            accountType: this.accountType,
            text: this.message,
            lab_id: this.lab_id,
          },
        },
      })
        .then((res) => {
          this.message = "";
          const messageData = res.data.data.createMessage;
          this.$socket.emit("newGroupMessage", messageData);
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
    async sendAlert() {
      if (this.message.length > 0) {
        this.messageSending = true;
        const alert_data = {
          lab_id: this.lab_id,
          message: this.message,
          options: {
            position: "top-right",
            timeout: false,
            hideProgressBar: true,
          },
        };
        const res = await this.$socket.emit("alertGroup", alert_data);
        if (res) {
          this.message = "";
          this.$toast.success("Alert was sent successfully");
        } else {
          this.$toast.error("Unable to send alert");
        }
        this.messageSending = false;
      }
    },
  },
  updated() {
    this.scrollToEnd();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}
.text-bubble {
  border-radius: 20px;
  padding: 8px 15px;
  display: inline-block;
}
</style>