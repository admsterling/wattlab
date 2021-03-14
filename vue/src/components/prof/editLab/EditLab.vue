<template>
  <v-form ref="editLabForm" v-on:submit.prevent lazy-validation>
    <v-card>
      <v-card-title>Edit Lab:</v-card-title>
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
                :labHelpers="lab.helpers"
              />
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col>
              <URLHelperFrield
                :submitted="submitted"
                :URLTitles="lab.urlTitles"
                :URLLinks="lab.urlLinks"
              />
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col>
              <URLHelperFrield
                :submitted="submitted"
                :URLTitles="lab.usefulLinkTitles"
                :URLLinks="lab.usefulLinkLinks"
              />
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
          <v-row>
            <v-col>
              <v-checkbox
                v-model="lab.submission"
                label="Add Lab Submission Page"
                dense
              ></v-checkbox>
              <v-checkbox
                v-model="lab.profOnlyQue"
                label="Allow Professor Only Queue Requests"
                dense
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row align="center" no-gutter>
            <v-col class="text-center">
              <v-btn
                class="success"
                @click="submit"
                :loading="submitted"
                :disabled="submitted"
                >Save Lab
              </v-btn>
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
    LabHelperField: () => import("../LabHelperField"),
    URLHelperFrield: () => import("../URLHelperFrield"),
  },
  data() {
    return {
      lab: {
        code: "",
        title: "",
        desc: "",
        urlTitles: [],
        urlLinks: [],
        usefulLinkTitles: [],
        usefulLinkLinks: [],
        helpers: [],
        submission: false,
        profOnlyQue: false,
      },
      submitted: false,
      errorList: undefined,
      titleRules: [(value) => !!value || "Required"],
    };
  },
  methods: {
    submit() {
      if (this.$refs.editLabForm.validate()) {
        this.submitted = true;
        this.errorList = undefined;

        axios(process.env.VUE_APP_ENDPOINT, {
          method: "POST",
          data: {
            query: `
              mutation updateLab($code: String!, $title: String!, $desc: String!, $urlTitles: [String!]!, $urLinks: [String!]!, $helpers: [String!]!, $submission: Boolean!, $profOnlyQue: Boolean!, $usefulLinkTitles: [String!]!, $usefulLinkLinks: [String!]!){
                updateLab(code: $code, title: $title, desc: $desc, urlTitles: $urlTitles, urlLinks: $urLinks, helpers: $helpers, submission: $submission, profOnlyQue: $profOnlyQue, usefulLinkTitles: $usefulLinkTitles, usefulLinkLinks: $usefulLinkLinks)
              }
          `,
            variables: {
              code: this.lab.code,
              title: this.lab.title,
              helpers: this.lab.helpers,
              desc: this.lab.desc,
              urlTitles: this.lab.urlTitles,
              urLinks: this.lab.urlLinks,
              submission: this.lab.submission,
              profOnlyQue: this.lab.profOnlyQue,
              usefulLinkTitles: this.lab.usefulLinkTitles,
              usefulLinkLinks: this.lab.usefulLinkLinks,
            },
          },
          headers: {
            Authorization: `Bearer ${this.$store.state.prof.token}`,
          },
        })
          .then(() => {
            this.$toast.success("Lab Saved");
            this.$router.push("/viewLabs");
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
            this.submitted = false;
          });
      }
    },
  },
  mounted() {
    axios(process.env.VUE_APP_ENDPOINT, {
      method: "POST",
      data: {
        query: `
              query getLab($labCode: String!){
                getLab(code: $labCode) {
                  title
                  desc
                  helpers
                  urlTitles
                  urlLinks
                  usefulLinkTitles
                  usefulLinkLinks
                  code
                  submission
                  profOnlyQue
                }
              }
          `,
        variables: {
          labCode: this.$route.params.labCode,
        },
      },
      headers: {
        Authorization: `Bearer ${this.$store.state.prof.token}`,
      },
    })
      .then((res) => {
        this.lab = res.data.data.getLab;
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
        this.submitted = false;
      });
  },
};
</script>