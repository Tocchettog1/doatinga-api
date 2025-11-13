import db from '../data/database.js';


export default {
    async post(req, res, next) {
        const { body } = req;
        try {
            if(!body.name || !body.institution || !body.type) {
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
    }
}