import clsx from "clsx";
import { ReactNode } from "react";

const Card = ({
	className,
	children
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={clsx(
				"rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
				className
			)}
		>
			{children}
		</div>
	);
};

export default Card;
