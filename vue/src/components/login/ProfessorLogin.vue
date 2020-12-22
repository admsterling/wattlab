<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-text-field
            label="E-mail:"
            v-model="prof.email"
            :rules="emailRules"
            :loading="submitted"
            :disabled="submitted"
          ></v-text-field>
        </v-row>
        <v-row>
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
        </v-row>
        <!-- <v-row no-gutters>
          <v-col class="text-center">
            <v-checkbox
              v-model="remember"
              label="Remember me"
              :loading="submitted"
              :disabled="submitted"
            ></v-checkbox>
          </v-col>
        </v-row> -->
        <v-row align="center">
          <v-col class="text-center">
            <v-btn
              outlined
              @click="submit"
              :loading="submitted"
              :disabled="submitted"
              >Login
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      prof: {
        email: "test@test.com",
        password: "test123",
      },
      remember: false,
      errorList: undefined,
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
        this.errorList = undefined;
        this.$emit("flip-tabs");

        axios("http://localhost:4000/graphql", {
          method: "POST",
          data: {
            query: `
              query login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  token
                  prof{
                    _id
                    fname
                    lname
                    email
                    approved
                  }
                }
              }
            `,
            variables: {
              email: this.prof.email,
              password: this.prof.password,
            },
          },
        })
          .then((res) => {
            // if(this.remember){
            //   localStorage.setItem('token', res.data.data.login.token);
            // }
            this.$store.dispatch("prof/loginProf", res.data.data.login);
          })
          .then(() => {
            this.$router.push("/prof");
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
            this.$emit("flip-tabs");
          });
      }
    },
  },
};
</script>