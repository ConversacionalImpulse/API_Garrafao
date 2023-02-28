import dotenv from "dotenv";
dotenv.config();

export async function createCardEmpresa (empresa, cnpj, newCEP, cidade, contatoId){

    const pipeIdEmpresa = "302927698";
    const phaseIdEmpresa = "318137351";
    const empresaNome = empresa.toUpperCase()
    
    try{
        const novoCardEmpresa = await fetch('https://api.pipefy.com/graphql',{
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': process.env.AUTH_PIPEFY
                        },
                        body: JSON.stringify({
                              "query": `mutation{ createCard (input: {pipe_id:${pipeIdEmpresa}  phase_id:${phaseIdEmpresa}  fields_attributes: [
                                  {field_id: "empresa", field_value: "${empresaNome}"},
                                  {field_id: "contatos", field_value: "${contatoId}"},
                                  {field_id: "cnpj", field_value: "${cnpj}"}, 
                                  {field_id: "cep", field_value: "${newCEP}"},
                                  {field_id: "cidade", field_value: "${cidade}"},
                                  {field_id: "tipo_de_empresa", field_value: "outros"},
                                  {field_id: "observa_es", field_value: "Site Garrafão Brasil"},
                                ]
                                  }) 
                                  { card {id title }}}`
                        })
        });
        
        const dataEmpresa = await novoCardEmpresa.json();
        return

    } catch (err){
        console.error(err)
    }
}