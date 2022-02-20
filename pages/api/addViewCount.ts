import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("Database");
	if (req.method === "POST") {
		await db.collection('blogs').updateOne({id: JSON.parse(req.body).id}, {$inc: {views: 1}});
		res.json({success: true});
	}
}