
<template>
  <div align="center">
    <v-card max-width="700px">
      <v-card-title> Change Password </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="passwordForm" lazy-validation>
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
            @keyup.enter="submit"
          ></v-text-field>
          <v-text-field
            label="Confirm Password:"
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            hint="Minimum 6 characters"
            :loading="submitted"
            :disabled="submitted"
            @keyup.enter="submit"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        
        
        <v-btn
          class="teal"
          outlined
          dark
          @click="submit"
          :loading="submitted"
          :disabled="submitted"
          >Change Password
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      submitted: false,
      show: false,
      passwordRules: [
        (value) => !!value || "Required",
        (value) => (value && value.length >= 6) || "Minimum 6 characters",
      ],
      confirmPasswordRules: [
        (value) => !!value || "Required",
        (value) => (value && value.length >= 6) || "Minimum 6 characters",
        (value) => value === this.password || "Passwords do not match",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.passwordForm.validate()) {
        this.submitted = true;
      }
    },
  },
};
</script>