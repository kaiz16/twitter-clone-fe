<script>
import {
  HomeIcon as OHomeIcon,
  HashtagIcon as OHashtagIcon,
  BellIcon as OBellIcon,
  EnvelopeIcon as OEnvelopeIcon,
  BookmarkIcon as OBookmarkIcon,
  DocumentTextIcon as ODocumentTextIcon,
  UserIcon as OUserIcon,
  EllipsisHorizontalCircleIcon as OEllipsisHorizontalCircleIcon,
} from '@heroicons/vue/24/outline'
import {
  HomeIcon as SHomeIcon,
  HashtagIcon as SHashtagIcon,
  BellIcon as SBellIcon,
  EnvelopeIcon as SEnvelopeIcon,
  BookmarkIcon as SBookmarkIcon,
  DocumentTextIcon as SDocumentTextIcon,
  UserIcon as SUserIcon,
  EllipsisHorizontalCircleIcon as SEllipsisHorizontalCircleIcon,
} from '@heroicons/vue/24/solid'

export default {
  components: {
    OHomeIcon,
    OHashtagIcon,
    OBellIcon,
    OEnvelopeIcon,
    OBookmarkIcon,
    ODocumentTextIcon,
    OUserIcon,
    OEllipsisHorizontalCircleIcon,
    SHomeIcon,
    SHashtagIcon,
    SBellIcon,
    SEnvelopeIcon,
    SBookmarkIcon,
    SDocumentTextIcon,
    SUserIcon,
    SEllipsisHorizontalCircleIcon,
  },
  data() {
    return {
      menus: [
        {
          icon: {
            outline: OHomeIcon,
            solid: SHomeIcon,
          },
          name: 'Home',
          href: '/home',
          current: true,
        },
        {
          icon: {
            outline: OHashtagIcon,
            solid: SHashtagIcon,
          },
          name: 'Explore',
          href: '#',
          current: false,
        },
        {
          icon: {
            outline: OBellIcon,
            solid: SBellIcon,
          },
          name: 'Notifications',
          href: '#',
          current: false,
        },
        {
          icon: {
            outline: OEnvelopeIcon,
            solid: SEnvelopeIcon,
          },
          name: 'Messages',
          href: '#',
          current: false,
        },
        {
          icon: {
            outline: OBookmarkIcon,
            solid: SBookmarkIcon,
          },
          name: 'Bookmarks',
          href: '#',
          current: false,
        },
        {
          icon: {
            outline: ODocumentTextIcon,
            solid: SDocumentTextIcon,
          },
          name: 'Lists',
          href: '#',
          current: false,
        },
        {
          icon: {
            outline: OUserIcon,
            solid: SUserIcon,
          },
          name: 'Profile',
          href: '#',
          current: false,
        },
        {
          icon: {
            outline: OEllipsisHorizontalCircleIcon,
            solid: SEllipsisHorizontalCircleIcon,
          },
          name: 'More',
          href: '#',
          current: false,
        },
      ],
    }
  },
  methods: {
    navigateTo(name, href) {
      this.menus = this.menus.map((menu) => ({
        ...menu,
        current: menu.name === name,
      }))

      if (href === '#') return
      this.$router.push(href)
    },
  },
}
</script>

<template>
  <nav>
    <div v-for="(menu, index) in menus" :key="index" @click="navigateTo(menu.name, menu.href)" class="flex justify-center items-center rounded-full p-3 hover:bg-[#0f1419]/10 max-w-fit cursor-pointer">
      <component class="w-7 h-7" :is="menu.icon[menu.current ? 'solid' : 'outline']" />
      <div class="hidden md:block ml-5 mr-4 text-lg">
        <p :class="[menu.current && 'font-bold']">{{ menu.name }}</p>
      </div>
    </div>
  </nav>
</template>
