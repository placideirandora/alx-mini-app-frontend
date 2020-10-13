<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> ALX MINI APP </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list v-if="!loggedIn">
        <q-item-label header class="text-grey-8"> Quick Menu </q-item-label>
        <QuickMenu v-for="menu in menus" :key="menu.title" v-bind="menu" />
      </q-list>

      <q-list v-if="loggedIn">
        <q-item-label header class="text-grey-8"> Quick Menu </q-item-label>
        <q-item clickable @click="onSignOut">
          <q-item-section avatar>
            <q-icon :name="authMenus[0].icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ authMenus[0].title }}</q-item-label>
            <q-item-label caption>
              {{ authMenus[0].caption }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import QuickMenu from "components/QuickLink.vue";

const menuData = [
  {
    title: "Sign In",
    caption: "Go to the Sign In page",
    icon: "login",
    link: "#/",
  },
  {
    title: "Sign Up",
    caption: "Go to the Sign Up page",
    icon: "add",
    link: "#/register",
  },
];

const authMenuData = [
  {
    title: "Sign Out",
    caption: "Logout from the System",
    icon: "west",
    link: "#/",
  },
];

export default {
  name: "MainLayout",
  components: { QuickMenu },
  data: () => ({
    leftDrawerOpen: false,
    menus: menuData,
    authMenus: authMenuData,
  }),
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  methods: {
    ...mapActions(["checkLoginStatus", "signUserOut"]),
    onSignOut() {
      this.signUserOut();

      this.$router.push({ path: "/" });
    },
  },
  created() {
    this.checkLoginStatus();
  },
};
</script>
