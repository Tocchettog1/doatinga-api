import db from "../data/database.js";
import AppError from "../utils/AppError.js";
import { toCamelCase } from "../utils/format.js";

// Busca de todas as linhas e aplicar filtros

export default {
    async getAll(req, res, next) {
        try {
            const { name } = req.query;
            const { adress, number } = req.query;

            //const query = req.query;
            let queryResponse = await db('institutions')
                .select('*').where((builder) => {
                    if (name) {
                        builder.where('name', 'LIKE', `%${name}%`)
                    }
                    if (adress) {
                        builder.where('adress', 'LIKE', `%${adress}%`)
                        if (number) {
                            builder.andWhere('number', 'LIKE', `%${number}%`)
                        }
                    }
                })
            
            let openingdays = await db('institution_opening_days').select('*');

            let institutions = queryResponse.map(institution => {
                return {...institution,openingdays};
            })

            // retornar para insti um novo array de objetos
            // fazer o camlcase dentro de openingdays
            //  antes de acrescentar o objeto
            //  spread


            //Abertos (Filtrar pelo dia atual + hora dentro do horário de funcionamento

            institutions = toCamelCase(institutions);

            return res.status(200).json({
                status: true,
                data: institutions
            });

        } catch (error) {
            console.log(error)
            return next(error);
        }
    },
}