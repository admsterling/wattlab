<template>
  <v-form ref="createLabForm" v-on:submit.prevent lazy-validation>
    <v-container>
      <v-row no-gutter>
        <v-col>
          <v-text-field
            @keyup.enter="submit"
            v-model="lab.title"
            :rules="titleRules"
            label="Lab Title:"
            :loading="submitted"
            :disabled="submitted"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutter>
        <v-col>
          <LabHelperField :submitted="submitted" :labHelpers="lab.labHelpers" />
        </v-col>
      </v-row>
      <v-row no-gutter>
        <v-col>
          <v-textarea
            v-model="lab.desc"
            clearable
            clear-icon="mdi-close-circle"
            label="Description:"
            :loading="submitted"
            :disabled="submitted"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutter>
        <v-col>
          <v-text-field
            v-model="lab.url"
            label="URL Link:"
            :rules="urlRules"
            hint="https://gitlab.com/xxx/xxx.git"
            persistent-hint
            :loading="submitted"
            :disabled="submitted"
            @keyup.enter="submit"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" no-gutter>
          <v-col class="text-center">
            <v-btn
              outlined
              @click="submit"
              :loading="submitted"
              :disabled="submitted"
              >Create Lab
            </v-btn>
          </v-col>
        </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  components: {
    LabHelperField: () => import("./LabHelperField"),
  },
  data() {
    return {
      submitted: false,
      errorList: undefined,
      lab: {
        title: "",
        studentCode: "",
        labHelpers: [],
        desc: "",
        url: "https://www.google.com",
      },
      titleRules: [(value) => !!value || "Required"],
      urlRules: [
        (value) =>
          /^$|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(value) ||
          "Incorrect Format",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.createLabForm.validate()) {
        this.submitted = true;
        this.errorList = undefined;
        console.log(this.lab);
      }
    },
  },
};
</script>