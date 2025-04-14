<template>
  <q-page class="q-pa-xl bg-primary">
    <div class="q-px-md q-pb-sm q-gutter-sm text-center">
      <h2 class="text-white q-mb-none">JSON Convert</h2>
      <p class="text-subtitle2 text-white">
        A powerful tool to convert JSON into files and visual graphs efficiently and effortlessly.
      </p>
    </div>

    <div class="row q-col-gutter-xl items-start">
      <div class="col-12 col-md-4">
        <div class="div-element bg-white q-pa-lg">
          <h4 class="q-pa-none q-mb-md q-mt-none">Entrada</h4>
          <codemirror
            class="cm-editor q-mx-auto"
            v-model="jsonInput"
            placeholder="JSON"
          />
          <div class="row justify-center q-mt-lg">
            <q-btn
              color="green-4"
              label="Converter"
              @click="processJson"
              class="full-width"
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-md-8">
        <div class="div-element bg-white q-pa-lg">
          <codemirror
            class="cm-editor q-mx-auto"
            v-model="jsonOutput"
            placeholder="Result"
            :read-only="true"
            style="height: 60vh"
          />
        </div>
      </div>
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
  border-radius: 8px;
  border: 2px solid #c9cec9;
  width: 100%;
  height: 40vh;
}

.div-element {
  border-radius: 8px;
  border: 3px solid #000000;
}

.div-colunm {
  height: 60vh;
  overflow: auto;
}

</style>