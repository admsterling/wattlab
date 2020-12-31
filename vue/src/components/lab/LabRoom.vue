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
        <v-tab v-for="(tabHeader, i) in tabHeaders" :key="i">
          {{ tabHeader }}
        </v-tab>
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
          </div>
        </v-tab-item>
        <v-tab-item><div class="tab-item-wrapper"></div></v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    LabInformationComponent: () =>
      import("./components/LabInformationComponent"),
    LabGCWindow: () => import("./components/LabGCWindow"),
    StudentHelpView: () => import("./HelpViews/Student/StudentView"),
  },
  data() {
    return {
      tab: null,
      tabHeaders: ["Main Room", "Get Help", "Submit Work"],
    };
  },
  computed: {
    ...mapGetters({
      labCode: "socket/labCode",
      labInfo: "socket/labInfo",
      memberid: "socket/member_id",
      accountType: "socket/accountType"
    }),
  },
  sockets: {
    endLab: function () {
      this.$toast.warning("The lab has stopped");
      this.$router.push("/login");
    },
  },
  methods: {
    async leaveLab() {
      await this.$socket.emit("leaveRoom", this.labCode);
      this.$store.dispatch("socket/resetState").then(() => {
        this.$router.push("/");
      });
    },
  },
  beforeDestroy() {
    if (this.labCode) {
      this.$socket.emit("leaveRoom", this.labCode);
    }
  },
};
</script>

<style scoped>
.tab-item-wrapper {
  height: calc(100vh - 156px);
}
</style>