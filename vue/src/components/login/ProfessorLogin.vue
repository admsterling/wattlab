<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-text-field
            label="E-mail:"
            v-model="email"
            :rules="emailRules"
            clearable
            :loading="submitted"
            :disabled="submitted"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            label="Password:"
            v-model="password"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            hint="Minimum 6 characters"
            :loading="submitted"
            :disabled="submitted"
          ></v-text-field>
        </v-row>
        <v-row align="center">
          <v-col class="text-center">
            <v-btn
              class="mt-6"
              outlined
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
      email: "",
      password: "",
      show: false,
      submitted: false,
      emailRules: [
        (value) => !!value || "Required",
        (value) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Incorrect Format",
      ],
      passwordRules: [
        (value) => !!value || "Required",
        (value) => (value && value.length >= 6) || "Minimum 6 characters",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.submitted = true;
        this.$emit("disable-tabs");
        
      }
    },
  },
};
</script>