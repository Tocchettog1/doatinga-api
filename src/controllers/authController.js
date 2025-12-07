import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import db from '../data/database.js';
import dayjs from 'dayjs';
import { toCamelCase } from '../utils/format.js';

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

            return res.status(201).json({
                status: "Success",
                token,
                expiresIn: expiration
            });

        } catch (error) {
            return next(error);
        }
    },

    async signIn(req, res, next) {
        const { email, password } = req.body;
        const validity = process.env.JWT_EXPIRES_IN;
        const expiration = dayjs().add(validity, 'seconds').format('YYYY-MM-DD HH:mm:ss');
        const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

        try {
            if (!email || !password) {
                throw new AppError('Email and password are required', 406);
            };

            if (!emailRegex.test(email)) {
                throw new AppError('Invalid email format', 401);
            }

            const user = await db('users')
                .select('id', 'password')
                .first()
                .where({ email });

            if (!user || user.password !== password) {
                throw new AppError('Incorrect email or password', 403);
            }

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

    async getAll(req, res, next) {

        try {

            const { name } = req.query;

            let response = await db('users as u').select('*').where((builder) => {
                if (name) {
                    builder.where('u.name', 'like', `%${name}%`)
                }
            })

            let user = toCamelCase(response);

            return res.status(200).json({
                status: 'Success',
                data: user
            })

        } catch (error) {
            console.log(error);
            return next(error);
        }
    },

    async getById(req, res, next) {

        try {

            const { id } = req.params;

            const response = await db('users as u').select('*').where('u.id', id);

            let user = toCamelCase(response);

            return res.status(200).json({
                status: 'Success',
                data: user
            })

        } catch (error) {
            console.log(error);
            return next(error);
        }
    },

    async put(req, res, next) {

        try {

            const { id } = req.params;
            const body = req.body;

            const response = await db('users as u').where('u.id', id).update(body);

            let user = toCamelCase(response);

            return res.status(200).json({
                status: 'Success',
                data: user
            })

        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
    async delete(req, res, next) {

        try {

            const { id } = req.params;

            const response = await db('users as u').where('u.id', id).del();

            let user = toCamelCase(response);

            return res.status(200).json({
                status: 'Success',
                data: user
            })

        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
};