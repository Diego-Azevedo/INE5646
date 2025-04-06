<template>
  <q-page class="q-pa-xl">
    <div class="row q-col-gutter-xl items-start">

      <div class="col-12 col-md-6">
        <q-input
          filled
          type="textarea"
          v-model="jsonInput"
          label="Input"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          filled
          type="textarea"
          v-model="jsonOutput"
          label="Resultado"
          readonly
        />
      </div>
    </div>

    <div class="row justify-center q-mt-xl">
      <q-btn
        color="primary"
        label="Converter"
        @click="processJson"
        class="q-px-xl"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      jsonInput: '',
      jsonOutput: ''
    }
  },
  methods: {
    processJson() {
      try {
        const parsed = 'Ainda não funciona XD'
        this.jsonOutput = parsed
      } catch (err) {
        this.jsonOutput = 'Erro ao processar JSON: ' + err.message
      }
    }
  },
  computed: {}
}
</script>

<style scoped>

.input-textarea-large {
  height: 80vh !important;
}

.input-textarea-large textarea {
  height: 100% !important;
  resize: none;
}
</style>