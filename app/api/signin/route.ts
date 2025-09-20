import { comparePassword, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const user = await db.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		return NextResponse.json(
			{ data: { message: "User not found" } },
			{ status: 404 }
		);
	}

	const isUser = await comparePassword(body.password, user.password);

	if (isUser) {
		const jwt = await createJWT(user);

		const response = NextResponse.json(
			{ data: { message: "Login Successful" } },
			{ status: 200 }
		);

		response.cookies.set(process.env.COOKIE_NAME!, jwt, {
			httpOnly: true,
			path: "/",
			maxAge: 60 * 60 * 24 * 7
		});

		return response;
	} else {
		return NextResponse.json(
			{ message: "Invalid credentials" },
			{ status: 401 }
		);
	}
}
