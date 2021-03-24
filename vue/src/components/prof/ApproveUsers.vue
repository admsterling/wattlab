
<template>
  <div align="center">
    <v-card max-width="700px">
      <v-card-title>Approve / Reject New Professors</v-card-title>
      <v-divider></v-divider>
      <v-card-text
        align="center"
        style="height: calc(100vh - 200px); overflow-y: auto"
      >
        <v-list two-line>
          <v-list-item v-for="(user, i) in profs" :key="i">
            <v-list-item-content>
              <v-list-item-title
                v-text="name(user.fname, user.lname)"
              ></v-list-item-title>

              <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                width="120px"
                class="my-1 green white--text"
                @click="approve(user._id)"
              >
                Approve <v-icon>mdi-check</v-icon>
              </v-btn>
              <v-btn
                width="120px"
                class="my-1 red white--text"
                @click="reject(user._id)"
              >
                Reject <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profs: [],
    };
  },
  methods: {
    name(fname, lname) {
      return fname + " " + lname;
    },
    approve(id) {
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
            mutation approveProf($prof_id: ID!){
                approveProf(prof_id: $prof_id)
            }
            `,
          variables: {
            prof_id: id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then(() => {
          this.$toast.success("Account Approved");
          this.removeLocal(id);
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
    },
    reject(id) {
      console.log(id);
      axios(process.env.VUE_APP_ENDPOINT, {
        method: "POST",
        data: {
          query: `
            mutation rejectProf($prof_id: ID!){
                rejectProf(prof_id: $prof_id)
            }
            `,
          variables: {
            prof_id: id,
          },
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.prof.token}`,
        },
      })
        .then(() => {
          this.$toast.success("Account Rejected");
          this.removeLocal(id);
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
    },
    removeLocal(id) {
      const pos = this.profs
        .map((p) => {
          return p._id;
        })
        .indexOf(id);

      this.profs.splice(pos, 1);
    },
  },
  created() {
    if (this.$store.state.prof.profData.email !== "cd32@hw.ac.uk") {
      this.$toast.error(
        "You do not have permission to approve / reject new accounts"
      );
      this.$router.push("/viewLabs");
    }
  },
  mounted() {
    axios(process.env.VUE_APP_ENDPOINT, {
      method: "POST",
      data: {
        query: `
            query getAccounts{
                getAccounts{
                  _id
                  fname
                  lname
                  email
                }
            }
            `,
      },
      headers: {
        Authorization: `Bearer ${this.$store.state.prof.token}`,
      },
    })
      .then((res) => {
        this.profs = res.data.data.getAccounts;
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
  },
};
</script>