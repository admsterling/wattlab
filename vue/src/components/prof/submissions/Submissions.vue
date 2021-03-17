<template>
  <div>
    <v-card>
      <v-card-title>
        Submissions For: {{ this.$route.params.code }}
        <v-spacer></v-spacer>
        <v-btn dark class="green" v-if="submissionFlag">Generate PDF</v-btn>
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

export default {
  data() {
    return {
      members: [],
      loading: true,
      options: {},
      totalMembers: 0,
      submissionFlag: false,
    };
  },
  computed: {
    headers1() {
      return [
        {
          text: "Status",
          value: "inRoom",
          sortable: false,
          filterable: false,
          align: "center",
          width: "15%",
        },
        {
          text: "Username",
          value: "username",
          sortable: false,
          filterable: true,
          align: "start",
          width: "15%",
        },
        {
          text: "Link",
          value: "submissionLink",
          sortable: false,
          filterable: false,
          width: "60%",
        },
        {
          text: "Marked",
          value: "marked",
          sortable: false,
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
          sortable: false,
          filterable: false,
          align: "center",
          width: "50%",
        },
        {
          text: "Username",
          value: "username",
          sortable: false,
          filterable: true,
          align: "start",
          width: "50%",
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
        this.fetchSubmissions();
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
                query getLabMembers($id: ID!, $page: Int, $itemsPerPage: Int) {
                    getLabMembers(id: $id, page: $page, itemsPerPage: $itemsPerPage) {
                      members {
                        username
                        submissionLink
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
                query getLabMembers($id: ID!, $page: Int, $itemsPerPage: Int) {
                    getLabMembers(id: $id, page: $page, itemsPerPage: $itemsPerPage) {
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