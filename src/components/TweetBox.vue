<script>
import { PhotoIcon, GifIcon, ChartBarIcon, FaceSmileIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { useUser } from '@/stores/user'
import { useTweet } from '@/stores/tweet'

export default {
  components: {
    PhotoIcon,
    GifIcon,
    ChartBarIcon,
    FaceSmileIcon,
    CalendarDaysIcon,
    MapPinIcon,
  },
  data() {
    return {
      tweetContent: '',
      boxIcons: [
        {
          name: 'photo',
          icon: PhotoIcon,
        },
        {
          name: 'gif',
          icon: GifIcon,
        },
        {
          name: 'poll',
          icon: ChartBarIcon,
        },
        {
          name: 'emoji',
          icon: FaceSmileIcon,
        },
        {
          name: 'schedule',
          icon: CalendarDaysIcon,
        },
        {
          name: 'location',
          icon: MapPinIcon,
        },
      ],
      userStore: useUser(),
      tweetStore: useTweet(),
    }
  },
  methods: {
    async createTweet() {
      await this.tweetStore.addTweet(this.tweetContent, this.userStore.user.id)

      this.tweetContent = ''
    },
  },
}
</script>

<template>
  <div class="h-8 w-8 md:h-12 md:w-12">
    <img class="h-full w-full rounded-full" src="https://i.pravatar.cc/300" alt="" />
  </div>

  <div class="flex-1 px-3 py-1 md:py-3 space-y-4 md:space-y-6">
    <div class="text-[#0f1419] text-base md:text-xl">
      <input v-model="tweetContent" class="w-full outline-none" type="text" placeholder="What's happening?" />
    </div>

    <div class="flex items-center justify-between">
      <ul class="flex items-center space-x-1 md:space-x-2 -ml-2">
        <li class="rounded-full hover:bg-[#1d9bf0]/10 p-2 cursor-pointer" v-for="boxIcon in boxIcons" :key="boxIcon.name">
          <component class="h-5 w-5 text-twitter" :is="boxIcon.icon" />
        </li>
      </ul>

      <button @click="createTweet" class="bg-twitter hover:bg-[#1a8cd8] px-4 py-2 rounded-full text-white font-bold text-sm">Tweet</button>
    </div>
  </div>
</template>
