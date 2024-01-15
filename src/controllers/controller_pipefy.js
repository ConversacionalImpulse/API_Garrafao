import dotenv from "dotenv";
import { createRecordTable } from "../services/CreateTableRecordFormulario.js";
import { createAndSearchEmpresa } from "../services/CreateAndSearchEmpresa.js";
import { createCardOportunidade } from "../services/CreateCardOportunidade.js";

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
    garrafao_pp_20l, //Garrafão Prime 20L
    tampa, //Tampa 20L
    tampa_vedante,
    tampa_pet, // Tampa PCO 1881
    mensagem,
    gclid,
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

  let id_vendedor = ""

  if(estado == "RN"){
    id_vendedor = "302273351" //Aline
  }
  else if(estado == "CE"){
    id_vendedor = "302273351" //Aline
  }
  else{
    id_vendedor = "302273372" //Amanda
  }

  if(!gclid){
    gclid = "Não possui GCLID"
  }

  let GCLID = gclid.slice(15)
  
  console.log("GCLID: ", GCLID)
  console.log("Estado: ", estado)

//47.091.862/0001-30
  try {
    
    //const etiquetaGarrafao = 308171890;
    const record = await createRecordTable(
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
    
    const oportunit = await createCardOportunidade(company.id, name, mensagem, garrafao_pp_20l, garrafao_20l_azul, garrafao_10l, id_vendedor, tampa, tampa_pet, GCLID, record.idRecord)
    
    console.log(record, company, oportunit)
    
    res.status(200).json({ message: "Success"});

  } catch (err) {
    console.log(err);
    res.status(500).end();
    
  }
  
}

