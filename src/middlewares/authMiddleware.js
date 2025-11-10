import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';

export default authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError('No token provided', 401);
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            throw new AppError('Token size error', 401);
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            throw new AppError('Token malformatted', 401);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        return next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError || error instanceof jwt.NotBeforeError) {
            return next(new AppError('Token invalid or expired. Log in again to continue.', 401));
        }

        return next(error);
    }
}