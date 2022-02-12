import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('Database');
	if (req.method === "POST") {
		await db.collection('blogs').insertOne(JSON.parse(req.body));
		return res.json("success");
	}
}