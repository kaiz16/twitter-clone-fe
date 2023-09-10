<script>
import {
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
} from "@heroicons/vue/24/outline";
import NavigationLayout from "@/layouts/NavigationLayout.vue";
import Sidebar from "@/components/Sidebar.vue";
import Replies from "@/components/Replies.vue";
import { useUser } from "@/stores/user";
import { useTweet } from "@/stores/tweet";
import { formatDate } from "@/utils/date";

export default {
  components: {
    NavigationLayout,
    Sidebar,
    ArrowLeftIcon,
    ChatBubbleLeftIcon,
    HeartIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUpTrayIcon,
    Replies,
  },
  data() {
    return {
      userStore: useUser(),
      tweetStore: useTweet(),
      replyContent: "",
      tweet: null,
      formatDate,
    };
  },
  mounted() {
    const tweetID = this.$route.params.tweetID;
    this.tweet = this.tweetStore.tweets.find((tweet) => tweet.id === parseInt(tweetID));
  },
  computed: {
    hasLiked() {
      return this.tweet.likes.find(
        (like) => like.likedBy.email === this.userStore.user.email
      );
    },
  },
  methods: {
    async createReply() {
      await this.tweetStore.addReply({
        tweetId: this.tweet.id,
        content: this.replyContent,
        createdBy: this.userStore.user,
      });

      this.replyContent = "";
    },
  },
};
</script>

<template>
  <NavigationLayout v-if="tweet">
    <template #default>
      <div
        class="sticky top-0 flex items-center p-2 px-4 bg-white/80 backdrop-blur-md space-x-6"
      >
        <div
          @click="$router.go(-1)"
          class="hover:bg-[#0f1419]/10 rounded-full cursor-pointer p-2 -ml-2"
        >
          <ArrowLeftIcon class="h-4 w-4 stroke-[2.5px]" />
        </div>

        <h2 class="text-xl font-bold">Tweet</h2>
      </div>

      <div class="p-4 flex flex-col">
        <div class="flex flex-col space-y-3">
          <div class="flex space-x-3">
            <div class="h-8 w-8 md:h-12 md:w-12">
              <img
                class="h-full w-full rounded-full"
                src="https://i.pravatar.cc/300"
                alt=""
              />
            </div>
            <div class="flex flex-col text-[15px]">
              <p class="font-semibold text-[#0F1419]">
                {{ tweet.createdBy.username }}
              </p>
              <span class="text-[#536471]"
                >@{{ tweet.createdBy.username }}</span
              >
            </div>
          </div>
          <div>
            <p class="text-[23px]">{{ tweet.content }}</p>
          </div>
          <div>
            <span class="text-[#536471] text-[15px]">{{
              formatDate(tweet.createdAt)
            }}</span>
          </div>
        </div>

        <div
          class="flex justify-evenly items-center py-1.5 my-3 border-y border-[#eff3f4]"
        >
          <div class="flex items-center space-x-2 group cursor-pointer">
            <div
              class="group-hover:bg-[#1d9bf0]/10 group-hover:text-twitter text-[#536471] rounded-full p-2 transition-all"
            >
              <ChatBubbleLeftIcon class="h-6 w-6" />
            </div>
          </div>

          <div class="flex items-center space-x-2 group cursor-pointer">
            <div
              :class="[
                hasLiked
                  ? 'text-[#f91880]'
                  : 'group-hover:text-[#f91880] text-[#536471]',
                'group-hover:bg-[#f91880]/10  rounded-full p-2 transition-all',
              ]"
            >
              <HeartIcon
                :class="[hasLiked ? 'fill-[#f91880]' : '', 'h-6 w-6 ']"
              />
            </div>
          </div>

          <div class="flex items-center space-x-2 group cursor-pointer">
            <div
              class="hover:bg-[#1d9bf0]/10 hover:text-twitter text-[#536471] rounded-full p-2 transition-all"
            >
              <ArrowUpTrayIcon class="h-6 w-6" />
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <div class="h-8 w-8 md:h-12 md:w-12">
            <img
              class="h-full w-full rounded-full"
              src="https://i.pravatar.cc/300"
              alt=""
            />
          </div>

          <div class="flex-1 text-[#0f1419] text-base md:text-xl">
            <input
              v-model="replyContent"
              class="w-full outline-none placeholder-[#536471]"
              type="text"
              placeholder="Tweet your reply"
            />
          </div>

          <button
            @click="createReply"
            class="bg-twitter hover:bg-[#1a8cd8] px-4 py-2 rounded-full text-white font-bold text-sm"
          >
            Reply
          </button>
        </div>
      </div>
      <div class="border-y border-[#eff3f4]">
        <Replies :replies="tweet.replies" />
      </div>
    </template>

    <template #sidebar>
      <Sidebar />
    </template>
  </NavigationLayout>
</template>
