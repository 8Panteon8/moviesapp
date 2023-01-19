<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NotificationMsg",
  computed: {
    ...mapGetters(["messagePool"]),
  },
  watch: {
    messagePool: "showNotification",
  },
  methods: {
    showNotification({
      variant,
      msg,
      title,
      toaster = "b-toaster-top-center",
      autoHideDelay = 1000,
    }) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true,
        toaster: toaster,
        autoHideDelay: autoHideDelay,
      });
    },
  },
};
</script>

<style scoped></style>
