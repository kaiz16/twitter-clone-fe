<script>
import { useUser } from "@/stores/user";

export default {
  data() {
    return {
      userStore: useUser(),
      email: "",
      password: "",
    };
  },
  methods: {
    async signIn() {
      await this.userStore.signIn({
        email: this.email,
        password: this.password,
      });
      this.email = "";
      this.password = "";
      this.$router.push("/");
    },
  },
};
</script>
<template>
  <div class="min-h-screen flex items-center justify-center">
    <!-- Email and Password -->
    <div class="w-[400px]">
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-1">
          <label for="email" class="text-[#536471] text-sm"> Email </label>
          <input
            v-model="email"
            id="email"
            class="border border-[#eff3f4] rounded-md px-3 py-2 outline-none"
            type="email"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="password" class="text-[#536471] text-sm">
            Password
          </label>
          <input
            v-model="password"
            id="password"
            class="border border-[#eff3f4] rounded-md px-3 py-2 outline-none"
            type="password"
          />
        </div>

        <div class="flex justify-end">
          <button
            @click="signIn"
            class="bg-twitter hover:bg-[#1a8cd8] px-4 py-2 rounded-full text-white font-bold text-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
