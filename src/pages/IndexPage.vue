<template>
  <q-page class="responsive-container bg-primary">
    <div class="q-px-md q-pb-md q-gutter-sm text-center">
      <h2 class="text-white q-mb-none">JSON Convert</h2>
      <p class="text-subtitle2 text-white">
        A powerful tool to convert JSON into files and visual graphs efficiently and effortlessly.
      </p>
    </div>

    <div class="row q-col-gutter-xl items-start">
      <div class="col-12 col-md-4">
        <div class="div-element bg-white q-pa-lg">
          <div class="row items-center justify-between q-mb-sm">
            <h4 class="q-pa-none q-mb-md q-mt-none">Json Entry</h4>
            <q-btn
              color="green-4"
              label="Example"
              class="q-mb-sm"
              @click="generateExample"
            />
          </div>
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

      <div class="col-12 col-md-8 responsive-responseContainer">
        <div class="responsive-menuChoice">
          <div class="q-gutter-sm q-mb-md flex">
            <q-chip
              v-for="option in conversionOptions"
              :key="option.name"
              clickable
              :icon="option.icon"
              :color="selectedConversion === option.name ? 'green-4' : 'grey-4'"
              text-color="black"
              @click="selectedConversion = option.name"
            >
              {{ option.label }}
            </q-chip>
          </div>
        </div>
        <div class="div-element bg-white q-pa-lg">
          <div class="row items-center justify-between q-mb-sm">
            <h4 class="q-pa-none q-mb-md q-mt-none">Result</h4>
          </div>
          <div v-if="selectedConversion === 'table'"
            id="table-container" 
            style="min-height: 40vh;">
          </div>
          <codemirror v-else
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
import { Codemirror } from 'vue-codemirror';
import { convertJsonToCsv } from 'src/utils/jsonToCsv';
import { csvToTable } from 'src/utils/csvToTable';
import jsonExamples from 'src/data/jsonExamples';

export default {
  name: 'IndexPage',
  components: {
    Codemirror
  },
  data() {
    return {
      jsonInput: '',
      jsonOutput: '',
      selectedConversion: 'csv',
      conversionOptions: [
        { name: 'csv', label: 'CSV' },
        { name: 'table', label: 'Table' },
        { name: 'xml', label: 'XML' },
        { name: 'visual', label: 'Graph' }
      ]
    }
  },
  watch: {
    selectedConversion() {
      this.processJson();
    }
  },
  methods: {
    async processJson() {
      try {
        const jsonData = JSON.parse(this.jsonInput);

        const csv = await convertJsonToCsv(jsonData);

        if (this.selectedConversion === 'csv') {
          this.jsonOutput = csv;
        } else if (this.selectedConversion === 'table') {
          this.jsonOutput = '';
          this.$nextTick(() => {
            csvToTable(csv, "table-container");
          });
        } else {
          this.jsonOutput = JSON.stringify(jsonData, null, 2);
        }
      } catch (e) {
        this.jsonOutput = 'Error processing JSON: ' + e.message;
      }
    },
    generateExample() {
      const randomIndex = Math.floor(Math.random() * jsonExamples.length);
      this.jsonInput = JSON.stringify(jsonExamples[randomIndex], null, 2);
    }
  }
}
</script>

<style>
.responsive-container {
  padding: 48px !important;
}
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

@media (max-width: 728px) {
  .responsive-container {
    padding: 24px !important;
  }
  .responsive-responseContainer {
    padding-top: 24px !important;
  }
  .responsive-menuChoice {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>