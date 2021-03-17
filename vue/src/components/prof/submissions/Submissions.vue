<template>
  <div>
    <v-card>
      <v-card-title>
        Activity and Submissions For: {{ this.$route.params.code }}
        <v-spacer></v-spacer>
        <v-btn
          dark
          class="green mx-1"
          v-if="submissionFlag"
          :loading="generatePDFLoading"
          :disabled="generatePDFLoading"
          @click="generatePDF"
        >
          Generate PDF
        </v-btn>
        <v-btn
          dark
          class="green mx-1"
          v-if="submissionFlag"
          :loading="generateCSVLoading"
          :disabled="generateCSVLoading"
          @click="generateCSV"
        >
          Generate CSV
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        style="height: calc(100vh - 200px); overflow-y: auto"
        justify="center"
        align="center"
      >
        <v-data-table
          v-if="submissionFlag"
          :headers="headers1"
          :items="members"
          item-key="username"
          :options.sync="options"
          :loading="loading"
          loading-text="Loading... Please wait"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
          }"
          :items-per-page="5"
          :server-items-length="totalMembers"
        >
          <template v-slot:item.inRoom="{ item }">
            <v-icon v-if="item.inRoom" color="green">
              mdi-checkbox-blank-circle
            </v-icon>
            <v-icon v-else color="red">
              mdi-checkbox-blank-circle-outline
            </v-icon>
          </template>
          <template v-slot:item.submissionLink="{ item }">
            <v-chip color="primary" dark v-if="item.submissionLink">
              <a
                class="white--text"
                :href="item.submissionLink"
                target="_blank"
              >
                {{ item.submissionLink }}
              </a>
            </v-chip>
          </template>
          <template v-slot:item.marked="{ item }">
            <v-icon
              align="center"
              justify="center"
              v-if="item.submissionLink"
              v-model="item.marked"
              :class="item.marked ? 'green--text' : 'red--text'"
              @click="markWork(item.username, item.marked)"
            >
              {{
                item.marked
                  ? "mdi-check-box-outline"
                  : "mdi-checkbox-blank-outline"
              }}
            </v-icon>
          </template>
        </v-data-table>
        <v-data-table
          v-else
          :headers="headers2"
          :items="members"
          item-key="username"
          :options.sync="options"
          :loading="loading"
          loading-text="Loading... Please wait"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
          }"
          :items-per-page="5"
          :server-items-length="totalMembers"
        >
          <template v-slot:item.inRoom="{ item }">
            <v-icon v-if="item.inRoom" color="green">
              mdi-checkbox-blank-circle
            </v-icon>
            <v-icon v-else color="red">
              mdi-checkbox-blank-circle-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ObjectsToCsv from "objects-to-csv";

export default {
  data() {
    return {
      members: [],
      loading: true,
      options: {},
      totalMembers: 0,
      submissionFlag: false,
      generatePDFLoading: false,
      generateCSVLoading: false,
    };
  },
  computed: {
    headers1() {
      return [
        {
          text: "Status",
          value: "inRoom",
          sortable: true,
          filterable: false,
          align: "center",
          width: "15%",
        },
        {
          text: "Username",
          value: "username",
          sortable: true,
          filterable: true,
          align: "start",
          width: "15%",
        },
        {
          text: "Link",
          value: "submissionLink",
          sortable: false,
          filterable: false,
          width: "50%",
        },
        {
          text: "Marked",
          value: "marked",
          sortable: true,
          filterable: false,
          width: "10%",
          align: "center",
        },
      ];
    },
    headers2() {
      return [
        {
          text: "Status",
          value: "inRoom",
          sortable: true,
          filterable: false,
          align: "center",
          width: "15%",
        },
        {
          text: "Username",
          value: "username",
          sortable: true,
          filterable: true,
          align: "center",
          width: "15%",
        },
        {
          text: "Enable Submission Settings to allow Submissions",
          sortable: false,
          filterable: false,
          align: "center",
          width: "70%",
        },
      ];
    },
    ...mapGetters({
      username: "prof/username",
    }),
  },
  watch: {
    options: {
      handler() {
        this.refresh();
      },
      deep: true,
    },
  },
  sockets: {
    updateRoomMembers: function (data) {
      const pos = this.members
        .map((m) => {
          return m.username;
        })
        .indexOf(data.username);

      if (pos !== -1) {
        this.members[pos].inRoom = data.inRoom;
      }
    },
  },
  methods: {
    async fetchSubmissions() {
      this.loading = true;
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                query getLabMembers($id: ID!, $page: Int, $itemsPerPage: Int, $sortBy: [String], $sortDesc: [Boolean]) {
                    getLabMembers(id: $id, page: $page, itemsPerPage: $itemsPerPage, sortBy: $sortBy, sortDesc: $sortDesc) {
                      members {
                        username
                        submissionLink
                        inRoom
                        marked
                      }
                      totalMembers
                    }
                }
            `,
          variables: {
            id: this.$route.params.id,
            page: this.options.page,
            itemsPerPage: this.options.itemsPerPage,
            sortBy: this.options.sortBy,
            sortDesc: this.options.sortDesc,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then((res) => {
          this.members = res.data.data.getLabMembers.members;
          this.totalMembers = res.data.data.getLabMembers.totalMembers;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async fetchActivity() {
      this.loading = true;
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                query getLabMembers($id: ID!, $page: Int, $itemsPerPage: Int, $sortBy: [String], $sortDesc: [Boolean]) {
                    getLabMembers(id: $id, page: $page, itemsPerPage: $itemsPerPage, sortBy: $sortBy, sortDesc: $sortDesc) {
                      members {
                        username
                        inRoom
                      }
                      totalMembers
                    }
                }
            `,
          variables: {
            id: this.$route.params.id,
            page: this.options.page,
            itemsPerPage: this.options.itemsPerPage,
            sortBy: this.options.sortBy,
            sortDesc: this.options.sortDesc,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then((res) => {
          this.members = res.data.data.getLabMembers.members;
          this.totalMembers = res.data.data.getLabMembers.totalMembers;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    refresh() {
      if (this.$route.params.submissions) {
        this.fetchSubmissions();
      } else {
        this.fetchActivity();
      }
    },
    markWork(username, bool) {
      const pos = this.members
        .map((m) => {
          return m.username;
        })
        .indexOf(username);

      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                mutation markWork($lab_id: ID!, $username: String!, $bool: Boolean!) {
                    markWork(lab_id: $lab_id, username: $username, bool: $bool)
                }
            `,
          variables: {
            lab_id: this.$route.params.id,
            username: username,
            bool: !bool,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then(() => {
          this.members[pos].marked = !bool;
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
    generatePDF() {
      this.generatePDFLoading = true;
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                query getLabMembers($id: ID!, $itemsPerPage: Int, $sortBy: [String], $sortDesc: [Boolean]) {
                    getLabMembers(id: $id, itemsPerPage: $itemsPerPage, sortBy: $sortBy, sortDesc: $sortDesc) {
                      members {
                        username
                        submissionLink
                        marked
                      }
                      totalMembers
                    }
                }
            `,
          variables: {
            id: this.$route.params.id,
            itemsPerPage: -1,
            sortBy: ["username"],
            sortDesc: [false],
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then((result) => {
          var columns = [
            { title: "Username", dataKey: "username" },
            { title: "Link", dataKey: "submissionLink" },
            { title: "Marked", dataKey: "marked" },
          ];
          var doc = new jsPDF("p", "pt");
          doc.text(
            `Submissions For - ${this.$route.params.code}   (${result.data.data.getLabMembers.totalMembers} students)`,
            40,
            40
          );
          doc.autoTable(columns, result.data.data.getLabMembers.members, {
            margin: { top: 60 },
          });
          doc.save(`submissions-${this.$route.params.code}.pdf`);
        })
        .finally(() => {
          this.generatePDFLoading = false;
        });
    },
    generateCSV() {
      this.generateCSVLoading = true;
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                query getLabMembers($id: ID!, $itemsPerPage: Int, $sortBy: [String], $sortDesc: [Boolean]) {
                    getLabMembers(id: $id, itemsPerPage: $itemsPerPage, sortBy: $sortBy, sortDesc: $sortDesc) {
                      members {
                        username
                        submissionLink
                        marked
                      }
                      totalMembers
                    }
                }
            `,
          variables: {
            id: this.$route.params.id,
            itemsPerPage: -1,
            sortBy: ["username"],
            sortDesc: [false],
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then((result) => {
          const members = result.data.data.getLabMembers.members;

          (async () => {
            const csv = new ObjectsToCsv(members);

            const csvContent =
              "data:text/csv;charset=utf-8," + (await csv.toString());

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute(
              "download",
              `submissions-${this.$route.params.code}.csv`
            );
            document.body.appendChild(link);

            link.click();
          })();
        })
        .finally(() => {
          this.generateCSVLoading = false;
        });
    },
  },
  mounted() {
    if (this.$route.params.submissions == "true") {
      this.submissionFlag = true;
    }
    const data = {
      inRoom: false,
      username: this.username,
      labCode: this.$route.params.code,
    };
    this.$socket.emit("joinRoom", data);
  },
  beforeDestroy() {
    const data = {
      inRoom: false,
      username: this.username,
      labCode: this.$route.params.code,
    };
    this.$socket.emit("leaveRoom", data);
  },
};
</script>