<template>
  <v-dialog v-model="qrDialog" max-width="550px">
    <v-card>
      <v-card-title>QR Code:</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid no-gutters>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" align="center" justify="center" no-gutters>
              <VueQRCode
                ref="qrcode"
                :value="this.code"
                :scale="6"
                errorCorrectionLevel="H"
              />
            </v-col>
          </v-row>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" align="center" justify="center" no-gutters>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <div
                    id="linkText"
                    @click="selectText"
                    :class="`elevation-${hover ? 15 : 4}`"
                    class="pa-3 transition-swing"
                  >
                    {{ code }}
                  </div>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="green--text" outlined @click="download">
          Download <v-icon>mdi-download</v-icon>
        </v-btn>
        <v-btn class="deep-orange lighten-2" dark @click="cancel">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VueQRCode from "vue-qrcode";

export default {
  components: {
    VueQRCode,
  },
  data: () => ({
    qrDialog: false,
    code: "",
  }),
  methods: {
    open(code) {
      this.qrDialog = true;
      this.code = "https://" + window.location.hostname + "/login/" + code;
    },
    cancel() {
      this.qrDialog = false;
    },
    download() {
      const a = document.createElement("a");
      a.href = this.$refs.qrcode.dataUrl;
      a.download = "lab-" + this.code.substr(this.code.length - 6) + ".png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    selectText() {
      const node = document.getElementById("linkText");

      if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
      } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        console.warn("Could not select text in node: Unsupported browser.");
      }
    },
  },
};
</script>