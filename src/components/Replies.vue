<script>
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/outline";

export default {
  props: {
    replies: {
      type: Array,
      required: true,
    },
  },
  components: {
    EllipsisHorizontalIcon,
  },
  methods: {
    formatDate(date) {
      return (
        new Date(date).toLocaleDateString() +
        " " +
        new Date(date).toLocaleTimeString()
      );
    },
  },
};
</script>

<template>
  <div
    class="hover:bg-black/[0.03] cursor-pointer p-4"
    v-for="reply in replies"
    :key="reply.id"
  >
    <div class="flex space-x-4">
      <div class="h-8 w-8 md:h-12 md:w-12">
        <img class="h-full w-full rounded-full" src="https://i.pravatar.cc/300" alt="" />
      </div>

      <div class="flex-1">
        <div class="flex justify-between">
          <div class="flex items-center space-x-1 text-[15px]">
            <p class="font-semibold text-[#0F1419]">
              {{ reply.createdBy.username }}
            </p>
            <span class="text-[#536471]">@{{ reply.createdBy.username }}</span>
            <span class="text-[#536471]">·</span>
            <span class="text-[#536471]">{{
              formatDate(reply.createdAt)
            }}</span>
          </div>

          <EllipsisHorizontalIcon class="h-5 w-5" />
        </div>

        <div>
          <p class="text-[#0F1419] text-[15px]">{{ reply.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
