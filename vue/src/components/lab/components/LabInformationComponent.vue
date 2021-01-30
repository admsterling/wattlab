<template>
  <v-card fill-height>
    <v-card-title class="teal lighten-1 white--text justify-center">
      {{ labInfo.title }}
    </v-card-title>
    <v-card-text style="overflow-y: auto; height: calc(100vh - 300px)">
      <v-container>
        <v-row>
          <v-col>
            <b>URL's:</b>
            <ul v-for="(title, i) in labInfo.urlTitles" :key="i">
              <li>
                <a :href="labInfo.urlLinks[i]" target="_blank">
                  {{ title }}
                </a>
              </li>
            </ul>
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