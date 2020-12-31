<template>
  <StartQue v-if="show === 'start_que'" />
  <GettingHelp v-else-if="show === 'getting_help'"/>
</template>

<script>
export default {
  components: {
    StartQue: () => import("./components/StartQue"),
    GettingHelp: () => import("./components/GettingHelp"),
  },
  data() {
    return {
      show: "getting_help",
    };
  },
};
</script>