import { defineStore } from "pinia";

export const useTweet = defineStore({
  id: "tweets",
  state: () => ({
    tweets: [
      {
        id: 1,
        content: "This is a tweet content.",
        createdBy: {
          id: 1,
          username: "johndoe",
          email: "johndoe@jdoe.co",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [
          {
            id: 1,
            content: "This is a reply content.",
            tweetId: 1,
            createdBy: {
              id: 2,
              username: "janedoe",
              email: "janedoe@jdoe.co",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        likes: [
          {
            id: 1,
            tweetId: 1,
            likedBy: {
              id: 2,
              username: "janedoe",
              email: "janedoe@jdoe.co",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
    ],
  }),

  actions: {
    async addTweet({ content, createdBy }) {
      this.tweets.push({
        id: this.tweets.length + 1,
        content,
        createdBy,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [],
        likes: [],
      });
    },
    async editTweet({ id, content }) {
      const tweet = this.tweets.find((tweet) => tweet.id === id);
      tweet.content = content;
      tweet.updatedAt = new Date().toISOString();
    },
    async deleteTweet(id) {
      const index = this.tweets.findIndex((tweet) => tweet.id === id);
      this.tweets.splice(index, 1);
    },
    async addReply({ tweetId, content, createdBy }) {
      const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
      tweet.replies.push({
        id: tweet.replies.length + 1,
        content,
        createdBy,
        createdAt: new Date().toISOString(),
      });
    },
    async editReply({ tweetId, id, content }) {
      const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
      const reply = tweet.replies.find((reply) => reply.id === id);
      reply.content = content;
      reply.updatedAt = new Date().toISOString();
    },
    async deleteReply({ tweetId, id }) {
      const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
      const index = tweet.replies.findIndex((reply) => reply.id === id);
      tweet.replies.splice(index, 1);
    },
    async addLike({ tweetId, likedBy }) {
      const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
      tweet.likes.push({
        id: tweet.likes.length + 1,
        tweetId,
        likedBy,
        createdAt: new Date().toISOString(),
      });
    },
    async deleteLike({ tweetId, id }) {
      const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
      const index = tweet.likes.findIndex((like) => like.id === id);
      tweet.likes.splice(index, 1);
    },
  },
});
