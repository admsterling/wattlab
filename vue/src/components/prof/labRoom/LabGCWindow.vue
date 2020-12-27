<template>
  <div>
    <v-sheet
      id="chatWindow"
      color="grey lighten-4"
      class="rounded border"
      style="
        overflow-y: auto;
        max-height: calc(95vh - 80px);
        height: calc(95vh - 80px);
      "
    >
      <v-container fluid>
        <v-row
          v-for="(msg, i) in messages"
          :key="i"
          class="my-2"
          align="center"
          no-gutters
        >
          <v-col cols="2">
            <span class="ml-2 grey--text text--lighten-1">
              {{ msg.createdAt | moment("HH:MM") }}
            </span>
            <span class="mr-2">{{ msg.sender }}:</span>
          </v-col>
          <v-col cols="10">
            <div class="blue lighten-4 text-bubble">{{ msg.text }}</div>
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
      append-outer-icon="mdi-send"
      @click:append-outer="sendMessage"
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
    }),
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    newMessage: function (data) {
      this.$store.dispatch("socket/newMessage", data);
    },
  },
  methods: {
    scrollToEnd() {
      let container = this.$el.querySelector("#chatWindow");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      axios("http://localhost:4000/graphql", {
        method: "POST",
        data: {
          query: `
              mutation createMessage($sender: String!, $senderType: senderType!, $text: String!, $lab_id: String!){
                createMessage(messageInput: {
                    sender: $sender
                    senderType: $senderType
                    text: $text
                    lab_id: $lab_id
                }) {
                    text
                    sender
                    senderType
                    createdAt
                    lab_id
                }
              }
            `,
          variables: {
            sender: this.$store.state.socket.username,
            senderType: this.$store.state.socket.senderType,
            text: this.message,
            lab_id: this.$store.state.socket.lab._id,
          },
        },
      })
        .then((res) => {
          this.message = "";
          const messageData = res.data.data.createMessage;
          this.$socket.emit("newMessage", messageData);
        })
        .catch((error) => {
          if (error.response) {
            this.errorList = error.response.data.errors;
            for (let i = 0; i < this.errorList.length; i++) {
              this.$toast.error(this.errorList[i].message, {
                position: "bottom-center",
              });
            }
          } else {
            console.log("Error", error.message);
          }
        })
        .finally(() => {
          this.messageSending = false;
        });
    },
  },
  mounted() {
    this.scrollToEnd();
  },
};
</script>

<style scoped>
.text-bubble {
  border-radius: 20px;
  padding: 8px 15px;
  display: inline-block;
}
</style>