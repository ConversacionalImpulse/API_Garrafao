import { getFormattedDate } from "../services/CreateDataAtual.js"
import dotenv from "dotenv";
dotenv.config();

export async function createCardOportunidade (companyId, name, mensagem, garrafao_pp_20l ,garrafao_20l_azul, garrafao_10l, tampa, tampa_pet, idForm) {
    const pipeIdOportunidade = "302927684"
    const phaseIdOportunidade = "318137273"
    const etiquetaId = "308171890"
    const dataAtual = getFormattedDate()
    
    const novoCardOportunidade = await fetch('https://api.pipefy.com/graphql',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.AUTH_PIPEFY
            },
            body: JSON.stringify({
                          "query": `mutation{ createCard (input: {pipe_id:${pipeIdOportunidade}  phase_id:${phaseIdOportunidade}  fields_attributes: [
                              {field_id: "oportunidade", field_value: "${name} - ${dataAtual}"},
                              {field_id: "empresa_destino_1", field_value: "${etiquetaId}"}, 
                              {field_id: "origem", field_value: "Formulário Garrafão Brasil"}, 
                              {field_id: "registro_do_formul_rio", field_value: "${idForm}"}, 
                              {field_id: "empresa", field_value: "${companyId}"},
                              {field_id: "mensagem", field_value: "${mensagem}"},
                              {field_id: "produtos_garraf_o", field_value: ["Garrafão PP 20L", "Garrafão PET 20L","Garrafão PP 10L","Tampa 20L","Tampa PCO 1881"]},
                              {field_id: "quantidade_garraf_o_pet_20l", field_value: "${garrafao_20l_azul}"},
                              {field_id: "quantidade_garraf_o_prime_20l", field_value: "${garrafao_pp_20l}"},
                              {field_id: "quantidade_garraf_o_pp_10l", field_value: "${garrafao_10l}"},
                              {field_id: "quantidade_tampa_20l", field_value: "${tampa}"},
                              {field_id: "quantidade_tampa_pco_1881", field_value: "${tampa_pet}"}
                            ]
                              }) 
                              { card {id title }}}`
            })
    });

    const novoCardOportunidadeJSON = novoCardOportunidade.json()

    console.log (novoCardOportunidade)
    
    return
}

