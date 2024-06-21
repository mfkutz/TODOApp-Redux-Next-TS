import { Button } from "./ui/button";
import { Loader } from "lucide-react"

interface TaskProps {
    task: any
    handleCompleteTask: (id: string) => void
    handleDeleteTask: (id: string) => void
    isCompleting: boolean
    isDeleting: boolean
}

const Task: React.FC<TaskProps> = ({ task, handleCompleteTask, handleDeleteTask, isCompleting, isDeleting }) => {
    return (
        <div className="flex bg-gray-700 w-full justify-between p-3 mb-1" key={task._id}>
            <div>
                <div className={` text-2xl font-bold ${task.completed ? "text-gray-500 line-through" : "text-yellow-500"}`}>{task.title}</div>
                <p className={` text-xs ${task.completed ? "text-gray-500 line-through " : "text-white"}`}>{task.description}</p>
            </div>
            <div className="flex gap-3">
                <Button
                    variant="secondary"
                    onClick={() => handleCompleteTask(task._id!)}
                    disabled={isCompleting}
                    className={`${task.completed ? "hidden" : ""} `}
                >
                    {isCompleting ? <Loader className="w-4 h-4 animate-spin" /> : "Complete"}
                </Button >
                <Button
                    variant="tertiary"
                    onClick={() => handleDeleteTask(task._id!)}
                    disabled={isDeleting}
                >
                    {isDeleting ? <Loader className="w-4 h-4 animate-spin" /> : "Delete"}
                </Button >
            </div>
        </div>
    );
}

export default Task;