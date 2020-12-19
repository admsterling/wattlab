<template>
  <v-card>
    <v-card-title> Page Not Found </v-card-title>
    <v-card-subtitle>
      The page you requested is unknown or unavailable
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined depressed dark class="primary pr-2" router :to="'/'" replace>
        <v-icon class="mr-2">mdi-home</v-icon>
        Home</v-btn
      >
    </v-card-actions>
  </v-card>
</template>