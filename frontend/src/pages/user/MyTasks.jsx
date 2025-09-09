// src/pages/user/MyTasks.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FiTrash2 } from "react-icons/fi";

const statusTypes = ["Pending", "In Progress", "Complete"];

const getInitialColumns = () => ({
  Pending: {
    name: "Pending",
    color: "bg-gradient-to-r from-blue-100 to-blue-200",
    items: [],
  },
  "In Progress": {
    name: "In Progress",
    color: "bg-gradient-to-r from-yellow-100 to-yellow-200",
    items: [],
  },
  Complete: {
    name: "Complete",
    color: "bg-gradient-to-r from-green-100 to-green-200",
    items: [],
  },
});

const MyTasks = () => {
  const [columns, setColumns] = useState(getInitialColumns());
  const [uploadingTaskId, setUploadingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks/my-tasks");
      const updatedColumns = getInitialColumns();

      res.data.forEach((task) => {
        const status = statusTypes.includes(task.status)
          ? task.status
          : "Pending";
        updatedColumns[status].items.push(task);
      });

      setColumns(updatedColumns);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];

    const [movedTask] = sourceItems.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    destItems.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
      [destination.droppableId]: { ...destCol, items: destItems },
    });

    try {
      await API.put(`/tasks/${movedTask._id}`, { status: movedTask.status });
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleAttachmentUpload = async (taskId, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("attachment", file);

    try {
      setUploadingTaskId(taskId);
      await API.post(`/tasks/${taskId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Attachment uploaded");
      fetchTasks();
    } catch {
      toast.error("Failed to upload attachment");
    } finally {
      setUploadingTaskId(null);
    }
  };

  const handleDeleteAttachment = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this attachment?"))
      return;

    try {
      await API.delete(`/tasks/${taskId}/attachment`);
      toast.success("Attachment deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete attachment");
    }
  };

  const renderAttachment = (task) => {
    if (!task.attachment) return null;

    const fileType = task.attachment.split(".").pop().toLowerCase();
    return (
      <div className="flex items-center gap-2 mt-2">
        {["jpg", "jpeg", "png", "gif"].includes(fileType) ? (
          <img
            src={task.attachment}
            alt="Attachment"
            className="max-h-32 w-auto rounded shadow"
          />
        ) : (
          <a
            href={task.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-sm"
          >
            📎 View Attachment
          </a>
        )}
        <button
          onClick={() => handleDeleteAttachment(task._id)}
          className="text-red-500 hover:text-red-700"
          title="Delete Attachment"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📌 My Tasks Board
      </h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([colId, col]) => (
            <div key={colId} className="bg-white rounded-xl shadow-lg p-4">
              <h3
                className={`text-xl font-semibold mb-4 p-2 ${col.color} rounded-lg`}
              >
                {col.name}
              </h3>
              <Droppable droppableId={colId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[100px] space-y-4"
                  >
                    {col.items.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-50 border border-gray-200 hover:shadow-lg transition rounded-lg p-4"
                          >
                            <h4 className="font-bold text-gray-800">
                              {task.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {task.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Due:{" "}
                              {task.deadline
                                ? new Date(task.deadline).toLocaleDateString()
                                : "No deadline"}
                            </p>

                            {/* Attachment Display */}
                            {renderAttachment(task)}

                            {/* Attachment Upload */}
                            <div className="mt-3">
                              <input
                                type="file"
                                id={`file-${task._id}`}
                                className="hidden"
                                onChange={(e) =>
                                  handleAttachmentUpload(
                                    task._id,
                                    e.target.files[0]
                                  )
                                }
                              />
                              <label
                                htmlFor={`file-${task._id}`}
                                className={`cursor-pointer px-3 py-2 rounded-md text-white text-sm font-medium ${
                                  uploadingTaskId === task._id
                                    ? "bg-gray-400"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                {uploadingTaskId === task._id
                                  ? "Uploading..."
                                  : task.attachment
                                  ? "📎 Update Attachment"
                                  : "📎 Add Attachment"}
                              </label>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {col.items.length === 0 && (
                      <p className="text-gray-400 text-sm text-center mt-2">
                        No tasks
                      </p>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default MyTasks;
