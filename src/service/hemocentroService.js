import api from '../api/hemocentroAPi.js'; // Importar o módulo API

const hemocentroService = {
    getRegistro: api.getRegistro,
    getRegistros: api.getRegistros,
    getEstatisticas: api.getEstatisticas,
    adicionarRegistro: api.adicionarRegistro,
    atualizarRegistro: api.atualizarRegistro,
    excluirRegistro: api.excluirRegistro
};

// Exportar o módulo hemocentroService para uso em outros arquivos
export default hemocentroService;
