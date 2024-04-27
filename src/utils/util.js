// export function buscarEndereco(cep) {
//     //var cep = document.getElementById('cep').value;
//     cep = removerCaracteresEspeciais(cep)
    
//     // Verifica se o CEP foi preenchido corretamente
//     if (cep.length !== 8) {
//         alert('Por favor, insira um CEP válido com 8 dígitos.');
//         return;
//     }

//     // Faz a requisição para a API dos Correios
//     fetch('https://viacep.com.br/ws/' + cep  + '/json/')
//         .then(response => response.json())
//         .then(data => {
//             // Preenche os campos do formulário com os dados do endereço
//             document.getElementById('logradouro').value = data.logradouro;
//             document.getElementById('bairro').value = data.bairro;
//             document.getElementById('localidade').value = data.localidade;
//             document.getElementById('uf').value = data.uf;
//         })
//         .catch(error => {
//             alert('Erro ao buscar endereço: ' + error);
//         });
// }

export function buscarEndereco_CEPApi(cep) {
    //var cep = document.getElementById('cep').value;
    cep = removerCaracteresEspeciais(cep)
    
    // Verifica se o CEP foi preenchido corretamente
    if (cep.length !== 8) {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
        return;
    }

    
    // Faz a requisição para a API dos Correios
    fetch('http://localhost:5000/consulta-cep?cep=' + cep)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Preenche os campos do formulário com os dados do endereço
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('localidade').value = data.localidade;
            document.getElementById('uf').value = data.uf;
        })
        .catch(error => {
            alert('Erro ao buscar endereço: ' + error);
        });

}
export function removerCaracteresEspeciais(texto) {
    // Define a expressão regular para caracteres especiais
    const regex = /[^a-zA-Z0-9]/g;
    // Remove os caracteres especiais da string usando a expressão regular
    return texto.replace(regex, '');
}

export function formatDecimal(numero) {
    return numero.toFixed(2);
}