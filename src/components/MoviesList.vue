<template>
  <BContainer>
    <BRow class="movie-list-header" align-h="around">
      <template v-if="isSearch == false">
        <h3 class="list-title">Top {{ this.moviesLength }}</h3>
        <b-button @click="onShowMovieTemplate" class="add-movie"
          >Add custom movie</b-button
        >
      </template>
      <template v-else>
        <h3 class="list-title">Search result</h3>
      </template>
    </BRow>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @mouseout.native="onMosueOut"
            @removeItem="onRemoveItem"
            @showModal="onShowMovieInfo"
            @addInTop="onAddInTop"
          />
        </BCol>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </BRow>
    <BModal
      body-class="movie-modal-body"
      :id="movieInfoModalID"
      size="xl"
      hide-footer
      hide-header
    >
      <MovieInfoModalContent
        :movie="selectedMovie"
        @closeModal="onCloseModal"
        @openEditMovieModal="onOpenEditMovieModal"
      />
    </BModal>
    <BModal
      body-class="movie-modal-body"
      :id="movieTemplatedModal"
      size="xl"
      hide-footer
      hide-header
    >
      <TemplateMovieInfo @closeTemplate="onCloseTemplate" />
    </BModal>
    <BModal
      body-class="movie-modal-body"
      :id="editMovieModal"
      size="xl"
      hide-footer
      hide-header
    >
      <EditMovieInfoModal
        :movie="selectedMovie"
        @closeEdit="OnCloseEdit"
        @openInfoModal="onShowMovieInfo"
      />
    </BModal>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "./MovieItem.vue";
import MovieInfoModalContent from "./MovieInfoModalContent.vue";
import TemplateMovieInfo from "./TemplateMovieInfo.vue";
import EditMovieInfoModal from "./EditMovieInfoModal.vue";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      dafault: () => ({}),
    },
  },
  data: () => ({
    movieTemplatedModal: "movie-add",
    movieInfoModalID: "movie-info",
    editMovieModal: "movie-edit",
    selectedMovieID: "",
    length: null,
  }),
  components: {
    MovieItem,
    MovieInfoModalContent,
    TemplateMovieInfo,
    EditMovieInfoModal,
  },
  computed: {
    ...mapGetters("movies", ["isSearch", "moviesLength"]),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    selectedMovie() {
      return this.selectedMovieID ? this.list[this.selectedMovieID] : null;
    },
  },
  methods: {
    ...mapActions("movies", ["removeMovie", "addMovieinTop"]),
    ...mapActions(["showNotify"]),
    onMosueOut() {
      this.$emit("changeBg");
    },
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Please confirm that you want to delete ${title}`,
        {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: true,
          centered: true,
        }
      );
      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: "Movie deleted successful",
          variant: "success",
          title: "Success",
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieID = id;
      this.$bvModal.show(this.movieInfoModalID);
    },
    onShowMovieTemplate() {
      this.$bvModal.show(this.movieTemplatedModal);
    },
    onCloseModal() {
      this.selectedMovieID = null;
      this.$bvModal.hide(this.movieInfoModalID);
    },
    onCloseTemplate() {
      this.$bvModal.hide(this.movieTemplatedModal);
    },
    onOpenEditMovieModal(id) {
      this.selectedMovieID = id;
      this.$bvModal.hide(this.movieInfoModalID);
      this.$bvModal.show(this.editMovieModal);
    },
    OnCloseEdit() {
      this.$bvModal.hide(this.editMovieModal);
    },
    async onAddInTop({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Please confirm that you want add ${title} in Top`,
        {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: true,
          centered: true,
        }
      );
      if (isConfirmed) {
        const startLength = this.length;
        this.addMovieinTop(id);
        this.length = this.moviesLength;
        console.log(this.length);
        if (startLength != this.length) {
          this.showNotify({
            msg: "Movie add successful",
            variant: "success",
            title: "Success",
          });
        } else {
          this.showNotify({
            msg: "The movie is already in the top",
            variant: "danger",
            title: "Error",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.list-title {
  padding-left: 1rem;
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
.add-movie {
  margin-top: 15px;
  margin-bottom: 45px;
}
.add-movie {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}
.add-movie:hover {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
}
.add-movie:focus {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
}
</style>

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
