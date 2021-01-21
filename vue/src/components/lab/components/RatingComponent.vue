<template>
  <v-dialog v-model="dialog" max-width="550px" persistent scrollable>
    <v-form ref="ratingForm">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Feedback for Lab Helper
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <span class="text-heading-1"
                >Please rate the lab helper out of 5 stars:</span
              >
            </v-row>
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
                <transition name="fade">
                  <v-textarea
                    v-model="rating.feedback"
                    v-if="this.rating.value != 0 && this.rating.value < 5"
                    label="Please provide Feedback:"
                    :rules="ratingRules"
                    auto-grow
                    outlined
                  ></v-textarea>
                </transition>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-2" @click="cancel">Cancel</v-btn>
          <v-btn color="success" :disabled="disableButton" @click="agree"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  props: ["rating"],
  data() {
    return {
      ratingRules: [
        (value) =>
          !!value ||
          value.length > 0 ||
          "Pleae provide feedback as to why the lab helper did not recieve 5 Stars",
      ],
      dialog: false,
    };
  },
  computed: {
    disableButton: function () {
      return this.rating.value == 0;
    },
  },
  methods: {
    open() {
      this.dialog = true;
    },
    agree() {
      if (this.$refs.ratingForm.validate()) {
        this.$emit("confirmed");
        this.dialog = false;
      }
    },
    cancel() {
      this.$emit("cancelled");
      this.dialog = false;
    },
  },
};
</script>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}
</style>