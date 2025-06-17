<template>
  <q-page class="responsive-container bg-primary">
    <div class="q-px-md q-pb-md q-gutter-sm text-center">
      <h1 class="text-white q-mb-none">
        Convert JSON to CSV, Table or Chart
      </h1>
      <p class="text-white">
        Convert JSON into csv, table, or charts with ease and speed.
      </p>
      <!-- convert options -->
      <div class="q-gutter-sm q-mt-md flex justify-center flex-wrap">
        <q-chip
          v-for="option in conversionOptions"
          :key="option.name"
          clickable
          :color="selectedConversion === option.name ? 'green-4' : 'white'"
          :text-color="selectedConversion === option.name ? 'white' : 'black'"
          class="q-px-md q-py-sm text-weight-medium"
          @click="selectedConversion = option.name"
          style="border: 1px solid #ccc;"
        >
          {{ option.label }}
        </q-chip>
      </div>
    </div>

    <div class="row q-col-gutter-xl items-stretch">
      
      <!-- json Input -->
      <div class="col-12 col-md-4">
        <div class="div-input-output fixed-height bg-white q-pa-lg">
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
              label="Convert"
              @click="processJson"
              class="full-width"
            />
          </div>
        </div>
      </div>

      <!-- json Output -->
      <div class="col-12 col-md-8 responsive-responseContainer">
        <div class="div-input-output fixed-height bg-white q-pa-lg">
          <div class="row items-center justify-between">
            <h4 class="q-pa-none q-mb-sm q-mt-none">
              Result
            </h4>
            <q-btn v-if="selectedConversion === 'chart' || selectedConversion === 'table'"
              label="Download PDF"
              icon="download"
              color="green-4"
              class="q-mb-sm"
              @click="downloadPdf"
            />
          </div>

          <q-separator></q-separator>

          <div v-if="selectedConversion === 'chart'" class="row items-center q-mt-sm">
            <q-select
              filled
              dense
              outlined
              v-model="chartKey"
              :options="availableKeys"
              label="Group by"
              :style="{ minWidth: '150px' }"
              @update:model-value="processJson"
            >
              <template v-slot:append>
                <q-icon name="bar_chart" class="text-green-4" />
              </template>
            </q-select>
          </div>

          <!-- table -->
          <div v-if="selectedConversion === 'table'"
            id="table-container" 
            class="flex-fill overflow-auto">
          </div>

          <!-- chart -->
          <div v-else-if="selectedConversion === 'chart'"
            class="flex flex-center flex-fill">
            <div class="full-width">
              <canvas id="chart-container" 
                class="full-width canva">
              </canvas>
            </div>
          </div>

          <!-- XML or CSV -->
          <codemirror v-else
            class="cm-editor q-mx-auto flex-fill"
            v-model="jsonOutput"
            placeholder="Result"
            :read-only="true"
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
import { csvToGraphic } from 'src/utils/csvToGraphic';
import { fetchPrivateUser, logoutUser} from '../api/auth';
import Papa from 'papaparse';
import jsonExamples from 'src/data/jsonExamples';
import html2pdf from 'html2pdf.js';

export default {
  name: 'IndexPage',
  components: {
    Codemirror
  },
  async mounted() {
    try {
      const response = await fetchPrivateUser();
      console.log('Usuário autenticado:', response.data.user);
    } catch (error) {
      console.error('Token inválido ou expirado', error);
      logoutUser();
      this.$router.push({ name: 'LoginPage' });
    }
  },
  data() {
    return {
      jsonInput: '',
      jsonOutput: '',
      selectedConversion: 'csv',
      chartKey: '',
      availableKeys: [],
      conversionOptions: [
        { name: 'csv', label: 'CSV' },
        { name: 'table', label: 'Table' },
        { name: 'chart', label: 'chart' }
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
        } else if (this.selectedConversion === 'chart') {
          const { meta } = Papa.parse(csv, { header: true, preview: 1 });
          this.availableKeys = meta.fields;
          if (!this.chartKey) {
            this.chartKey = meta.fields[0];
          }
          this.$nextTick(() => {
            csvToGraphic(csv, 'chart-container', this.chartKey);
          });
        } else {
          this.jsonOutput = 'Not implemented yet';
        }
      } catch (e) {
        this.jsonOutput = 'Error processing JSON: ' + e.message;
      }
    },
    generateExample() {
      const randomIndex = Math.floor(Math.random() * jsonExamples.length);
      this.jsonInput = JSON.stringify(jsonExamples[randomIndex], null, 2);
    },
    downloadPdf() {
      let elementId = '';
      if (this.selectedConversion === 'table') {
        elementId = 'table-container';
      } else if (this.selectedConversion === 'chart') {
        elementId = 'chart-container';
      }

      const isMobile = window.matchMedia('(max-width: 728px)').matches;
      const element = document.getElementById(elementId);

      let totalWidth = 0;
      if (this.selectedConversion === 'table' && element) {
        const table = element.querySelector('table');
        if (table) {
          totalWidth = table.getBoundingClientRect().width;
          console.log('Tabela tem largura de:', totalWidth, 'px');
        }
      }

      let pageFormat = 'a4';
      if (totalWidth > 1200) {
        pageFormat = 'a2';
      } else if (totalWidth > 900) {
        pageFormat = 'a3';
      }

      const quality = this.selectedConversion === 'table' ? 0.2 : 0.98;

      const opt = {
        margin: 0.5,
        filename: 'result.pdf',
        image: { 
          type: 'jpeg',
          quality: quality
        },
        html2canvas: { scale: 3 },
        jsPDF: { 
          unit: 'in',
          format: pageFormat,
          orientation: isMobile ? 'portrait' : 'landscape'
        }
      };
      html2pdf().set(opt).from(element).save();
    },
  }
}
</script>

<style>
h1 {
  font-size: 40px;
}
.responsive-container {
  padding: 48px !important;
}
.cm-editor {
  background-color: white !important;
  color: black !important;
  border-radius: 8px;
  border: 2px solid #c9cec9;
  width: 100%;
  height: 100%;
  min-height: 40vh;
}
.div-input-output {
  border-radius: 8px;
  border: 3px solid #000000;
  display: flex;
  flex-direction: column;
}
.canva {
  max-height: 400px;
  height: 100%;
  width: 100%;
}
.fixed-height {
  min-height: 60vh;
  max-height: 60vh;
  height: 100%;
}
.flex-fill {
  flex: 1;
}
@media (max-width: 728px) {
  h1 {
    font-size: 28px;
  }
  h4 {
    font-size: 24px;
  }
  .responsive-container {
    padding: 24px !important;
  }
  .responsive-responseContainer {
    padding-top: 24px !important;
  }
  .canva {
    max-height: 350px;
    height: 350px;
  }
  .cm-editor {
    height: 40vh;
  }
  .fixed-height {
    max-height: 75vh;
  }
}
</style>