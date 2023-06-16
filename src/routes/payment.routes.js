import { Router } from "express";
import 	{ createOrder, receiveWebhook } from "../controllers/payment.controller.js"

const router = Router();

router.post('/create-order', createOrder);

router.get('/succses', (req, res) => res.send('succses'));

router.get('/failure', (req, res) => res.send('failure'));

router.get('/pending', (req, res) => res.send('pending'));

router.post('/webhook', receiveWebhook);


export default router;