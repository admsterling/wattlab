<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-text-field
            v-model="labCode"
            @input="
              (v) => {
                labCode = v.toUpperCase();
              }
            "
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
            v-model="username"
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
import axios from "axios";
export default {
  data() {
    return {
      labCode: "3A4721",
      username: "te13",
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
    async submit() {
      if (this.$refs.form.validate()) {
        this.submitted = true;
        this.$emit("flip-tabs");
        axios("http://localhost:4000/graphql", {
          method: "POST",
          data: {
            query: `
              query labExist($code: String!) {
                labExist(code: $code)
              }
            `,
            variables: {
              code: this.labCode,
            },
          },
        })
          .then(() => {
            const contextData = {
              code: this.labCode,
              username: this.username,
            };
            this.$store
              .dispatch("socket/setLab", contextData)
              .then(() => {
                this.$socket.emit("joinRoom", this.labCode);
                this.$router.push("/join/" + this.labCode);
              })
              .catch((err) => {
                this.$toast.error(err.message);
              });
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
            this.$emit("flip-tabs");
          });
      }
    },
  },
};
</script>