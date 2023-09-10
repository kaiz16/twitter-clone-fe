<script>
import { RouterView } from "vue-router";
import { useUser } from "./stores/user";
import SignIn from "./components/SignIn.vue";

export default {
  components: {
    RouterView,
    SignIn,
  },
  data() {
    return {
      userStore: useUser(),
    };
  },
  computed: {
    isAuthenticated() {
      return this.userStore.isAuthenticated;
    },
  },
};
</script>

<template>
  <RouterView v-if="isAuthenticated" />
  <SignIn v-else />
</template>
