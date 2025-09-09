// src/pages/user/TaskDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    API.get(`/tasks/${id}`).then((res) => setTask(res.data));
  }, [id]);

  if (!task) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {new Date(task.deadline).toLocaleDateString()}
      </p>
      {/* You can add comments, priority, attachments here later */}
    </div>
  );
};

export default TaskDetails;
