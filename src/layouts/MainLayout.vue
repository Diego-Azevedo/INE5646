<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-show="toolbarVisible" elevated>
      <q-toolbar class="bg-secondary">
        <q-btn v-if="this.$route.name !== 'LoginPage'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          JsonConvert
        </q-toolbar-title>

        <div>INE5646</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="leftDrawerOpen"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-secondary text-white"
    >
      <div class="column justify-between full-height">
        <q-list>
          <q-item-label header>Menu</q-item-label>

          <EssentialLink
            v-for="link in linksList.filter(link => link.title !== 'Login')"
            :key="link.title"
            v-bind="link"
            @link-clicked="leftDrawerOpen = false"
          />
        </q-list>
        <q-list>
          <EssentialLink class="q-mb-md"
            v-bind="linksList.find(link => link.title === 'Login')"
            @link-clicked="leftDrawerOpen = false"
          />
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
  components: {
    EssentialLink
  },
  data() {
    return {
      linksList: [
        {
          title: 'Home',
          caption: 'Home page',
          icon: 'home',
          link: '/index'
        },
        {
          title: 'Github',
          caption: 'github.com/INE5646',
          icon: 'code',
          link: 'https://github.com/Diego-Azevedo/INE5646'
        },
        {
          title: 'About',
          caption: 'About the project',
          icon: 'info',
          link: '/about'
        },
        {
          title: 'Profile',
          caption: 'User profile',
          icon: 'person',
          link: '/profile'
        },
        {
          title: 'Login',
          caption: 'Login area',
          icon: 'login',
          link: '/login'
        },
      ],
      leftDrawerOpen: false,
      toolbarVisible: true
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  },
}
</script>
