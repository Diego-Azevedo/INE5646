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
          JsonConvert51
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
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          @link-clicked="leftDrawerOpen = false"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default {
  components: {
    EssentialLink
  },
  data() {
    return {
      linksList: [
        {
          title: 'Github',
          caption: 'github.com/INE5646',
          icon: 'code',
          link: 'https://github.com/Diego-Azevedo/INE5646'
        },
        {
          title: 'Login',
          caption: 'Área de login',
          icon: 'login',
          link: '/login'
        }
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
  // created() {
  //   // Lógica adicional pode ser adicionada aqui, se necessário
  // }
}
</script>
