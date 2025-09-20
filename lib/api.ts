interface FetcherProps {
	url: string;
	method: "POST" | "GET" | "PATCH" | "DELETE";
	body: {
		[key: string]: any;
	};
	json?: boolean;
}

interface User {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

const fetcher = async ({ url, method, body, json = true }: FetcherProps) => {
	const res = await fetch(url, {
		method,
		...(body && { body: JSON.stringify(body) }),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	});

	if (!res.ok) {
		throw new Error("API error");
	}

	if (json) {
		const data = await res.json();
		return data.data;
	}
};

export const register = async ({ user }: { user: User }) => {
	return fetcher({ url: "/api/register", method: "POST", body: user });
};

export const signin = async ({
	user
}: {
	user: Omit<User, "firstName" | "lastName">;
}) => {
	return fetcher({ url: "/api/signin", method: "POST", body: user });
};
