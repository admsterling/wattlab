<template>
  <div>
    <div class="text-center my-6" v-if="this.loading">
      <v-progress-circular
        indeterminate
        :size="100"
        color="primary"
      ></v-progress-circular>
    </div>

    <div v-else-if="this.labs.length > 0">
      <v-card>
        <v-card-title>Found Labs:</v-card-title>
        <v-card-text>
          <v-simple-table dense style="width: 100%">
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">Title</th>
                <th class="text-left">In Lab</th>
                <th class="text-left">Being Helped</th>
                <th class="text-left">Code</th>
                <th class="text-left">PIN</th>
                <th class="text-left">Created:</th>
                <th class="text-left">Status</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(lab, i) in labs" :key="i">
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="primary"
                        class="mr-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span style="white-space: pre-wrap">{{ lab.desc }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="primary"
                        class="mr-1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-account
                      </v-icon>
                    </template>
                    <span>Lab Helpers:</span>
                    <ul>
                      <li v-for="(help, i) in lab.helpers" :key="i">
                        {{ help }}
                      </li>
                    </ul>
                  </v-tooltip>
                  <v-icon
                    color="primary"
                    class="mr-1"
                    @click="qrcode(lab.code)"
                  >
                    mdi-share-variant
                  </v-icon>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="submissions(lab.code, lab._id, lab.submission)"
                      >
                        mdi-file
                      </v-icon>
                    </template>
                    <span v-if="lab.submission"
                      >Lab Activity and Submission Report</span
                    >
                    <span v-else>Lab Activity</span>
                  </v-tooltip>
                </td>
                <td>
                  <router-link :to="'/labInfo/' + lab.code" class="ml-2">
                    {{ lab.title }}
                  </router-link>
                </td>
                <td>
                  <v-icon class="mr-2" @click="loadMembers(i, $event)"
                    >mdi-refresh</v-icon
                  >
                </td>
                <td>
                  <v-icon class="mr-2" @click="loadActiveChats(i, $event)"
                    >mdi-refresh</v-icon
                  >
                </td>
                <td>{{ lab.code }}</td>
                <td>{{ lab.helperPIN }}</td>
                <td>{{ lab.createdAt | moment("DD-MM-YY") }}</td>
                <td>
                  <v-switch
                    v-if="!lab.status"
                    @click="startLab(i)"
                    color="success"
                  ></v-switch>
                  <v-switch
                    v-else
                    input-value="true"
                    @click="endLab(i)"
                    color="success"
                  ></v-switch>
                </td>
                <td>
                  <v-btn
                    :disabled="!lab.status"
                    class="ma-1 success"
                    @click="joinLab(i)"
                  >
                    <v-icon left>mdi-account-multiple-plus</v-icon>Join
                  </v-btn>
                  <v-btn
                    :disabled="lab.status"
                    class="warning ma-1"
                    @click="editLab(i)"
                  >
                    <v-icon left>mdi-pencil</v-icon>Edit
                  </v-btn>
                  <v-btn
                    :disabled="lab.status"
                    class="error ma-1"
                    @click="deleteLab(i)"
                  >
                    <v-icon left>mdi-delete-forever</v-icon>Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
      <v-overlay :value="loadingOverlay">
        <v-progress-circular
          indeterminate
          :size="100"
          color="white"
        ></v-progress-circular>
      </v-overlay>
    </div>
    <v-card v-else>
      <v-card-title class="justify-center">No Labs found</v-card-title>
      <v-card-text class="text-center">Have you created a lab?</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="goToCreate"> Create first Lab! </v-btn>
      </v-card-actions>
    </v-card>
    <QRCodeVue ref="qrDialog" :qrID="this.qrID" />
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

import QRCodeVue from "./QRCode";

export default {
  components: {
    QRCodeVue,
  },
  data() {
    return {
      loading: false,
      loadingOverlay: false,
      labs: [],
      qrID: "",
    };
  },
  computed: {
    ...mapGetters({
      username: "prof/username",
    }),
  },
  methods: {
    goToCreate() {
      this.$router.push("/createLab");
    },
    joinLab(i) {
      this.loadingOverlay = true;
      let lab = this.labs[i];
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              query labExist($code: String!) {
                labExist(code: $code)
              }
            `,
          variables: {
            code: lab.code,
          },
        },
      })
        .then(() => {
          const contextData = {
            code: lab.code,
            username: this.username,
            socketid: this.$socket.id,
            prof: true,
          };
          this.$store.dispatch("socket/setLab", contextData).then(() => {
            const data = {
              inRoom: true,
              labCode: lab.code,
              username: this.username,
            };
            this.$socket.emit("joinRoom", data);
            this.$router.push("/join/" + lab.code);
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
    startLab(i) {
      this.loadingOverlay = true;
      let lab = this.labs[i];
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation startLab($id: ID!){
                startLab(id: $id)
              }
          `,
          variables: {
            id: lab._id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then((res) => {
          if (res) {
            lab.status = true;
            this.$toast.success("Lab Started");
          } else {
            this.$toast.error("Unable to start Lab");
          }
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
        })
        .finally(() => {
          this.loadingOverlay = false;
        });
    },
    endLab(i) {
      this.loadingOverlay = true;
      let lab = this.labs[i];
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation endLab($id: ID!){
                endLab(id: $id)
              }
          `,
          variables: {
            id: lab._id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then((res) => {
          if (res) {
            lab.status = false;
            this.$toast.success("Lab Ended");
            this.$socket.emit("endLab", lab.code);
          } else {
            this.$toast.error("Unable to end Lab");
          }
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
        })
        .finally(() => {
          this.loadingOverlay = false;
        });
    },
    editLab(i) {
      let lab = this.labs[i];
      this.$router.push("/edit/" + lab.code);
    },
    deleteLab(i) {
      this.loadingOverlay = true;
      this.$socket.emit("endLab", this.labs[i].code);
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation deleteLab($id: ID!){
                deleteLab(id: $id)
              }
          `,
          variables: {
            id: this.labs[i]._id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then((res) => {
          if (res) {
            this.$toast.success("Deleted Lab");
            this.labs.splice(i, 1);
          } else {
            this.$toast.error("Deletion Failed");
          }
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
        })
        .finally(() => {
          this.loadingOverlay = false;
        });
    },
    async loadMembers(i, event) {
      event.target.classList.add("blue--text");
      const labCount = await axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                query getActiveMembers($lab_id: ID!) {
                  getActiveMembers(lab_id: $lab_id)
                }
          `,
          variables: {
            lab_id: this.labs[i]._id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      });

      function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
          newNode,
          referenceNode.nextSibling
        );
      }

      event.target.classList.remove("blue--text");

      if (labCount) {
        if (event.target.parentNode.childNodes.length != 1) {
          document.getElementById("count-" + i).remove();
        }
        let el = document.createElement("span");
        el.setAttribute("id", "count-" + i);
        el.innerHTML = labCount.data.data.getActiveMembers;
        insertAfter(event.target, el);
      } else {
        this.$toast.error("Unable to fetch count");
      }
    },
    async loadActiveChats(i, event) {
      event.target.classList.add("blue--text");
      const activeCount = await axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                query getActiveChats($lab_id: ID!) {
                  getActiveChats(lab_id: $lab_id)
                }
          `,
          variables: {
            lab_id: this.labs[i]._id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      });

      function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
          newNode,
          referenceNode.nextSibling
        );
      }

      event.target.classList.remove("blue--text");

      if (activeCount) {
        if (event.target.parentNode.childNodes.length != 1) {
          document.getElementById("active-" + i).remove();
        }
        let el = document.createElement("span");
        el.setAttribute("id", "active-" + i);
        el.innerHTML = activeCount.data.data.getActiveChats;
        insertAfter(event.target, el);
      } else {
        this.$toast.error("Unable to fetch count");
      }
    },
    qrcode(code) {
      this.$refs.qrDialog.open(code);
    },
    submissions(code, id, submissions) {
      this.$router.push("submissions/" + code + "/" + id + "/" + submissions);
    },
  },
  async mounted() {
    this.loading = true;
    const labList = await axios(process.env.VUE_APP_ENDPOINT, {
      method: "POST",
      data: {
        query: `
              query getLabs($id: String!){
                getLabs(id: $id) {
                  labs {
                      _id
                      title
                      desc
                      code
                      helperPIN
                      status
                      helpers
                      createdAt
                      submission
                  }
                }
              }
          `,
        variables: {
          id: this.$store.state.prof.profData._id,
        },
      },
      headers: {
        Authorization: `Bearer ${this.$store.state.prof.token}`,
      },
    });

    this.labs = labList.data.data.getLabs.labs;

    this.loading = false;
  },
};
</script>