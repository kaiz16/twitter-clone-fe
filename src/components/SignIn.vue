<script>
import { useUser } from '@/stores/user'

export default {
  data() {
    return {
      userStore: useUser(),
      registerMode: false,
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async authenticate() {
      if (this.registerMode) {
        await this.userStore.signUp(this.username, this.email, this.password)
      } else {
        await this.userStore.signIn(this.email, this.password)
      }
      this.username = ''
      this.email = ''
      this.password = ''
      this.$router.push('/')
    },
  },
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center">
    <!-- Email and Password -->
    <div class="w-[400px]">
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-1" v-if="registerMode">
          <label for="username" class="text-[#536471] text-sm"> Username </label>
          <input v-model="username" id="username" class="border border-[#eff3f4] rounded-md px-3 py-2 outline-none" type="username" />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="email" class="text-[#536471] text-sm"> Email </label>
          <input v-model="email" id="email" class="border border-[#eff3f4] rounded-md px-3 py-2 outline-none" type="email" />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="password" class="text-[#536471] text-sm"> Password </label>
          <input v-model="password" id="password" class="border border-[#eff3f4] rounded-md px-3 py-2 outline-none" type="password" />
        </div>
        <!-- Switch to register -->
        <div class="flex justify-start">
          <button @click="registerMode = !registerMode" class="text-twitter hover:text-[#1a8cd8] text-sm">
            {{ registerMode ? 'Already have an account? Login here.' : "Don't have an account? Register here." }}
          </button>
        </div>

        <div class="flex justify-end">
          <button @click="authenticate" class="bg-twitter hover:bg-[#1a8cd8] px-4 py-2 rounded-full text-white font-bold text-sm">
            {{ registerMode ? 'Register' : 'Sign In' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
