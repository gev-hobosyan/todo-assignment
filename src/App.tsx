import { useCallback, useEffect, useMemo, useState } from "react"
import { v4 } from "uuid"
import Button from "./components/Button";
import Task from "./components/Task";
import FocusedButton from "./components/FocusedButton";

export type TaskType = {
	id: string,
	task: string,
	completed: boolean
}

type Filter = "all" | "completed" | "active";

function App() {
	const [tasks, setTasks] = useState<TaskType[]>(() => {
		const saved = localStorage.getItem("tasks");
		return saved ? JSON.parse(saved) : []
	})
	const [filter, setFilter] = useState<Filter>("all")

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks))
	}, [tasks])

	const filteredTasks = useMemo(() => {
		return tasks.filter(task => {
			if (filter === "completed") {
				return task.completed
			} else if (filter === "active") {
				return !task.completed
			}

			return true
		})
	}, [tasks, filter])

	const addTask = useCallback((formData: FormData) => {
		const task = formData.get("task") as string;

		if (task && task.trim()) {
			const newTask = {
				id: v4(),
				task: task,
				completed: false
			}

			setTasks(prev => [...prev, newTask])
		}
	}, [])

	const handleFilterChange = useCallback((filter: Filter) => {
		setFilter(filter)
	}, [])

	const completeTask = useCallback((id: string) => {
		setTasks(prev => (
			prev.map(task => {
				if (task.id === id) {
					return {...task, completed: true}
				}

				return task
			})
		))
	}, [])

	const deleteTask = useCallback((id: string) => {
	   setTasks(prev => {
		    return prev.filter(task => task.id !== id)
	   })
  	}, [])

	return (
    <>
    	<div className="flex items-center justify-center h-screen bg-black flex-col">
	      <div>
	         <h1 className="text-3xl font-bold text-center">ToDo List</h1>
	         <form className="mt-4 flex gap-4 mx-10" action={addTask}>
	            <input name="task" className="border border-white px-6 py-2 rounded-full text-center" />
	            <Button>Add</Button>
	         </form>

	         <div className="w-full mt-5 py-4 px-4 bg-gray-600/30 border border-gray-800 rounded-xl flex justify-center items-center flex-col gap-3">
	            {
						filteredTasks.length === 0 ? (
							<p>No tasks here yet</p>
						) : filteredTasks.map(task => (
							<Task task={task} key={task.id} completeTask={completeTask} deleteTask={deleteTask} />
		            ))
					}
	         </div>
	      </div>

	      <div className="flex items-center justify-center gap-3 mt-5">
	         <FocusedButton focused={filter === "all"} onClick={() => handleFilterChange("all")}>All</FocusedButton>
	         <FocusedButton focused={filter === "completed"} onClick={() => handleFilterChange("completed")}>Completed</FocusedButton>
	         <FocusedButton focused={filter === "active"} onClick={() => handleFilterChange("active")}>Active</FocusedButton>
	      </div>
      </div>
    </>
  )
}

export default App
