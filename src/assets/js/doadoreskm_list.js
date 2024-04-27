import doadorService from '../../service/doadorService.js';
import hemocentroService from '../../service/hemocentroService.js';

document.addEventListener('DOMContentLoaded', function() {
    const tabela = document.getElementById('example4').getElementsByTagName('tbody')[0];
    let latitude = null;
    let longitude = null;

    // Função para carregar registros
    function carregarRegistros(latitude,longitude,distancia) {
        // Chamar a função do service para obter registros
        doadorService.getDoadoresKm(latitude, longitude, distancia)
            .then(registros => {
                carregarDados(registros);
            })
            .catch(error => {
                console.error('Erro ao carregar registros:', error);
                alert('Erro ao carregar registros.');
            });
    }


    // Adicionar evento de clique para o botão de busca de endereço
    btn_enviar.addEventListener('click', function() {
        
        // const latitude = document.getElementById('hemocentro').latitude;
        // const longitude = document.getElementById('hemocentro').longitude;
        const distancia = document.getElementById('distancia').value;

        //console.log(latitude, longitude, distancia);
        
        carregarRegistros(latitude, longitude, distancia);
    });

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


        });
    }


    //Busca Hemocentros e preenche o combo de hemocentros
    // Se houver um ID na URL, estamos atualizando o registro
    hemocentroService.getRegistros()
    .then(registro => {
        // Preencher o formulário com os dados do registro
        preencheHemocentros(registro);
        console.log(registro);
    })
    .catch(error => {
        console.error('Erro ao buscar registro:', error);
    });

    // Função para carregar os dados no select de Hemocentros
    function preencheHemocentros(data) {
        var selectElement = document.getElementById('hemocentro');

        // Limpa as opções existentes
        selectElement.innerHTML = '<option value="">Selecione...</option>';

        // Adiciona uma opção para cada item nos dados
        data.forEach(function(hemocentro) {
            var option = document.createElement('option');
            option.textContent = hemocentro.sigla;
            option.value = hemocentro.id;
            option.dataset.latitude = hemocentro.latitude; // Armazena a latitude no atributo de dados do elemento option
            option.dataset.longitude = hemocentro.longitude; // Armazena a latitude no atributo de dados do elemento option
            selectElement.appendChild(option);
        });

         // Adiciona um ouvinte de evento para capturar a alteração de seleção
        selectElement.addEventListener('change', function() {
            latitude = selectElement.options[selectElement.selectedIndex].dataset.latitude;
            longitude = selectElement.options[selectElement.selectedIndex].dataset.longitude;
            console.log("Latitude selecionada:", latitude);
            console.log("Longitude selecionada:", longitude);
    });
        
    }

    // Chama a função para carregar os dados quando a página carregar
    //carregarRegistros();
});
