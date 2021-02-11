<template>
  <div>
    <v-list
      width="100%"
      two-line
      subheader
      dense
      style="height: calc(100vh - 360px); overflow-y: scroll"
    >
      <v-list-item v-for="message in messages" :key="message._id">
        <v-list-title class="mr-3 purple--text"> {{ message.sender }}: </v-list-title>
        <v-list-item-content>
          <v-list-item-title class="text-wrap">
            {{ message.text }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ message.createdAt | moment("kk:mm") }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ["messages"],
  data() {
    return {};
  },
};
</script>