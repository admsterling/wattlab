<template>
  <div>
    <v-container no-gutters>
      <v-form ref="urlform" lazy-validation>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="URL.title"
              label="Enter URL Title:"
              :rules="urlTitleRules"
              :loading="submitted"
              :disabled="submitted"
            ></v-text-field>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="URL.link"
              label="Enter URL Link:"
              :rules="urlLinkRules"
              :loading="submitted"
              :disabled="submitted"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn @click="submitURL" fab small>
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <v-subheader v-if="URLLinks.length === 0"
      >Currently No Links Added</v-subheader
    >
    <div v-else-if="URLLinks.length > 0 && this.submitted === true">
      <v-list flat>
        <v-subheader>URL's:</v-subheader>
        <v-list-item v-for="(title, i) in URLTitles" :key="i">
          <v-list-item-icon>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <a :href="URLLinks[i]" target="_blank">
                {{ title }}
              </a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <v-subheader>URL Links: (click to remove)</v-subheader>
      <v-list dense flat>
        <v-list-item v-for="(title, i) in URLTitles" :key="i">
          <v-list-item-icon>
            <v-icon @click="removeFromList(i)">mdi-close-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <a :href="URLLinks[i]" target="_blank">
                {{ title }}
              </a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  props: ["submitted", "URLTitles", "URLLinks"],
  data() {
    return {
      URL: {
        title: "",
        link: "",
      },
      urlTitleRules: [
        (value) => !!value || "Required",
        (value) => value.length > 0 || "Please enter a title",
      ],
      urlLinkRules: [
        (value) => !!value || "Required",
        (value) => value.length > 0 || "Please enter a link",
        (value) =>
          /^$|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
            value
          ) || "Incorrect Format",
      ],
    };
  },
  methods: {
    submitURL() {
      if (this.$refs.urlform.validate()) {
        if (this.URL.link[0] === "w") {
          this.URL.link = "http://" + this.URL.link;
        }
        this.URLTitles.push(this.URL.title);
        this.URLLinks.push(this.URL.link);
        this.URL = {
          title: "",
          link: "",
        };
        this.$refs.urlform.resetValidation();
      }
    },
    removeFromList(index) {
      this.URLTitles.splice(index, 1);
      this.URLLinks.splice(index, 1);
    },
  },
};
</script>