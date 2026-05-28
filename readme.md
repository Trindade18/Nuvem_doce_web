# Nuvem Doce

Site MVP de uma confeitaria artesanal chamada Nuvem Doce. O projeto apresenta a marca, o cardapio, informacoes sobre a confeitaria, depoimentos, contato, login simulado e carrinho de compras com confirmacao pelo WhatsApp.

## Objetivo do MVP

O objetivo do MVP e permitir que o cliente conheca a Nuvem Doce, veja os produtos disponiveis e monte um pedido simples pelo carrinho.

## Linguagens e Tecnologias

- HTML5: estrutura das paginas `index.html` e `login.html`.
- CSS3: estilos visuais, responsividade, modal e animacoes no arquivo `style.css`.
- JavaScript: interacoes do carrinho, formulario, login simulado e envio para WhatsApp no arquivo `script.js`.
- Tailwind CSS via CDN: carregado no HTML para cumprir o requisito de biblioteca CSS.
- Cypress: testes automatizados de interface.
- Git e GitHub: versionamento e entrega da documentacao.

## Funcionalidades do MVP

- Pagina inicial com apresentacao da confeitaria.
- Cardapio com bolos e cupcakes.
- Botao para adicionar produtos ao carrinho.
- Carrinho com subtotal, entrega e total.
- Controle de quantidade no carrinho.
- Remocao de produtos do carrinho.
- Confirmacao do pedido pelo WhatsApp.
- Formulario de contato com validacao basica.
- Tela de login simulada.
- Layout responsivo para celular e computador.

## Requisitos Funcionais

- RF01: O usuario deve visualizar a pagina inicial com o nome da marca e chamada principal.
- RF02: O usuario deve visualizar o cardapio com produtos, descricoes e precos.
- RF03: O usuario deve adicionar produtos ao carrinho.
- RF04: O usuario deve alterar a quantidade de produtos no carrinho.
- RF05: O usuario deve remover produtos do carrinho.
- RF06: O sistema deve calcular subtotal, entrega e total do pedido.
- RF07: O usuario deve confirmar o pedido pelo WhatsApp.
- RF08: O usuario deve enviar uma mensagem pelo formulario de contato.
- RF09: O usuario deve acessar a tela de login e realizar um login simulado.

## Requisitos Nao Funcionais

- RNF01: O site deve ser responsivo.
- RNF02: O site deve ter identidade visual coerente com confeitaria artesanal.
- RNF03: O carrinho deve manter os itens no navegador usando `localStorage`.
- RNF04: O site deve funcionar com HTML, CSS e JavaScript puros.
- RNF05: O site deve usar arquivos separados para HTML, CSS e JavaScript.
- RNF06: O formulario deve usar validacao basica de campos obrigatorios.
- RNF07: O projeto deve possuir documentacao no README.
- RNF08: O projeto deve possuir testes automatizados em Cypress.

## Regras de Negocio

- RN01: A entrega custa R$ 10,00 quando existe pelo menos um produto no carrinho.
- RN02: A entrega custa R$ 0,00 quando o carrinho esta vazio.
- RN03: O total do pedido e a soma do subtotal dos produtos com o valor da entrega.
- RN04: Cada produto possui preco fixo definido no cardapio.
- RN05: Se o mesmo produto for adicionado mais de uma vez, a quantidade aumenta.
- RN06: Se a quantidade de um produto chegar a zero, o produto sai do carrinho.
- RN07: O pedido so pode ser confirmado se o carrinho tiver pelo menos um produto.
- RN08: O login e apenas demonstrativo, sem autenticacao real.

## Casos de Teste Cypress

| Caso | Objetivo | Resultado esperado |
| --- | --- | --- |
| CT01 | Verificar se a pagina inicial e o cardapio carregam | Marca, chamada principal e produtos aparecem na tela |
| CT02 | Adicionar produto ao carrinho | Produto aparece no carrinho e totais sao calculados |
| CT03 | Alterar quantidade e remover produto | Quantidade, subtotal, entrega e total sao atualizados |
| CT04 | Enviar formulario de contato | Mensagem de sucesso aparece e formulario e limpo |

## Como Executar o Projeto

1. Abra o arquivo `index.html` no navegador.
2. Mantenha as imagens na mesma pasta dos arquivos HTML, CSS e JS.
3. Clique em `Cardapio` para ver os produtos.
4. Use `+ Adicionar` para montar o carrinho.
5. Clique em `Fazer Pedido Agora` para abrir o carrinho.

## Como Rodar os Testes

Instale as dependencias:

```bash
npm install
```

Rode o servidor local:

```bash
npm run start
```

Em outro terminal, rode os testes:

```bash
npm run test:e2e
```

Para abrir a interface do Cypress:

```bash
npm run cypress:open
```

## Como Documentar no GitHub

1. Crie um repositorio no GitHub com o nome `nuvem-doce`.
2. No terminal, dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "MVP Nuvem Doce"
git branch -M main
git remote add origin https://github.com/seu-usuario/nuvem-doce.git
git push -u origin main
```

3. Confira se o GitHub mostra os arquivos `index.html`, `login.html`, `style.css`, `script.js`, `README.md`, `package.json`, `cypress.config.js` e a pasta `cypress`.

## Roteiro de Apresentacao

- Apresentar o problema: clientes precisam ver o cardapio e montar pedidos com facilidade.
- Apresentar a solucao: site MVP da Nuvem Doce com cardapio, carrinho e contato.
- Mostrar a pagina inicial e a identidade visual.
- Demonstrar adicionar produto ao carrinho.
- Demonstrar alteracao de quantidade e calculo do total.
- Demonstrar confirmacao do pedido pelo WhatsApp.
- Mostrar README, requisitos e casos de teste no GitHub.
- Mostrar execucao dos testes Cypress.

## Status

MVP pronto para apresentacao, documentacao no README e 4 casos de teste automatizados em Cypress.

## Criterios da Prova Atendidos

- Apresentacao: o projeto possui MVP funcional e roteiro de apresentacao de 5 a 10 minutos.
- Documentacao no GitHub: o README documenta linguagens, tecnologias, RF, RNF e regras de negocio.
- Casos de teste: o projeto possui 4 casos de teste automatizados usando Cypress.
- Evolucao do MVP: o site ja possui pagina inicial, cardapio, carrinho, contato, login simulado e confirmacao pelo WhatsApp.