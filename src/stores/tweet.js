import { defineStore } from 'pinia'
import axios from 'axios'

export const useTweet = defineStore({
  id: 'tweets',
  state: () => ({
    tweets: [
      // {
      //   id: 1,
      //   content: 'This is a tweet content.',
      //   user: {
      //     id: 1,
      //     username: 'johndoe',
      //     email: 'johndoe@jdoe.co',
      //     createdAt: new Date().toISOString(),
      //     updatedAt: new Date().toISOString(),
      //   },
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      //   replies: [
      //     {
      //       id: 1,
      //       content: 'This is a reply content.',
      //       tweetId: 1,
      //       user: {
      //         id: 2,
      //         username: 'janedoe',
      //         email: 'janedoe@jdoe.co',
      //         createdAt: new Date().toISOString(),
      //         updatedAt: new Date().toISOString(),
      //       },
      //       createdAt: new Date().toISOString(),
      //       updatedAt: new Date().toISOString(),
      //     },
      //   ],
      //   likes: [
      //     {
      //       id: 1,
      //       tweetId: 1,
      //       user: {
      //         id: 2,
      //         username: 'janedoe',
      //         email: 'janedoe@jdoe.co',
      //         createdAt: new Date().toISOString(),
      //         updatedAt: new Date().toISOString(),
      //       },
      //       createdAt: new Date().toISOString(),
      //       updatedAt: new Date().toISOString(),
      //     },
      //   ],
      // },
    ],
  }),

  actions: {
    async getTweets() {
      const token = localStorage.getItem('accessToken')
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/tweets`
      try {
        const { data } = await axios.get(URL, {
          headers: {
            Authorization: `${token}`,
          },
        })
        this.tweets = data
      } catch (error) {
        alert(JSON.stringify(error?.response?.data))
      }
    },
    async getTweetById(tweetId) {
      const token = localStorage.getItem('accessToken')
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/tweets/${tweetId}`
      try {
        const { data } = await axios.get(URL, {
          headers: {
            Authorization: `${token}`,
          },
        })
        this.tweets = [data]
      } catch (error) {
        alert(JSON.stringify(error?.response?.data))
      }
    },
    async addTweet(content, createdBy) {
      const token = localStorage.getItem('accessToken')
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/tweets`
      try {
        const { data } = await axios.post(
          URL,
          {
            content,
            createdBy,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )

        this.tweets.push(data)
      } catch (error) {
        alert(JSON.stringify(error?.response?.data))
      }
    },
    async addReply(tweetId, content, createdBy) {
      const token = localStorage.getItem('accessToken')
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/tweets/${tweetId}/replies`
      try {
        const { data } = await axios.post(
          URL,
          {
            content,
            createdBy,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )

        const tweet = this.tweets.find((tweet) => tweet.id === tweetId)
        tweet.replies.push(data)
      } catch (error) {
        alert(JSON.stringify(error?.response?.data))
      }
    },
    async addLike(tweetId, likedBy) {
      const token = localStorage.getItem('accessToken')
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/tweets/${tweetId}/likes`
      try {
        const { data } = await axios.post(
          URL,
          {
            likedBy,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )

        const tweet = this.tweets.find((tweet) => tweet.id === tweetId)
        tweet.likes.push(data)
      } catch (error) {
        alert(JSON.stringify(error?.response?.data))
      }
    },
    async deleteLike(likeId) {
      const token = localStorage.getItem('accessToken')
      const URL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/tweets/likes/${likeId}`
      try {
        await axios.delete(URL, {
          headers: {
            Authorization: `${token}`,
          },
        })

        const tweet = this.tweets.find((tweet) => tweet.likes.some((like) => like.id === likeId))
        tweet.likes = tweet.likes.filter((like) => like.id !== likeId)
      } catch (error) {
        alert(JSON.stringify(error?.response?.data))
      }
    },
  },
})
