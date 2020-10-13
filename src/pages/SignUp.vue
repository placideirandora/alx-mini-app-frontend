<template>
  <q-page class="column q-pa-lg">
    <div class="q-pa-md" style="max-width: 400px">
      <p class="text-h5 q-mb-lg">SIGN UP</p>

      <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg">
        <q-input
          filled
          type="text"
          v-model="firstName"
          label="First name *"
          lazy-rules
          clearable
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please type in your first name',
          ]"
        />

        <q-input
          filled
          type="text"
          v-model="lastName"
          label="Last name *"
          lazy-rules
          clearable
          :rules="[
            (val) => (val && val.length > 0) || 'Please type in your last name',
          ]"
        />

        <q-input
          filled
          type="text"
          v-model="userName"
          label="Username *"
          lazy-rules
          clearable
          :rules="[
            (val) => (val && val.length > 0) || 'Please type in your username',
          ]"
        />

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

        <q-input
          filled
          type="password"
          v-model="passwordConfirmation"
          label="Confirm Password *"
          lazy-rules
          clearable
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please type in your password again',
            (val) =>
              val === password || 'This password must match the above one',
          ]"
        />

        <div>
          <q-btn
            v-if="!loading"
            label="Sign Up"
            type="submit"
            color="primary"
          />
          <q-spinner v-if="loading" color="primary" size="3em" :thickness="3" />
        </div>

        <div>
          <p class="q-mt-lg">
            Already have an account?
            <a class="link" href="#" @click.prevent="onNavigateToLogin"
              >Login</a
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
  name: "SignUp",
  data() {
    return {
      firstName: null,
      lastName: null,
      userName: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    };
  },

  computed: {
    ...mapGetters(["loading"]),
  },

  methods: {
    ...mapActions(["signUp"]),
    onSubmit() {
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.email,
        password: this.password,
      };

      this.signUp(payload)
        .then((res) => {
          this.$q.notify({
            type: "positive",
            message: res,
          });

          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          this.$q.notify({
            type: "negative",
            message: err,
          });
        });
    },

    onNavigateToLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #1976d2;
}
</style>