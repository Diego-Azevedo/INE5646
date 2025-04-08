<template>
  <q-item
    v-if="isExternalLink"
    clickable
    tag="a"
    :href="link"
    target="_blank"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" color="green-4"/>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white">{{ title }}</q-item-label>
      <q-item-label caption class="text-grey-4">{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item
    v-else
    clickable
    tag="router-link"
    :to="link"
    @click="$emit('link-clicked')"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" color="green-4"/>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white">{{ title }}</q-item-label>
      <q-item-label caption class="text-grey-4">{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: String,
    caption: String,
    link: String,
    icon: String
  },
  computed: {
    isExternalLink() {
      return this.link.startsWith('http')
    }
  }
}
</script>
