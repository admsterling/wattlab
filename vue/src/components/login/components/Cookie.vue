<template>
  <v-dialog v-model="dialogShow" max-width="600px">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Cookie Policy
      </v-card-title>
      <v-card-text class="pa-2">
        <v-container no-gutters fluid>
          <v-row>
            <v-col cols="12">
              WattLab uses local cookie storage to remember your login details.
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              When you check the "Remember me" option, the site will store the
              provided Lab Code, Username and PIN number for lab helpers.
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              The credentials are stored for 28 days and automatically update
              everytime you log in.
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              To remove cookies, uncheck the remember me option when you log in.
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="deep-orange lighten-2" @click="cancel()" dark>
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
    };
  },
  methods: {
    open() {
      this.dialogShow = true;
    },
    cancel() {
      this.dialogShow = false;
    },
  },
};
</script>