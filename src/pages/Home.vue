<template>
  <q-page>
    <div class="q-pa-md flex flex-center">
      <div class="q-gutter-y-md" style="max-width: 400px">
        <q-tabs
          v-model="tab"
          narrow-indicatorf
          align="justify"
          class="text-primary"
          style="width: 300px"
        >
          <q-tab
            style="outline: none"
            :ripple="false"
            name="animes"
            icon="movie"
            label="Animes"
          />
          <q-tab
            style="outline: none"
            :ripple="false"
            name="jokes"
            icon="child_care"
            label="Jokes"
          />
        </q-tabs>
      </div>
    </div>

    <div class="flex flex-center q-pt-md q-pl-md q-pr-md">
      <div v-if="jokesLoading && tab === 'jokes'">
        <q-spinner color="primary" size="3em" />
      </div>

      <div v-if="animesLoading && tab === 'animes'">
        <q-spinner color="primary" size="3em" />
      </div>

      <div v-if="fetchError" class="q-pb-xl">
        <q-banner
          v-if="fetchAnimeErrorMessage && tab === 'animes'"
          inline-actions
          rounded
          class="bg-red text-white"
        >
          {{ fetchAnimeErrorMessage }}

          <template v-slot:action>
            <q-btn flat label="Reload" @click="onReload" />
          </template>
        </q-banner>

        <q-banner
          v-if="fetchJokeErrorMessage && tab === 'jokes'"
          inline-actions
          rounded
          class="bg-red text-white"
        >
          {{ fetchJokeErrorMessage }}

          <template v-slot:action>
            <q-btn flat label="Reload" @click="onReload" />
          </template>
        </q-banner>
      </div>

      <div v-if="jokes.length && tab === 'jokes'">
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
              <div class="text-caption item item--type">
                {{ joke.type }}
              </div>

              <div class="text-overline">Setup</div>
              <div class="text-caption item">
                {{ joke.setup }}
              </div>

              <div class="text-overline">Punchline</div>
              <div class="text-caption item">
                {{ joke.punchline }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>

      <div v-if="animes.length && tab === 'animes' && !animesLoading">
        <div class="flex flex-center column">
          <q-card
            class="my-card q-mb-xl"
            :style="
              $q.screen.xs
                ? 'width: 90%'
                : $q.screen.sm
                ? 'width: 80%'
                : 'width: 40%'
            "
            v-for="anime of animes"
            :key="anime.id"
          >
            <q-img
              :src="
                anime.attributes.posterImage
                  ? anime.attributes.posterImage.large
                  : 'https://cdn.quasar.dev/img/boy-avatar.png'
              "
              style="height: 250px; max-width: 100%"
              spinner-color="white"
            />

            <q-card-section>
              <div class="text-h6" style="text-transform: uppercase">
                {{
                  anime.attributes.titles.en
                    ? anime.attributes.titles.en
                    : anime.attributes.titles.en_jp
                    ? anime.attributes.titles.en_jp
                    : anime.attributes.titles.en_cn
                }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-caption item">
                {{
                  anime.attributes.synopsis
                    ? anime.attributes.synopsis
                    : "No content"
                }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <q-rating
                readonly
                :value="
                  (parseInt(anime.attributes.averageRating, 10) * 5) / 100
                "
                size="32px"
                color="primary"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div
      class="flex flex-center q-pt-none q-pl-md q-pr-md q-pb-xl"
      v-if="animes.length && tab === 'animes' && !animesLoading"
    >
      <q-pagination
        v-model="currentPage"
        :max="totalAnimes"
        :input="true"
        @input="onPageChange"
      >
      </q-pagination>
    </div>
  </q-page>
</template>

    
<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  data: () => ({
    jokes: [],
    animes: [],
    jokesLoading: true,
    animesLoading: true,
    fetchError: false,
    fetchAnimeErrorMessage: "",
    fetchJokeErrorMessage: "",
    tab: "animes",
    currentPage: 1,
    totalAnimes: 10,
    offset: 0,
    page: 1,
    pageLink: "",
    firstPageLink: "",
    lastPageLink: "",
    nextPageLink: "",
    prevPageLink: "",
  }),
  methods: {
    ...mapActions(["checkLoginStatus"]),
    onReload() {
      window.location.reload();
    },
    onPageChange(value) {
      if (value === 1) {
        this.pageLink = this.firstPageLink;
      } else if (value === this.totalAnimes) {
        this.pageLink = this.lastPageLink;
      } else {
        if (value > this.page) {
          this.pageLink = this.nextPageLink;
        } else {
          this.pageLink = this.prevPageLink;
        }
      }

      this.page = value;
      this.animesLoading = true;

      // Fetch Animes
      this.$axios
        .get(this.pageLink)
        .then((res) => {
          this.animes = res.data.data;
          this.prevPageLink = res.data.links.prev;
          this.nextPageLink = res.data.links.next;
          this.animesLoading = false;
        })
        .catch((err) => {
          this.fetchErrorMessage =
            "Could not fetch Animes. Check your Internet and reload the page.";
          this.animesLoading = false;
          this.fetchError = true;
        });
    },
  },
  created() {
    // Fetch Jokes
    this.$axios
      .get("https://official-joke-api.appspot.com/jokes/ten")
      .then((res) => {
        this.jokesLoading = false;
        this.jokes = res.data;
      })
      .catch((err) => {
        this.fetchJokeErrorMessage =
          "Could not fetch Jokes. Check your Internet and reload the page.";
        this.jokesLoading = false;
        this.fetchError = true;
      });

    // Fetch Animes
    this.$axios
      .get("https://kitsu.io/api/edge/anime")
      .then((res) => {
        this.animes = res.data.data;
        this.totalAnimes = res.data.meta.count;
        this.animesLoading = false;

        this.firstPageLink = res.data.links.first;
        this.lastPageLink = res.data.links.last;
        this.prevPageLink = res.data.links.prev;
        this.nextPageLink = res.data.links.next;
      })
      .catch((err) => {
        this.fetchAnimeErrorMessage =
          "Could not fetch Animes. Check your Internet and reload the page.";
        this.animesLoading = false;
        this.fetchError = true;
      });
  },
};
</script>

<style lang="scss" scoped>
.item {
  color: #858585;

  &--type {
    text-transform: capitalize;
  }
}

.link {
  color: #1976d2;
}
</style>