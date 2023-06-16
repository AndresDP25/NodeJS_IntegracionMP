import mercadopago from "mercadopago"
import { HOST } from "../config.js";

export const createOrder = async (req, res) => {

	mercadopago.configure( {
		access_token: "TEST-7369785182938694-061608-a5c636bbda4b7a8d078c1c62d4d2b257-1399831765"
	});

	const result = await mercadopago.preferences.create( {
		items: [
			{
				title: "Laptop Lenovo",
				unit_price: 500,
				currency_id: "ARS",
				quantity: 1,
			},
		],
		back_urls: {
			success: `${HOST}/success`,
			failure: `${HOST}/failure`,
			pending: `${HOST}/pending`,
		},
		notification_url: "https://1a41-201-231-248-242.sa.ngrok.io/webhook",
	});

	console.log(result);

	res.send(result.body)
};

export const receiveWebhook = async (req, res) => {
	console.log(req.query)
	const payment = req.query; 
	try {
		if(payment.type === "payment") {
			const data = await mercadopago.payment.findById(payment['data.id']);
			console.log(data);
			//store in DB
		}
		res.sendStatus(204)
	} catch (error) {
		console.log(error)
		return res.sendStatus(500).json({ error: error.message });
	}
};