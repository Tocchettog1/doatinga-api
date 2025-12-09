import dayjs from "dayjs";
import db from "../data/database.js";
import { toCamelCase, toSnakeCase } from "../utils/format.js";

export default {

    // Only Institutions
    async getAll(req, res, next) {
        try {
            const { name } = req.query;
            const { street, number } = req.query;
            const { open_at } = req.query;

            const today = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'][dayjs().day()]; //função que aponta para o dia de hoje na lista acima.
            const now = dayjs().format('HH:mm:ss'); //hora exata da requisição

            if (open_at) {

                const queryResponse = await db('institutions as i').join('institution_opening_days as op', 'i.id', '=', 'op.institution').select(
                    "i.name", "i.cnpj", "i.street", "i.number").where('op.opening_day', 'like', today).andWhere(
                        'op.opening_hours', '<=', now).andWhere('op.closing_hours', '>=', now);

                let institutions = toCamelCase(queryResponse);

                return res.status(200).json({
                    status: true,
                    data: institutions
                });

            }

            const queryResponse = await db('institutions')
                .select('*').where((builder) => {
                    if (name) {
                        builder.where('name', 'LIKE', `%${name}%`)
                    }

                    if (street) {
                        builder.where('street', 'LIKE', `%${street}%`)
                        if (number) {
                            builder.andWhere('number', 'LIKE', `%${number}%`)
                        }
                    }
                })

            let openingDays = await db('institution_opening_days').select('*');
            openingDays = toCamelCase(openingDays);

            let institutions = queryResponse.map(inst => {

                const days = openingDays.filter(D => D.institution ===
                    inst.id)

                return { ...inst, openingDays: days };
            })

            institutions = toCamelCase(institutions);

            return res.status(200).json({
                status: true,
                data: institutions
            });

        } catch (error) {
            console.log(error);
            return next(error);
        }

    },

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            let institution = await db('institutions').select('*').where('id', id);

            institution = toCamelCase(institution);

            return res.status(200).json({
                status: true,
                data: institution
            });

        } catch (error) {
            return next(error);
        }
    },

    async put(req, res, next) {
        try {

            const { id } = req.params;
            const data = req.body;

            await db('institutions').where('id', id).update(data);

            return res.status(200).json({
                status: true,
                messege: "Instituição atualizada com sucesso."
            })

        } catch (error) {
            return next(error);
        }

    },

    async post(req, res, next) {

        try {
            const data = req.body;

            await db('institutions').insert(data)

            return res.status(200).json({
                status: true,
                messege: "Instituição criada com sucesso."
            })

        } catch (error) {
            console.log(error);
            return next(error);
        }

    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await db('institutions').where('id', id).del();

            return res.status(200).json({
                status: true,
                messege: 'Instituição deletada com sucesso.'
            })

        } catch (error) {
            return next(error)
        }

    },


    // Institutions Opening Days


    async getAllInstitutionOpeningDays(req, res, next) {

        try {
            const { id } = req.params;

            let institutionOpeningDays = await db('institution_opening_days').where('institution', id).select('*')

            institutionOpeningDays = toCamelCase(institutionOpeningDays);

            return res.status(200).json({
                status: true,
                data: institutionOpeningDays
            })

        } catch (error) {
            return next(error);

        }
    },

    async getInstitutionOpeningDaysById(req, res, next) {

        try {
            const { id, idDay } = req.params;

            let institutionOpeningDay = await db('institution_opening_days').where('institution', id).andWhere('id', idDay).select('*');

            institutionOpeningDay = toCamelCase(institutionOpeningDay);

            return res.status(200).json({
                status: true,
                data: institutionOpeningDay
            })

        } catch (error) {
            return next(error);

        }
    },

    async putInstitutionOpeningDays(req, res, next) {

        try {
            const { id, idDay } = req.params;
            const body = req.body;

            await db('institution_opening_days').where('institution', id)
                .andWhere('id', idDay).update(body);

            return res.status(200).json({
                status: true,
                messege: 'Horário da instituição atualizado com sucesso.'
            })

        } catch (error) {
            return next(error)
        }
    },

    async postInstitutionOpeningDays(req, res, next) {

        try {
            const data = req.body;

            await db('institution_opening_days').insert(data);

            return res.status(200).json({
                status: true,
                messege: 'Horário da instituição criado com sucesso.'
            })

        } catch (error) {
            return next(error);
        }
    },

    async deleteInstitutionOpeningDays(req, res, next) {

        try {
            const { id, idDay } = req.params;

            await db('institution_opening_days').where('id', idDay).andWhere('institution', id).del();

            return res.status(200).json({
                status: true,
                messege: "Horários da instituição deletados com suceso."
            })

        } catch (error) {
            return next(error);
        }
    }
}