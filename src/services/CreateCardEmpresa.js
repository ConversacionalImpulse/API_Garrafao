import dotenv from "dotenv";
dotenv.config();

export async function createCardEmpresa (name, empresa, celular, email, cnpj, newCEP, estado, cidade){

    const pipeIdEmpresa = "302927698";
    const phaseIdEmpresa = "318137351";
    let estadoExtenso;
    if(estado === "AC"){
      estadoExtenso = "Acre"
    } if(estado === "AL"){
      estadoExtenso = "Alagoas"
    } if(estado === "AP"){
      estadoExtenso = "Amapá"
    } if(estado === "AM"){
      estadoExtenso = "Amazonas"
    } if(estado === "BA"){
      estadoExtenso = "Bahia"
    } if(estado === "CE"){
      estadoExtenso = "Ceará"
    } if(estado === "DF"){
      estadoExtenso = "Distrito Federal"
    } if(estado === "ES"){
      estadoExtenso = "Espírito Santo"
    } if(estado === "GO"){
      estadoExtenso = "Goiás"
    } if(estado === "MA"){
      estadoExtenso = "Maranhão"
    } if(estado === "MT"){
      estadoExtenso = "Mato Grosso"
    } if(estado === "MS"){
      estadoExtenso = "Mato Grosso do Sul"
    } if(estado === "MG"){
      estadoExtenso = "Minas Gerais"
    } if(estado === "PA"){
      estadoExtenso = "Pará"
    } if(estado === "PB"){
      estadoExtenso = "Paraíba"
    } if(estado === "PR"){
      estadoExtenso = "Paraná"
    } if(estado === "PE"){
      estadoExtenso = "Pernambuco"
    } if(estado === "PI"){
      estadoExtenso = "Piauí"
    } if(estado === "RJ"){
      estadoExtenso = "Rio de Janeiro"
    } if(estado === "RN"){
      estadoExtenso = "Rio Grande do Norte"
    } if(estado === "RS"){
      estadoExtenso = "Rio Grande do Sul"
    } if(estado === "RO"){
      estadoExtenso = "Rondônia"
    } if(estado === "RR"){
      estadoExtenso = "Roraima"
    } if(estado === "SC"){
      estadoExtenso = "Santa Catarina"
    } if(estado === "SP"){
      estadoExtenso = "São Paulo"
    } if(estado === "SE"){
      estadoExtenso = "Sergipe"
    } if(estado === "TO"){
      estadoExtenso = "Tocantins"
    }
    
    try{
        const novoCardEmpresa = await fetch('https://api.pipefy.com/graphql',{
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': process.env.AUTH_PIPEFY
                        },
                        body: JSON.stringify({
                              "query": `mutation{ createCard (input: {pipe_id:${pipeIdEmpresa}  phase_id:${phaseIdEmpresa}  fields_attributes: [
                                  {field_id: "empresa", field_value: "${empresa}"},
                                  {field_id: "nome_do_respons_vel", field_value: "${name}"},
                                  {field_id: "celular", field_value: "${celular}"},
                                  {field_id: "e_mail", field_value: "${email}"},
                                  {field_id: "cnpj", field_value: "${cnpj}"}, 
                                  {field_id: "cep", field_value: "${newCEP}"},
                                  {field_id: "estado", field_value: "${estadoExtenso}"},
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
        console.log(err)
    }
}