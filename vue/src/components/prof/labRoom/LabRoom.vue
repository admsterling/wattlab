<template>
  <div>
    <v-overlay :value="loadingOverlay">
      <v-progress-circular
        indeterminate
        :size="100"
        color="white"
      ></v-progress-circular>
    </v-overlay>
    <v-container fluid style="padding: 0; margin: 0">
      <v-row>
        <v-col cols="4">
          <v-card>
            <v-card-title class="teal white--text py-4">
              <span class="font-weight-light">watt</span>
              <span>Lab</span>
              <v-spacer></v-spacer>
              <v-btn @click="goHome">
                <v-icon left>mdi-close-circle-outline</v-icon>
                Close Lab View
              </v-btn>
            </v-card-title>
            <v-card-text>
              <LabInformationComponent v-if="fullyLoaded" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="8" style="padding: 0; margin: 0">
          <LabGCWindow v-if="fullyLoaded" :username="username"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    LabInformationComponent: () => import("./LabInformationComponent"),
    LabGCWindow: () => import("./LabGCWindow"),
  },
  data() {
    return {
      loadingOverlay: false,
      fullyLoaded: false,
      labID: this.$route.params.labID,
      tab: null,
    };
  },
  computed: {
    ...mapGetters({
      username: "socket/username",
    }),
  },
  methods: {
    goHome() {
      this.$router.push("/viewLabs");
    },
  },
  async mounted() {
    this.loadingOverlay = true;
    await this.$store
      .dispatch("socket/SET_LAB", {
        labid: this.labID,
        username: this.$store.state.prof.profData.email.substring(
          0,
          this.$store.state.prof.profData.email.indexOf("@")
        ),
        senderType: "PROFESSOR",
      })
      .then(() => {
        this.$socket.emit("joinRoom", this.labID);
        this.loadingOverlay = false;
        this.fullyLoaded = true;
      });
  },
  async beforeDestroy() {
    await this.$socket.emit("leaveRoom", this.labID);
    await this.$store.dispatch("socket/resetState");
  },
};
</script>