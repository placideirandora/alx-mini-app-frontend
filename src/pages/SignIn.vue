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
          <q-btn label="Sign In" type="submit" color="primary" />
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
export default {
  name: "SignIn",
  data() {
    return {
      email: null,
      password: null,
    };
  },

  methods: {
    onSubmit() {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted",
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