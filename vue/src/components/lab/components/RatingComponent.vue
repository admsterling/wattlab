<template>
  <v-dialog v-model="dialog" max-width="550px" persistent scrollable>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Was this useful?
      </v-card-title>

      <v-card-text>
        <v-container >
          <v-row>
            <v-col cols="12" justify="center" align="center">
              <v-rating
                v-model="rating.value"
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                hover
                length="5"
                size="64"
              ></v-rating>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="rating.feedback"
                label="Any feedback:"
                auto-grow
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-2" @click="cancel">Cancel</v-btn>
        <v-btn color="success" @click="agree">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["rating"],
  data() {
    return {
      dialog: false,
    };
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