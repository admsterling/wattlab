<template>
  <v-dialog v-model="dialogShow" max-width="600px">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Student Information
      </v-card-title>
      <v-card-text class="pa-2">
        <!-- <span class="font-weight-bold"
          >Students, please not that the current Microsoft Forms lab method is
          still **WORKING**</span
        >.<br />If for any reason this site crashes or you are unable to use the
        application, return to the old method and a lab helper will assist you
        that way. -->
        <ul class="my-3">
          <!-- <li>
            Please try use the insite navigation so that we can understand how a
            user will navigate through the site.
          </li> -->
          <li>
            Although the site has been approved for use in most modern browsers,
            please try and use the latest version of
            <span class="font-weight-bold">Chrome</span>.
          </li>
          <li>
            Please have the
            <span class="font-weight-bold">Microsoft Teams</span> application
            running in the background so that you are ready to answer lab helper
            calls.
          </li>
          <li>
            This site has been developed for laptop / monitor use, navigation
            will not work with mobile devices.
          </li>
        </ul>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="deep-orange lighten-2" @click="cancel()" dark>
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
    };
  },
  methods: {
    open() {
      this.dialogShow = true;
    },
    cancel() {
      this.dialogShow = false;
    },
  },
};
</script>