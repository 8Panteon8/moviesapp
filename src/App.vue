<template>
  <div id="app">
    <LoaderItem />
    <NotificationMsg />
    <PosterBG :poster="PosterBG" :bool="bool" />
    <PageHeader />
    <MoviesList
      :list="moviesList"
      @changePoster="changePoster"
      @changeBg="changeBg"
    />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "./components/MoviesList.vue";
import PosterBG from "./components/PosterBG.vue";
import MoviesPagination from "./components/MoviesPagination.vue";
import LoaderItem from "./components/LoaderItem.vue";
import PageHeader from "./components/PageHeader.vue";
import NotificationMsg from "./components/NotificationMsg.vue";

export default {
  name: "App",
  components: {
    MoviesList,
    PosterBG,
    MoviesPagination,
    LoaderItem,
    PageHeader,
    NotificationMsg,
  },
  data: () => ({
    PosterBG: "",
    bool: "",
  }),
  computed: {
    ...mapGetters("movies", [
      "moviesList",
      "currentPage",
      "moviesPerPage",
      "moviesLength",
    ]),
  },
  watch: {
    "$route.query": {
      handler: "onPageQueryChange",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    onPageQueryChange({ page = 1 }) {
      this.changeCurrentPage(Number(page));
    },
    changeBg() {
      this.bool = false;
    },
    changePoster(poster) {
      this.PosterBG = poster;
      this.bool = true;
    },
    onPageChanged(page) {
      this.$router.push({ query: { page } });
      // this.changeCurrentPage(page);
    },
  },
  // created() {
  //   if (this.$route.query.page) {
  //     this.changeCurrentPage(Number(this.$route.query.page));
  //   }
  // },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
