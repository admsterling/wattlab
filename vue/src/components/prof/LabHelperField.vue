<template>
  <div>
    <v-text-field
      v-model="currentHelper"
      maxlength="7"
      label="Enter Lab Helper Username:"
      hint="Press Enter to add to the list of Lab Helpers"
      :rules="usernameRules"
      @keyup.enter="submitHelper"
      :loading="submitted"
      :disabled="submitted"
    ></v-text-field>

    <v-subheader v-if="labHelpers.length === 0"
      >Currently No Helpers Added</v-subheader
    >
    <div v-else-if="labHelpers.length > 0 && this.submitted === true">
      <v-list flat>
        <v-subheader>Helpers:</v-subheader>
        <v-list-item v-for="(helper, i) in labHelpers" :key="i">
          <v-list-item-icon>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ helper }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <v-subheader>Helpers: (click to remove)</v-subheader>
      <v-list dense flat>
        <v-list-item
          v-for="(helper, i) in labHelpers"
          :key="i"
          @click="removeFromList(i)"
        >
          <v-list-item-icon>
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ helper }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  props: ["submitted", "labHelpers"],
  data() {
    return {
      currentHelper: "",
      usernameRules: [
        (value) =>
          /^[a-z\\-]{2,3}[0-9]{1,4}$/.test(value) || "Incorrect Format",
      ],
    };
  },
  methods: {
    submitHelper() {
      if (/^[a-z]{2}[0-9]{1,4}$/.test(this.currentHelper)) {
        this.labHelpers.push(this.currentHelper);
        this.currentHelper = "";
      }
    },
    removeFromList(index) {
      this.labHelpers.splice(index, 1);
    },
  },
};
</script>