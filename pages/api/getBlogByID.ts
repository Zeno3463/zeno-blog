import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("Database");
	if (req.method === "POST") {
		const blog = await db.collection('blogs').find({id: JSON.parse(req.body).id}).toArray();
		await db.collection('blogs').updateOne({id: JSON.parse(req.body).id}, {$set: {views: blog[0].views + 1}});
		return res.json(blog[0]);
	}
}