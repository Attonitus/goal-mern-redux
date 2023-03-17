import express from 'express'
import { body } from 'express-validator'
import { getMe, login, register } from '../controllers/user.controllers.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.post("/register", [
    body("email", "Ingrese un email válido")
    .trim()
    .isEmail()
    .normalizeEmail()
    .toLowerCase(),
    body("password", "Ingrese una contraseña de 6 caracteres max.")
    .trim()
    .not()
    .isEmpty()
    .isLength({min: 6}),
    body("name", "Ingrese un nombre")
    .not()
    .isEmpty()
] ,register)

router.post("/login", [
    body("email", "Ingrese un email válido")
    .trim()
    .isEmail()
    .normalizeEmail()
    .toLowerCase(),
    body("password", "Ingrese una contraseña de 6 caracteres max.")
    .trim()
    .not()
    .isEmpty()
    .isLength({min: 6}),
] ,login)

router.get("/me", auth, getMe)

export default router