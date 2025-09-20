import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const user = await db.user.create({
		data: {
			email: body.email,
			password: await hashPassword(body.password),
			firstName: body.firstName,
			lastName: body.lastName
		}
	});

	const jwt = await createJWT(user);

	const response = NextResponse.json(
		{ data: { message: "Register Successful" } },
		{ status: 201 }
	);

	response.cookies.set(process.env.COOKIE_NAME!, jwt, {
		httpOnly: true,
		path: "/",
		maxAge: 60 * 60 * 24 * 7
	});

	return response;
}
