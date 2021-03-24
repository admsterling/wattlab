<template>
  <div>
    <v-card>
      <v-card-title class="text-center teal py-6" style="position: relative">
        <div style="display: block; margin: auto">
          <h1 class="font-weight-bold display-3 white--text">WATTLAB</h1>
        </div>
        <v-btn
          color="red lighten-2 white--text"
          style="position: absolute; right: 20px"
          @click="leaveLab"
        >
          <v-icon small class="mr-2">mdi-close</v-icon>Leave Lab
        </v-btn>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tabs-slider color="grey"></v-tabs-slider>
        <v-tab> Main Room </v-tab>
        <v-tab> Get Help / Marking</v-tab>
        <v-tab v-if="this.studentSubmission"> Submit Work </v-tab>
        <v-tab v-if="this.accountType !== 'STUDENT'">Staff Page</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" height="100%">
        <v-tab-item>
          <div class="tab-item-wrapper">
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <LabInformationComponent />
                </v-col>
                <v-col cols="8">
                  <LabGCWindow />
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="tab-item-wrapper">
            <StudentHelpView v-if="this.accountType === 'STUDENT'" />
            <LabHelperView v-else />
          </div>
        </v-tab-item>
        <v-tab-item v-if="this.studentSubmission">
          <div class="tab-item-wrapper">
            <SubmissionPage v-if="this.studentSubmission" />
          </div>
        </v-tab-item>
        <v-tab-item v-if="this.accountType !== 'STUDENT'">
          <div class="tab-item-wrapper">
            <StaffHelp />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    LabInformationComponent: () =>
      import("./components/LabInformationComponent"),
    LabGCWindow: () => import("./components/LabGCWindow"),
    StudentHelpView: () => import("./HelpViews/Student/StudentView"),
    LabHelperView: () => import("./HelpViews/LabHelper/LabHelperView"),
    SubmissionPage: () => import("./components/SubmissionPage"),
    StaffHelp: () => import("./components/StaffHelp"),
  },
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    ...mapGetters({
      queWaiting: "socket/queWaiting",
      labCode: "socket/labCode",
      lab_id: "socket/lab_id",
      labInfo: "socket/labInfo",
      memberid: "socket/member_id",
      accountType: "socket/accountType",
      submission: "socket/submission",
      gettingSupport: "socket/gettingSupport",
      privateChat: "socket/privateChat",
      username: "socket/username",
      labHelpers: "socket/labHelpers",
    }),
    studentSubmission: function () {
      return this.submission && this.accountType === "STUDENT";
    },
  },
  sockets: {
    endLab: function () {
      this.$toast.warning("The lab has stopped");
      this.$router.push("/login");
    },
    feedback: function () {
      this.$toast.info("You have recieved feedback from a student");
    },
    setHelpers: function (data) {
      this.$store.dispatch("socket/updateLabHelpers", this.labHelpers + data);
    },
  },
  methods: {
    async leaveLab() {
      if (this.gettingSupport.flag) {
        const data = {
          socketid: this.gettingSupport.reciever,
          priv_id: this.privateChat._id,
        };
        this.$socket.emit("stopHelp", data);
      }
      if (this.queWaiting) {
        const queData = {
          lab_id: this.lab_id,
          labCode: this.labCode,
          socketid: this.$socket.id,
        };
        console.log(queData);
        await this.$socket.emit("leaveQue", queData);
      }
      this.$router.push("/");
    },
    async getLabHelpers() {
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              query getLabHelpers($lab_id: ID) {
                getLabHelpers(lab_id: $lab_id)
              }
            `,
          variables: {
            lab_id: this.lab_id,
          },
        },
      }).then((res) => {
        this.$store.dispatch("socket/labHelpers", res.data.data.getLabHelpers);
      });
    },
  },
  mounted() {
    this.getLabHelpers();

    if (this.accountType === "HELPER") {
      this.$socket.emit("updateHelpers", this.labCode);
    }
  },
  beforeDestroy() {
    if (this.labCode) {
      const data = {
        inRoom: false,
        username: this.username,
        labCode: this.labCode,
      };
      this.$socket.emit("leaveRoom", data);
      this.$store.dispatch("socket/resetState");
    }
  },
};
</script>

<style scoped>
.tab-item-wrapper {
  height: calc(100vh - 156px);
}
</style>