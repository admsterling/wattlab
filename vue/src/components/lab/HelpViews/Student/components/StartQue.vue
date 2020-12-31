<template>
  <v-container no-gutters>
    <v-row>
      <v-col cols="12" align="center" justify="center">
        People in que:
        <span class="purple--text lighten-text-1">{{ que.length }}</span
        ><br />
        Average Wait Time:
        <span class="purple--text lighten-text-1">{{ que.time }}</span>
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
export default {
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
      waiting: false,
      que: {
        length: 5,
        time: "4:12",
      },
    };
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") + 1, 5);
    },
  },
  methods: {
    getHelp() {
      this.waiting = true;
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    cancelHelp() {
      this.waiting = false;
      clearInterval(this.timer);
      this.elapsedTime = 0;
    },
  },
};
</script>