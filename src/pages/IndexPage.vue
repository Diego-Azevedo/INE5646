<template>
  <q-page class="q-pa-xl bg-primary">

    <div class="q-px-md q-pb-sm q-gutter-sm text-center">
      <h2 class="text-white q-mb-none">JSON Convert</h2>
      <p class="text-subtitle2 text-white">A powerful tool to convert JSON into files and visual graphs efficiently and effortlessly.</p>
    </div>

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
import { convertJsonToCsv } from 'src/utils/jsonToCsv'

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
      this.jsonOutput = convertJsonToCsv(this.jsonInput)
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