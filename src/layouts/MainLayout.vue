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
      <q-list>
        <q-item-label header class="text-grey-8"> Quick Links </q-item-label>
        <QuickLink v-for="link in quickLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import QuickLink from "components/QuickLink.vue";

const linksData = [
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

export default {
  name: "MainLayout",
  components: { QuickLink },
  data() {
    return {
      leftDrawerOpen: false,
      quickLinks: linksData,
    };
  },
};
</script>
