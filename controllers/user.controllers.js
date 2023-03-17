import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import { User } from "../models/User.js"
import { createToken } from "../helpers/jwt.js"

export const register = async(req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User({name, email, password: hash})
        await user.save()
        return res.status(201).json(user)
    } catch (error) {
        return res.status(200).json({error})
    }

}

export const login = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({errors: "Email no registrado"})
        }
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(400).json({errors: "Contraseña incorrecta"})
        }
        const token = createToken(user)

        return res.status(200).json({user, token})
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const getMe = async(req, res) => {
    const userId = req.user.id
    try {
        const user = await User.findById(userId).select({password: 0})
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error})
    }
}