<template>
  <v-dialog v-model="dialog" max-width="550px" persistent scrollable>
    <v-card>
      <v-card-title class="title grey lighten-3">
        Are you sure you want to create this lab?
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="subtitle my-4">
        <v-container>
          <v-row>
            <v-col cols="3">Title:</v-col>
            <v-col cols="9">
              {{ lab.title }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">Lab Helpers:</v-col>
            <v-col cols="9">
              <ul>
                <li v-for="(helper, i) in lab.labHelpers" :key="i">
                  {{ helper }}
                </li>
              </ul>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">URL's:</v-col>
            <v-col cols="9">
              <li v-for="(title, i) in lab.urlTitles" :key="i">
                {{ title }}
              </li>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">Description:</v-col>
            <v-col cols="9" style="white-space: pre-wrap">
              {{ lab.desc }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-icon>{{ submissionIcon }}</v-icon>
            </v-col>
            <v-col cols="9">Lab Submission Page</v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-icon>{{ profOnlyIcon }}</v-icon>
            </v-col>
            <v-col cols="9">Allow Professor Only Queue</v-col> 
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click.native="cancel">Cancel</v-btn>
        <v-btn color="success" text @click.native="agree">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["lab"],
  data: () => ({
    dialog: false,
    resolve: null,
  }),
  computed: {
    submissionIcon: function () {
      return this.lab.submission ? "mdi-check" : "mdi-close";
    },
    profOnlyIcon: function () {
      return this.lab.profOnlyQue ? "mdi-check" : "mdi-close";
    },
  },
  methods: {
    open() {
      this.dialog = true;
    },
    agree() {
      this.$emit("confirmed");
      this.dialog = false;
    },
    cancel() {
      this.$emit("cancelled");
      this.dialog = false;
    },
  },
};
</script>
