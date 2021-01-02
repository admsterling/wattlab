<template>
  <v-container no-gutters>
    <v-row>
      <v-col cols="12" align="center" justify="center">
        People in que:
        <span class="purple--text lighten-text-1">{{ queLength }}</span
        ><br />
        Average Wait Time:
        <span class="purple--text lighten-text-1">{{ queTime }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <v-btn @click="getHelp" :loading="waiting" :disabled="waiting"
          >Get Help</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="waiting">
      <v-col cols="12" align="center" justify="center">
        {{ formattedElapsedTime }}<br />
        <v-btn dark class="deep-orange lighten-2" @click="cancelHelp">
          <v-icon class="mr-1">mdi-cancel</v-icon>Cancel
        </v-btn>
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
      elapsedTime: 0,
      timer: undefined,
      waiting: false,
      que: [],
    };
  },
  computed: {
    ...mapGetters({
      lab_id: "socket/lab_id",
      labCode: "socket/labCode",
    }),
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") + 1, 5);
    },
    queLength() {
      return this.que.length;
    },
    queTime() {
      return "4:12";
    },
  },
  methods: {
    getHelp() {
      this.waiting = true;
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
      const queData = {
        lab_id: this.lab_id,
        labCode: this.labCode,
        socketid: this.$socket.id,
      };
      this.$store.dispatch("socket/joinQue").then(() => {
        this.$socket.emit("getHelp", queData);
      });
    },
    cancelHelp() {
      this.waiting = false;
      const queData = {
        lab_id: this.lab_id,
        labCode: this.labCode,
        socketid: this.$socket.id,
      };
      this.$store.dispatch("socket/leaveQue").then(() => {
        this.$socket.emit("cancelHelp", queData);
        clearInterval(this.timer);
        this.elapsedTime = 0;
      });
    },
  },
  sockets: {
    updateQue: function (data) {
      this.que = data;
    },
  },
  mounted() {
    axios("http://localhost:4000/graphql", {
      method: "POST",
      data: {
        query: `
              query getQue($lab_id: ID!){
                getQue(lab_id: $lab_id)
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