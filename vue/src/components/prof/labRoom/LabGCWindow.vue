<template>
  <div>
    <v-sheet
      id="chatWindow"
      color="grey lighten-4"
      class="rounded border"
      style="overflow-y: auto; max-height: calc(95vh - 80px); height: calc(95vh - 80px);"
      
    >
      <v-container fluid>
        <v-row
          v-for="(msg, i) in chat"
          :key="i"
          class="my-2"
          align="center"
          no-gutters
        >
          <v-col cols="2">
            <span class="ml-2 grey--text text--lighten-1">{{ msg.sent }} </span>
            <span class="mr-2">{{ msg.sender }}:</span>
          </v-col>
          <v-col cols="10">
            <div class="blue lighten-4 text-bubble">{{ msg.text }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-text-field
      v-model="chatInput"
      label="Message:"
      type="text"
      no-details
      outlined
      append-outer-icon="mdi-send"
      hide-details
      class="mt-2"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatInput: "",
      chat: [
        {
          sender: "as317",
          text:
            "test chataaaaaaaaaaaaaaa adddddddd ad asd asda sdasda adsa sd asd adsad asd asd a sa fsdfsdf sdfsd fsd fsd fs df asd asd asd",
          sent: "12:03",
        },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
        { sender: "as317", text: "test chat", sent: "12:03" },
      ],
    };
  },
  methods: {
    scrollToEnd() {
      let container = this.$el.querySelector("#chatWindow");
      container.scrollTop = container.scrollHeight;
    },
  },
  mounted() {
    this.scrollToEnd();
  },
};
</script>

<style scoped>
.text-bubble {
  border-radius: 20px;
  padding: 8px 15px;
  display: inline-block;
}
</style>