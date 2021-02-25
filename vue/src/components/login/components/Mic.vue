<template>
  <v-dialog v-model="dialogShow" max-width="600px" scrollable>
    <v-card>
      <v-card-title class="headline grey lighten-2">Allow Mic</v-card-title>
      <v-card-text class="pa-2">
        <v-container>
          <v-row>
            <v-col cols="12">
              Click
              <span
                class="blue--text font-weight-bold text-decoration-underline hover-hand"
                @click="getMic"
                >here</span
              >
              to allow access
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              We ask for you to allow this site to use the microphone so that
              the lab helpers can quickly talk to you through this website.
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-2">
            <v-col cols="12">
              If you are uncomfortable with this, login and when you speak to a
              lab helper message them you would want be called on teams.
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ul>
                <li>Your voice will not be recorded.</li>
                <li>Your voice will only be shared with the lab helper.</li>
                <li>You do not need to share webcamera access.</li>
              </ul>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              Or follow these steps:
              <br />
              <v-expansion-panels accordion popout>
                <v-expansion-panel v-for="(panel, i) in panels" :key="i">
                  <v-expansion-panel-header>
                    {{ panel.header }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-img :src="panel.src" :lazy-src="panel.lazy" eager />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
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
      panels: [
        {
          header: "1) Click on the lock icon beside the URL Address Bar",
          lazy: "mic1-min.jpg",
          src: "mic1.jpg",
        },
        {
          header: "2) Change your site microphone settings to 'Allow'",
          lazy: "mic2-min.jpg",
          src: "mic2.jpg",
        },
        {
          header: "3) Now please click on Reload to reload the page.",
          lazy: "mic3-min.jpg",
          src: "mic3.jpg",
        },
      ],
    };
  },
  methods: {
    open() {
      this.dialogShow = true;
    },
    cancel() {
      this.dialogShow = false;
    },
    getMic() {
      if (!navigator.getUserMedia)
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { audio: true },
          function (stream) {
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          },
          () => {
            alert("Error capturing audio.");
          }
        );
      } else {
        alert("getUserMedia not supported in this browser.");
      }
    },
  },
};
</script>

<style scoped>
.hover-hand {
  cursor: pointer;
}
</style>