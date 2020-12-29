<template>
  <v-app class="grey lighten-4">
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>

    <v-footer absolute color="teal">
      <v-spacer></v-spacer>
      <div class="white--text">&copy; Adam Sterling {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
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
