<template>
  <v-dialog v-model="dialog" max-width="550px" persistent scrollable>
    <v-card>
      <v-card-title class="title grey lighten-3">
        Are you sure you want to delete this lab?
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
  props: ["lab", "i"],
  data: () => ({
    dialog: false,
  }),
  methods: {
    open() {
      this.dialog = true;
    },
    agree() {
      this.$emit("confirmed", this.i);
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    },
  },
};
</script>
