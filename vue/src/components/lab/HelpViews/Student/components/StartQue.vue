<template>
  <v-container no-gutters>
    <v-row>
      <v-col></v-col>
      <v-col class="text-center" cols="8" lg="6" xl="5">
        <v-card v-if="!loading">
          <v-form ref="helpForm">
            <v-card-title>Please fill out the form:</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-select
                v-model="helpObj.queType"
                :items="labOptions"
                label="I need:"
                outlined
              ></v-select>
              <v-text-field
                v-model="helpObj.title"
                :rules="[rules.required, rules.notempty]"
                label="Please enter Lab/Coursework Title:"
              ></v-text-field>
              <v-textarea
                v-if="helpObj.queType == 'Help'"
                label="Description:"
                v-model="helpObj.desc"
                :rules="[rules.required]"
                counter="200"
                maxlength="200"
                auto-grow
              ></v-textarea>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                class="mb-2"
                @click="getHelp"
                :loading="loading"
                :disabled="loading"
              >
                Get Help
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card v-else>
          <v-card-title> You have joined the queue... </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p class="text-h3">
              People in que:
              <span class="purple--text lighten-text-1">{{ queLength }}</span>
            </p>
            <p class="text-h3">
              You are
              <span class="purple--text lighten-text-1">{{ quePosition }}</span>
              in the que
            </p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="mb-2 deep-orange lighten-2" dark @click="cancelHelp">
              <v-icon class="mr-1">mdi-cancel</v-icon>Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      labOptions: ["Help", "Marking"],
      helpObj: {
        queType: "Help",
        title: "",
        desc: "",
      },
      que: [],
      loading: false,
      rules: {
        required: (value) => !!value || "Required Field",
        notempty: (value) => value.length > 0 || "Required Field",
      },
    };
  },
  computed: {
    ...mapGetters({
      lab_id: "socket/lab_id",
      labCode: "socket/labCode",
      username: "socket/username",
      privateChat: "socket/privateChat",
      gettingSupport: "socket/gettingSupport",
      queWaiting: "socket/queWaiting",
    }),
    queLength() {
      return this.que.length;
    },
    quePosition() {
      let index = this.que.findIndex((x) => x.socketid === this.$socket.id);
      let response;
      switch (index) {
        case 0:
          response = "1st";
          break;
        case 1:
          response = "2nd";
          break;
        case 2:
          response = "3rd";
          break;
        default:
          response = index + 1 + "th";
      }
      return response;
    },
  },
  watch: {
    "helpObj.queType": {
      handler() {
        this.helpObj.desc = "";
      },
      deep: true,
    },
  },
  methods: {
    async getHelp() {
      if (this.$refs.helpForm.validate()) {
        this.loading = true;
        const queData = {
          ...this.helpObj,
          lab_id: this.lab_id,
          labCode: this.labCode,
          socketid: this.$socket.id,
        };
        await this.$socket.emit("joinQue", queData);
        this.$store.dispatch("socket/joinQue").then(() => {
          this.helpObj = {
            queType: "Help",
            title: "",
            desc: "",
          };
        });
      }
    },
    async cancelHelp() {
      const queData = {
        lab_id: this.lab_id,
        labCode: this.labCode,
        socketid: this.$socket.id,
      };
      this.$store.dispatch("socket/leaveQue").then(() => {
        this.$socket.emit("leaveQue", queData);
        this.loading = false;
      });
    },
  },
  sockets: {
    updateQue: function (data) {
      this.que = data;
    },
    startHelp: function (data) {
      this.$store.dispatch("socket/privateChatInfo", data).then(() => {
        const helperInfo = {
          sendTo: this.gettingSupport.reciever,
          reciever: this.$socket.id,
          privateChat: this.privateChat,
        };
        this.$socket.emit("startHelper", helperInfo);
      });
    },
  },
  mounted() {
    axios(process.env.VUE_APP_ENDPOINT, {
      method: "POST",
      data: {
        query: `
              query getQue($lab_id: ID!){
                getQue(lab_id: $lab_id){
                  socketid
                }
              }
            `,
        variables: {
          lab_id: this.lab_id,
        },
      },
    })
      .then((res) => {
        this.que = res.data.data.getQue;
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
      });
  },
};
</script>