<template>
  <q-page class="q-pa-xl">
    <div class="row q-col-gutter-xl items-start">

      <div class="col-12 col-md-6">
        <q-input
          filled
          type="textarea"
          v-model="jsonInput"
          label="JSON"
          class="custom-textarea"
          input-class="force-height"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          filled
          type="textarea"
          v-model="jsonOutput"
          label="Result"
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
.custom-textarea {
  height: 60vh;
}

.custom-textarea .q-field__native {
  min-height: 100% !important;
  height: 100% !important;
}
</style>