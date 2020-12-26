<template>
  <v-container fluid style="overflow: auto; max-height: calc(95vh - 85px);">
    <v-row>
      <v-col>
        Title: {{labInfo.title}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        URL: <a :href="labInfo.url" target="_blank">{{ labInfo.url }}</a>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Description:<br />
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