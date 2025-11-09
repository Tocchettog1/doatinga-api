import geoLocationService from "../services/geoLocationService.js";
import AppError from "../utils/AppError.js";

export default {
    async lookupCep(req, res, next) {
        const { cep, number } = req.query;

        try {
            if (!cep) {
                throw new AppError("É obrigatório informar o CEP.", 406);
            }

            const response = await geoLocationService(cep, number);

            return res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            return next(error)
        }
    }
}