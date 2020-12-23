<template>
  <div>
    <v-container>
      <v-row>
        <v-col></v-col>
        <v-col class="text-center" cols="8" lg="6" xl="5">
          <v-card>
            <v-card-title class="text-uppercase grey--text justify-center">
              <span class="font-weight-light">watt</span>
              <span>lab</span>
            </v-card-title>

            <v-divider></v-divider>

            <v-form ref="registerForm" lazy-validation>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="First Name:"
                      v-model="prof.fname"
                      :rules="nameRules"
                      :loading="submitted"
                      :disabled="submitted"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Last Name:"
                      v-model="prof.lname"
                      :rules="nameRules"
                      :loading="submitted"
                      :disabled="submitted"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="E-mail:"
                      v-model="prof.email"
                      :rules="emailRules"
                      :loading="submitted"
                      :disabled="submitted"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Password:"
                      v-model="prof.password"
                      :rules="passwordRules"
                      :type="show ? 'text' : 'password'"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      hint="Minimum 6 characters"
                      :loading="submitted"
                      :disabled="submitted"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Password:"
                      v-model="prof.confirmPassword"
                      :rules="confirmPasswordRules"
                      :type="show ? 'text' : 'password'"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      hint="Minimum 6 characters"
                      :loading="submitted"
                      :disabled="submitted"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p>
                      Already registered? Click
                      <router-link to="/login">here</router-link>
                    </p>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="text-center">
                    <v-btn
                      class="teal"
                      outlined
                      dark
                      @click="submit"
                      :loading="submitted"
                      :disabled="submitted"
                      >Register
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      prof: {
        fname: "Adam",
        lname: "Sterling",
        email: "test@test.com",
        password: "test123",
        confirmPassword: "test123",
      },
      errorList: undefined,
      show: false,
      submitted: false,
      nameRules: [(value) => !!value || "Required"],
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
      confirmPasswordRules: [
        (value) => !!value || "Required",
        (value) => (value && value.length >= 6) || "Minimum 6 characters",
        (value) => value === this.prof.password || "Passwords do not match",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.registerForm.validate()) {
        this.submitted = true;
        this.errorList = undefined;
        axios("http://localhost:4000/graphql", {
          method: "POST",
          data: {
            query: `
            mutation createProf($fname: String!, $lname: String!, $email: String!, $password: String!){
                createProf(profInput: {
                    fname: $fname,
                    lname: $lname,
                    email: $email,
                    password: $password
                }) {
                    _id
                    approved
                }
            }
            `,
            variables: {
              fname: this.prof.fname,
              lname: this.prof.lname,
              email: this.prof.email,
              password: this.prof.password,
            },
          },
        })
          .then(() => {
            this.$toast.success("Account Created!");
            this.$router.push("/login");
          })
          .catch((error) => {
            if (error.response) {
              this.errorList = error.response.data.errors;
              for (let i = 0; i < this.errorList.length; i++) {
                this.$toast.error(this.errorList[i].message, {
                  position: "bottom-center",
                });
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
