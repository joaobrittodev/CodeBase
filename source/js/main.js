// Elementos do DOM
const ufSelect = document.getElementById('ufSelect');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const suggestionsContainer = document.getElementById('suggestionsContainer');
const resultsContainer = document.getElementById('resultsContainer');
const backButton = document.getElementById('backButton');
const resultsTableBody = document.getElementById('resultsTableBody');
const resultCount = document.getElementById('resultCount');
const mainHome = document.querySelector('.main-home');
const resultsTable = document.getElementById('resultsTable');

let allData = [];

// Event Listeners
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});
backButton.addEventListener('click', goBackToSearch);

// Função para preencher o input com sugestão
function fillSearch(text) {
  searchInput.value = text;
  searchInput.focus();
}

// Função para realizar a busca - Adaptada para incluir UF
async function performSearch() {
  const busca = searchInput.value.trim();
  const uf = ufSelect.value.trim();
  
  if (!busca) {
    document.getElementById('searchInput').placeholder = "Digite algo para buscar...";
    return;
  }

  try {
    searchButton.disabled = true;
    searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Construir query com UF se selecionado
    let url = './source/php/dados.php?busca=' + encodeURIComponent(busca);
    if (uf) {
      url += '&uf=' + encodeURIComponent(uf);
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.status);
    }

    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      preencherTabela(data);
      displayResults(data, busca, uf);
    } catch (err) {
      console.error('O servidor não enviou um JSON válido:', text);
      alert("Erro no formato de dados do servidor. Verifique o console.");
    }

  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao buscar dados. Verifique se o servidor está rodando.');
  } finally {
    searchButton.disabled = false;
    searchButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
  }
}

// Função para preencher a tabela - Mantida do código original com adaptações
function preencherTabela(data) {
  // Limpar tabela
  resultsTableBody.innerHTML = '';

  // Se o PHP retornar um objeto de erro em vez de array
  if (data.erro) {
    resultsTableBody.innerHTML = `<tr><td colspan="5" style="color: red;">${data.erro}</td></tr>`;
    return;
  }

  if (!Array.isArray(data) || data.length === 0) {
    resultsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #a0a0a0;">Nenhum resultado encontrado...</td></tr>`;
  } else {
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${escapeHtml(item.UF || item.uf || '')}</td>  
        <td>${escapeHtml(item.SIGLA || item.sigla || '')}</td>
        <td>${escapeHtml(item.LOCALIDADE || item.localidade || '')}</td>
        <td>${escapeHtml(item.MUNICIPIO || item.municipio || '')}</td>
        <td>${escapeHtml(item.DDD || item.ddd || '')}</td>
      `;
      resultsTableBody.appendChild(row);
    });
  }

  allData = data;
}

// Função para exibir resultados
function displayResults(data, searchTerm, uf) {
  let resultText = `${data.length} resultado${data.length !== 1 ? 's' : ''} encontrado${data.length !== 1 ? 's' : ''}`;
  
  if (searchTerm) {
    resultText += ` para "${searchTerm}"`;
  }
  
  if (uf) {
    resultText += ` em ${uf}`;
  }

  resultCount.textContent = resultText;

  // Mostrar seção de resultados
  mainHome.style.display = 'none';
  resultsContainer.style.display = 'block';
  resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Função para voltar à busca
function goBackToSearch() {
  mainHome.style.display = 'flex';
  resultsContainer.style.display = 'none';
  searchInput.value = '';
  searchInput.focus();
  mainHome.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Função para escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

