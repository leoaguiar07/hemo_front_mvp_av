import api from '../api/doadorApi.js'; // Importar o módulo API

const doadorService = {
    getRegistro: api.getRegistro,
    getRegistros: api.getRegistros,
    getEstatisticas: api.getEstatisticas,
    adicionarRegistro: api.adicionarRegistro,
    atualizarRegistro: api.atualizarRegistro,
    excluirRegistro: api.excluirRegistro,
    getDoadoresKm: api.getDoadoresKm
};

// Exportar o módulo doadorService para uso em outros arquivos
export default doadorService;
