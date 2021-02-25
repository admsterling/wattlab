<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-text-field
            v-model="labCode"
            @input="
              (v) => {
                if (v !== null) {
                  labCode = v.toUpperCase();
                }
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
            @keyup.enter="submit"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="username"
            ref="name"
            maxlength="7"
            :rules="usernameRules"
            label="Heriot-Watt Username:"
            hint="Your username is the start of your HW e-mail xxx@hw.ac.uk"
            persistent-hint
            required
            clearable
            :loading="submitted"
            :disabled="submitted"
            @keyup.enter="submit"
          ></v-text-field>
        </v-row>
        <v-row class="mt-2" align="center">
          <v-col>
            <v-expansion-panels accordion>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Lab Helper Options
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <span class="text-subtitle-1">PIN number:</span>
                  <br />
                  <PincodeInput
                    v-model="helperPIN"
                    placeholder="0"
                    :autofocus="false"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="12">
            <v-simple-checkbox
              v-model="consent"
              :ripple="false"
              dense
              :rules="checkboxRules"
              class="float-left"
              color="blue"
            />
            <span class="ml-2 float-left subtitle-2">
              I consent to the
              <span
                class="blue--text text-decoration-underline hover-hand"
                @click="$refs.tc.open()"
                >terms and conditions</span
              >.
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="12">
            <v-simple-checkbox
              v-model="studentInfo"
              :ripple="false"
              dense
              :rules="checkboxRules"
              class="float-left"
              color="blue"
            />
            <span class="ml-2 float-left subtitle-2">
              I have read the
              <span
                class="blue--text text-decoration-underline hover-hand"
                @click="$refs.si.open()"
                >student information</span
              >.
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="12">
            <v-simple-checkbox
              v-model="microphone"
              :ripple="false"
              dense
              :rules="checkboxRules"
              class="float-left"
              color="blue"
            />
            <span class="ml-2 float-left subtitle-2">
              I have gave the site access to the
              <span
                class="blue--text text-decoration-underline hover-hand"
                @click="$refs.mi.open()"
                >microphone</span
              >.
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="12">
            <v-simple-checkbox
              v-model="rememberMe"
              :ripple="false"
              dense
              :rules="checkboxRules"
              class="float-left"
              color="blue"
            />
            <span class="ml-2 float-left subtitle-2">
              Remember me and my choices for 4 weeks (
              <span
                class="blue--text text-decoration-underline hover-hand"
                @click="$refs.cookie.open()"
                >Cookie Policy</span
              >).
            </span>
          </v-col>
        </v-row>
        <v-row no-gutters align="center">
          <v-col class="text-center">
            <v-btn
              class="teal mt-5"
              :class="consent && studentInfo && microphone ? 'teal' : 'grey'"
              outlined
              dark
              @click="submit"
              :loading="submitted"
              :disabled="!(studentInfo && consent && microphone)"
              >Login</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <TermsAndConditions ref="tc" />
    <StudentInformation ref="si" />
    <Mic ref="mi" />
    <Cookie ref="cookie" />
  </div>
</template>

<script>
import axios from "axios";
import PincodeInput from "vue-pincode-input";

export default {
  components: {
    PincodeInput,
    StudentInformation: () => import("./components/StudentInformation"),
    TermsAndConditions: () => import("./components/TermsAndConditions"),
    Mic: () => import("./components/Mic"),
    Cookie: () => import("./components/Cookie"),
  },
  data() {
    return {
      labCode: "",
      helperPIN: "",
      username: "",
      submitted: false,
      consent: false,
      studentInfo: false,
      microphone: false,
      rememberMe: false,
      validForm: true,
      codeRules: [
        (value) => !!value || "Required",
        (value) => /^[0-9A-Z]{6}/.test(value) || "Incorrect Format",
      ],
      usernameRules: [
        (value) => !!value || "Required",
        (value) =>
          /^[a-z\\-]{2,3}[0-9]{1,4}$/.test(value) || "Incorrect Format",
      ],
      checkboxRules: [(value) => value || "Required"],
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.submitted = true;
        this.$emit("flip-tabs");
        axios(process.env.VUE_APP_ENDPOINT, {
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
              helperPIN: parseFloat(this.helperPIN),
              socketid: this.$socket.id,
            };
            this.$store
              .dispatch("socket/setLab", contextData)
              .then(() => {
                if (this.rememberMe) {
                  this.$cookies.set("username", this.username, "28d");
                  this.$cookies.set("labCode", this.labCode, "28d");
                  this.$cookies.set("helperPIN", this.helperPIN, "28d");
                } else {
                  this.$cookies.remove("username");
                  this.$cookies.remove("labCode");
                  this.$cookies.remove("helperPIN");
                }
                this.$socket.emit("joinRoom", this.labCode);
                this.$router.push("/join/" + this.labCode);
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
  mounted() {
    if (this.$cookies.get("username")) {
      this.username = this.$cookies.get("username");
      this.labCode = this.$cookies.get("labCode");
      this.helperPIN = this.$cookies.get("helperPIN");
      this.rememberMe = true;
      this.consent = true;
      this.studentInfo = true;
      this.microphone = true;
    }

    if (this.$route.params.code) {
      this.labCode = this.$route.params.code;
    }
  },
};
</script>

<style scoped>
.hover-hand {
  cursor: pointer;
}
</style>