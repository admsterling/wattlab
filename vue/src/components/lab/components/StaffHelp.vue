<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-card>
          <v-card-title>
            Last 10 Help History
            <v-spacer></v-spacer>
            <v-btn fab x-small color="blue" dark @click="fetchHistory">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: calc(100vh - 300px); overflow-y: auto">
            <div v-if="!(this.history.length > 0)">No history...</div>
            <div v-else>
              <v-list subheader>
                <v-subheader>Most Recent First</v-subheader>
                <v-list-item v-for="(person, i) in history" :key="i" >
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="purple--text">{{ index(i) }}.</span>
                      {{ person }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card>
          <v-card-title>Reply to Feedback</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: calc(100vh - 300px); overflow-y: auto">
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return { history: [] };
  },
  computed: {
    ...mapGetters({
      lab_id: "socket/lab_id",
      username: "socket/username",
    }),
  },
  methods: {
    index(i) {
      return i + 1;
    },
    fetchHistory() {
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              query getHistory($lab_id: ID!, $staff: String!) {
                getHistory(lab_id: $lab_id, staff: $staff)
              }
            `,
          variables: {
            lab_id: this.lab_id,
            staff: this.username,
          },
        },
      }).then((res) => {
        this.history = res.data.data.getHistory;
      });
    },
  },
  mounted() {
    this.fetchHistory();
  },
};
</script>