import dotenv from "dotenv";
import { createRecordTable } from "../services/CreateTableRecordFormulario.js";
import { createAndSearchContato } from "../services/CreateAndSearchContato.js";
import { createAndSearchEmpresa } from "../services/CreateAndSearchEmpresa.js";
import { createCardOportunidade } from "../services/CreateCardOportunidade.js"

dotenv.config();

export async function createData(req, res) {
  let {
    name,
    email,
    empresa,
    cnpj,
    estado,
    cidade,
    cep,
    phone,
    celular,
    tipo,
    marca,
    garrafao_20l_azul, //Garrafão PET 20L
    garrafao_20l_rosa,
    garrafao_20l_verde,
    garrafao_10l, //Garrafão PP 10L
    garrafao_pp_20l, //Garrafão PP 20L
    tampa, //Tampa 20L
    tampa_vedante,
    tampa_pet, // Tampa PCO 1881
    mensagem,
  } = req.body;

  if(!garrafao_20l_azul){
    garrafao_20l_azul = "0"
  }
  if(!garrafao_10l){
    garrafao_10l = "0"
  }
  if(!garrafao_pp_20l){
    garrafao_pp_20l = "0"
  }
  if(!tampa){
    tampa = "0"
  }
  if(!tampa_pet){
    tampa_pet = "0"
  }
  
  if(!cep){
    cep = "11111-000"
  }
  const newCEP = cep.replace("-", "");

  if(!empresa){
    empresa = "Não Informado"
  }

  if(!mensagem){
    mensagem = "Nada Informado"
  }
  if(!cnpj){
    cnpj = "58.282.931/0001-00"
  }

//47.091.862/0001-30
  try {
    
    //const etiquetaGarrafao = 308171890;
    await createRecordTable(
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
        mensagem
    );

    
  
    const company = await createAndSearchEmpresa(name, empresa, celular, email, cnpj, newCEP, estado, cidade, 10000)
  
    const oportunit = createCardOportunidade(company.id, name, mensagem, garrafao_pp_20l ,garrafao_20l_azul, garrafao_10l, tampa, tampa_pet)
    
    res.status(200).json({ message: "Sucess", oportunit });
    
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}
