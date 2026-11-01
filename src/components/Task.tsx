import { Check, Trash } from "lucide-react"
import React, { useMemo } from "react";
import type { TaskType } from "../App";

interface Props {
	task: TaskType,
	completeTask: (id: string) => void,
	deleteTask: (id: string) => void
}

const Task = ({ task, completeTask, deleteTask }: Props) => {
	const colors = useMemo(() => {
		return task.completed ? "bg-green-800/40 border-green-950" : "bg-white/40 border-white"
	}, [task])

	return (
		<>
			<div className={`w-full ${colors}  border backdrop-blur py-1.5 px-3 rounded-xl flex justify-between items-center transition-colors`}>
				<p className={task.completed ? "line-through" : null}>{task.task}</p>
				<div className="flex items-center justify-center gap-1">
					<Check className={`w-4.5 h-4.5 ${task.completed ? "stroke-green-500 hover:stroke-white" : "hover:stroke-green-500"} transition-colors cursor-pointer`} onClick={() => completeTask(task.id)} />
					<Trash className="w-4.5 h-4.5 hover:stroke-red-700 transition-colors cursor-pointer" onClick={() => deleteTask(task.id)} />
				</div>
			</div>
		</>
	);
};

export default React.memo(Task);