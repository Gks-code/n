document.addEventListener('DOMContentLoaded', function () {
    const numerosGrid = document.getElementById('numerosGrid');
    const btnComprar = document.getElementById('btnComprar');
    const resumoCompra = document.getElementById('resumoCompra');
    const numerosSelecionadosSpan = document.getElementById('numerosSelecionados');
    const totalCompraSpan = document.getElementById('totalCompra');

    const valorPorNumero = 10.00;
    let numerosSelecionados = [];

    // Carrega números vendidos do localStorage
    let numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos')) || [];

    // Cria os números de 1 a 101
    for (let i = 1213; i <= 1313; i++) {
        const numeroElement = document.createElement('div');
        numeroElement.className = numerosVendidos.includes(i) ? 'numero vendido' : 'numero';
        numeroElement.textContent = i;
        numeroElement.dataset.numero = i;

        if (!numerosVendidos.includes(i)) {
            numeroElement.addEventListener('click', function () {
                const numero = parseInt(this.dataset.numero);
                const index = numerosSelecionados.indexOf(numero);

                if (index === -1) {
                    // Adiciona à seleção
                    numerosSelecionados.push(numero);
                    this.classList.add('selecionado');
                } else {
                    // Remove da seleção
                    numerosSelecionados.splice(index, 1);
                    this.classList.remove('selecionado');
                }

                atualizarResumo();
            });
        }

        numerosGrid.appendChild(numeroElement);
    }

    function atualizarResumo() {
        if (numerosSelecionados.length > 0) {
            resumoCompra.style.display = 'block';
            numerosSelecionadosSpan.textContent = numerosSelecionados.join(', ');
            totalCompraSpan.textContent = (numerosSelecionados.length * valorPorNumero).toFixed(2);
            btnComprar.disabled = false;
        } else {
            resumoCompra.style.display = 'none';
            btnComprar.disabled = true;
        }
    }

    btnComprar.addEventListener('click', function () {
        const total = numerosSelecionados.length * valorPorNumero;
        const mensagem = `Olá! Gostaria de comprar os números ${numerosSelecionados.join(', ')} da rifa. Total: R$ ${total.toFixed(2)}. Como proceder?
                `;

        // Atualiza os números vendidos no localStorage
        numerosVendidos = [...numerosVendidos, ...numerosSelecionados];
        localStorage.setItem('numerosVendidos', JSON.stringify(numerosVendidos));

        // Marca visualmente como vendido
        numerosSelecionados.forEach(numero => {
            const elemento = document.querySelector(`.numero[data-numero="${numero}"]`);
            if (elemento) {
                elemento.classList.remove('selecionado');
                elemento.classList.add('vendido');
                elemento.removeAttribute('onclick');
            }
        });

        // Redireciona para o WhatsApp
        // SUBSTITUA SEU_NUMERO pelo seu WhatsApp (apenas números, ex: 5511999999999)
        const urlWhatsApp = `https://wa.me/554588349397?text=${encodeURIComponent(mensagem)}`;
        window.open(urlWhatsApp, '_blank');

        // Reseta a seleção
        numerosSelecionados = [];
        atualizarResumo();
    });
});
