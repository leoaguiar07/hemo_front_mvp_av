import coletaService from '../../service/coletaService.js';

document.addEventListener('DOMContentLoaded', function() {
    const tabela = document.getElementById('example4').getElementsByTagName('tbody')[0];

    // Função para carregar registros
    function carregarRegistros() {
        // Chamar a função do service para obter registros
        coletaService.getRegistros()
            .then(registros => {
                carregarDados(registros);
            })
            .catch(error => {
                console.error('Erro ao carregar registros:', error);
                alert('Erro ao carregar registros.');
            });
    }

    // Função para carregar os dados na tabela
    function carregarDados(data) {
        
        tabela.innerHTML = '';
        data.forEach(item => {

            // Verifica se o status do item é  diferente de "disponivel" e diferente de Vencido
        if (item.status !== "disponivel" && item.status !== "vencido") {
            const newRow = tabela.insertRow(tabela.rows.length);
            newRow.insertCell(0).innerHTML = item.id;
            newRow.insertCell(1).innerHTML = item.hemocentro;
            newRow.insertCell(2).innerHTML = formatarDataHora(item.data_hora);
            newRow.insertCell(3).innerHTML = item.tipo_sanguineo;
            newRow.insertCell(4).innerHTML = item.fator_rh;
            newRow.insertCell(5).innerHTML = item.unidade;
            
            if (item.status == "disponivel") {
                item.status = "Disponível";
            }
            newRow.insertCell(6).innerHTML = item.status;
            newRow.insertCell(7).innerHTML = item.origem;
            newRow.insertCell(8).innerHTML = item.destino;
            // newRow.insertCell(7).innerHTML = item.peso_ap

             // Cria um elemento de célula para os botões
             const buttonCell = newRow.insertCell(9);

             // Cria o botão de excluir registro
             const deleteButton = document.createElement('button');
             deleteButton.className = 'btn btn-danger btn-xs';
             deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
             deleteButton.addEventListener('click', function() {
                 exibirAlertaConfirmacao(item.id);
             });
 
             // Cria o botão de atualizar registro
             const updateButton = document.createElement('button');
             updateButton.className = 'btn btn-primary btn-xs';
             updateButton.innerHTML = '<i class="fa fa-pencil"></i>';
             updateButton.addEventListener('click', function() {
                    // Redireciona para a página hemocentro_add.js passando o ID do registro
                    window.location.href = `add_movimentacao.html?id=${item.id}`;
             });
 
             // Adiciona os botões à célula
             buttonCell.appendChild(deleteButton);
             buttonCell.appendChild(updateButton);

        }
        });
    }


    
    // Função para formatar a data e hora
    function formatarDataHora(dataHora) {
        // Cria um objeto Date a partir da string de data e hora
        const dt = new Date(dataHora);
        
        // Formata a data no formato dd/mm/aaaa
        const dataFormatada = dt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // Formata a hora no formato hh:mm
        const horaFormatada = dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        // Retorna a data e hora formatadas
        return `${dataFormatada} ${horaFormatada}`;
    }


    // Função para excluir registro
    function excluirRegistro(id) {
        coletaService.excluirRegistro(id)
            .then(() => {
                alert("Registro excluído com sucesso");
                carregarRegistros();
            })
            .catch(error => {
                console.error('Erro ao excluir registro:', error);
            });
    }

    // Função para exibir o alerta de confirmação
    function exibirAlertaConfirmacao(idRegistro) {
        if (confirm("Tem certeza que deseja excluir o registro?")) {
            excluirRegistro(idRegistro);
        }
    }

    // Chama a função para carregar os dados quando a página carregar
    carregarRegistros();
});
