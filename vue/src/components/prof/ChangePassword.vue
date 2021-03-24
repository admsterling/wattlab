
<template>
  <div align="center">
    <v-card max-width="700px">
      <v-card-title> Change Password </v-card-title>
      <v-divider></v-divider>
      <v-card-text align="center">
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
        <v-btn
          class="teal"
          outlined
          dark
          @click="submit"
          :loading="submitted"
          :disabled="submitted"
          >Change Password
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters({
      prof_id: "prof/prof_id",
    }),
  },
  methods: {
    submit() {
      if (this.$refs.passwordForm.validate()) {
        this.submitted = true;

        axios(process.env.VUE_APP_ENDPOINT, {
          method: "POST",
          data: {
            query: `
            mutation changePassword($prof_id: ID, $password: String!){
                changePassword(prof_id: $prof_id, password: $password)
            }
            `,
            variables: {
              prof_id: this.prof_id,
              password: this.password,
            },
          },
          headers: {
            Authorization: `Bearer ${this.$store.state.prof.token}`,
          },
        })
          .then(() => {
            this.$toast.success("Password Chnaged!");
            this.$router.push("/viewLabs");
          })
          .catch((error) => {
            if (error.response) {
              this.errorList = error.response.data.errors;
              for (let i = 0; i < this.errorList.length; i++) {
                this.$toast.error(this.errorList[i].message);
              }
            } else {
              console.log("Error", error.message);
            }
          })
          .finally(() => {
            this.submitted = false;
          });
      }
    },
  },
};
</script>