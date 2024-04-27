import hemocentroService from '../../service/hemocentroService.js';

document.addEventListener('DOMContentLoaded', function() {
    const tabela = document.getElementById('example4').getElementsByTagName('tbody')[0];

    // Função para carregar registros
    function carregarRegistros() {
        // Chamar a função do service para obter registros
        hemocentroService.getRegistros()
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
            newRow.insertCell(1).innerHTML = item.sigla;
            newRow.insertCell(2).innerHTML = item.cep;
            newRow.insertCell(3).innerHTML = item.logradouro;
            newRow.insertCell(4).innerHTML = item.numero;
            newRow.insertCell(5).innerHTML = item.bairro;
            newRow.insertCell(6).innerHTML = item.localidade;
            newRow.insertCell(7).innerHTML = item.uf;
            newRow.insertCell(8).innerHTML = item.telefone;
            newRow.insertCell(9).innerHTML = item.estoque_atual;
            newRow.insertCell(10).innerHTML = item.estoque_ideal;

             // Cria um elemento de célula para os botões
             const buttonCell = newRow.insertCell(11);

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
                    window.location.href = `add_hemocentro.html?id=${item.id}`;
             });
 
             // Adiciona os botões à célula
             buttonCell.appendChild(deleteButton);
             buttonCell.appendChild(updateButton);
        });
    }

    // Função para excluir registro
    function excluirRegistro(id) {
        hemocentroService.excluirRegistro(id)
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
