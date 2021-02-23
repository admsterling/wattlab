<template>
  <v-card class="ma-5">
    <v-card-title class="text-h2 justify-center"> Page Not Found </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-subtitle-1" align="center">
      The page you requested is unknown or unavailable
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        outlined
        depressed
        dark
        class="primary pr-2"
        router
        :to="'/'"
        replace
      >
        <v-icon class="mr-2">mdi-home</v-icon>
        Home</v-btn
      >
    </v-card-actions>
  </v-card>
</template>