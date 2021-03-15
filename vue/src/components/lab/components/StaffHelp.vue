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
            <div v-if="!(feedback.length > 0)">
              You currently have no feedback, try refresh?
            </div>
            <v-list subheader v-else>
              <v-subheader>Found This Feedback:</v-subheader>
              <v-list-item v-for="item in feedback" :key="item._id">
                <v-sheet
                  class="px-2 pt-2 ma-2 rounded-r-xl"
                  color="blue lighten-4"
                  elevation="4"
                  rounded
                  width="100%"
                >
                  <v-container fluid no-gutters>
                    <v-row no-gutters class="mb-2">
                      <v-col cols="11" class="text-subtitle-1 font-italic">
                        "{{ item.feedback }}"
                      </v-col>
                      <v-col cols="1" align="start" justify="end">
                        <v-btn
                          x-small
                          outlined
                          fab
                          @click="skipResponse(item._id)"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-text-field
                          label="Response to feedback:"
                          v-model="item.response"
                          append-outer-icon="mdi-send"
                          dense
                          @click:append-outer="sendResponse(item._id)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <div class="mb-3"></div>
                </v-sheet>
              </v-list-item>
            </v-list>
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
      feedback: [],
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
                getFeedback(lab_id: $lab_id, staff: $staff){
                  _id
                  feedback
                }
              }
            `,
          variables: {
            lab_id: this.lab_id,
            staff: this.username,
          },
        },
      })
        .then((res) => {
          this.feedback = res.data.data.getFeedback;
          this.feedback = this.feedback.map((f) => {
            return { ...f, response: "" };
          });
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
    sendResponse(id) {
      const pos = this.feedback
        .map((f) => {
          return f._id;
        })
        .indexOf(id);

      const response = this.feedback[pos].response;

      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation sendResponse($priv_id: ID!, $response: String!) {
                sendResponse(priv_id: $priv_id, response: $response)
              }
            `,
          variables: {
            priv_id: id,
            response: response,
          },
        },
      }).then(() => {
        this.feedback.splice(pos, 1);
      });
    },
    skipResponse(id) {
      console.log("here");
      const pos = this.feedback
        .map((f) => {
          return f._id;
        })
        .indexOf(id);
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation sendResponse($priv_id: ID!, $response: String!) {
                sendResponse(priv_id: $priv_id, response: $response)
              }
            `,
          variables: {
            priv_id: id,
            response: "null",
          },
        },
      }).then(() => {
        this.feedback.splice(pos, 1);
      });
    },
  },
  mounted() {
    this.fetchHistory();
    this.fetchLinks();
  },
};
</script>