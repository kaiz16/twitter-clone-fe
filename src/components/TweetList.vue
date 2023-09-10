<script>
import { EllipsisHorizontalIcon, ChatBubbleLeftIcon, HeartIcon, ArrowPathRoundedSquareIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import { useUser } from '@/stores/user'
import { useTweet } from '@/stores/tweet'
import { formatDate } from '@/utils/date'

export default {
  props: {
    tweets: {
      type: Array,
      required: true,
    },
  },
  components: {
    EllipsisHorizontalIcon,
    ChatBubbleLeftIcon,
    HeartIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUpTrayIcon,
  },
  data() {
    return {
      userStore: useUser(),
      tweetStore: useTweet(),
      formatDate,
    }
  },
  methods: {
    hasLiked(tweet) {
      return tweet.likes.find((like) => like.user.email === this.userStore.user.email)
    },
    openTweet(tweetID) {
      this.$router.push(`/tweet/${tweetID}`)
    },
    async likeTweet(tweetID) {
      // Check if the tweet has been liked by the user
      const tweet = this.tweets.find((tweet) => tweet.id === tweetID)
      const hasLiked = tweet.likes.find((like) => like.user.email === this.userStore.user.email)
      if (hasLiked) {
        // Unlike the tweet
        await this.tweetStore.deleteLike(hasLiked.id)
        return
      }

      await this.tweetStore.addLike(tweetID, this.userStore.user.id)
    },
  },
}
</script>

<template>
  <div class="hover:bg-black/[0.03] cursor-pointer p-4 border-b border-[#eff3f4]" v-for="tweet in tweets" :key="tweet.id">
    <div class="flex space-x-4">
      <div class="h-8 w-8 md:h-12 md:w-12">
        <img class="h-full w-full rounded-full" src="https://i.pravatar.cc/300" alt="" />
      </div>

      <div class="flex-1">
        <div class="flex justify-between">
          <div class="flex items-center space-x-1 text-[15px]">
            <p class="font-semibold text-[#0F1419]">
              {{ tweet.user.username }}
            </p>
            <span class="text-[#536471]">@{{ tweet.user.username }}</span>
            <span class="text-[#536471]">·</span>
            <span class="text-[#536471]">{{ formatDate(tweet.createdAt) }}</span>
          </div>

          <EllipsisHorizontalIcon class="h-5 w-5" />
        </div>

        <div>
          <p class="text-[#0F1419] text-[15px]">{{ tweet.content }}</p>
        </div>

        <div class="flex items-center space-x-16 mt-2 -ml-2">
          <div @click="openTweet(tweet.id)" class="flex items-center space-x-2 group cursor-pointer">
            <div class="group-hover:bg-[#1d9bf0]/10 group-hover:text-twitter rounded-full p-2 transition-all">
              <ChatBubbleLeftIcon class="h-4 w-4" />
            </div>
            <span class="text-sm group-hover:text-twitter transition-all">{{ tweet.replies.length }}</span>
          </div>

          <div @click="likeTweet(tweet.id)" class="flex items-center space-x-2 group cursor-pointer">
            <div :class="[hasLiked(tweet) ? 'text-[#f91880]' : 'group-hover:text-[#f91880]', 'group-hover:bg-[#f91880]/10  rounded-full p-2 transition-all']">
              <HeartIcon :class="[hasLiked(tweet) ? 'fill-[#f91880]' : '', 'h-4 w-4']" />
            </div>
            <span :class="[hasLiked(tweet) ? 'text-[#f91880]' : 'group-hover:text-[#f91880]', 'text-sm  transition-all']">{{ tweet.likes.length }}</span>
          </div>

          <div class="flex items-center space-x-2 group cursor-pointer">
            <div class="hover:bg-[#1d9bf0]/10 hover:text-twitter rounded-full p-2 transition-all">
              <ArrowUpTrayIcon class="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
