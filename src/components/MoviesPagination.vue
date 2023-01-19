<template>
  <div class="movies-pagination d-flex justify-content-center mt-4 mb-2">
    <template v-if="this.isSearch == false">
      <BPagination
        v-model="currentPageModel"
        :per-page="perPage"
        :total-rows="total"
        prev-text="Prev"
        next-text="Next"
      />
    </template>
    <template v-else>
      <BPagination
        :per-page="1"
        :total-rows="1"
        prev-text="Prev"
        next-text="Next"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MoviesPaginations",
  data: () => ({
    bool: "",
  }),
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        console.log(value);
        this.$emit("pageChanged", value);
      },
    },
  },
};
</script>

<style scoped>
.movies-pagination {
  margin-top: auto;
}

.movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #ffff;
  box-shadow: none;
}
.movies-pagination >>> .pagination .page-item.active .page-link {
  border-color: #ffff;
  background-color: #ffff;
  color: #000;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link {
  color: lightgray;
}
</style>
