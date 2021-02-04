<template>
  <div>
    <v-container>
      <v-row>
        <v-col></v-col>
        <v-col class="text-center" cols="8" lg="6" xl="5">
          <v-card>
            <v-card-title class="text-uppercase grey--text justify-center">
              <span class="font-weight-light">watt</span>
              <span>lab</span>
            </v-card-title>

            <v-tabs
              fixed-tabs
              dark
              background-color="teal lighten-1"
              v-model="tab"
            >
              <v-tab :disabled="tabDisable">Student / Helper</v-tab>
              <v-tab :disabled="tabDisable">Teacher</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="pa-6">
              <v-tab-item>
                <StudentHelperLogin @flip-tabs="flipTabs" />
              </v-tab-item>
              <v-tab-item>
                <ProfessorLogin @flip-tabs="flipTabs" />
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    StudentHelperLogin: () => import("./StudentHelper"),
    ProfessorLogin: () => import("./ProfessorLogin"),
  },
  data() {
    return {
      tab: null,
      tabDisable: false,
    };
  },
  methods: {
    flipTabs() {
      this.tabDisable = !this.tabDisable;
    },
  },
  mounted() {
    if (this.$store.getters["prof/isLoggedIn"]) {
      this.$router.push("/prof");
    } else {
      this.$store.dispatch("socket/resetState");
    }
  },
};
</script>