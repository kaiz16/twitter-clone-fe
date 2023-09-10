<script>
import NavigationLayout from '@/layouts/NavigationLayout.vue'
import TweetBox from '@/components/TweetBox.vue'
import TweetList from '@/components/TweetList.vue'
import Sidebar from '@/components/Sidebar.vue'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { useTweet } from '@/stores/tweet'

export default {
  components: {
    NavigationLayout,
    TweetBox,
    TweetList,
    Sidebar,
    SparklesIcon,
  },
  data() {
    return {
      loading: false,
      tweetStore: useTweet(),
    }
  },
  computed: {
    tweets() {
      return this.tweetStore.tweets
    },
  },
  async mounted() {
    this.loading = true
    await this.tweetStore.getTweets()
    this.loading = false
  },
}
</script>

<template>
  <NavigationLayout>
    <template #default>
      <div class="sticky top-0 flex items-center justify-between p-2 px-4 bg-white/80 backdrop-blur-md">
        <h2 class="text-xl font-bold">Home</h2>

        <div class="hover:bg-[#0f1419]/10 rounded-full cursor-pointer p-2">
          <SparklesIcon class="h-6 w-6" />
        </div>
      </div>

      <div class="p-4 flex border-b border-[#eff3f4]">
        <TweetBox />
      </div>

      <TweetList :tweets="tweets" />
    </template>

    <template #sidebar>
      <Sidebar />
    </template>
  </NavigationLayout>
</template>
