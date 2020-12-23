<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-text-field
            v-model="labCode" 
            @input="v => { labCode = v.toUpperCase()}"

            :counter="6"
            maxlength="6"
            :rules="codeRules"
            required
            label="Lab Code"
            clearable
            :loading="submitted"
            :disabled="submitted"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="studentName"
            ref="name"
            maxlength="6"
            :rules="usernameRules"
            label="Heriot-Watt Username:"
            hint="Your username is the start of your HW e-mail xxx@hw.ac.uk"
            persistent-hint
            required
            clearable
            :loading="submitted"
            :disabled="submitted"
          ></v-text-field>
        </v-row>
        <v-row align="center">
          <v-col class="text-center">
            <v-btn
              class="teal mt-5"
              outlined
              dark
              @click="submit"
              :loading="submitted"
              :disabled="submitted"
              >Login</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labCode: "",
      studentName: "",
      submitted: false,
      validForm: true,
      codeRules: [
        (value) => !!value || "Required",
        (value) => /^[0-9A-Z]{6}/.test(value) || "Incorrect Format",
      ],
      usernameRules: [
        (value) => !!value || "Required",
        (value) => /^[a-z]{2}[0-9]{1,4}$/.test(value) || "Incorrect Format",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.submitted = true;
        this.$emit("flip-tabs");
        // continue here...
      }
    },
  },
};
</script>