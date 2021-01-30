<template>
  <v-container no-gutters>
    <v-row no-gutters>
      <v-col cols="12" align="center" justify="center">
        <v-card>
          <v-card-title>
            <div class="text-left">
              People in que:
              <span class="purple--text lighten-text-1 ml-2">
                {{ queLength }}
              </span>
              <br />
              Avg. Wait Time:
              <span class="purple--text lighten-text-1 ml-2">
                {{ averageTime | mmss }}
              </span>
            </div>
            <v-spacer> </v-spacer>
            <div>
              <v-btn
                class="purple--text lighten-text-1 ma-2"
                outlined
                @click="helpNext"
              >
                Help Next Student
              </v-btn>
              <v-btn
                class="purple--text lighten-text-1 ma-2"
                outlined
                @click="markNext"
              >
                Mark Next Student
              </v-btn>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-simple-table
              fixed-header
              style="height: calc(100vh - 370px); overflow-y: scroll"
              scrollable
            >
              <thead>
                <tr>
                  <th class="text-left" style="width: 107px">Time Elapsed</th>
                  <th class="text-left" style="width: 60px">Type</th>
                  <th class="text-left" style="width: 20%">Title</th>
                  <th class="text-left" style="width: 100%">Description</th>
                  <th class="text-left" style="width: 180px"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(queItem, i) in que" :key="i">
                  <td>
                    {{ queItem.createdAt | momentAgo }}
                  </td>
                  <td>{{ queItem.queType }}</td>
                  <td>{{ queItem.title }}</td>
                  <td>{{ queItem.desc }}</td>
                  <td>
                    <v-btn
                      class="deep-orange lighten-2"
                      dark
                      @click="startHelp(i)"
                      :loading="waiting"
                      :disabled="waiting"
                      >Help Student
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      waiting: false,
      headers: [
        { text: "Title", value: "title" },
        { text: "Description", value: "description" },
        { text: "Help Student" },
      ],
      que: [],
      averageTime: 0,
      now: Date.now(),
    };
  },
  computed: {
    ...mapGetters({
      lab_id: "socket/lab_id",
      labCode: "socket/labCode",
      username: "socket/username",
    }),
    queLength() {
      return this.que.length;
    },
  },
  methods: {
    async startHelp(i) {
      this.waiting = true;
      const reciever = this.que[i];

      const recieverData = {
        sendTo: reciever.socketid,
        reciever: this.$socket.id,
        staff: this.username,
        lab_id: this.lab_id,
        labCode: this.labCode,
        socketid: reciever.socketid,
        timeDiff: Date.now() - Date.parse(reciever.createdAt),
      };
      this.$socket.emit("startHelp", recieverData);
      this.waiting = false;
    },
    helpNext() {
      const indexPos = this.que
        .map(function (x) {
          return x.queType;
        })
        .indexOf("Help");
      if (indexPos != -1) {
        this.startHelp(indexPos);
      } else {
        this.$toast.error("No Students need help");
      }
    },
    markNext() {
      const indexPos = this.que
        .map(function (x) {
          return x.queType;
        })
        .indexOf("Marking");
      if (indexPos != -1) {
        this.startHelp(indexPos);
      } else {
        this.$toast.error("No Students need marking");
      }
    },
  },
  sockets: {
    updateQue: function (data) {
      this.que = data.que;
      this.averageTime = data.averageTime;
    },
    startHelper: function (data) {
      this.$store.dispatch("socket/setprivateChatInfo", data);
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.$forceUpdate();
    }, 1000);
    axios(process.env.VUE_APP_ENDPOINT, {
      method: "POST",
      data: {
        query: `
              query getQue($lab_id: ID!){
                getQue(lab_id: $lab_id){
                  que {
                    socketid
                    queType
                    title
                    desc
                    createdAt
                  }
                  averageTime
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
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>