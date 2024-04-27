import doadorService from '../../service/doadorService.js';
import hemocentroService from '../../service/hemocentroService.js';
import coletaService from '../../service/coletaService.js';

import { formatDecimal } from '../../utils/util.js';


function getDataFromAPI_Coletas() {

  //Busca Hemocentros e preenche o combo de hemocentros
  coletaService.getEstatisticas()
  .then(registro => {
      // Preencher o formulário com os dados do registro
      displayStatsColetas(registro);
  })
  .catch(error => {
      console.error('Erro ao buscar registro:', error);
  });
}

function getDataFromAPI_Hemocentros() {

  //Busca Hemocentros e preenche o combo de hemocentros
  hemocentroService.getEstatisticas()
  .then(registro => {
      // Preencher o formulário com os dados do registro
      displayStatsHemocentros(registro);
  })
  .catch(error => {
      console.error('Erro ao buscar registro:', error);
  });
}

function getDataFromAPI_Doadores() {

      //Busca Hemocentros e preenche o combo de hemocentros
      doadorService.getEstatisticas()
      .then(registro => {
          // Preencher o formulário com os dados do registro
          displayStatsDoadores(registro);
      })
      .catch(error => {
          console.error('Erro ao buscar registro:', error);
      });
  }


// Função para exibir dados Coletas
function displayStatsColetas(data) {
    //var campoEspecificoDiv = document.getElementById('doacoes_hoje');
    document.getElementById('doacoes_hoje').textContent = data.total_doacoes_hoje + " doações";
    //document.getElementById('sangue_hoje').textContent = data.total_sangue_ml_hoje/1000 + " litros";
    document.getElementById('sangue_hoje').textContent = data.total_sangue_un_hoje + " unidades";
    document.getElementById('media_diaria_mes_passado').textContent = "média(dia) mês passado " + formatDecimal(data.media_diaria_un_mes_passado);
    
    const perc_media_diaria = (data.total_sangue_un_hoje/data.media_diaria_un_mes_passado)

      // Seleciona a div pelo ID
      var progress_un_doadas = document.getElementById("progress_un_doadas");

      //perc_media_diaria = 0.1
      if (perc_media_diaria < 1) {
      progress_un_doadas.innerHTML = `
        <div class="progress-bar bg-danger" style="width: ${perc_media_diaria*100}%"></div>
     `} else {
        progress_un_doadas.innerHTML = `
        <div class="progress-bar bg-success" style="width: 100%"></div>
        `
     }

}

// Função para exibir dados Hemocentros
function displayStatsHemocentros(data) {
    //var campoEspecificoDiv = document.getElementById('doacoes_hoje');
    //total_hemocentros = data.total_hemocentros;
    //document.getElementById('total_hemocentros').textContent = total_hemocentros + " hemocentros";
    
    const perc_estoque = formatDecimal((data.estoque_atual_unidades*100)/data.estoque_ideal_unidades);
    document.getElementById('sangue_atual_ideal').textContent = perc_estoque;


    // Seleciona a div pelo ID
    var div_estoque_sangue = document.getElementById("estoque_sangue");


    //perc_estoque = 52
    if (perc_estoque <=50) {
     // Altera o HTML da div com base na condição 
     div_estoque_sangue.innerHTML = `
  
     <span class="info-box-icon push-bottom bg-danger"><i class="material-icons">invert_colors</i></span>
     <div class="info-box-content">
       <span class="info-box-text">Estoque de sangue</span>
       <span class="info-box-number" >${perc_estoque} % &emsp; (${data.estoque_atual_unidades} un.)</span>
       <div class="progress">
         <div class="progress-bar bg-danger" style="width: ${perc_estoque}%"></div>
       </div>
       <span class="progress-description text-danger">
             ${100-perc_estoque}% - que o estoque ideal
           </span>
     </div>
     <!-- /.info-box-content -->
   </div>
   <!-- /.info-box -->
 `
			            
    } else if (perc_estoque > 50 && perc_estoque < 100 ) {
        div_estoque_sangue.innerHTML = `
  
        <span class="info-box-icon push-bottom bg-danger"><i class="material-icons">invert_colors</i></span>
        <div class="info-box-content">
          <span class="info-box-text">Estoque de sangue</span>
          <span class="info-box-number" >${perc_estoque} %&emsp;<span class="info-box-desc">(${data.estoque_atual_unidades} un.)</span></span>
          <div class="progress">
            <div class="progress-bar bg-warning" style="width: ${perc_estoque}%"></div>
          </div>
          <span class="progress-description text-warning">
                ${100-perc_estoque}% - que o estoque ideal
              </span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    `
    }  else {
        div_estoque_sangue.innerHTML = `
  
        <span class="info-box-icon push-bottom bg-danger"><i class="material-icons">invert_colors</i></span>
        <div class="info-box-content">
          <span class="info-box-text">Estoque de sangue</span>
          <span class="info-box-number" >${perc_estoque*100} % &emsp; <span class="info-box-desc">(${data.estoque_atual_unidades} un.)</span></span>
          <div class="progress">
            <div class="progress-bar bg-success" style="width: ${perc_estoque*100}%"></div>
          </div>
          <span class="progress-description txt-success">
          ${perc_estoque*100}% + que o estoque ideal
              </span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    `
    }


}

// Função para exibir dados Doadores
function displayStatsDoadores(data) {
    const total_doadores = data.total_doadores;
    const total_doadores_mes_atual = data.total_doadores_mes_atual;
    //console.log(total_doadores_mes_atual)
    const total_doadores_mes_passado = data.total_doadores_mes_passado;
    const doadores_em_coleta = data.total_doadores_em_coleta
    //console.log(total_doadores_mes_passado)
    let perc_doadores_meses = formatDecimal(parseInt(total_doadores_mes_atual)/parseInt(total_doadores_mes_passado));
    let perc_cadastrados_em_coletas = (doadores_em_coleta/total_doadores)*100
    console.log(perc_cadastrados_em_coletas)
    //perc_doadores_meses = formatDecimal(1/8);
    document.getElementById('total_doadores').textContent = total_doadores+ " doadores";
  
        
    // Seleciona a div pelo ID
    var div_progress_doadores = document.getElementById("progress_doadores");

    //perc_doadores_meses = 0.6
    if (perc_doadores_meses > 1) {
        perc_doadores_meses = perc_doadores_meses*100
    // Altera o HTML da div com base na condição 
    div_progress_doadores.innerHTML = `
    <span class="info-box-icon push-bottom bg-info"><i class="material-icons">people</i></span>
    <div class="info-box-content">
      <span class="info-box-text">Doadores cadastrados</span>
      <span class="info-box-number">${total_doadores} doadores</span>
      <div class="progress" id="progress_doadores">
        <div class="progress-bar bg-info" style="width: ${perc_cadastrados_em_coletas}%"></div>
      </div>
      <span class="progress-description text-success">
            ${perc_cadastrados_em_coletas}% são doadores.
          </span>
    </div>
    <!-- /.info-box-content -->
    `
    } else {
        perc_doadores_meses = (100-(perc_doadores_meses*100))
        // Altera o HTML da div com base na condição 
    div_progress_doadores.innerHTML = `
    <span class="info-box-icon push-bottom bg-info"><i class="material-icons">people</i></span>
    <div class="info-box-content">
      <span class="info-box-text">Doadores cadastrados</span>
      <span class="info-box-number">${total_doadores} doadores</span>
      <div class="progress" id="progress_doadores">
        <div class="progress-bar bg-info" style="width: -${perc_cadastrados_em_coletas}%"></div>
      </div>
      <span class="progress-description text-danger">
            ${perc_cadastrados_em_coletas}% - são doadores.
          </span>
    </div>
    <!-- /.info-box-content -->
    `
    }

}


function getDataHome(){
  
    //recuperaToken();
    getDataFromAPI_Coletas()
    getDataFromAPI_Hemocentros()
    getDataFromAPI_Doadores()
}


// Chama a função para obter dados para HOME quando a página carrega
window.addEventListener('load', getDataHome);
