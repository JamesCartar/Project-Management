// import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

const getRandomTaskStatus = () => {
	const statuses = [
		TASK_STATUS.COMPLETED,
		TASK_STATUS.NOT_STARTED,
		TASK_STATUS.STARTED
	];
	return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
	const user = await db.user.upsert({
		where: { email: "user@email.com" },
		update: {},
		create: {
			email: "user@email.com",
			firstName: "Arjun",
			lastName: "Yadav",
			password: "password",
			projects: {
				create: new Array(10).fill(1).map((_, i) => ({
					name: `Project ${i + 1}`,
					due: new Date(2025, 9, 19)
				}))
			}
		},
		include: {
			projects: true
		}
	});

	const tasks = await Promise.all(
		user.projects.map((project) =>
			db.task.createMany({
				data: new Array(10).fill(1).map((_, i) => ({
					name: `Task ${i + 1}`,
					ownerId: user.id,
					projectId: project.id,
					description: `Everything that describe Task ${i}`,
					status: getRandomTaskStatus(),
					due: new Date(2025, 9, 19)
				}))
			})
		)
	);

	console.log({ user, tasks });
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (error) => {
		console.log(error);
		await db.$disconnect();
		process.exit(1);
	});
