const API_BASE = 'https://rickandmortyapi.com/api/character';
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
let totalPages = 1;

async function fetchCharacters(page = 1) {
  try {
    const res = await fetch(`${API_BASE}?page=${page}`);
    const data = await res.json();
    totalPages = data.info.pages;
    renderCharacters(data.results);
    updatePagination();
  } catch (err) {
    console.error('Erro ao buscar dados da API', err);
    cardsContainer.innerHTML = '<p>Erro ao carregar personagens.</p>';
  }
}

function renderCharacters(chars) {
  cardsContainer.innerHTML = '';
  chars.forEach(c => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${c.image}" alt="${c.name}" />
      <h3>${c.name}</h3>
      <p>${c.species} — ${c.status}</p>
    `;
    cardsContainer.appendChild(div);
  });
}

function updatePagination() {
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});
nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters(currentPage);
  }
});

// Inicia a primeira requisição:
fetchCharacters(currentPage);
