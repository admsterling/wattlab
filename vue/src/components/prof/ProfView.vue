<template>
  <div>
    <NavBar />
    <transition name="slide-right" mode="out-in">
      <router-view class="pa-4" style="overflow-y: auto; height: calc(100vh - 97px)"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    NavBar: () => import("./TheNavBar"),
  },
  
};
</script>

<style scoped>
.slide-right-enter {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-right-enter-active {
  transition: all 0.3s ease;
}
.slide-right-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(50px);
}
</style>