<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <StartQue v-if="show === 'start_que'" ref="queComponent" />
        <GettingHelp v-else-if="show === 'getting_help'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    StartQue: () => import("./components/StartQue"),
    GettingHelp: () => import("./components/GettingHelp"),
  },
  data() {
    return {
      show: "start_que",
    };
  },
  computed: {
    ...mapGetters({
      lab_id: "socket/lab_id",
    }),
  },
};
</script>