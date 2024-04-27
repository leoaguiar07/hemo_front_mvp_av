import coletaService from '../../service/coletaService.js';
import hemocentroService from '../../service/hemocentroService.js';
import doadorService from '../../service/doadorService.js';


document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('form_coleta');
    const btnBuscaEndereco = document.getElementById('btn_buscaEndereco');

    // Função para preencher o formulário com os dados do registro a ser atualizado
    function preencherFormulario(registro) {
    document.getElementById('cpf').value = registro.cpf;
    document.getElementById('nome').value = registro.nome;
    //document.getElementById('hemocentro').value = data.hemocentro;
    document.getElementById('tipo').value = registro.tipo_sanguineo;
    document.getElementById('rh').value = registro.fator_rh;
    //document.getElementById('obs').value = data.;
    }

    // Verifica se há um ID na URL
    const params = new URLSearchParams(window.location.search);
    const idRegistro = params.get('id');

    if (idRegistro) {
        // Se houver um ID na URL, estamos atualizando o registro
        doadorService.getRegistro(idRegistro)
            .then(registro => {
                // Preencher o formulário com os dados do registro
                preencherFormulario(registro);
            })
            .catch(error => {
                console.error('Erro ao buscar registro:', error);
            });
    }

    //Busca Hemocentros e preenche o combo de hemocentros
    // Se houver um ID na URL, estamos atualizando o registro
    hemocentroService.getRegistros()
    .then(registro => {
        // Preencher o formulário com os dados do registro
        preencheHemocentros(registro);
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
            selectElement.appendChild(option);
        });
    }


    // Evento de submissão do formulário
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();
     
        
        // Obter a data e hora atual
        const dataHoraAtual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:MM:SS
        //console.log(dataHoraAtual);
        // Obtém os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const hemocentro = document.getElementById('hemocentro').value;
        const tipo_sanguineo = document.getElementById('tipo').value;
        const fator_rh = document.getElementById('rh').value;
        const obs = document.getElementById('obs').value;
        const data_hora = dataHoraAtual;
        const origem_tipo = 'coleta';
        const quantidade = 450;
        const status = 'disponivel';
        const unidade = 1;
        
        const data = {nome, cpf, hemocentro, tipo_sanguineo, fator_rh, obs, data_hora, origem_tipo, quantidade, status, unidade };
        console.log(data);
        // if (idRegistro) {
        //     // Se tiver um ID, estamos atualizando o registro
        //     coletaService.atualizarRegistro(idRegistro, data)
        //         .then(() => {
        //             alert('Registro atualizado com sucesso.');
        //             registroForm.reset();
        //         })
        //         .catch(error => {
        //             console.error('Erro ao atualizar registro:', error);
        //         });
        // } else {
            // Se não tiver um ID, estamos adicionando um novo registro
            coletaService.adicionarRegistro(data)
                .then(() => {
                    alert('Dados enviados com sucesso.');
                    registroForm.reset();
                })
                .catch(error => {
                    console.error('Erro ao adicionar registro:', error);
                });
        
    });
});
