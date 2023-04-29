import crypto from 'node:crypto';

export async function createRecordTable (
    name,
    email,
    empresa,
    cnpj,
    estado,
    cidade,
    cep,
    phone,
    celular,
    garrafao_20l_azul,
    garrafao_10l,
    garrafao_pp_20l,
    tampa,
    tampa_pet,
    mensagem) {
    
    const newCEP = cep.replace("-","")
    const tableId = "302927808";
    const idUnique = crypto.randomUUID()
    
    const recordTable = await fetch("https://api.pipefy.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: process.env.AUTH_PIPEFY,
        },
        body: JSON.stringify({
            "query": `mutation { createTableRecord (input: {table_id:${tableId}  fields_attributes: [
                            {field_id: "nome", field_value: "${name}"},
                            {field_id: "celular", field_value: "${celular}"},
                            {field_id: "telefone", field_value: "${phone}"}, 
                            {field_id: "e_mail", field_value: "${email}"},
                            {field_id: "empresa", field_value: "${empresa}"},
                            {field_id: "cnpj", field_value: "${cnpj}"},
                            {field_id: "cep", field_value: "${newCEP}"},
                            {field_id: "estado", field_value: "${estado}"},
                            {field_id: "cidade", field_value: "${cidade}"},
                            {field_id: "garraf_o_pp_20l", field_value: "${garrafao_pp_20l}"},
                            {field_id: "garraf_o_pet_20l", field_value: "${garrafao_20l_azul}"},
                            {field_id: "garraf_o_pp_10l", field_value: "${garrafao_10l}"},
                            {field_id: "tampa_20l", field_value: "${tampa}"},
                            {field_id: "tampa_pco_1881", field_value: "${tampa_pet}"},
                            {field_id: "garraf_o_gua_mineral_20l", field_value: " "},
                            {field_id: "garraf_o_gua_mineral_10l", field_value: " "},
                            {field_id: "tampa_garrafa_pet", field_value: " "},
                            {field_id: "stretch_com_tubete", field_value: " "},
                            {field_id: "stretch_sem_tubete", field_value: " "},
                            {field_id: "termo_encolhivel", field_value: " "},
                            {field_id: "tampa_20l_com_vedante", field_value: " "},
                            {field_id: "mensagem", field_value: "${mensagem}"},
                            {field_id: "id", field_value: "${idUnique}"}
                        ] }) { table_record { id }}}`,
        }),
    });
    const data = await recordTable.json();
    //console.log("ID: ", data.data?.createTableRecord?.table_record?.id)
    return {idRecord: data.data?.createTableRecord?.table_record?.id}
}