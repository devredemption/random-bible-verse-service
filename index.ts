import express, { Express, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app: Express = express();

app.get("/", async (req: Request, res: Response) => {
	try {
		const verson_response = await (
			await axios.get("https://bible-search.p.rapidapi.com/random-verse", {
				headers: {
					"X-RapidAPI-Key": process.env.API_KEY,
					"X-RapidAPI-Host": "bible-search.p.rapidapi.com",
				},
			})
		).data[0];
		const verse = {
			text: verson_response.text,
			display_ref: `${verson_response.book_name} ${verson_response.chapter}:${verson_response.verse}`,
		};
		res.json(verse);
	} catch (error) {
		console.log(error);
	}
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running`);
});
