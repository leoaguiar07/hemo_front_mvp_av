import doadorService from '../../service/doadorService.js';

document.addEventListener('DOMContentLoaded', function() {
    const tabela = document.getElementById('example4').getElementsByTagName('tbody')[0];

    // Função para carregar registros
    function carregarRegistros() {
        // Chamar a função do service para obter registros
        doadorService.getRegistros()
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
            const newRow = tabela.insertRow(tabela.rows.length);
            newRow.insertCell(0).innerHTML = item.id;
            newRow.insertCell(1).innerHTML = item.cpf;
            newRow.insertCell(2).innerHTML = item.nome;
            newRow.insertCell(3).innerHTML = item.uf;
            newRow.insertCell(4).innerHTML = item.nascimento;
            newRow.insertCell(5).innerHTML = item.tipo_sanguineo;
            newRow.insertCell(6).innerHTML = item.fator_rh;
            newRow.insertCell(7).innerHTML = item.peso_aproximado;
            newRow.insertCell(8).innerHTML = item.ultima_doacao;
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
                    window.location.href = `add_doador.html?id=${item.id}`;
             });
             
             // Cria o botão de adicionar coleta
             const coletaButton = document.createElement('button');
             coletaButton.className = 'btn btn-warning btn-xs';
             coletaButton.innerHTML = '<i class="fa fa-plus-square"></i>';
             coletaButton.addEventListener('click', function() {
                    // Redireciona para a página hemocentro_add.js passando o ID do registro
                    window.location.href = `add_coleta.html?id=${item.id}`;
             });
 
             // Adiciona os botões à célula
             buttonCell.appendChild(deleteButton);
             buttonCell.appendChild(updateButton);
             buttonCell.appendChild(coletaButton);
        });
    }

    // Função para excluir registro
    function excluirRegistro(id) {
        doadorService.excluirRegistro(id)
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
