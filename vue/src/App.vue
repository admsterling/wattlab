<template>
  <v-app class="grey lighten-4">
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>

    <v-footer absolute color="teal">
      <v-btn
        outlined
        small
        color="white"
        v-if="this.volume"
        @click="flipVolume"
      >
        Volume On<v-icon class="ml-2" small>mdi-volume-high</v-icon>
      </v-btn>
      <v-btn outlined small color="white" v-else @click="flipVolume">
        Volume Off<v-icon class="ml-2" small>mdi-volume-off</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <div class="white--text">
        &copy; Adam Sterling {{ new Date().getFullYear() }} -
        <a href="mailto:as317@hw.ac.uk" class="font-weight-light white--text"
          >as317@hw.ac.uk</a
        >
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      volume: "application/volume",
    }),
  },
  methods: {
    flipVolume() {
      this.$store.dispatch("application/flip_volume");
    },
  },
};
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
}
</style>
