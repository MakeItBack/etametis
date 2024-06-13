"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Issue } from "@/app/types";

export default function Home() {
  const [allIssues, setAllIssues] = useState<Issue[] | []>([]);
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [updateData, setUpdateData] = useState("");

  const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setId(e.target.value);
  };

  const handleUpdateChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setUpdateData(e.target.value);
  };

  const handleView = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/issues/${id}`); //TODO:
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/issues/${id}`, {
        method: "DELETE",
      });
      setData(null);
      alert("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/issues/${id}`, {
        //TODO:
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updateData }),
      });
      const result = await response.json();
      setData(result);
      alert("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    try {
      fetch("http://localhost:8080/api/issues")
        .then((results) => results.json())
        .then((data) => {
          setAllIssues(data);
          console.log(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none"></div>
      </div>

      <div className="">
        <h2>Current Issues</h2>

        {allIssues && (
          <ul>
            {allIssues.map((issue) => (
              <li>
                [{issue.id}] - {issue.description}
              </li>
            ))}
          </ul>
        )}

        <h2>Manage Issues</h2>
        <input type="text" value={id} onChange={handleInputChange} placeholder="Enter ID" />
        <button onClick={handleView}>View</button>
        <button onClick={handleDelete}>Delete</button>
        <input
          type="text"
          value={updateData}
          onChange={handleUpdateChange}
          placeholder="Enter new data"
        />
        <button onClick={handleUpdate}>Update</button>
        {data && (
          <div>
            <h2>Data for ID: {id}</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
