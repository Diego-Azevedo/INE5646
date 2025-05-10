import { Grid } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';

let gridInstance = null;

export function csvToTable(csvText, containerId = 'table-container') {
  try {
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      throw new Error('Invalid CSV, missing data.');
    }

    const headers = lines[0].split(',').map(header => header.trim());
    const rows = lines.slice(1).map(line => line.split(',').map(cell => cell.trim()));

    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container #${containerId} not found.`);
    }

    container.innerHTML = '';
    if (gridInstance) {
      gridInstance.destroy();
      gridInstance = null;
    }

    gridInstance = new Grid({
      columns: headers,
      data: rows,
      pagination: {
        enabled: true,
        limit: 8,
      },
      search: false,
      sort: true,
      autoWidth: true,
      className: {
        table: 'table table-bordered table-striped'
      }
    });

    gridInstance.render(container);

  } catch (err) {
    console.error('Error converting CSV to Table:', err);
    throw err;
  }
}
