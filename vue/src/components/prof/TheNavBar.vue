<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase grey--text hover" @click="goHome">
        <span class="font-weight-light">watt</span>
        <span>Lab</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="logoutDialog" persistent max-width="550px">
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

    <v-navigation-drawer app v-model="drawer" class="px-6 py-10">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ fullName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(link, i) in links" :key="i" :to="link.route">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      logoutDialog: false,
      selectedItem: 0,
      links: [
        { icon: "mdi-card-search-outline", text: "View Labs", route: "/viewLabs"},
        { icon: "mdi-text-box", text: "Create New Lab", route: "/createLab" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      fullName: "prof/fullName",
      email: "prof/email",
    }),
  },
  methods: {
    goHome() {
      if(this.$router.history.current.path !== "/viewLabs"){
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