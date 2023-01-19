<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterStyle"></div>
    <div
      class="movie-info-wrap d-flex flex-column justify-content-between"
      @click="showInfoModalEvent"
    >
      <div class="movie-item-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year">{{ movie.Year }}</span>
      </div>
      <div @click="showInfoModalEvent" class="info"></div>
      <a class="ghost-button" href=""></a>
      <div class="movie-item-controls row no-gutters">
        <div class="col">
          <template v-if="isSearch == false">
            <BButton
              size="md"
              block
              variant="outline-light"
              @click.stop="emitRemoveEvent"
              >Remove</BButton
            >
          </template>
          <template v-else>
            <BButton
              size="md"
              block
              variant="outline-light"
              @click.stop="emitAddInTop"
              >Add in top</BButton
            >
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    defaultPosterBg:
      "linear-gradient(45deg,rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)",
  }),
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    posterStyle() {
      return {
        "background-image": this.posterBg,
      };
    },
    posterBg() {
      return this.movie ? `url(${this.movie.Poster})` : this.defaultPosterBg;
    },
  },
  methods: {
    emitRemoveEvent() {
      this.$emit("removeItem", {
        id: this.movie.imdbID,
        title: this.movie.Title,
      });
    },
    emitAddInTop() {
      this.$emit("addInTop", {
        id: this.movie.imdbID,
        title: this.movie.Title,
      });
    },
    showInfoModalEvent() {
      this.$emit("showModal", this.movie.imdbID);
    },
  },
};
</script>

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 450px;
}

.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.04);
}

.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.movie-info-wrap {
  padding: 20px 10px;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;
}

.movie-title {
  font-size: 20px;
  color: #fff;
}

.movie-year {
  font-size: 14px;
  color: #fff;
}

.movie-item:hover .movie-info-wrap {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
.col {
  flex-grow: 1;
}
</style>
