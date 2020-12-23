<template>
  <v-form ref="createLabForm" v-on:submit.prevent lazy-validation>
    <v-card>
      <v-card-title>Create a new lab:</v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutter>
            <v-col>
              <v-text-field
                @keyup.enter="submit"
                v-model="lab.title"
                :rules="titleRules"
                label="Lab Title:"
                :loading="submitted"
                :disabled="submitted"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col>
              <LabHelperField
                :submitted="submitted"
                :labHelpers="lab.labHelpers"
              />
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col>
              <v-text-field
                v-model="lab.url"
                label="URL Link:"
                :rules="urlRules"
                hint="https://gitlab.com/xxx/xxx.git"
                persistent-hint
                :loading="submitted"
                :disabled="submitted"
                @keyup.enter="submit"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col>
              <v-textarea
                v-model="lab.desc"
                clearable
                clear-icon="mdi-close-circle"
                label="Description:"
                :loading="submitted"
                :disabled="submitted"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row align="center" no-gutter>
            <v-col class="text-center">
              <v-btn
                class="success"
                @click="submit"
                :loading="submitted"
                :disabled="submitted"
                >Create Lab
              </v-btn>
              <ConfirmModal
                ref="confirm"
                :lab="lab"
                @confirmed="confirmed"
                @cancelled="cancelled"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  components: {
    LabHelperField: () => import("./LabHelperField"),
    ConfirmModal: () => import("./ConfirmDialog"),
  },
  data() {
    return {
      submitted: false,
      errorList: undefined,
      lab: {
        title: "Test Data",
        labHelpers: ["as317", "test"],
        desc: "This is a test description for the lab.\nAcross multiple lines.",
        url: "https://www.google.com",
      },
      titleRules: [(value) => !!value || "Required"],
      urlRules: [
        (value) =>
          /^$|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
            value
          ) || "Incorrect Format",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.createLabForm.validate()) {
        this.submitted = true;
        this.errorList = undefined;
        this.$refs.confirm.open();
      }
    },
    confirmed() {
      axios("http://localhost:4000/graphql", {
        method: "POST",
        data: {
          query: `
              mutation createLab ($title: String!, $helpers: [String!]!, $desc: String!, $url: String!){
                createLab(labInput: {title: $title, helpers: $helpers, desc: $desc, url: $url }) {
                  title
                  code
                  desc
                  url
                  creator{
                    _id
                    fname
                    lname
                  }
                  createdAt
                  updatedAt
                }
              }
          `,
          variables: {
            title: this.lab.title,
            helpers: this.lab.labHelpers,
            desc: this.lab.desc,
            url: this.lab.url,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then(() => {
          this.$toast.success("Lab Created!");
          this.$router.push("/viewLabs");
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
          this.submitted = false;
          this.$refs.createLabForm.reset();
        });
    },
    cancelled() {
      this.submitted = false;
    },
  },
};
</script>