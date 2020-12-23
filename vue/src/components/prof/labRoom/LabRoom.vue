<template>
  <div>
    <v-card>
      <v-overlay :value="loadingOverlay">
        <v-progress-circular
          indeterminate
          :size="100"
          color="white"
        ></v-progress-circular>
      </v-overlay>
      <v-card-title>
        Lab: {{ this.$store.state.socket.lab.title }}
      </v-card-title>
      <v-card-text>
        <v-tabs fixed-tabs dark background-color="teal lighten-1" v-model="tab">
          <v-tab>Information</v-tab>
          <v-tab>Lab Chat</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-6">
          <v-tab-item>
            <LabInformationComponent />
          </v-tab-item>
          <v-tab-item>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
    LabInformationComponent: () => import("./LabInformationComponent"),
  },
  data() {
    return {
      loadingOverlay: false,
      labID: this.$route.params.labID,
      tab: null,
    };
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