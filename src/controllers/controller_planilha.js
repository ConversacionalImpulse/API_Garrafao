import dotenv from "dotenv";
import { CreateGoogleSheet } from "../services/CreateGoogleSheet.js";


dotenv.config();

export async function CreateSheet (req, res){

    let {
        gClickID,
        conversionName,
        conversionDate,
        conversionValue,
    } = req.body;

    const currency = 'BRL'

    try {
        const record = await CreateGoogleSheet(
            gClickID,
            conversionName,
            conversionDate,
            conversionValue,
            currency,
        );

    console.log(record)
    
    res.status(200).json({ message: "Success"});

    } catch (err) {
        console.log(err);
    res.status(500).end();
    }

}