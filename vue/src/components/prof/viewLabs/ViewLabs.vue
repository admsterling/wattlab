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
                <th class="text-left">Title</th>
                <th class="text-left">Code</th>
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
                      <v-icon color="primary" dark v-bind="attrs" v-on="on">
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span style="white-space: pre-wrap">{{ lab.desc }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="primary" dark v-bind="attrs" v-on="on">
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
                  <span class="ml-4">{{ lab.title }}</span>
                </td>
                <td>{{ lab.code }}</td>
                <td>{{ lab.createdAt | moment("ddd, DD-MM-YY") }}</td>
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
                    class="mx-4 success"
                    @click="joinLab(i)"
                  >
                    Join
                  </v-btn>
                  <v-btn class="warning mx-4">
                    <v-icon left>mdi-pencil</v-icon>Edit
                  </v-btn>
                  <v-btn class="error mx-4" @click="deleteLab(i)">
                    <v-icon left>mdi-delete-forever</v-icon>Delte
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      loadingOverlay: false,
      labs: [],
    };
  },
  methods: {
    goToCreate() {
      this.$router.push("/createLab");
    },
    joinLab(i) {
      let lab = this.labs[i];
      this.$router.push("/profViewLab/" + lab._id);
    },
    startLab(i) {
      this.loadingOverlay = true;
      let lab = this.labs[i];
      axios("http://localhost:4000/graphql", {
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
              this.$toast.error(this.errorList[i].message, {
                position: "bottom-center",
              });
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
      axios("http://localhost:4000/graphql", {
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
    deleteLab(i) {
      this.loadingOverlay = true;
      axios("http://localhost:4000/graphql", {
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
              this.$toast.error(this.errorList[i].message, {
                position: "bottom-center",
              });
            }
          } else {
            console.log("Error", error.message);
          }
        })
        .finally(() => {
          this.loadingOverlay = false;
        });
    },
  },
  mounted() {
    this.loading = true;
    axios("http://localhost:4000/graphql", {
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
                      status
                      helpers
                      createdAt
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
    })
      .then((res) => {
        this.labs = res.data.data.getLabs.labs;
      })
      .catch((error) => {
        if (error.response) {
          this.errorList = error.response.data.errors;
          for (let i = 0; i < this.errorList.length; i++) {
            this.$toast.error(this.errorList[i].message, {
              position: "bottom-center",
            });
          }
        } else {
          console.log("Error", error.message);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>