import express from 'express'
import { createGoal, deleteGoal, getAllGoals, getOneGoal, getOwnGoals, updateGoal } from '../controllers/goals.controllers.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.get("/", getAllGoals)
router.get("/:id", auth ,getOneGoal)
router.post("/", auth ,createGoal)
router.put("/:id", auth , updateGoal)
router.delete("/:id", auth ,deleteGoal)
router.get("/profile/me", auth, getOwnGoals)

export default router