<template>
  <div
    class="fullscreen bg-red text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Page Not Found.</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="red"
        unelevated
        label="Go Back Home"
        no-caps
        @click="onGoBackHome"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Error404",
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  methods: {
    ...mapActions(["checkLoginStatus"]),
    onGoBackHome() {
      if (this.loggedIn) {
        this.$router.push({ name: "home" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
  },
  created() {
    this.checkLoginStatus();
  },
};
</script>
