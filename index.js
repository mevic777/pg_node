const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = async () => {
	try {
		const client = new Client({
			user: process.env.PGUSER,
			host: process.env.PGHOST,
			database: process.env.PGDATABASE,
			password: process.env.PGPASSWORD,
			port: process.env.PGPORT,
		});

		await client.connect();
		return client;
	} catch (error) {
		console.log(error);
	}
};

const getCategories = async () => {
	const client = await connectDb();
	const res = await client.query("SELECT * FROM categorii");
	await client.end();

	return res.rows;
};

const getCategory = async (categoryID) => {
	const client = await connectDb();
	const res = await client.query(`SELECT * FROM CATEGORII WHERE id = ${categoryID}`);
	await client.end();

	return res.rows;
}

module.exports = {
	getCategories,
	getCategory,
};
