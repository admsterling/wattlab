<template>
  <div>
    <v-card>
      <v-card-title class="teal white--text headline">
        Lab Info: {{ lab.title }}
      </v-card-title>
      <v-container fluid>
        <v-row>
          <v-col
            cols="3"
            :class="
              this.loading ? 'd-flex justify-center align-center' : 'text-left'
            "
            style="height: calc(100vh - 220px); overflow-y: auto"
          >
            <v-progress-circular
              v-if="loading"
              class="ma-3 justify-center"
              :size="100"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <v-treeview
              v-else
              :items="treeview"
              :active.sync="active"
              :open.sync="open"
              open-on-click
              activatable
              transition
              dense
            >
              <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.children"> mdi-account </v-icon>
              </template>
              <template v-slot:append="{ item }">
                <span v-if="item.rating">
                  {{ item.rating }}
                </span>
                <v-icon v-if="item.rating" class="orange--text darken-3">
                  mdi-star
                </v-icon>
                <v-tooltip bottom v-if="item.feedback" max-width="400px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      mdi-comment-quote-outline
                    </v-icon>
                  </template>
                  <span>{{ item.feedback }}</span>
                </v-tooltip>
                <v-tooltip
                  bottom
                  v-if="item.response && item.response !== 'null'"
                  max-width="400px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      mdi-comment-alert
                    </v-icon>
                  </template>
                  <span>{{ item.response }}</span>
                </v-tooltip>
              </template>
            </v-treeview>
          </v-col>
          <v-divider vertical></v-divider>

          <v-col
            :class="
              this.loadingChat ? 'd-flex justify-center align-center' : ''
            "
          >
            <div
              v-if="!selected"
              class="title grey--text text--lighten-1 font-weight-light fill-height"
              style="align-self: center"
            >
              Select a chat
            </div>
            <v-progress-circular
              v-else-if="selected && loadingChat"
              class="ma-3 justify-center"
              :size="200"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <v-card v-else class="mx-auto" flat>
              <v-card-title class="justify-center">
                <div class="text-center">
                  Chat between:
                  <span class="font-weight-bold purple--text">
                    {{ selected.staff }}
                  </span>
                  and
                  <span class="font-weight-bold purple--text">
                    {{ selected.student }}
                  </span>
                  <span class="ml-3"
                    >Required Call:
                    <span class="blue-grey--text darken-1 text-uppercase">{{
                      selected.requiredCall
                    }}</span></span
                  >
                  <br />
                  {{ selected.createdAt | moment("DD/MM/YYYY kk:mm") }}
                  <span v-if="selected.rating > 0" class="ml-5">
                    {{ selected.rating }}/5<v-icon class="orange--text darken-3"
                      >mdi-star</v-icon
                    >
                    <v-tooltip
                      bottom
                      max-width="400px"
                      v-if="selected.feedback"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="ml-5"
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-comment-quote-outline
                        </v-icon>
                      </template>
                      <span>{{ selected.feedback }}</span>
                    </v-tooltip>

                    <v-tooltip
                      bottom
                      max-width="400px"
                      v-if="selected.response && selected.response !== 'null'"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="ml-5"
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-comment-alert
                        </v-icon>
                      </template>
                      <span>{{ selected.response }}</span>
                    </v-tooltip>
                  </span>
                </div>
              </v-card-title>
              <v-card-text>
                <ChatList :messages="selected.messages" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    ChatList: () => import("./ChatList"),
  },
  data() {
    return {
      lab: {
        tite: "",
      },
      treeview: [],
      active: [],
      open: [],
      loading: true,
      loadingChat: false,
    };
  },
  asyncComputed: {
    async selected() {
      if (!this.active.length) return undefined;

      this.loadingChat = true;
      const id = this.active[0];

      const result = await axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                query getPrivateChat($id: ID) {
                    getPrivateChat(id: $id) {
                        _id
                        student
                        staff
                        createdAt
                        rating
                        feedback
                        response
                        requiredCall
                        messages { 
                          sender
                          accountType
                          text
                          createdAt
                        }
                    }
                }
            `,
          variables: {
            id: id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      });

      const obj = result.data.data.getPrivateChat[0];
      this.loadingChat = false;
      return obj;
    },
  },
  async mounted() {
    let helpers;
    await axios(process.env.VUE_APP_ENDPOINT, {
      method: "POST",
      data: {
        query: `
              query getLab($code: String!){
                getLab(code: $code){
                    _id
                    title
                    helpers
                }
              }
          `,
        variables: {
          code: this.$route.params.code,
        },
      },
      headers: {
        Authorization: `Bearer ${this.$store.state.prof.token}`,
      },
    }).then((res) => {
      const lab = res.data.data.getLab;
      helpers = {
        name: "Lab Helpers",
        children: lab.helpers.map((h, index) => {
          return { id: index, name: h, children: [] };
        }),
      };
      this.lab = lab;
    });

    for (let i = 0; i < helpers.children.length; i++) {
      let result = await axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
                query getPrivateChat($staff: String, $lab_id: ID) {
                    getPrivateChat(staff: $staff, lab_id: $lab_id) {
                        _id
                        student
                        feedback
                        rating
                        response
                    }
                }
            `,
          variables: {
            staff: helpers.children[i].name,
            lab_id: this.lab._id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      });

      result.data.data.getPrivateChat.map((p) => {
        delete Object.assign(p, { ["id"]: p["_id"] })["_id"];
        delete Object.assign(p, { ["name"]: p["student"] })["student"];
        return p;
      });
      helpers.children[i].children = result.data.data.getPrivateChat;

      for (let i = 0; i < helpers.children.length; i++) {
        let total = 0;
        let count = 0;
        for (let j = 0; j < helpers.children[i].children.length; j++) {
          if (helpers.children[i].children[j].rating) {
            total = total + helpers.children[i].children[j].rating;
            count++;
          }
        }
        let average = total / count;
        helpers.children[i].rating = Math.round(average * 10) / 10;
      }
    }
    this.treeview.push(helpers);

    this.loading = false;
  },
};
</script>