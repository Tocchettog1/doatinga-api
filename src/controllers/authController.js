import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import db from '../data/database.js';
import dayjs from 'dayjs';

export default {
    async signUp(req, res, next) {
        const { name, email, password } = req.body;
        const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

        try {
            if (!name || !email || !password) {
                throw new AppError('Name, email and password are required', 406);
            }

            if (!emailRegex.test(email)) {
                throw new AppError('Invalid email format', 401);
            }

            const verifyEmailExists = await db('users')
                .select('id')
                .first()
                .where({ email });

            if (verifyEmailExists) {
                throw new AppError('Email already registered', 409);
            }

            const user = {
                name,
                email,
                password
            }

            const insertedIds = await db('users').insert(user).returning('id');

            user.id = insertedIds[0].id;

            const validity = process.env.JWT_EXPIRES_IN;
            const expiration = dayjs().add(validity, 'seconds').format("YYYY-MM-DD HH:mm:ss");


            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: validity,
            });

            return res.status(200).json({
                status: "Success",
                token,
                expiresIn: expiration
            });

        } catch (error) {
            return next(error);
        }
    },
};