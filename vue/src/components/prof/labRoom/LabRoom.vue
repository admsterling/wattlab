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
              <LabInformationComponent />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="8" style="padding: 0; margin: 0">
          <LabGCWindow />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    LabInformationComponent: () => import("./LabInformationComponent"),
    LabGCWindow: () => import("./LabGCWindow"),
  },
  data() {
    return {
      loadingOverlay: false,
      labID: this.$route.params.labID,
      tab: null,
    };
  },
  methods: {
    goHome() {
      this.$router.push("/viewLabs");
    },
  },
  async created() {
    this.loadingOverlay = true;
    await this.$store.dispatch("socket/SET_LAB", {
      labid: this.labID,
      profid: this.$store.state.prof.token,
    });
    this.loadingOverlay = false;
  },
};
</script>