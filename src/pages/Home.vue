<template>
  <q-page>
    <p class="text-h4 text-center q-pt-xl">JOKES</p>
    <div
      :class="
        $q.screen.xs
          ? 'flex flex-center q-pt-md q-pl-md q-pr-md'
          : 'flex flex-center q-pt-md'
      "
    >
      <div v-if="loading">
        <q-spinner color="primary" size="3em" />
      </div>
      <div v-if="fetchError">
        <q-banner inline-actions rounded class="bg-red text-white">
          {{ fetchErrorMessage }}

          <template v-slot:action>
            <q-btn flat label="Reload" @click="onReload" />
          </template>
        </q-banner>
      </div>
      <div v-if="jokes.length">
        <q-card
          class="q-mb-md"
          flat
          bordered
          v-for="joke of jokes"
          :key="joke.id"
        >
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Type</div>
              <div class="text-caption joke joke--type">
                {{ joke.type }}
              </div>

              <div class="text-overline">Setup</div>
              <div class="text-caption joke">
                {{ joke.setup }}
              </div>

              <div class="text-overline">Punchline</div>
              <div class="text-caption joke">
                {{ joke.punchline }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  data: () => ({
    jokes: [],
    loading: true,
    fetchError: false,
    fetchErrorMessage: "",
  }),
  methods: {
    ...mapActions(["checkLoginStatus"]),
    onReload() {
      window.location.reload();
    },
  },
  created() {
    this.$axios
      .get("https://official-joke-api.appspot.com/jokes/ten")
      .then((res) => {
        this.loading = false;
        this.jokes = res.data;
      })
      .catch((err) => {
        this.fetchErrorMessage =
          "Could not fetch Jokes. Check your Internet and reload the page.";
        this.loading = false;
        this.fetchError = true;
      });
  },
};
</script>

<style lang="scss" scoped>
.joke {
  color: #858585;

  &--type {
    text-transform: capitalize;
  }
}
</style>