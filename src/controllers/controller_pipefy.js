import dotenv from "dotenv";
import { createRecordTable } from "../services/CreateTableRecordFormulario.js";
import { createAndSearchContato } from "../services/CreateAndSearchContato.js";
import { createAndSearchEmpresa } from "../services/CreateAndSearchEmpresa.js";
import { createCardOportunidade } from "../services/CreateCardOportunidade.js"

dotenv.config();

export async function createData(req, res) {
  const {
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
  
  const newCEP = cep.replace("-", "");

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
  
    const oportunit = createCardOportunidade(company[0].id ,company[0].title, mensagem, garrafao_pp_20l ,garrafao_20l_azul, garrafao_10l, tampa, tampa_pet)
    
    res.status(200).json({ message: "Sucess" });
    
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}
