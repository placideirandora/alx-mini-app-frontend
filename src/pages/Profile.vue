<template>
  <q-page class="column q-pa-lg">
    <div class="q-pa-md" style="max-width: 400px">
      <p class="text-h5 q-mb-lg">PROFILE</p>
      <!-- VIEW MODE -->
      <div class="q-gutter-md q-mt-lg" v-if="!editMode">
        <q-input
          filled
          type="text"
          v-model="user.firstName"
          label="First name"
          readonly
          disable
        />

        <q-input
          filled
          type="text"
          v-model="user.lastName"
          label="Last name"
          readonly
          disable
        />

        <q-input
          filled
          type="text"
          v-model="user.userName"
          label="Username"
          readonly
          disable
        />

        <q-input
          filled
          type="email"
          v-model="user.email"
          label="Email"
          readonly
          disable
        />
        <div>
          <q-btn
            @click="editMode = !editMode"
            v-if="!loading && !editMode"
            label="Edit"
            color="primary"
          />
        </div>
      </div>

      <!-- EDIT MODE -->
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg" v-if="editMode">
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

        <div>
          <q-btn
            v-if="!loading && editMode"
            label="Update"
            type="submit"
            color="primary"
          />
          &nbsp; &nbsp; &nbsp;

          <q-btn
            @click="editMode = !editMode"
            v-if="!loading && editMode"
            label="Cancel"
            color="negative"
            outline
          />
          <q-spinner
            v-if="loading && editMode"
            color="primary"
            size="3em"
            :thickness="3"
          />
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
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    editMode: false,
  }),

  computed: {
    ...mapGetters(["loading", "user"]),
  },

  methods: {
    ...mapActions(["updateProfile"]),
    onSubmit() {
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
      };

      //   this.changeProfile(payload)
      //     .then((res) => {
      //       this.signUserOut();

      //       this.$q.notify({
      //         type: "positive",
      //         message: res,
      //       });
      //     })
      //     .catch((err) => {
      //       this.$q.notify({
      //         type: "negative",
      //         message: err,
      //       });
      //     });
    },
  },
  created() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.userName = this.user.userName;
    this.email = this.user.email;
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #1976d2;
}
</style>
