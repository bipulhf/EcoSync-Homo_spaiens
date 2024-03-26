import { Router } from "express";
import { prisma } from "./db";
import { createUser, login,authenticateToken, resetPassword, resetPasswordConfirm, changePassword, getAllUsers, getUser  } from "./auth";

const router_shifat = Router();

router_shifat.post('/user', createUser)

router_shifat.post('/login', login) 
router_shifat.post('/authenticate', authenticateToken)
router_shifat.post('/reset-password', resetPassword)
router_shifat.post('/reset-password-confirm', resetPasswordConfirm)
router_shifat.post('/change-password', changePassword)
router_shifat.get('/user', getAllUsers)
router_shifat.get('/user/:id', getUser)

export default router_shifat;
