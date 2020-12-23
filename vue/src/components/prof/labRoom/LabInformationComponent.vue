<template>
  <v-container>
    <v-row>
      <v-col cols="3">Url:</v-col>
      <v-col cols="9">
        <a :href="labInfo.url" target="_blank">{{ labInfo.url }}</a>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">Description:</v-col>
      <v-col cols="9">
        <span style="white-space: pre-wrap">{{ labInfo.desc }}</span>
      </v-col>
    </v-row>
  </v-container>
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