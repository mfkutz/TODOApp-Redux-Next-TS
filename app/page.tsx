'use client'
import { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useCompleteTaskMutation } from "@/lib/features/taskApi"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { useState } from "react"
import Task from "@/components/task"
export default function Home() {

  //Manage inputs
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [msjTask, setMsjTask] = useState(false)
  const [msjDescription, setMsjDescription] = useState(false)

  //Hooks of RTK QUERY
  const { data, isLoading, error, isFetching } = useGetTasksQuery()
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation()
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation()
  const [completeTask, { isLoading: isCompleting }] = useCompleteTaskMutation()

  const handleAddTask = async () => {

    if (title.trim() === '' && description.trim() === '') {
      setMsjTask(true)
      setMsjDescription(true)
      return
    }

    if (title.trim() === '') {
      setMsjTask(true)
      return
    } else {
      setMsjTask(false)
    }

    if (description.trim() === '') {
      setMsjDescription(true)
      return
    } else {
      setMsjDescription(false)
    }

    try {
      await addTask({ title, description }).unwrap()
      setMsjTask(false)
      setMsjDescription(false)
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error(error)
    }
  }

  //Delete task
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  //Complete task
  const handleCompleteTask = async (id: string) => {
    try {
      await completeTask({ id, completed: true }).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  if (error) return <div>Error</div> //see this later

  return (
    <div className="bg-gray-900 flex flex-col h-screen items-center">
      <h1 className="mt-10 text-white text-xl ">TO DO App</h1>
      <div className="w-[60%]">
        <div className="bg-gray-700 h-[100px] flex w-full justify-between  p-3 mb-4">
          <div>
            <p className="text-white text-xs mt-1">Task</p>
            <input
              type="text"
              className="rounded-md px-2 py-1 mt-1"
              value={title}
              onChange={(e) => setTitle(capitalize(e.target.value))}
            />
            <p className={`text-red-500 text-xs mt-1 ${msjTask ? 'block' : 'hidden'} `}>Add task</p>
          </div>
          <div>
            <p className="text-white text-xs mt-1">Description</p>
            <input
              type="text"
              className="rounded-md px-2 py-1 mt-1"
              value={description}
              onChange={(e) => setDescription(capitalize(e.target.value))}
            />
            <p className={`text-red-500 text-xs mt-1 ${msjDescription ? 'block' : 'hidden'} `}>Add description</p>
          </div>
          <Button
            variant="primary"
            onClick={handleAddTask}
            disabled={isAdding} //Disable button while task is being added
            className="mt-[1.1rem]"
          >
            {isAdding ? <Loader className="w-4 h-4 animate-spin" /> : "Add ToDo"}
          </Button>
        </div>
        {
          isLoading || isFetching ?
            <div className="flex justify-center" >
              <Loader className="w-6 h-6 animate-spin text-white" />
            </div>
            :
            data?.map((task) => {
              return (
                <Task
                  key={task._id}
                  task={task}
                  handleCompleteTask={handleCompleteTask}
                  handleDeleteTask={handleDeleteTask}
                  isCompleting={isCompleting}
                  isDeleting={isDeleting}
                />
              )
            })}
      </div>
    </div >
  )
}
