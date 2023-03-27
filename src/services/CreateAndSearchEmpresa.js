import dotenv from "dotenv";
import { searchCardEmpresa } from "../services/SearchCardEmpresa.js";
import { createCardEmpresa} from "../services/CreateCardEmpresa.js";
dotenv.config();

export async function createAndSearchEmpresa(name, empresa, celular, email, cnpj, newCEP, estado, cidade, maxWaitTime) {
    const startTime = Date.now();
    const empresaNome = empresa.toUpperCase()

    let company = await searchCardEmpresa(email);
  
    if (company.id === null) {
      //name, empresa, phone, email, cnpj, newCEP, estado, cidade
      await createCardEmpresa(name, empresaNome, celular, email, cnpj, newCEP, estado, cidade);
  
      while (company.id === null && Date.now() - startTime < maxWaitTime) {
        
        await new Promise((resolve) => {
          setTimeout(resolve, 1000)
        }); // espera 1 segundo
  
        company = await searchCardEmpresa(email);
      }
    }
  
    return company;
}