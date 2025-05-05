// import Papa from 'papaparse';
// import {
//   Chart,
//   BarController,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title
// } from 'chart.js';

// // Registrando os elementos do gráfico
// Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// let currentChartInstance = null;

// export function csvToGraphic(csv, canvasId) {
//   // Parse do CSV com cabeçalhos
//   const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });

//   if (!data.length) return;

//   // Exemplo: agrupar por status e contar
//   const statusCounts = {};

//   data.forEach(row => {
//     const status = row['data.athlete.responsible.teamContract.installments.status'] || 'UNKNOWN';
//     statusCounts[status] = (statusCounts[status] || 0) + 1;
//   });

//   const labels = Object.keys(statusCounts);
//   const values = Object.values(statusCounts);

//   const ctx = document.getElementById(canvasId);

//   if (!ctx) return;

//   // Destroi o gráfico anterior, se houver
//   if (currentChartInstance) {
//     currentChartInstance.destroy();
//   }

//   // Cria novo gráfico de barras
//   currentChartInstance = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels,
//       datasets: [{
//         label: 'Quantidade por Status',
//         data: values,
//         backgroundColor: '#42A5F5'
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top'
//         },
//         title: {
//           display: true,
//           text: 'Distribuição de Status das Parcelas'
//         }
//       }
//     }
//   });
// }
