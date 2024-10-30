import { Router } from 'express'

const router = Router()

router.get('/create-router', (req, res) => res.send('Creando Orden'))

router.get('/sucess', (req, res) => res.send('Éxito'))

router.get('/webhook', (req, res) => res.send('webhook'))
