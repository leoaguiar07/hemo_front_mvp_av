import doadorService from '../../service/doadorService.js';
import { removerCaracteresEspeciais } from '../../utils/util.js';
import { buscarEndereco_CEPApi } from '../../utils/util.js';

document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('form_doador');
    const btnBuscaEndereco = document.getElementById('btn_buscaEndereco');

    // Função para preencher o formulário com os dados do registro a ser atualizado
    function preencherFormulario(registro) {
        
        document.getElementById('id_registro').value = registro.id;
        document.getElementById('nome').value = registro.nome;
        document.getElementById('cpf').value = registro.cpf;
        document.getElementById('cep').value = registro.cep;
        document.getElementById('logradouro').value = registro.logradouro;
        document.getElementById('bairro').value = registro.bairro;
        document.getElementById('numero').value = registro.numero;
        document.getElementById('complemento').value= registro.complemento;
        document.getElementById('localidade').value = registro.localidade;
        document.getElementById('uf').value = registro.uf;
        document.getElementById('email').value = registro.email;
        document.getElementById('telefone').value = registro.telefone;
        document.getElementById('nascimento').value = registro.nascimento;
        document.getElementById('tipo_sanguineo').value = registro.tipo_sanguineo;
        document.getElementById('fator_rh').value = registro.fator_rh;
        document.getElementById('peso_aproximado').value = registro.peso_aproximado; 
        document.getElementById('ultima_doacao').value = registro.ultima_doacao;
        document.getElementById('login').value = registro.login;
        document.getElementById('senha').value = registro.senha;
        document.getElementById('obs').value = registro.obs;
    }

    // Adicionar evento de clique para o botão de busca de endereço
    btnBuscaEndereco.addEventListener('click', function() {
        const cep = document.getElementById('cep').value;
        //buscarEndereco(cep);
        buscarEndereco_CEPApi(cep);
    });

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

    // Evento de submissão do formulário
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const cep = removerCaracteresEspeciais(document.getElementById('cep').value);
        const logradouro = document.getElementById('logradouro').value;
        const bairro = document.getElementById('bairro').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const localidade = document.getElementById('localidade').value;
        const uf = document.getElementById('uf').value;
        const email = document.getElementById('email').value;
        const telefone = removerCaracteresEspeciais(document.getElementById('telefone').value);
        const nascimento = document.getElementById('nascimento').value;
        const tipo_sanguineo = document.getElementById('tipo_sanguineo').value;   
        const fator_rh = document.getElementById('fator_rh').value;  
        const peso_aproximado = document.getElementById('peso_aproximado').value.replace(" kg","").replace(",",".");   
        const ultima_doacao = document.getElementById('ultima_doacao').value;
        const login = document.getElementById('login').value;
        const senha = document.getElementById('senha').value;   
        const obs = document.getElementById('obs').value;
    
        
        
        const data = { id: idRegistro, nome, cpf, cep, logradouro, bairro, numero, complemento, localidade, uf, email, telefone, nascimento, tipo_sanguineo, fator_rh, peso_aproximado, ultima_doacao, login, senha, obs };
        console.log(data);
        if (idRegistro) {
            // Se tiver um ID, estamos atualizando o registro
            doadorService.atualizarRegistro(idRegistro, data)
                .then(() => {
                    alert('Registro atualizado com sucesso.');
                    registroForm.reset();
                })
                .catch(error => {
                    console.error('Erro ao atualizar registro:', error);
                });
        } else {
            // Se não tiver um ID, estamos adicionando um novo registro
            doadorService.adicionarRegistro(data)
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
