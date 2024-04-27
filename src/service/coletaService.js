import api from '../api/coletaApi.js'; // Importar o módulo API

const coletaService = {
    getRegistro: api.getRegistro,
    getRegistros: api.getRegistros,
    getEstatisticas: api.getEstatisticas,
    adicionarRegistro: api.adicionarRegistro,
    atualizarRegistro: api.atualizarRegistro,
    excluirRegistro: api.excluirRegistro
};

// Exportar o módulo coletaService para uso em outros arquivos
export default coletaService;
