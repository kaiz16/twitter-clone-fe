import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    async signIn({ email, password }) {
      this.user = {
        id: 1,
        username: email.split("@")[0],
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.isAuthenticated = true;
    },
    async logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
