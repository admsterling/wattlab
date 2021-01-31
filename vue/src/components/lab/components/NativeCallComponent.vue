<template>
  <v-btn>
    <v-icon>mdi-call</v-icon>
  </v-btn>
</template>


<script>
export default {
  data() {
    return {
      peer: null,
      conn: null,
    };
  },
  methods: {
    startCall() {},
  },
};
</script>