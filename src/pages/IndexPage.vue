<template>
  <q-page class="q-pa-xl">
    <div class="row q-col-gutter-xl items-start">

      <div class="col-12 col-md-6">
        <textarea
        type="text-area"
        id="json-input"
        v-model="jsonInput"
        placeholder="JSON"
        class="custom-textarea">
      </textarea>

      </div>

      <div class="col-12 col-md-6">
        <textarea
          type="text-area"
          id="json-output"
          v-model="jsonOutput"
          placeholder="Result"
          readonly
          class="custom-textarea">
        </textarea>
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
  width: 100%; /* Ocupa toda a largura disponível */
  height: 60vh; /* Altura responsiva */
  resize: none; /* Remove o redimensionamento manual */
  padding: 10px; /* Espaçamento interno */
  border: 1px solid #ccc; /* Borda */
  border-radius: 4px; /* Bordas arredondadas */
  font-size: 16px; /* Tamanho da fonte */
  box-sizing: border-box; /* Inclui padding e borda no tamanho total */
}

@media (max-width: 768px) {
  .custom-textarea {
    height: 40vh; /* Altura menor para telas pequenas */
  }
}
</style>