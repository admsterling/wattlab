<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase grey--text hover" @click="goHome">
        <span class="font-weight-light">watt</span>
        <span>Quiz</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="logoutDialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed dark class="red mx-1" v-bind="attrs" v-on="on">
            <v-icon>mdi-lock</v-icon>Logout
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline"
            >Are you sure you want to logout?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="logoutDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="error" text @click="logout">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary px-6 py-10">
      <div v-for="linkGroup in links" :key="linkGroup.label">
        <v-list>
          <p v-if="linkGroup.label != null" class="white--text">
            {{ linkGroup.label }}
          </p>

          <v-list-item
            v-for="path in linkGroup.paths"
            :key="path.text"
            router
            :to="path.route"
          >
            <v-list-item-icon>
              <v-icon class="grey--text text--lighten-4">{{
                path.icon
              }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="grey--text text--lighten-4">{{
                path.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      logoutDialog: false,
      links: [
        {
          label: null,
          paths: [
            { icon: "mdi-account", text: "My Account", route: "/myaccount" },
          ],
        },
        {
          label: "Create",
          paths: [
            { icon: "mdi-file", text: "Quiz", route: "/create/quiz" },
            { icon: "mdi-text-box", text: "Exam", route: "/create/exam" },
          ],
        },
        {
          label: "Host",
          paths: [
            { icon: "mdi-poll", text: "Poll", route: "/poll" },
            { icon: "mdi-file", text: "Quiz", route: "/host/quiz" },
            { icon: "mdi-text-box", text: "Exam", route: "/host/exam" },
          ],
        },
        {
          label: "Start / Stop / Continue",
          paths: [
            {
              icon: "mdi-chat-processing-outline",
              text: "Create New",
              route: "/ssc/start",
            },
            {
              icon: "mdi-card-search-outline",
              text: "View Results",
              route: "/ssc/view",
            },
          ],
        },
      ],
    };
  },
  methods: {
    goHome() {
      if (!this.$router === "/prof") {
        this.$router.push("/prof");
      }
    },
    logout() {
      this.logoutDialog = false;
      this.$store.dispatch("prof/resetState").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
.hover {
  cursor: pointer;
}
</style>