import "@/styles/global.css";

import { PropsWithChildren } from "react";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

export default function DashboardRootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head />
			<body className="h-screen w-screen candy-mesh p-6">
				<GlassPane className="w-full h-full flex items-center justify-center p-6">
					<Sidebar />
					{children}
				</GlassPane>
				<div id="modal"></div>
			</body>
		</html>
	);
}
