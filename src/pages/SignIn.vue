<template>
  <q-page class="column q-pa-lg">
    <div class="q-pa-md" style="max-width: 400px">
      <p class="text-h5 q-mb-lg">SIGN IN</p>

      <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg">
        <q-input
          filled
          type="email"
          v-model="email"
          label="Email *"
          lazy-rules
          clearable
          :rules="[
            (val) => (val && val.length > 0) || 'Please type in your email',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password *"
          lazy-rules
          clearable
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type in your password',
          ]"
        />

        <div>
          <q-btn
            v-if="!loading"
            label="Sign In"
            type="submit"
            color="primary"
          />
          <q-spinner v-if="loading" color="primary" size="3em" :thickness="3" />
        </div>

        <div>
          <p class="q-mt-lg">
            Don't you have an account?
            <a class="link" href="#" @click.prevent="onNavigateToRegister"
              >Register</a
            >
          </p>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SignIn",
  data: () => ({
    email: null,
    password: null,
  }),

  computed: {
    ...mapGetters(["loading"]),
  },

  methods: {
    ...mapActions(["signIn"]),
    onSubmit() {
      const payload = { email: this.email, password: this.password };

      this.signIn(payload)
        .then((res) => {
          this.$q.notify({
            type: "positive",
            message: res,
          });

          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          this.$q.notify({
            type: "negative",
            message: err,
          });
        });
    },

    onNavigateToRegister() {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #1976d2;
}
</style>
