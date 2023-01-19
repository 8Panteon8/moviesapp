<template>
  <header class="header">
    <BNavbar type="dark" class="navbar" variant="dark">
      <BContainer>
        <BNavbarBrand href="#"
          ><b-icon
            icon="star-fill"
            class="pr-2"
            animation="fade"
            font-scale="1"
          ></b-icon
          >Movie<b-icon
            icon="star-fill"
            class="pl-2"
            animation="fade"
            font-scale="1"
          ></b-icon
        ></BNavbarBrand>
        <BNavbarNav class="navItem">
          <BNavItem @click="openTop">Top {{ counter }}</BNavItem>
        </BNavbarNav>
        <BNavForm class="nav-form">
          <BFormInput
            class="search-input"
            placeholder="Global search"
            v-model="searchValue"
            debounce="500"
          ></BFormInput>
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PageHEader",
  data: () => ({
    searchValue: "",
  }),
  watch: {
    searchValue: "onSearchValueChange",
  },
  computed: {
    ...mapGetters("movies", ["moviesLength"]),
    counter() {
      return this.moviesLength;
    },
  },
  methods: {
    ...mapActions("movies", [
      "searchMovies",
      "fetchMovies",
      "changeCurrentPage",
      "toggleSearchState",
    ]),
    onSearchValueChange(val) {
      this.searchMovies(val);
    },

    openTop() {
      this.fetchMovies();
      this.toggleSearchState(false);
    },
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}

.search-input:focus {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
}

.navItem {
  margin-right: auto;
}

/* .nav-form {
  display: flex;
  align-items:;
} */
</style>
