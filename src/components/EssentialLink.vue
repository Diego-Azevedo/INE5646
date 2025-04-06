<template>
  <q-item
    v-if="isExternalLink"
    clickable
    tag="a"
    :href="link"
    target="_blank"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
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
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
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
