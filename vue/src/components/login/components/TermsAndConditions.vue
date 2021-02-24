<template>
  <v-dialog v-model="dialogShow" max-width="600px">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Terms and Conditions
      </v-card-title>
      <v-card-text class="pa-2">
        WattLab is currently a
        <span class="font-weight-bold">work in progress</span> project and may
        contain errors/bugs and is not liable for any loss in data.
        <ul class="py-2">
          <li>
            You agree that your Heriot-Watt username will be your account
            identifier
          </li>
          <li>
            Any text messages you send will be stored until the project is
            complete
            <span class="font-weight-bold">22 Apr 2021 (15:30 Local Time)</span
            >.
          </li>
          <li>
            All data will be stored and processed within GDPR Regulations.
          </li>
        </ul>
        Please do not take advantage of any exploits you find and instead report
        them to
        <a href="mailto:as317@hw.ac.uk">as317@hw.ac.uk</a>.<br />
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