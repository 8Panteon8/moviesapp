<template>
  <div class="movie-info-wrap">
    <header class="movie-info-header">
      <h6 class="movie-header-title">Movie view</h6>
      <BIconX class="close-icon" @click="closeEdit" />
    </header>
    <div class="movie-info-content">
      <BRow>
        <BCol cols="4">
          <div class="movie-poster-wrap">
            <div class="movie-poster" :style="posterStyle"></div>
          </div>
        </BCol>
        <BCol cols="8">
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <BForm @submit.stop.prevent="handleSubmit(onSubmit)">
              <BFormGroup>
                <BRow>
                  <BCol>
                    <validation-provider
                      name="Title"
                      :rules="{
                        required: true,
                        // alpha_dash,
                      }"
                      v-slot="validationContext"
                    >
                      <label class="title">Title</label>
                      <BFormInput
                        v-model="newFilm.Title"
                        id="title"
                        :state="getValidationState(validationContext)"
                      ></BFormInput>
                      <b-form-invalid-feedback id="input-1-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Poster"
                      :rules="{
                        required: true,
                        regex:
                          /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="poster-url">Poster</label>
                      <BFormInput
                        v-model="newFilm.Poster"
                        id="poster-url"
                        :state="getValidationState(validationContext)"
                      ></BFormInput>
                      <b-form-invalid-feedback id="input-2-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                </BRow>
              </BFormGroup>

              <validation-provider
                name="Plot"
                :rules="{ required: true }"
                v-slot="validationContext"
              >
                <BFormGroup>
                  <label for="Plot">Plot</label>
                  <b-form-textarea
                    v-model="newFilm.Plot"
                    id="textarea"
                    rows="3"
                    max-rows="6"
                    :state="getValidationState(validationContext)"
                  ></b-form-textarea>
                  <b-form-invalid-feedback id="input-3-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </BFormGroup>
              </validation-provider>
              <BFormGroup>
                <BRow>
                  <BCol>
                    <validation-provider
                      name="Language"
                      :rules="{
                        required: true,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="language">Language</label>
                      <BFormInput
                        type="text"
                        v-model="newFilm.Language"
                        id="rating"
                        :state="getValidationState(validationContext)"
                      ></BFormInput>
                      <b-form-invalid-feedback id="input-4-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Rating"
                      :rules="{
                        required: true,
                        between: [0, 10],
                      }"
                      v-slot="validationContext"
                    >
                      <label for="rating">Rating</label>
                      <BFormInput
                        type="number"
                        step="any"
                        v-model="newFilm.imdbRating"
                        id="rating"
                        :state="getValidationState(validationContext)"
                      ></BFormInput>
                      <b-form-invalid-feedback id="input-4-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Year"
                      :rules="{
                        required: true,
                        regex: /^[1-9][0-9]{3}$/,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="year">movie.Year</label>
                      <BFormInput
                        type="number"
                        v-model="newFilm.Year"
                        id="year"
                        :state="getValidationState(validationContext)"
                      ></BFormInput
                      ><b-form-invalid-feedback id="input-5-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Runtime"
                      :rules="{
                        required: true,
                        // min_value: 0,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="Runtime">Runtime(min)</label>
                      <BFormInput
                        type="text"
                        v-model="newFilm.Runtime"
                        id="runtime"
                        :state="getValidationState(validationContext)"
                      ></BFormInput>
                      <b-form-invalid-feedback id="input-6-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Genre"
                      :rules="{
                        required: true,
                        // alpha_dash,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="genre">Genre</label>
                      <BFormInput
                        type="text"
                        v-model="newFilm.Genre"
                        id="genre"
                        :state="getValidationState(validationContext)"
                      ></BFormInput>
                      <b-form-invalid-feedback id="input-7-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                </BRow>
              </BFormGroup>
              <BFormGroup>
                <BRow cols="2">
                  <BCol>
                    <validation-provider
                      name="Country"
                      :rules="{
                        required: true,
                        // alpha_dash,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="country">Country</label>
                      <BFormInput
                        v-model="newFilm.Country"
                        id="country"
                        :state="getValidationState(validationContext)"
                      ></BFormInput>
                      <b-form-invalid-feedback id="input-8-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol
                    ><validation-provider
                      name="Director"
                      :rules="{
                        required: true,
                        // alpha_dash,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="director">Director</label>
                      <BFormInput
                        v-model="newFilm.Director"
                        id="director"
                        :state="getValidationState(validationContext)"
                      ></BFormInput
                      ><b-form-invalid-feedback id="input-9-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Writer"
                      :rules="{
                        required: true,
                        // alpha_dash,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="writer" class="pt-2">Writer</label>
                      <b-form-input
                        v-model="newFilm.Writer"
                        id="writer"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback id="input-10-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Actors"
                      :rules="{
                        required: true,
                        // alpha_dash,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="actors" class="pt-2">Actors</label>
                      <b-form-input
                        v-model="newFilm.Actors"
                        id="actors"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback id="input-11-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Awards"
                      :rules="{
                        required: true,
                        // alpha_dash,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="awards" class="pt-2">Awards</label>
                      <b-form-input
                        v-model="newFilm.Awards"
                        id="awards"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback id="input-11-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                  <BCol>
                    <validation-provider
                      name="Box office"
                      :rules="{
                        required: true,
                        // alpha_dash,
                      }"
                      v-slot="validationContext"
                    >
                      <label for="box-office" class="pt-2">Box office</label>
                      <b-form-input
                        v-model="newFilm.BoxOffice"
                        id="text-password"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback id="input-11-live-feedback">{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                    </validation-provider>
                  </BCol>
                </BRow>
              </BFormGroup>

              <div class="form-buttom">
                <b-button variant="outline-dark" @click="closeEdit"
                  >Cancel</b-button
                >
                <b-button type="submit" class="ml-3" variant="outline-secondary"
                  >Submit</b-button
                >
              </div>
            </BForm>
          </validation-observer>
        </BCol>
      </BRow>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TemplateMovieInfo",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      newFilm: {
        Title: this.movie.Title,
        Poster: this.movie.Poster,
        Plot: this.movie.Plot,
        imdbRating: this.movie.imdbRating,
        Year: this.movie.Year,
        Runtime: this.movie.Runtime,
        Genre: this.movie.Genre,
        Country: this.movie.Country,
        Director: this.movie.Director,
        Writer: this.movie.Writer,
        Actors: this.movie.Actors,
        Awards: this.movie.Awards,
        BoxOffice: this.movie.BoxOffice,
        Language: this.movie.Language,
        imdbID: this.movie.imdbID,
      },
    };
  },
  computed: {
    posterStyle() {
      return {
        "background-image": `url(${this.newFilm.Poster})`,
      };
    },
  },
  methods: {
    ...mapActions("movies", ["addNewMovie", "editMovie"]),
    ...mapActions(["showNotify"]),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    closeEdit() {
      this.$emit("closeEdit");
    },
    async onSubmit() {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Please confirm that you want to edit movie`,
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
        this.editMovie(this.newFilm);
        this.closeEdit();
        this.showNotify({
          msg: "Movie edit successful",
          variant: "success",
          title: "Success",
        });
      }
    },
  },
};
</script>

<style scoped>
.movie-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
  color: #fff;
}
.movie-header-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
}
.movie-info-content {
  padding: 1rem;
  background-color: #fff;
}
.close-icon {
  font-size: 24px;
  cursor: pointer;
}
.movie-poster-wrap {
  position: relative;
  padding-bottom: 150%;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
}
.movie-poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  );
  background-size: cover;
  background-position: center center;
}
.camera {
  color: #fff;
}
.buttom-form {
  display: flex;
  justify-content: end;
}
.submit {
  padding-left: 1rem;
}

.form-buttom {
  display: flex;
  justify-content: end;
}
</style>
