import { defineStore } from 'pinia'
import axios from 'axios'
export const useUser = defineStore('user', {
  state: () => ({
    accessToken: null,
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    async checkAuth() {
      const token = localStorage.getItem('accessToken')
      if (!token) return false
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/me`
      try {
        const { data } = await axios.get(URL, {
          headers: {
            Authorization: `${token}`,
          },
        })

        this.user = data.user
        this.accessToken = token
        this.isAuthenticated = true
        return true
      } catch (error) {
        return false
      }
    },
    async signIn(email, password) {
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/login`
      try {
        const { data } = await axios.post(URL, {
          email,
          password,
        })
        this.user = data.user
        this.accessToken = data.accessToken
        this.isAuthenticated = true
        localStorage.setItem('accessToken', data.accessToken)
      } catch (error) {
        alert(JSON.stringify(error?.response?.data))
      }
    },
    async signUp(username, email, password) {
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/register`
      try {
        const { data } = await axios.post(URL, {
          username,
          email,
          password,
        })
        this.user = data.user
        this.accessToken = data.accessToken
        this.isAuthenticated = true
        localStorage.setItem('accessToken', data.accessToken)
      } catch (error) {
        alert(JSON.stringify(error?.response?.data))
      }
    },
    async logout() {
      this.accessToken = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('accessToken')
    },
  },
})
