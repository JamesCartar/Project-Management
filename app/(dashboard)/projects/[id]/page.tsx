import TaskCard from "@/components/TaskCard";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async (id: string) => {
	await delay(3000);

	const user = await getUserFromCookie(cookies());

	const projects = await db.project.findFirst({
		where: {
			id,
			ownerId: user?.id
		},
		include: {
			tasks: true
		}
	});

	return { projects };
};
const ProjectPage = async ({ params }: { params: { id: string } }) => {
	const { projects } = await getData(params.id);

	return (
		<div className="h-full overflow-y-auto pr-6 w-full">
			<TaskCard tasks={projects?.tasks} title={projects?.name || ""} />
		</div>
	);
};

export default ProjectPage;
