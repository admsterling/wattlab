<template>
  <v-container>
    <v-row no-gutters class="pt-3">
      <v-col cols="3"> </v-col>
      <v-col cols="6">
        <v-form ref="submissionForm" v-on:submit.prevent lazy-validation>
          <v-card class="pa-2">
            <v-card-title>Submission Page:</v-card-title>
            <v-card-subtitle
              >Please provide a link to your work</v-card-subtitle
            >
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                v-model="submissionLink"
                label="URL Link:"
                :rules="urlRules"
                hint="https://gitlab.com/xxx/xxx.git"
                persistent-hint
                :loading="submitted"
                :disabled="submitted"
                @keyup.enter="submit"
              ></v-text-field>
              <p class="mt-4">
                Current Submission:
                <a
                  :href="this.submittedLink"
                  target="_blank"
                  v-if="this.submittedLink != 'No submission link set'"
                >
                  {{ submittedLink }}</a
                >
                <span v-else class="red--text">{{ this.submittedLink }}</span>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="blue lighten-2 white--text"
                :disabled="submitted"
                :loading="submitted"
                @click="update"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col cols="3"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      submissionLink: null,
      submittedLink: null,
      submitted: false,
      loadingOverlay: false,
      urlRules: [
        (value) =>
          /^$|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
            value
          ) || "Incorrect Format",
      ],
    };
  },
  computed: {
    ...mapGetters({
      member_id: "socket/member_id",
    }),
  },
  methods: {
    update() {
      if (
        this.$refs.submissionForm.validate() &&
        this.submissionLink.length > 0
      ) {
        this.submitted = true;
        axios("http://localhost:4000/graphql", {
          method: "POST",
          data: {
            query: `
              mutation addSubmission ($member_id: ID!, $submissionLink: String!){
                addSubmission(member_id: $member_id, submissionLink: $submissionLink)
              }
          `,
            variables: {
              member_id: this.member_id,
              submissionLink: this.submissionLink,
            },
          },
        })
          .then((res) => {
            this.submissionLink = null;
            this.submittedLink = res.data.data.addSubmission;
            this.$toast.success("Submission Recieved!");
            this.$refs.submissionForm.reset();
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
    this.loadingOverlay = true;
    axios("http://localhost:4000/graphql", {
      method: "POST",
      data: {
        query: `
              query getSubmission ($member_id: ID!){
                getSubmission(member_id: $member_id)
              }
          `,
        variables: {
          member_id: this.member_id,
        },
      },
    })
      .then((res) => {
        this.submittedLink = res.data.data.getSubmission;
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
};
</script>