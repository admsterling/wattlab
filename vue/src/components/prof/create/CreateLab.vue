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
              <span class="font-weight-bold text-h6">Student Links:</span>
              <URLHelperFrield
                :submitted="submitted"
                :URLTitles="lab.urlTitles"
                :URLLinks="lab.urlLinks"
              />
            </v-col>
          </v-row>
          <v-row no-gutter>
            <v-col>
              <span class="font-weight-bold text-h6">Staff Links:</span>
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
          <v-row dense>
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
    LabHelperField: () => import("../LabHelperField"),
    URLHelperFrield: () => import("../URLHelperFrield"),
    ConfirmModal: () => import("./ConfirmDialog"),
  },
  data() {
    return {
      submitted: false,
      errorList: undefined,
      lab: {
        title: "",
        labHelpers: [],
        desc: "",
        urlTitles: [],
        urlLinks: [],
        usefulLinkTitles: [],
        usefulLinkLinks: [],
        submission: false,
        profOnlyQue: false,
      },
      titleRules: [(value) => !!value || "Required"],
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
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
              mutation createLab ($title: String!, $helpers: [String!]!, $desc: String!, $urlTitles: [String!]!, $urLinks: [String!]!, $submission: Boolean!, $profOnlyQue: Boolean!, $usefulLinkTitles: [String!]!, $usefulLinkLinks: [String!]!){
                createLab(labInput: {title: $title, helpers: $helpers, desc: $desc, urlTitles: $urlTitles, urlLinks: $urLinks, submission: $submission, profOnlyQue: $profOnlyQue, usefulLinkTitles: $usefulLinkTitles, usefulLinkLinks: $usefulLinkLinks})
              }
          `,
          variables: {
            title: this.lab.title,
            helpers: this.lab.labHelpers,
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
          this.$toast.success("Lab Created!");
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
    },
    cancelled() {
      this.submitted = false;
    },
  },
};
</script>