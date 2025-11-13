import db from "../data/database.js";
import AppError from "../utils/AppError.js";
import { toCamelCase } from "../utils/format.js";

// Busca de todas as linhas e aplicar filtros

export default {
    async getAll(req, res, next) {
        try {
            const { name, adress } = req.query;

            //const query = req.query;
            let institutions = await db('institutions')
                .select('institutions.*', 'opening_d.*')
                .leftJoin('institution_opening_days as opening_d',
                    'opening_d.institution', 'institutions.id')
                .where((builder) => {
                    if (name) {
                        builder.where('name', 'LIKE', `%${name}%`)
                    }
                })

            institutions = toCamelCase(institutions);

            return res.status(200).json({
                status: true,
                data: institutions
            });

        } catch (error) {
            return next(error);
        }
    },
}