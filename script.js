// 1. DADOS
const data = {
  produtos: [
    { id: 1, nome: "Smartphone Aurora", preco: 2499.9, categoria: "Celulares", imagem: "images/celular1.png", descricao: "Tela de 6.5 polegadas e 128 GB.", emEstoque: true },
    { id: 2, nome: "Smartphone Nova", preco: 1199.0, categoria: "Celulares", imagem: "images/celular1.png", descricao: "Bateria de 5000 mAh e 64 GB.", emEstoque: true },
    { id: 3, nome: "Notebook Atlas", preco: 3899.9, categoria: "Notebooks", imagem: "images/celular1.png", descricao: "Core i5, 16 GB de RAM e SSD de 512 GB.", emEstoque: true },
    { id: 4, nome: "Notebook Zenit", preco: 5999.0, categoria: "Notebooks", imagem: "images/celular1.png", descricao: "Ryzen 7 e 32 GB de RAM.", emEstoque: false },
    { id: 5, nome: "Fone Bluetooth", preco: 249.9, categoria: "Acessórios", imagem: "images/celular1.png", descricao: "Cancelamento de ruído e 30 h de bateria.", emEstoque: true },
    { id: 6, nome: "Mouse Gamer", preco: 179.5, categoria: "Acessórios", imagem: "images/celular1.png", descricao: "12000 DPI e 6 botões.", emEstoque: false },
    { id: 7, nome: "Console Retro", preco: 1899.0, categoria: "Games", imagem: "images/celular1.png", descricao: "500 jogos clássicos e 2 controles.", emEstoque: true },
    { id: 8, nome: "Jogo Aventura", preco: 249.0, categoria: "Games", imagem: "images/celular1.png", descricao: "Mundo aberto para até 2 jogadores.", emEstoque: true }
  ]
};

// 2. ELEMENTOS
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

// 3. FUNÇÕES
function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);
  card.style.padding = "12px";

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);

  const nome = document.createElement("h3");
  nome.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.textContent = formatPrice(produto.preco);

  const categoria = document.createElement("p");
  categoria.textContent = produto.categoria;

  const btnDetalhes = document.createElement("button");
  btnDetalhes.textContent = "Ver detalhes";
  btnDetalhes.addEventListener("click", function () {
    showProductDetails(produto);
  });

  const btnDestacar = document.createElement("button");
  btnDestacar.textContent = "Destacar";
  btnDestacar.addEventListener("click", function () {
    card.classList.add("highlight");
  });

  card.appendChild(img);
  card.appendChild(nome);
  card.appendChild(preco);
  card.appendChild(categoria);
  card.appendChild(btnDetalhes);
  card.appendChild(btnDestacar);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  for (let i = 0; i < produtos.length; i++) {
    productList.appendChild(createProductCard(produtos[i]));
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    console.log("data-id:", card.getAttribute("data-id"));
  });
}

function renderCategories() {
  const categorias = [];

  for (let i = 0; i < data.produtos.length; i++) {
    const cat = data.produtos[i].categoria;
    if (!categorias.includes(cat)) {
      categorias.push(cat);
    }
  }

  for (let i = 0; i < categorias.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", categorias[i]);
    option.textContent = categorias[i];
    categorySelect.appendChild(option);
  }
}

function showProductDetails(produto) {
  let estoque = "Fora de estoque";
  if (produto.emEstoque) {
    estoque = "Em estoque";
  }

  productDetails.innerHTML =
    "<h3>" + produto.nome + "</h3>" +
    "<p>Preço: " + formatPrice(produto.preco) + "</p>" +
    "<p>Categoria: " + produto.categoria + "</p>" +
    "<p>Estoque: " + estoque + "</p>" +
    "<p>Descrição: " + produto.descricao + "</p>";
}

function filterProducts() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  return data.produtos.filter(function (p) {
    const bateNome = p.nome.toLowerCase().includes(texto);
    const bateCategoria = categoria === "Todas" || p.categoria === categoria;
    return bateNome && bateCategoria;
  });
}

// 4. EVENTOS
searchInput.addEventListener("input", function () {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});

// 5. INÍCIO
renderCategories();
renderProducts(data.produtos);