import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const token = req.cookies.get(process.env.COOKIE_NAME!);

	if (!token) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const user = await validateJWT(token.value);
	const body = await req.json();

	const project = await db.project.create({
		data: {
			name: body.name,
			ownerId: user.id
		}
	});

	return NextResponse.json({ data: { message: "hi" } });
}
