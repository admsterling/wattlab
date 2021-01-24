<template>
  <v-container no-gutters>
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <v-card>
          <v-card-title>
            People in que:
            <span class="purple--text lighten-text-1 ml-2">
              {{ queLength }}
            </span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-simple-table fixed-header height="300px">
              <thead>
                <tr>
                  <th class="text-left">Type</th>
                  <th class="text-left">Title</th>
                  <th class="text-left">Description</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(queItem, i) in que" :key="i">
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
      };
      this.$socket.emit("startHelp", recieverData);
      this.waiting = false;
    },
  },
  sockets: {
    updateQue: function (data) {
      this.que = data;
    },
    startHelper: function (data) {
      this.$store.dispatch("socket/setprivateChatInfo", data);
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
                  queType
                  title
                  desc
                }
              }
            `,
        variables: {
          lab_id: this.lab_id,
        },
      },
    })
      .then((res) => {
        console.log(res.data.data.getQue);
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