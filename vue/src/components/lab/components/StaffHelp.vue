<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
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
                <v-list-item v-for="(person, i) in history" :key="i">
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
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Reply to Feedback
            <v-spacer></v-spacer>
            <v-btn fab x-small color="blue" dark @click="fetchFeedback">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: calc(100vh - 300px); overflow-y: auto">
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card-title>Useful Links</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: calc(100vh - 300px); overflow-y: auto">
            <div v-if="!(this.usefulLinkTitles.length > 0)">No links...</div>
            <div v-else>
              <v-list>
                <v-list-item v-for="(title, i) in usefulLinkTitles" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>
                      -
                      <a :href="usefulLinkLinks[i]" target="_blank">
                        {{ title }}
                      </a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
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
    return {
      history: [],
      usefulLinkTitles: [],
      usefulLinkLinks: [],
    };
  },
  computed: {
    ...mapGetters({
      lab_id: "socket/lab_id",
      username: "socket/username",
      labCode: "socket/labCode",
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
    fetchFeedback() {
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              query getFeedback($lab_id: ID!, $staff: String!) {
                getFeedback(lab_id: $lab_id, staff: $staff)
              }
            `,
          variables: {
            lab_id: this.lab_id,
            staff: this.username,
          },
        },
      }).then((res) => {
        this.feedback = res.data.data.getFeedback;
      });
    },
    fetchLinks() {
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              query getStaffLinks($code: String!) {
                getStaffLinks(code: $code) {
                  usefulLinkTitles
                  usefulLinkLinks
                }
              }
            `,
          variables: {
            code: this.labCode,
          },
        },
      })
        .then((res) => {
          console.log(res.data.data);
          this.usefulLinkTitles = res.data.data.getStaffLinks.usefulLinkTitles;
          this.usefulLinkLinks = res.data.data.getStaffLinks.usefulLinkLinks;
        })
        .catch((error) => {
          if (error.response) {
            this.errorList = error.response.data.errors;
            for (let i = 0; i < this.errorList.length; i++) {
              this.$toast.error(this.errorList[i].message);
            }
          } else {
            console.log("Error", error.message);
          }
        });
    },
  },
  mounted() {
    this.fetchHistory();
    // this.fetchFeedback();
    this.fetchLinks();
  },
};
</script>