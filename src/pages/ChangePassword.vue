<template>
  <q-page class="column q-pa-lg">
    <div class="q-pa-md" style="max-width: 400px">
      <p class="text-h5 q-mb-lg">CHANGE PASSWORD</p>
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg">
        <q-input
          filled
          type="password"
          v-model="oldPassword"
          label="Old Password *"
          lazy-rules
          clearable
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please type in your old password',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="newPassword"
          label="New Password *"
          lazy-rules
          clearable
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please type in your new password',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="newPasswordConfirmation"
          label="Confirm New Password *"
          lazy-rules
          clearable
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please type in your new password again',
            (val) =>
              val === newPassword || 'This password must match the above one',
          ]"
        />

        <div>
          <q-btn v-if="!loading" label="Change" type="submit" color="primary" />
          <q-spinner v-if="loading" color="primary" size="3em" :thickness="3" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChangePassword",
  data: () => ({
    oldPassword: null,
    newPassword: null,
    newPasswordConfirmation: null,
  }),

  computed: {
    ...mapGetters(["loading"]),
  },

  methods: {
    ...mapActions(["changePassword", "signUserOut"]),
    onSubmit() {
      const payload = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };

      this.changePassword(payload)
        .then((res) => {
          this.signUserOut();

          this.$router.push({ name: "login" });

          this.$q.notify({
            type: "positive",
            message: res,
          });
        })
        .catch((err) => {
          this.$q.notify({
            type: "negative",
            message: err,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #1976d2;
}
</style>
