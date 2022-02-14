import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("Database");

	if (req.method === "POST") {
		await db.collection('blogs').deleteOne({id: JSON.parse(req.body).id});
		return res.json({success: true});
	}
}