import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarURL').optional().isURL(),
];

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
]

export const postCreateValidation = [
    body('title').isString().isLength({ min: 3 }),
    body('text').isString().isLength({ min: 10 }),
    body('tags').optional().isArray(),
    body('imageUrl').optional().isString(),
];