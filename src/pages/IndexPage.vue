<template>
  <q-page class="q-pa-xl bg-primary">
    <div class="row q-col-gutter-xl items-start">

      <div class="col-12 col-md-6">
        <codemirror
          class="cm-editor"
          v-model="jsonInput"
          :style="{ height: '60vh', borderRadius: '8px', border: '2px solid #008b00' }"
          placeholder="JSON de entrada"
        />
      </div>

      <div class="col-12 col-md-6">
        <codemirror
          v-model="jsonOutput"
          :style="{ height: '60vh', borderRadius: '8px', border: '2px solid #008b00' }"
          placeholder="Resultado CSV"
          :read-only="true"
        />
      </div>
    </div>

    <div class="row justify-center q-mt-xl">
      <q-btn
        color="green-4"
        label="Converter"
        @click="processJson"
        class="q-px-xl"
      />
    </div>
  </q-page>
</template>

<script>
import { Codemirror } from 'vue-codemirror'

export default {
  name: 'IndexPage',
  components: {
    Codemirror
  },
  data() {
    return {
      jsonInput: '',
      jsonOutput: ''
    }
  },
  methods: {
    processJson() {
      return true;
    }
  }
}
</script>

<style>
.cm-editor {
  background-color: white !important;
  color: black !important;
}
</style>