import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("Database");
	switch (req.method) {
		case "GET":
			const blogs = await db.collection("blogs").find().toArray();
			res.json(blogs);
			break;
		case "POST":
			const bodyObject = JSON.parse(req.body);
			const newBlog = await db.collection("blogs").insertOne(bodyObject);
			res.json("success");
			break;
	}
}