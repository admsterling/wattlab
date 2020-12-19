<template>
  <div>
    <NavBar />
    <transition name="slide-right" mode="out-in">
      <router-view></router-view>
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