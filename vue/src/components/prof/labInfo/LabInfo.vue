<template>
  <div>
    <v-card>
      <v-card-title class="teal white--text headline">
        Lab Info: {{ lab.title }}
      </v-card-title>
      <v-container fluid>
        <v-row>
          <v-col cols="3" class="text-left">
            <v-treeview
              :items="treeview"
              :active.sync="active"
              :open.sync="open"
              open-on-click
              activatable
              transition
              dense
              style="height: calc(100vh - 250px); overflow-y: scroll"
            >
              <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.children"> mdi-account </v-icon>
              </template>
            </v-treeview>
          </v-col>
          <v-divider vertical></v-divider>

          <v-col>
            <div
              v-if="!selected"
              class="title grey--text text--lighten-1 font-weight-light fill-height"
              style="align-self: center"
            >
              Select a chat
            </div>
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
                  <br />
                  {{ selected.createdAt | moment("DD/MM/YYYY kk:mm") }}
                  <span v-if="selected.rating > 0" class="ml-5">
                    {{ selected.rating }}/5<v-icon class="orange--text darken-3"
                      >mdi-star</v-icon
                    >
                    <v-tooltip bottom>
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
    };
  },
  asyncComputed: {
    async selected() {
      if (!this.active.length) return undefined;

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
      console.log(obj);
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
                query getPrivateChat($staff: String) {
                    getPrivateChat(staff: $staff) {
                        _id
                        student
                    }
                }
            `,
          variables: {
            staff: helpers.children[i].name,
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
    }
    this.treeview.push(helpers);
  },
};
</script>