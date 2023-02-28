import dotenv from "dotenv";
import { searchCardEmpresa } from "../services/SearchCardEmpresa.js";
import { createCardEmpresa} from "../services/CreateCardEmpresa.js";
dotenv.config();

export async function createAndSearchEmpresa(empresa, cnpj, newCEP, cidade, contactId, maxWaitTime) {
    const startTime = Date.now();
    
    let company = await searchCardEmpresa(empresa);
  
    if (company.length === 0) {
      await createCardEmpresa(empresa, cnpj, newCEP, cidade, contactId);
  
      while (company.length === 0 && Date.now() - startTime < maxWaitTime) {
        
        await new Promise((resolve) => {
          setTimeout(resolve, 1000)
        }); // espera 1 segundo
  
        company = await searchCardEmpresa(empresa);
      }
    }
  
    return company;
}