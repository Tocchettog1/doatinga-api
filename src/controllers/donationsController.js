import db from '../data/database.js';
import { toCamelCase } from '../utils/format.js';


export default {
    async post(req, res, next) {
        const { body } = req;
        try {
            if (!body.name || !body.institution || !body.type) {
                throw new Error('Missing required fields: name, institution, type', 401);
            }

            if (!body.isAvailable && !body.isNeeded) {
                throw new Error('At least one of isAvailable or isNeeded must be true', 401);
            }

            if (isNaN(body.type) || isNaN(body.institution)) {
                throw new Error('Type and institution must be a valid id', 401);
            }

            const donationData = {
                name: body.name,
                institution: body.institution,
                type: body.type,
                subtype: body.subtype || null,
                description: body.description || null,
                is_needed: body.isNeeded || false,
                is_available: body.isAvailable || false,
                available_quantity: body.availableQuantity || null,
            }

            await db("donations")
                .insert(donationData);

            return res.status(201).json({
                status: "Success",
                message: "Doação criada com sucesso"
            });

        } catch (error) {
            return next(error);
        }
    },
    async getAll(req, res, next) {
        
        try {

            let donations = await db('donations').select('*');
                
            donations = toCamelCase(donations);

            return res.status(200).json({
                status: true,
                data: donations
            })

        } catch (error) {
            console.log(error);
            return next(error);
        }
    },

    async getByInstitution(req, res, next) {

        try {
            const { idInstitution } = req.params;

            let donations = await db('donations').select("*").where('institution', idInstitution);

            donations = toCamelCase(donations);

            return res.status(200).json({
                status: true,
                data: donations
            })

        } catch (error) {
            return next(error);
        }
    },
    
    async getById(req, res, next) {

        try {
            const { idInstitution } = req.params;
            const { id } = req.params;

            let donations = await db('donations').select("*").where('id', id).andWhere('institution', idInstitution);

            donations = toCamelCase(donations);

            return res.status(200).json({
                status: true,
                data: donations
            })

        } catch (error) {
            return next(error);
        }
    },
    async put(req, res, next) {
        try {
            const { idInstitution } = req.params;
            const { id } = req.params;
            const data = req.body;

            await db('donations').where('id', id).andWhere('institution', idInstitution).update(data);

            return res.status(200).json({
                status: true,
                messege: "Doação atualizada com sucesso."
            })


        } catch (error) {
            console.log(error);
            return next(error);

        }
    },
    async delete(req, res, next) {
        try {
            const { idInstitution } = req.params;
            const { id } = req.params;

            await db('donations').where('id', id).andWhere('institution', idInstitution).del();

            return res.status(200).json({
                status: true,
                messege: 'Doação deletada com sucesso.'
            })

        } catch (error) {
            return next(error)
        }

    },
}

