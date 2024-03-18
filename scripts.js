const inputProduto = document.getElementById('produto');
        const respostaH4 = document.getElementById('resposta');
        const totalCarrinhoDiv = document.getElementById('totalCarrinho');
        const quantidadeProdutosDiv = document.getElementById('quantidadeProdutos');
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        function consultarPreco() {
            const produto = inputProduto.value.toLowerCase();
            switch (produto) {
                case 'morango':
                    respostaH4.innerText = 'R$ 5,99/Kg';
                    break;
                case 'laranja':
                    respostaH4.innerText = 'R$ 7,99/Kg';
                    break;
                default:
                    respostaH4.innerText = 'Produto não cadastrado';
                    return;
            }
        }

        function adicionarAoCarrinho() {
            const produtoNome = inputProduto.value.toLowerCase();
            const precoTexto = respostaH4.innerText;
            if (!precoTexto.includes('Produto não cadastrado') && precoTexto !== '') {
                const preco = parseFloat(precoTexto.replace('R$ ', '').replace('/Kg', '').replace(',', '.'));
                carrinho.push({ nome: produtoNome, preco });
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                atualizarInterface();
                alert(`${produtoNome} adicionado ao carrinho.`);
            } else {
                alert('Por favor, consulte o preço antes de adicionar ao carrinho.');
            }
        }
        
        function mostrarTotal() {
            if (carrinho.length > 0) {
                const total = carrinho.reduce((acc, { preco }) => acc + preco, 0);
                alert(`Total do Carrinho: R$ ${total.toFixed(2)}`);
            } else {
                alert('Carrinho vazio');
            }
        }
        function limparCarrinho() {
            carrinho = []; // Limpa o array do carrinho
            localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
            atualizarInterface(); // Atualiza a interface para refletir o carrinho vazio
            alert('Carrinho limpo com sucesso!');
        }
        
        document.getElementById('limparCarrinho').addEventListener('click', limparCarrinho);
        
        function atualizarInterface() {
            if (carrinho.length > 0) {
                let total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
                totalCarrinhoDiv.innerText = `Total do Carrinho: R$ ${total.toFixed(2)}`;
                quantidadeProdutosDiv.innerText = `Quantidade no Carrinho: ${carrinho.length}`;
            } else {
                totalCarrinhoDiv.innerText = 'Carrinho vazio';
                quantidadeProdutosDiv.innerText = 'Quantidade no Carrinho: 0';
            }
        }

        document.getElementById('consultar').addEventListener('click', consultarPreco);
        document.getElementById('comprar').addEventListener('click', adicionarAoCarrinho);
        document.getElementById('mostrarTotal').addEventListener('click', mostrarTotal);

        window.onload = function() {
            atualizarInterface();
        };