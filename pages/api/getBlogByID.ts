import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("Database");
	if (req.method === "POST") {
		const blog = await db.collection('blogs').find({id: JSON.parse(req.body).id}).toArray();
		return res.json(blog[0]);
	}
}