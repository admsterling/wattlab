<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <HelpQue v-if="!this.gettingSupport.flag" />
        <GettingHelp v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    HelpQue: () => import("./components/HelpQue"),
    GettingHelp: () => import("../../components/GettingHelp"),
  },
  computed: {
    ...mapGetters({
      gettingSupport: "socket/gettingSupport",
    }),
  },
};
</script>