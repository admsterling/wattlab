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
          <v-col cols="2">
            <v-checkbox v-model="consent" dense :rules="checkboxRules" />
          </v-col>
          <v-col cols="10" class="text-left">
            <span class="subtitle-2">
              I consent to the
              <span
                class="blue--text text-decoration-underline hover-hand"
                @click="showTC()"
                >terms and conditions</span
              >.
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="2">
            <v-checkbox v-model="studentInfo" dense :rules="checkboxRules" />
          </v-col>
          <v-col cols="10" class="text-left">
            <span class="subtitle-2">
              I have read the
              <span
                class="blue--text text-decoration-underline hover-hand"
                @click="showSI()"
                >student information</span
              >.
            </span>
          </v-col>
        </v-row>
        <v-row no-gutters align="center">
          <v-col class="text-center">
            <v-btn
              class="teal mt-5"
              :class="consent && studentInfo ? 'teal' : 'grey'"
              outlined
              dark
              @click="submit"
              :loading="submitted"
              :disabled="!(studentInfo && consent)"
              >Login</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-dialog v-model="tc" max-width="600px">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Terms and Conditions
        </v-card-title>
        <v-card-text class="pa-2">
          WattLab is currently a
          <span class="font-weight-bold">work in progress</span> project and may
          contain errors/bugs and is not liable for any loss in data.
          <ul class="py-2">
            <li>
              You agree that your Heriot-Watt username will be your account
              identifier
            </li>
            <li>
              Any text messages you send will be stored until the project is
              complete
              <span class="font-weight-bold"
                >22 Apr 2021 (15:30 Local Time)</span
              >.
            </li>
            <li>
              All data will be stored and processed within GDPR Regulations.
            </li>
          </ul>
          Please do not take advantage of any exploits you find and instead
          report them to
          <a href="mailto:as317@hw.ac.uk">as317@hw.ac.uk</a>.<br />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-orange lighten-2" @click="tc = false" dark>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="si" max-width="600px">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Student Information
        </v-card-title>
        <v-card-text class="pa-2">
          <span class="font-weight-bold"
            >Students, please not that the current Microsoft Forms lab method is
            still **WORKING**</span
          >.<br />If for any reason this site crashes or you are unable to use
          the application, return to the old method and a lab helper will assist
          you that way.
          <ul class="my-3">
            <li>
              Please try use the insite navigation so that we can understand how
              a user will navigate through the site.
            </li>
            <li>
              Although the site has been approved for use in most modern
              browsers, please try and use the latest version of
              <span class="font-weight-bold">Chrome</span>.
            </li>
            <li>
              Please have the
              <span class="font-weight-bold">Microsoft Teams</span> application
              running in the background so that you are ready to answer lab
              helper calls.
            </li>
            <li>
              This site has been developed for laptop / monitor use, navigation
              will not work with mobile devices.
            </li>
          </ul>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-orange lighten-2" @click="si = false" dark>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import PincodeInput from "vue-pincode-input";

export default {
  components: {
    PincodeInput,
  },
  data() {
    return {
      labCode: "6708A8",
      helperPIN: "7384",
      username: "te13",
      submitted: false,
      consent: true,
      studentInfo: true,
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
      tc: false,
      si: false,
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
    showTC() {
      this.tc = true;
    },
    showSI() {
      this.si = true;
    },
  },
  mounted() {
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