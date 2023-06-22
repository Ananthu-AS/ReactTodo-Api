import React, { useState, useEffect } from "react";

export const Home = () => {
    const [value, setValue] = useState([]);
    const [taskName, settaskName] = useState("");
    const [editTask, setEditTask] = useState(null);

    const CreateValue = (event) => {
        event.preventDefault();
        if (editTask == null) {
            fetch("http://127.0.0.1:8000/api/create_tasks", {
                method: "POST",
                body: JSON.stringify({
                    tasks: taskName,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setValue([...value, data]);
                    settaskName("");
                });
        } else {
            const editid = editTask;
            fetch(`http://127.0.0.1:8000/api/update_tasks/${editid}`, {
                method: "PUT",
                body: JSON.stringify({
                    tasks: taskName,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    const updatedTasks = value.map((val) =>
                        val.id === data.id ? data : val
                    );
                    setValue(updatedTasks);
                    setEditTask(null);
                    settaskName("");
                });
        }
    };

    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/api/delete_tasks/${id}`, {
            method: "DELETE",
        }).then((data) => {
            const updatedTasks = value.filter((value) => value.id !== id);
            setValue(updatedTasks);
        });
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/tasks")
            .then((response) => response.json())
            .then((json) => setValue(json));
    }, []);
    return (
        <>
            <form onSubmit={CreateValue}>
                <input
                    type="text"
                    placeholder="Task"
                    value={taskName}
                    onChange={(event) => settaskName(event.target.value)}
                />
                <input type="submit" value={editTask ? "Update" : "Submit"} />
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {value.map((value) => (
                        <tr>
                            <td key={value.id}>{value.tasks}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditTask(value.id);
                                        settaskName(value.tasks);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(value.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
