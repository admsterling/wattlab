<template>
  <div>
    <v-card>
      <v-card-title class="teal white--text headline">
        Lab Info: {{ lab.title }}
      </v-card-title>
      <v-container>
        <v-row class="pa-4" justify="space-between">
          <v-col cols="3">
            <v-treeview
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
            </v-treeview>
          </v-col>
          <v-divider vertical></v-divider>

          <v-col class="d-flex text-center">
            <v-scroll-y-transition mode="out-in">
              <div
                v-if="!selected"
                class="title grey--text text--lighten-1 font-weight-light"
                style="align-self: center"
              >
                Select a chat
              </div>
              <v-card v-else class="pt-6 mx-auto" flat max-width="800">
                <v-card-title>
                  Chat between: {{ selected.staff }} and {{ selected.student }}
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
            </v-scroll-y-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
  computed: {
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];

      const obj = {
        id: id,
        staff: "as317",
        student: "te13",
        name: "test",
      };
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
                query getPrivateChat($staff: String!) {
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