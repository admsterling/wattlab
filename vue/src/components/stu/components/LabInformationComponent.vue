<template>
  <v-card fill-height>
    <v-card-title class="teal lighten-1 white--text justify-center">
      {{ labInfo.title }}Test
    </v-card-title>
    <v-card-text style="overflow-y: auto; height: calc(100vh - 300px)">
      <v-container>
        <v-row>
          <v-col>
            <b>URL:</b> <a :href="labInfo.url" target="_blank">{{ labInfo.url }}</a>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <b>Description:</b><br />
            <span style="white-space: pre-wrap">{{ labInfo.desc }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      labInfo: "socket/labInfo",
    }),
  },
};
</script>