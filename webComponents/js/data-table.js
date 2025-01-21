export class DataTable extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // Cria uma tabela
    const table = document.createElement('table');

    // Obtém o atributo "data"
    const dataAttr = this.getAttribute("data");

    // Verifica se há dados no atributo e os converte para JSON
    if (dataAttr) {
      try {
        this.data = JSON.parse(dataAttr);
        console.log(this.data);
      } catch (error) {
        console.log('Erro ao parsear JSON:', error);
        this.data = [];
      }
    } else {
      this.data = [];
    }

    // Estilo básico da tabela
    const style = document.createElement('style');
    style.textContent = `
      table {
        border: 1px solid black;
        padding: 10px;
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid black;
        padding: 10px;
      }
    `;

    // Adiciona estilo e tabela ao Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(table);

    // Renderiza os dados na tabela, se disponíveis
    this.renderTable(table);
  }

  renderTable(table) {
    // Verifica se há dados disponíveis
    if (!this.data || this.data.length === 0) {
      table.innerHTML = '<tr><td colspan="100%">Nenhum dado disponível</td></tr>';
      return;
    }

    // Gera os cabeçalhos da tabela
    const headers = Object.keys(this.data[0]);
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Gera o corpo da tabela
    const tbody = document.createElement('tbody');
    this.data.forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = row[header];
        tr.appendChild(td); // Adiciona a célula (td) à linha (tr)
      });
      tbody.appendChild(tr); // Adiciona a linha (tr) ao corpo da tabela (tbody)
    });

    // Adiciona o cabeçalho e o corpo à tabela
    table.appendChild(thead);
    table.appendChild(tbody);
  }
}
