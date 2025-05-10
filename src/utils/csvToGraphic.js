import Papa from 'papaparse';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

let currentChartInstance = null;

export function csvToGraphic(csv, canvasId, key) {
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });

  if (!data.length || !key) return;

  const valueCounts = {};

  data.forEach(row => {
    const value = row[key] || 'UNKNOWN';
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  });

  const labels = Object.keys(valueCounts);
  const values = Object.values(valueCounts);

  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  if (currentChartInstance) {
    currentChartInstance.destroy();
  }

  currentChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: `Distribuição por ${key}`,
        data: values,
        backgroundColor: '#42A5F5'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: `Distribuição por ${key}`
        }
      }
    }
  });
}
