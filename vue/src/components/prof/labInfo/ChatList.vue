<template>
  <div>
    <v-list
      width="100%"
      two-line
      subheader
      dense
      style="height: calc(100vh - 360px); overflow-y: scroll"
    >
      <template v-for="(message, i) in messages">
        <v-list-item :key="i">
          <v-list-item-content>
            <v-list-item-title class="text-wrap">
              {{ message.text }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="purple--text">{{ message.sender }}</span> -
              {{ message.createdAt | moment("kk:mm") }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="i"></v-divider>
      </template>
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