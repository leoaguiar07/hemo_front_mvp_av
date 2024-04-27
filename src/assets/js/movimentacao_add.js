import hemocentroService from '../../service/hemocentroService.js';
import coletaService from '../../service/coletaService.js';


document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('form_coleta');

    // Função para carregar os dados nos selects de Hemocentro
    function carregarHemocentros(data) {
    const selects = document.querySelectorAll('.select-hemocentro');

    selects.forEach(select => {
        // Limpa as opções existentes
        select.innerHTML = '<option value="">Selecione...</option>';

        // Adiciona uma opção para cada item nos dados
        data.forEach(function(hemocentro) {
            const option = document.createElement('option');
            option.textContent = hemocentro.sigla;
            option.value = hemocentro.id;
            select.appendChild(option);
        });
    });
}


    // Seleciona os elementos <select>
    var selectstatus = document.getElementById('status_');
    var div_origem = document.getElementById('div_origem');
    var div_destino = document.getElementById('div_destino');

    // Adiciona um ouvinte de evento ao select1
    selectstatus.addEventListener('change', function() {
        // Verifica se a opção selecionada no select1 é "opcao1"
        if (selectstatus.value === 'recebido') {
            // Se for "recebido", mostra origem/oculta destino
            div_origem.style.display = 'block';
            div_destino.style.display = 'none';
        } else {
            // Caso contrário, mostra destino/oculta origem
            div_origem.style.display = 'none';
            div_destino.style.display = 'block';
        }
    });

    // Função para preencher o formulário com os dados do registro a ser atualizado
    function preencherFormulario(registro) {
        console.log(registro);
        document.getElementById('id_registro').value = registro.id;

        document.getElementById('hemocentro').value  = registro.hemocentro;
        document.getElementById('status_').value = registro.status;
        document.getElementById('origem').selectedIndex = parseInt(registro.origem);
        document.getElementById('destino').selectedIndex = parseInt(registro.destino);
        document.getElementById('tipo_sanguineo').value = registro.tipo_sanguineo;
        document.getElementById('rh').value = registro.fator_rh;
        document.getElementById('unidade').value = registro.unidade;
        document.getElementById('obs').value = registro.obs;
        
        //origem.selectedIndex = 0;
        // if (registro.origem === "") {
        //     div_origem.style.display = 'none';
        //     div_destino.style.display = 'block';
        // } else {
        //     div_origem.style.display = 'block';
        //     div_destino.style.display = 'block';
        // }

    }


    
    // Verifica se há um ID na URL
    const params = new URLSearchParams(window.location.search);
    const idRegistro = params.get('id');
    console.log(idRegistro);
    // Carregar os hemocentros no formulário
    hemocentroService.getRegistros()
        .then(registros => {
            carregarHemocentros(registros);
            // Verifica se há um ID na URL
            if (idRegistro) {
                // Se houver um ID na URL, estamos atualizando o registro
                coletaService.getRegistro(idRegistro)
                    .then(registro => {
                        // Preencher o formulário com os dados do registro
                        preencherFormulario(registro);
                    })
                    .catch(error => {
                        console.error('Erro ao buscar registro:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar hemocentros:', error);
        });


    // Carregar os hemocentros no formulário
    hemocentroService.getRegistros()
        .then(registros => {
            carregarHemocentros(registros);
        })
        .catch(error => {
            console.error('Erro ao carregar hemocentros:', error);
        });

    // Evento de submissão do formulário
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter a data e hora atual
        const dataHoraAtual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:MM:SS

        const origem_tipo = 'movimentacao';
        const hemocentro = document.getElementById('hemocentro').value;
        const status = document.getElementById('status_').value;
        let origem = document.getElementById('origem').value;
        let destino = document.getElementById('destino').value;
        
        if (status == "recebido"){
            destino = "";        
        } else{
            origem = "";
        }
        const tipo_sanguineo = document.getElementById('tipo_sanguineo').value;
        const fator_rh = document.getElementById('rh').value;
        const unidade = document.getElementById('unidade').value;
        const obs = document.getElementById('obs').value;
        const data_hora = dataHoraAtual;
        // Calcula quantidade
        const quantidade = parseFloat(unidade * 450);

        const data = { origem_tipo, hemocentro, status, origem, destino, tipo_sanguineo, fator_rh, unidade, obs, data_hora, quantidade};
        

        // Verifica se há um ID na URL
        const params = new URLSearchParams(window.location.search);
        const idRegistro = params.get('id');
        console.log(idRegistro)

        if (idRegistro) {
            // Se tiver um ID, estamos atualizando o registro
            coletaService.atualizarRegistro(idRegistro, data)
                .then(() => {
                    alert('Registro atualizado com sucesso.');
                    registroForm.reset();
                })
                .catch(error => {
                    console.error('Erro ao atualizar registro:', error);
                });
        } else {
            // Se não tiver um ID, estamos adicionando um novo registro
            coletaService.adicionarRegistro(data)
                .then(() => {
                    alert('Dados enviados com sucesso.');
                    registroForm.reset();
                })
                .catch(error => {
                    console.error('Erro ao adicionar registro:', error);
                });
        }
    });
});
