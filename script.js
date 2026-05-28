const STORAGE_KEY = "carrinhoNuvemDoce";
const ENTREGA = 10;

let carrinho = carregarCarrinho();

document.addEventListener("DOMContentLoaded", () => {
    configurarProdutos();
    configurarFormulario();
    atualizarCarrinho();

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharCarrinho();
        }
    });
});

function configurarProdutos() {
    const cards = document.querySelectorAll(".product-card");

    cards.forEach((card, index) => {
        const botao = card.querySelector(".btn-add");
        const nome = card.dataset.nome;
        const preco = Number(card.dataset.preco);

        if (!botao || !nome || Number.isNaN(preco)) return;

        botao.setAttribute("data-cy", `add-product-${index}`);
        botao.addEventListener("click", () => adicionarCarrinho(nome, preco, botao));
    });
}

function configurarFormulario() {
    const formContato = document.getElementById("formContato");

    if (!formContato) return;

    formContato.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
        formContato.reset();
    });
}

function abrirCarrinho() {
    const modal = document.getElementById("modalCarrinho");
    const overlay = document.getElementById("overlayCarrinho");

    if (!modal || !overlay) return;

    atualizarCarrinho();
    modal.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
}

function fecharCarrinho() {
    const modal = document.getElementById("modalCarrinho");
    const overlay = document.getElementById("overlayCarrinho");

    if (!modal || !overlay) return;

    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "";
}

function adicionarCarrinho(nome, preco, botao) {
    const itemExistente = carrinho.find((item) => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarCarrinho();
    sinalizarAdicao(botao);
}

function sinalizarAdicao(botao) {
    if (!botao) return;

    const textoOriginal = botao.textContent;
    botao.textContent = "Adicionado";
    botao.style.background = "#608675";

    window.setTimeout(() => {
        botao.textContent = textoOriginal;
        botao.style.background = "";
    }, 900);
}

function atualizarCarrinho() {
    const lista = document.getElementById("itensCarrinho");
    const subtotalElemento = document.getElementById("subtotal");
    const entregaElemento = document.getElementById("entrega");
    const totalFinalElemento = document.getElementById("totalFinal");
    const contador = document.getElementById("cartCount");

    const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);

    if (contador) {
        contador.textContent = quantidadeTotal;
    }

    if (!lista || !subtotalElemento || !entregaElemento || !totalFinalElemento) return;

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = '<p class="empty-cart">Seu carrinho esta vazio.</p>';
    }

    let subtotal = 0;

    carrinho.forEach((item, index) => {
        subtotal += item.preco * item.quantidade;
        lista.appendChild(criarItemCarrinho(item, index));
    });

    const entrega = carrinho.length > 0 ? ENTREGA : 0;
    const total = subtotal + entrega;

    subtotalElemento.textContent = formatarMoeda(subtotal);
    entregaElemento.textContent = formatarMoeda(entrega);
    totalFinalElemento.textContent = formatarMoeda(total);
}

function criarItemCarrinho(item, index) {
    const elemento = document.createElement("article");
    elemento.className = "item-carrinho";
    elemento.setAttribute("data-cy", "cart-item");

    elemento.innerHTML = `
        <div>
            <h3>${item.nome}</h3>
            <p>${formatarMoeda(item.preco)} cada</p>
            <div class="quantidade-controle" aria-label="Quantidade de ${item.nome}">
                <button type="button" onclick="alterarQuantidade(${index}, -1)" data-cy="quantity-minus-${index}" aria-label="Diminuir quantidade">-</button>
                <span data-cy="cart-quantity-${index}">${item.quantidade}</span>
                <button type="button" onclick="alterarQuantidade(${index}, 1)" data-cy="quantity-plus-${index}" aria-label="Aumentar quantidade">+</button>
            </div>
        </div>
        <div class="item-total">
            <strong>${formatarMoeda(item.preco * item.quantidade)}</strong>
            <button class="remove-button" type="button" onclick="removerItem(${index})" data-cy="remove-item-${index}" aria-label="Remover ${item.nome}">x</button>
        </div>
    `;

    return elemento;
}

function alterarQuantidade(index, quantidade) {
    if (!carrinho[index]) return;

    carrinho[index].quantidade += quantidade;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function confirmarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho esta vazio!");
        return;
    }

    const subtotal = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    const total = subtotal + ENTREGA;
    const itensPedido = carrinho
        .map((item) => `${item.quantidade}x ${item.nome} - ${formatarMoeda(item.preco * item.quantidade)}`)
        .join("\n");

    const mensagem = `Ola, Nuvem Doce! Quero confirmar este pedido:\n\n${itensPedido}\n\nEntrega: ${formatarMoeda(ENTREGA)}\nTotal: ${formatarMoeda(total)}`;
    const link = `https://wa.me/5562987654321?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
}

function fazerLogin(event) {
    event.preventDefault();
    alert("Login realizado com sucesso!");
    window.location.href = "index.html";
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function salvarCarrinho() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
}

function carregarCarrinho() {
    try {
        const dados = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        return [];
    }
}
