<template>
  <div>
    <v-container>
      <v-row>
        <v-col></v-col>
        <v-col class="text-center">
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
              <v-tab>Student / Helper</v-tab>
              <v-tab>Teacher</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="pa-6">
              <v-tab-item><StudentHelperLogin /></v-tab-item>
              <v-tab-item> </v-tab-item>
              <v-tab-item> </v-tab-item>
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
    StudentHelperLogin: () => import("./login/StudentHelper"),
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>