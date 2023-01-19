<template>
  <div class="loader-wrap" v-if="isShowLoader">
    <b-spinner
      style="width: 3rem; height: 3rem"
      type="grow"
      variant="light"
      label=""
    ></b-spinner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoaderItem",
  computed: {
    ...mapGetters(["isShowLoader"]),
  },
};
</script>

<style scoped>
.loader-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>
