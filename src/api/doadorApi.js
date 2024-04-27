const API_URL = 'http://localhost:8000/api/v1'; // URL API

const hemocentroApi = {
    // Função para fazer solicitação GET para obter registros
    getRegistros: async function() {
        const response = await fetch(`${API_URL}/doadores/`);
        if (!response.ok) {
            throw new Error('Erro ao obter registros da API');
        }
        return await response.json();
    },
    
     getEstatisticas: async function() {
        const response = await fetch(`${API_URL}/doadores_estatisticas/`);
        if (!response.ok) {
            throw new Error('Erro ao obter registros da API');
        }
        return await response.json()
    },

     // Função para fazer solicitação GET para obter um registro específico pelo ID
     getRegistro: async function(id) {
        const response = await fetch(`${API_URL}/doadores/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao obter registro da API');
        }
        return await response.json();
    },


    

   // Função para fazer solicitação POST para adicionar novo registro
   adicionarRegistro: async function(data) {
    const response = await fetch(`${API_URL}/doadores/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
                     // Se a resposta não estiver ok (status diferente de 200), tratamos como erro
                     return response.json().then(errorData => {
                        // Mapear erros específicos para mensagens amigáveis
                        let errorMessage = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';
                        if (errorData && errorData.cpf && errorData.cpf.length > 0) {
                            //errorMessage = errorData.cpf[0];
                            if (errorData.cpf[0] == "doador with this cpf already exists."){
                                errorMessage = "Já existe um doador cadastrado com o cpf informado.";
                                alert(errorMessage);
                            }
                        } else if (errorData && errorData.sigla && errorData.sigla.length > 0) {
                            //errorMessage = errorData.cpf[0];
                            if (errorData.sigla[0] == "hemocentro with this sigla already exists."){
                                errorMessage = "Já existe um hemocentro cadastrado com a sigla informada.";
                                alert(errorMessage);
                            }
                        }
                
                        // Lançar uma exceção com a mensagem de erro para fins de tratamento posterior
                        throw new Error(errorMessage);
                    });
        
                    
                }
    return await response.json();
},

    
    // Função para fazer solicitação PUT para atualizar um registro existente
    atualizarRegistro: async function(id, data) {

        const response = await fetch(`${API_URL}/doadores/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar registro na API');
        }
        return await response.json();
    },

    // Função para fazer solicitação DELETE para excluir um registro existente
    excluirRegistro: async function(id) {
        const response = await fetch(`${API_URL}/doadores/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir registro na API');
        }
        //return await response.json(); // Se desejar receber alguma resposta da API após a exclusão
    },

    
    // Função para fazer solicitação GET para obter um registro específico pelo ID
    getDoadoresKm: async function(latitude, longitude, distancia) {
        const response = await fetch(`${API_URL}/doadores_proximos/${latitude}/${longitude}/${distancia}`);
        if (!response.ok) {
            throw new Error('Erro ao obter registro da API');
        }
        return await response.json();
    },

};

// Exportar o módulo API para uso em outros arquivos
export default hemocentroApi;
