import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('Database');
	if (req.method === "POST") {
		const blogs = await db.collection('blogs').find().toArray();
		return res.json(blogs);
	}
}