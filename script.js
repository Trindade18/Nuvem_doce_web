console.log("Nuvem Doce carregado!");

const produtos = [
    ["Bolo de Chocolate de Pote",15],
    ["Bolo de Cenoura com Cobertura",15],
    ["Bolo Red Velvet",15],
    ["Bolo de Baunilha com Morango",15],
    ["Cupcake Chocolate",6],
    ["Cupcake Baunilha com Calda",5.5],
    ["Cupcake Morango",6.5],
    ["Cupcake Cenoura",6]
];

let carrinho = carregarCarrinho();

document.addEventListener("DOMContentLoaded",()=>{
    criarBotoesDoCardapio();
    atualizarCarrinho();

    const formContato = document.getElementById("formContato");

    if(formContato){
        formContato.addEventListener("submit",(event)=>{
            event.preventDefault();
            alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
            formContato.reset();
        });
    }
});

function criarBotoesDoCardapio(){
    const itens = document.querySelectorAll(".menu-lista li");

    itens.forEach((item,index)=>{
        if(item.querySelector(".btn-adicionar")) return;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "btn-adicionar";
        botao.innerText = "+ Adicionar";
        botao.setAttribute("data-cy",`add-product-${index}`);

        botao.onclick = ()=>{
            adicionarCarrinho(produtos[index][0],produtos[index][1],botao);
        };

        item.appendChild(botao);
    });
}

function abrirCarrinho(){
    const modal = document.getElementById("modalCarrinho");
    const overlay = document.getElementById("overlayCarrinho");

    if(!modal || !overlay) return;

    atualizarCarrinho();
    modal.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
}

function fecharCarrinho(){
    const modal = document.getElementById("modalCarrinho");
    const overlay = document.getElementById("overlayCarrinho");

    if(!modal || !overlay) return;

    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "";
}

function adicionarCarrinho(nome,preco,botao){
    const itemExistente = carrinho.find((item)=>item.nome === nome);

    if(itemExistente){
        itemExistente.quantidade += 1;
    }else{
        carrinho.push({nome,preco,quantidade:1});
    }

    salvarCarrinho();
    atualizarCarrinho();

    if(botao){
        botao.innerText = "Adicionado!";
        botao.style.background = "#25D366";

        setTimeout(()=>{
            botao.innerText = "+ Adicionar";
            botao.style.background = "";
        },900);
    }
}

function atualizarCarrinho(){
    const lista = document.getElementById("itensCarrinho");
    const subtotalElemento = document.getElementById("subtotal");
    const entregaElemento = document.getElementById("entrega");
    const totalFinalElemento = document.getElementById("totalFinal");

    if(!lista || !subtotalElemento || !entregaElemento || !totalFinalElemento) return;

    lista.innerHTML = "";

    let subtotal = 0;

    carrinho.forEach((item,index)=>{
        subtotal += item.preco * item.quantidade;

        lista.innerHTML += `
            <div class="item-carrinho" data-cy="cart-item">
                <div>
                    <strong>${item.nome}</strong>
                    <p>${formatarMoeda(item.preco)} cada</p>

                    <div class="quantidade-controle">
                        <button type="button" onclick="alterarQuantidade(${index},-1)" data-cy="quantity-minus-${index}">-</button>
                        <span data-cy="cart-quantity-${index}">${item.quantidade}</span>
                        <button type="button" onclick="alterarQuantidade(${index},1)" data-cy="quantity-plus-${index}">+</button>
                    </div>
                </div>

                <div>
                    <strong>${formatarMoeda(item.preco * item.quantidade)}</strong>
                    <button class="btn-fechar" type="button" onclick="removerItem(${index})" data-cy="remove-item-${index}">✕</button>
                </div>
            </div>
        `;
    });

    if(carrinho.length === 0){
        lista.innerHTML = `<p>Nenhum item no carrinho</p>`;
    }

    const entrega = carrinho.length > 0 ? 10 : 0;
    const total = subtotal + entrega;

    subtotalElemento.innerText = formatarMoeda(subtotal);
    entregaElemento.innerText = formatarMoeda(entrega);
    totalFinalElemento.innerText = formatarMoeda(total);
}

function alterarQuantidade(index,quantidade){
    if(!carrinho[index]) return;

    carrinho[index].quantidade += quantidade;

    if(carrinho[index].quantidade <= 0){
        carrinho.splice(index,1);
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function removerItem(index){
    carrinho.splice(index,1);
    salvarCarrinho();
    atualizarCarrinho();
}

function confirmarPedido(){
    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    const subtotal = carrinho.reduce((total,item)=>total + item.preco * item.quantidade,0);
    const entrega = 10;
    const total = subtotal + entrega;

    const itensPedido = carrinho
        .map((item)=>`${item.quantidade}x ${item.nome} - ${formatarMoeda(item.preco * item.quantidade)}`)
        .join("\n");

    const mensagem = `Olá, Nuvem Doce! Quero confirmar este pedido:\n\n${itensPedido}\n\nEntrega: ${formatarMoeda(entrega)}\nTotal: ${formatarMoeda(total)}`;
    const link = `https://wa.me/5562987654321?text=${encodeURIComponent(mensagem)}`;

    window.open(link,"_blank");
}

function fazerLogin(event){
    event.preventDefault();

    alert("Login realizado com sucesso! ☁️");

    window.location.href = "index.html";
}

function formatarMoeda(valor){
    return valor.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });
}

function salvarCarrinho(){
    localStorage.setItem("carrinhoNuvemDoce",JSON.stringify(carrinho));
}

function carregarCarrinho(){
    try{
        return JSON.parse(localStorage.getItem("carrinhoNuvemDoce")) || [];
    }catch(erro){
        return [];
    }
}