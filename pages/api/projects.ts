import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function project(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const user = await validateJWT(req.cookies[process.env.COOKIE_NAME!]!);

	const project = await db.project.create({
		data: {
			name: req.body.name,
			ownerId: user.id
		}
	});

	res.json({ data: { message: "hi" } });
}
