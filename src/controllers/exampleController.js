import db from "../data/database.js";
import AppError from "../utils/AppError.js";

export default {
    async getAll(req, res, next) {
        try {
            const { query } = req;

            if (!query.name) {
                throw new AppError("Ta faltando a query", 429);
            }

            const response = await db("tabela_de_teste");

            return res.status(200).json({
                success: true,
                data: response
            });

        } catch (error) {
            return next(error);
        }
    },

}