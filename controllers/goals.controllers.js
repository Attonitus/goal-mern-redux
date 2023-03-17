import { Goal } from "../models/Goal.js"

export const getAllGoals = async(req, res) => {
    try {
        const goals = await Goal.find({})
        return res.status(200).json(goals)

    } catch (error) {
        return res.status(200).json({error})
    }
}

export const getOneGoal = async(req, res) => {
    const {id} = req.params
    const userId = req.user.id

    try {
        const oneGoal = await Goal.findById(id)
        if(userId === oneGoal.userId){
            return res.status(200).json(oneGoal)
        }
        return res.status(400).json({error: "No puedes ver una goal que no es tuya"})
    } catch (error) {
        return res.status(200).json({error})
    }
}

export const createGoal = async(req, res) => {
    const userId = req.user.id
    const {text} = req.body
    try {
        const goal = await Goal({text, userId})
        await goal.save()
        return res.status(201).json(goal)
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const updateGoal = async(req, res) => {
    const {id} = req.params
    const userId = req.user.id
    try {
        const goal = await Goal.findById(id)
        if(userId === goal.userId){
            const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {new: true})
            return res.status(200).json(updatedGoal)
        }
        return res.status(400).json({error: "No puedes actualizar una goal que no es tuya"})

    } catch (error) {
        return res.status(400).json({error})
    }
}

export const deleteGoal = async(req, res) => {
    const {id} = req.params
    const userId = req.user.id
    try {
        const goal = await Goal.findById(id)
        if(userId === goal.userId){
            await Goal.findByIdAndDelete(id)
            return res.status(200).json({id})
        }
        return res.status(400).json({error: "No puedes borrar una goal que no es tuya"})
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const getOwnGoals = async(req, res) => {
    const userId = req.user.id
    try {
        const goals = await Goal.find({userId}).sort({"createdAt": -1})
        return res.status(200).json(goals)
    } catch (error) {
        return res.status(400).json({error})
    }
}