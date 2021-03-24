<template>
  <v-container no-gutters>
    <v-row no-gutters>
      <v-col></v-col>
      <v-col class="text-center" cols="8" sm="11" md="11" lg="10" xl="8">
        <v-card
          v-if="!loading"
          style="height: calc(100vh - 250px); overflow-y: auto"
        >
          <v-form ref="helpForm">
            <v-card-title>Please fill out the form:</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-select
                v-model="helpObj.queType"
                dense
                :items="labOptions"
                label="I need:"
                outlined
              ></v-select>
              <v-text-field
                v-model="helpObj.title"
                dense
                :rules="[rules.required, rules.notempty]"
                label="Please enter Lab/Coursework Title:"
              ></v-text-field>
              <v-text-field
                v-model="gitLink"
                dense
                :rules="[rules.url]"
                label="Link to your code:"
              ></v-text-field>
              <v-checkbox
                v-if="this.profOnlyQue"
                v-model="helpObj.requireProf"
                dense
                label="I need to speak to the Professor"
                hint="Warning: Wait times may be longer"
                persistent-hint
              />
              <v-textarea
                v-if="helpObj.queType == 'Help'"
                label="Description:"
                v-model="helpObj.desc"
                :rules="[rules.required]"
                counter="200"
                maxlength="200"
                rows="2"
              ></v-textarea>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                class="mb-2 green white--text"
                @click="getHelp"
                :loading="loading"
                :disabled="loading"
              >
                Start Request
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card
          v-else
          style="height: calc(100vh - 240px); overflow-y: auto"
          width="100%"
        >
          <v-card-title class="justify-center">
            <div class="text-h3">
              You are
              <span class="purple--text lighten-2">
                {{ quePosition }}
              </span>
              out of
              <span class="purple--text lighten-2">
                {{ queLength }}
              </span>
              in queue
            </div>
          </v-card-title>
          <div class="text-h4" v-if="this.labHelpers > 0">
            Estimated time until connected:
            <span class="purple--text lighten-text-1">
              {{ estimatedTime }}
            </span>
          </div>
          <div class="text-h4" v-else>
            There are currently no lab helpers connected
          </div>
          <v-card-text
            style="height: calc(100vh - 430px); overflow-y: auto"
            v-if="times.length > 3"
          >
            <v-sparkline
              :value="times"
              :key="String(averageTime)"
              :gradient="['#ea1f1f', '#ffd200', '#1fea5c']"
              stroke-linecap="round"
              color="grey"
              padding="10"
              smooth
              auto-draw
              :auto-draw-duration="3000"
              height="70%"
            >
            </v-sparkline>
            <div fill-width class="text-subtitle-1 font-weight-bold">
              <span class="float-left"> Start of Lab </span>
              <span class="float-right"> Now </span>
            </div>
            <div class="text-h4 my-2">Lab Wait Times</div>
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
      loadingComp: false,
      labOptions: ["Help", "Marking"],
      helpObj: {
        queType: "Help",
        title: "",
        desc: "",
        requireProf: false,
      },
      gitLink: "",
      que: [],
      averageTime: 0,
      loading: false,
      rules: {
        required: (value) => !!value || "Required Field",
        notempty: (value) => value.length > 0 || "Required Field",
        url: (value) =>
          /^$|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
            value
          ) || "Incorrect Format",
      },
      predictions: {
        avg: 9,
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
      profOnlyQue: "socket/profOnlyQue",
      labHelpers: "socket/labHelpers",
      micPerm: "application/micPerm",
    }),
    queLength() {
      return this.que.length;
    },
    quePosition() {
      const i = this.que.findIndex((x) => x.socketid === this.$socket.id) + 1;
      const j = i % 10;
      const k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        return i + "rd";
      }
      return i + "th";
    },
    estimatedTime() {
      const i = this.que.findIndex((x) => x.socketid === this.$socket.id);

      const time = Math.floor((i * this.predictions.avg) / this.labHelpers);
      if (time == 0) {
        return `Any second now...`;
      } else {
        return `~ ${time} minutes`;
      }
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
        this.$store.dispatch("socket/gitLink", this.gitLink);
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
            requireProf: false,
          };
          this.gitLink = "";
        });
      }
    },
    async cancelHelp() {
      const queData = {
        lab_id: this.lab_id,
        labCode: this.labCode,
        socketid: this.$socket.id,
      };
      this.$store.dispatch("socket/gitLink", null);
      this.$store.dispatch("socket/leaveQue").then(() => {
        this.$socket.emit("leaveQue", queData);
        this.loading = false;
      });
    },
  },
  sockets: {
    updateQue: function (data) {
      this.que = data.que;
      this.averageTime = data.averageTime;
      this.times = data.times;
    },
    startHelp: function (data) {
      this.$store.dispatch("socket/privateChatInfo", data).then(() => {
        const helperInfo = {
          sendTo: this.gettingSupport.reciever,
          reciever: this.$socket.id,
          privateChat: this.privateChat,
          peerid: this.$peer._id,
          student_mic: this.micPerm,
          gitLink: this.$store.getters["socket/gitLink"],
        };
        this.$socket.emit("startHelper", helperInfo);
      });
    },
    gitLink: function (data) {
      this.$store.dispatch("gitLink", data);
    },
  },
  mounted() {
    axios(process.env.VUE_APP_ENDPOINT, {
      method: "POST",
      data: {
        query: `
              query getQue($lab_id: ID!){
                getQue(lab_id: $lab_id){
                  que {
                    socketid
                  }
                  averageTime
                  times
                }
              }
            `,
        variables: {
          lab_id: this.lab_id,
        },
      },
    })
      .then((res) => {
        this.que = res.data.data.getQue.que;
        this.averageTime = res.data.data.getQue.averageTime;
        this.times = res.data.data.getQue.times;
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