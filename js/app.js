
// Função para adicionar despesa
function adicionarDespesa(financeiro) {
    const valor = parseFloat(document.getElementById("valor").value);
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;

    const despesa = { valor, descricao, categoria };
    financeiro.push(despesa);
    exibirHistoricoDespesas(financeiro);
    calcularEAtualizar();
    document.getElementById("valor").value = "";
    document.getElementById("descricao").value = "";
    salvarDadosNoLocalStorage(); // Salva os dados após adicionar uma despesa
}

// Função para adicionar salário
function adicionarSalario(financeiro) {
    const salarioValor = parseFloat(document.getElementById("salario_valor").value);
    const descricao = document.getElementById("descricao_salario").value;
    const categoria = document.getElementById("categoria_salario").value;

    const salario = { salario: salarioValor, descricao, categoria };
    financeiro.push(salario);
    exibirHistoricoSalarios(financeiro);

    // Obter o valor da sobra e adicionar ao novo salário
    const valorSobra = parseFloat(document.getElementById("valor_sobrado_valor").textContent);
    const novoSaldo = salarioValor + valorSobra;

    // Atualizar o saldo disponível com o novo saldo
    const saldoAnterior = parseFloat(document.getElementById("saldo_disponivel_valor").textContent);
    const saldoAtualizado = saldoAnterior + novoSaldo;

    // Atualizar o saldo disponível na página
    document.getElementById("saldo_disponivel_valor").textContent = saldoAtualizado.toFixed(2);

    // Resetar o valor da sobra para zero
    document.getElementById("valor_sobrado_valor").textContent = "0.00";

    // Salvar alterações no localStorage se necessário
    salvarDadosNoLocalStorage();

    console.log("Salário adicionado com sucesso!");
}

// Função para calcular e atualizar total de gastos e saldo disponível
function calcularEAtualizar() {
    const totalGastos = calcularTotal(financeiro);
    const saldoDisponivel = salarioDespesas(financeiro);
    document.getElementById("total_gastos_valor").textContent = totalGastos;
    document.getElementById("saldo_disponivel_valor").textContent = saldoDisponivel;
}

// Inicialização
let financeiro = [];

// Event listeners para formulários
document.getElementById("form-despesa").addEventListener("submit", function (event) {
    event.preventDefault();
    adicionarDespesa(financeiro);
});

document.getElementById("form-salario").addEventListener("submit", function (event) {
    event.preventDefault();
    adicionarSalario(financeiro);
});

// Função para exibir histórico de despesas
function exibirHistoricoDespesas(financeiro) {
    let historicoDespesas = "<h2>Histórico de Despesas</h2>";
    financeiro.forEach((item, index) => {
        if (item.valor !== undefined) {
            historicoDespesas += `
                <p>Despesa ${index + 1}:</p>
                <p>Valor: R$ ${item.valor.toFixed(2)}</p>
                <p>Descrição: ${item.descricao}</p>
                <p>Categoria: ${item.categoria}</p><br>`;
        }
    });
    document.getElementById("historico_despesas").innerHTML = historicoDespesas;
}

// Função para exibir histórico de salários
function exibirHistoricoSalarios(financeiro) {
    let historicoSalarios = "<h2>Histórico de Salários</h2>";
    financeiro.forEach((item, index) => {
        if (item.salario !== undefined) {
            historicoSalarios += `
                <p>Salário ${index + 1}:</p>
                <p>Valor: R$ ${item.salario.toFixed(2)}</p>
                <p>Descrição: ${item.descricao}</p>
                <p>Categoria: ${item.categoria}</p><br>`;
        }
    });
    document.getElementById("historico_salarios").innerHTML = historicoSalarios;
}

// Função para calcular o total de gastos
function calcularTotal(financeiro) {
    let totalDespesas = 0;
    financeiro.forEach(item => {
        if (item.valor !== undefined) {
            totalDespesas += item.valor;
        }
    });
    return totalDespesas.toFixed(2);
}

// Função para calcular despesas com salário
function salarioDespesas(financeiro) {
    let totalDespesas = 0;
    let totalSalarios = 0;
    financeiro.forEach(item => {
        if (item.valor !== undefined) {
            totalDespesas += item.valor;
        }
        if (item.salario !== undefined) {
            totalSalarios += item.salario;
        }
    });
    const saldoDisponivel = totalSalarios - totalDespesas;
    return saldoDisponivel.toFixed(2);
}


function mostrarHistorico() {
    var opcaoSelecionada = document.getElementById("opcao").value;

    // Oculta todos os históricos
    var historicos = document.querySelectorAll(".history");
    historicos.forEach(function (historico) {
        historico.style.display = "none";
    });

    // Mostra o histórico correspondente à opção selecionada
    if (opcaoSelecionada === "despesas") {
        document.getElementById("historico_despesas").style.display = "block";
    } else if (opcaoSelecionada === "salarios") {
        document.getElementById("historico_salarios").style.display = "block";
    }
}

function mostrarGastos() {
    var opcaoSelecionada = document.getElementById("opcao").value;

    // Oculta todos os históricos
    var historicos = document.querySelectorAll(".history");
    historicos.forEach(function (historico) {
        historico.style.display = "none";
    });

    // Mostra o histórico correspondente à opção selecionada
    if (opcaoSelecionada === "despesas") {
        document.getElementById("historico_despesas").style.display = "block";
    } else if (opcaoSelecionada === "salarios") {
        document.getElementById("historico_salarios").style.display = "block";
    }
}

function limparDespesas(financeiro) {
    financeiro.forEach((item, index) => {
        if (item.valor !== undefined) {
            financeiro.splice(index, 1);
        }
    });
    console.log("Dados de despesas resetados com sucesso!");
}

function resetarDespesas() {
    // Remover todas as despesas da lista financeiro
    financeiro = financeiro.filter(item => !item.valor || item.salario);

    // Atualizar o histórico de despesas exibido na página
    exibirHistoricoDespesas(financeiro);

    // Calcular o total de gastos
    const totalGastos = calcularTotal(financeiro);

    // Atualizar apenas o total de gastos na página
    document.getElementById("total_gastos_valor").textContent = totalGastos;

    // Salvar alterações no localStorage se necessário
    salvarDadosNoLocalStorage();

    console.log("Dados de despesas resetados com sucesso!");
}


function resetarSaldo() {
    const saldoDisponivel = parseFloat(document.getElementById("saldo_disponivel_valor").textContent);
    const valorSobradoElement = document.getElementById("valor_sobrado_valor");

    if (saldoDisponivel > 0) {
        // Move o saldo remanescente para o campo "valor sobrado"
        const valorSobrado = parseFloat(valorSobradoElement.textContent);
        const novoValorSobrado = valorSobrado + saldoDisponivel;
        valorSobradoElement.textContent = novoValorSobrado.toFixed(2);
    }

    // Reseta o saldo disponível para 0
    document.getElementById("saldo_disponivel_valor").textContent = "0.00";

    // Salvar alterações no localStorage se necessário
    salvarDadosNoLocalStorage();
}

function resetarSalario() {
    // Limpar o campo de entrada do salário
    document.getElementById("salario_valor").value = "";

    // Remover todos os salários do histórico
    financeiro = financeiro.filter(item => !item.salario);

    // Atualizar o histórico de salários exibido na página
    exibirHistoricoSalarios(financeiro);

    // Calcular e atualizar o saldo disponível
    calcularEAtualizar();

    // Esconder o botão de reset do salário novamente
    document.getElementById("botao_reset_salario").style.display = "none";

    // Salvar alterações no localStorage se necessário
    salvarDadosNoLocalStorage();
}
function resetarScriptCompleto() {
    // Limpar os campos de entrada de valor e descrição se existirem
    const valorInput = document.getElementById("valor");
    const descricaoInput = document.getElementById("descricao");
    if (valorInput && descricaoInput) {
        valorInput.value = "";
        descricaoInput.value = "";
    }

    // Limpar os campos de salário se existirem
    const salarioValorInput = document.getElementById("salario_valor");
    const descricaoSalarioInput = document.getElementById("descricao_salario");
    if (salarioValorInput && descricaoSalarioInput) {
        salarioValorInput.value = "";
        descricaoSalarioInput.value = "";
    }

    // Limpar os campos de saldo e valor sobrado se existirem
    const totalGastosValor = document.getElementById("total_gastos_valor");
    const saldoDisponivelValor = document.getElementById("saldo_disponivel_valor");
    const valorSobradoValor = document.getElementById("valor_sobrado_valor");
    if (totalGastosValor && saldoDisponivelValor && valorSobradoValor) {
        totalGastosValor.textContent = "0.00";
        saldoDisponivelValor.textContent = "0.00";
        valorSobradoValor.textContent = "0.00";
    }

    // Limpar os históricos de despesas e salários se existirem
    const historicoDespesas = document.getElementById("historico_despesas");
    const historicoSalarios = document.getElementById("historico_salarios");
    if (historicoDespesas && historicoSalarios) {
        historicoDespesas.innerHTML = "";
        historicoSalarios.innerHTML = "";
    }

    // Esconder o botão de reset do salário se existir
    const botaoResetSalario = document.getElementById("botao_reset_salario");
    if (botaoResetSalario) {
        botaoResetSalario.style.display = "none";
    }

    // Zerar a variável financeiro
    financeiro = [];

    // Salvar alterações no localStorage se necessário
    salvarDadosNoLocalStorage();
}




// Função para inicializar a página
function inicializarPagina() {
    // Carregar os dados do localStorage ao carregar a página
    carregarDadosDoLocalStorage();
}

// Função para salvar os dados do formulário no localStorage
function salvarDadosNoLocalStorage() {
    // Salvar os dados do formulário no localStorage
    localStorage.setItem('formularioFinanceiro', JSON.stringify(financeiro));
}

// Função para carregar os dados do localStorage e preencher os campos do formulário
function carregarDadosDoLocalStorage() {
    // Verificar se existem dados salvos no localStorage
    const dadosSalvos = localStorage.getItem('formularioFinanceiro');
    if (dadosSalvos) {
        // Converter os dados salvos de volta para um objeto JavaScript
        const dados = JSON.parse(dadosSalvos);

        // Preencher os campos do formulário com os dados salvos
        financeiro = dados; // Atualiza a variável financeiro com os dados carregados
        exibirHistoricoDespesas(dados);
        exibirHistoricoSalarios(dados);
        calcularEAtualizar();
    }
}

// Evento de antes de sair da página (ao recarregar ou fechar a página)
window.addEventListener('beforeunload', salvarDadosNoLocalStorage);






// Inicialização da página
inicializarPagina();
