<script>
import { RouterView } from 'vue-router'
import { useUser } from './stores/user'
import SignIn from './components/SignIn.vue'

export default {
  components: {
    RouterView,
    SignIn,
  },
  data() {
    return {
      loading: false,
      userStore: useUser(),
    }
  },
  computed: {
    isAuthenticated() {
      return this.userStore.isAuthenticated
    },
  },
  async mounted() {
    this.loading = true
    await this.userStore.checkAuth()
    this.loading = false
  },
}
</script>

<template>
  <p v-if="loading">Loading...</p>
  <div v-else>
    <RouterView v-if="isAuthenticated" />
    <SignIn v-else />
  </div>
</template>
