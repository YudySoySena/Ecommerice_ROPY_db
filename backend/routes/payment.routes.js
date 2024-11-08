import { Router } from 'express'
import { createOrder } from '../controllers/payment.controller.js'

const router = Router()

router.get('/create-router', createOrder)

router.get('/sucess', (req, res) => res.send('Éxito'))

router.get('/webhook', (req, res) => res.send('webhook'))

export default router