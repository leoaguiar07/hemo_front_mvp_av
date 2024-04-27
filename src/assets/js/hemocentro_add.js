import hemocentroService from '../../service/hemocentroService.js';
import { removerCaracteresEspeciais } from '../../utils/util.js';
import { buscarEndereco_CEPApi } from '../../utils/util.js';


document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('form_hemocentro');
    const btnBuscaEndereco = document.getElementById('btn_buscaEndereco');

    // Função para preencher o formulário com os dados do registro a ser atualizado
    function preencherFormulario(registro) {
        document.getElementById('id_registro').value = registro.id;
        document.getElementById('nome').value = registro.nome;
        document.getElementById('sigla').value = registro.sigla;
        document.getElementById('cep').value = registro.cep;
        document.getElementById('logradouro').value = registro.logradouro;
        document.getElementById('bairro').value = registro.bairro;
        document.getElementById('numero').value = registro.numero;
        document.getElementById('complemento').value = registro.complemento;
        document.getElementById('localidade').value = registro.localidade;
        document.getElementById('uf').value = registro.uf;
        document.getElementById('email').value = registro.email;
        document.getElementById('telefone').value = registro.telefone;
        document.getElementById('obs').value = registro.obs;
    }

    // Adicionar evento de clique para o botão de busca de endereço
    btnBuscaEndereco.addEventListener('click', function() {
        const cep = document.getElementById('cep').value;
        buscarEndereco_CEPApi(cep);
    });

    // Verifica se há um ID na URL
    const params = new URLSearchParams(window.location.search);
    const idRegistro = params.get('id');

    if (idRegistro) {
        // Se houver um ID na URL, estamos atualizando o registro
        hemocentroService.getRegistro(idRegistro)
            .then(registro => {
                // Preencher o formulário com os dados do registro
                preencherFormulario(registro);
            })
            .catch(error => {
                console.error('Erro ao buscar registro:', error);
            });
    }

    // Evento de submissão do formulário
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const sigla = document.getElementById('sigla').value;
        const cep = removerCaracteresEspeciais(document.getElementById('cep').value);
        const logradouro = document.getElementById('logradouro').value;
        const bairro = document.getElementById('bairro').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const localidade = document.getElementById('localidade').value;
        const uf = document.getElementById('uf').value;
        const email = document.getElementById('email').value;
        const telefone = removerCaracteresEspeciais(document.getElementById('telefone').value);
        const obs = document.getElementById('obs').value;
        const estoque_atual = 0;
        const estoque_ideal = 0;
        
        const data = { id: idRegistro, nome, sigla, cep, logradouro, bairro, numero, complemento, localidade, uf, email, telefone, obs, estoque_atual, estoque_ideal };
        console.log(data);
        if (idRegistro) {
            // Se tiver um ID, estamos atualizando o registro
            hemocentroService.atualizarRegistro(idRegistro, data)
                .then(() => {
                    alert('Registro atualizado com sucesso.');
                    registroForm.reset();
                })
                .catch(error => {
                    console.error('Erro ao atualizar registro:', error);
                });
        } else {
            // Se não tiver um ID, estamos adicionando um novo registro
            hemocentroService.adicionarRegistro(data)
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
