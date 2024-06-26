import React, { useState } from "react";
import Header from "./header";
import './App.css'
function Todo() {
  const [job, setJob] = useState("");
  const [status, setStatus] = useState("all");
//   const [selectWork, setSelectWork] = useState([]);
  const [jobs, setJobs] = useState(() => {
    if (localStorage.length !== 0) {
      const storageJobs = JSON.parse(localStorage.getItem("jobs"));
      return storageJobs;
    } else {
      const newArray = [];
      return newArray;
    }
  });

  const handleSubmit = () => {
    setJobs((prev) => {
      const newJobs = [...prev, { job, status: "todo" }];
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      console.log(newJobs)
      return newJobs;
    });
    setJob("");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleChangeWork = (e) => {
    const selectItemId = e.target.getAttribute("data-itemid");
    setJobs((prevJobs) => {
      return prevJobs.map((jobObj, index) => {
        if (index === parseInt(selectItemId)) {
          return { ...jobObj, status: jobObj.status === "todo" ? "done" : "todo" };
        } else {
          return jobObj;
        }
      });
    });
  };

  const handleDelete = (index) => {
    setJobs((prevJobs) => {
      const newJobs = prevJobs.filter((_, i) => i !== index);
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
  };

//   const isItemSelected = (itemId) => selectWork.includes(itemId);

  const filteredJobs = jobs.filter((job) => {
    if (status === "all") {
      return true;
    } else if (status === "todo" && job.status === "todo" || status === "all") {
      return true;
    } else if (status === "done" && job.status === "done") {
      return true;
    }
    return false;
  });

  return (
    
    <div>
       <Header/>
       <div className="input-form">
            <input
                className="input-text"
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
            />
            <button className="input-btn" onClick={handleSubmit}>+</button>
       </div>
      
      <div className="list-work">
      <div className="list-work-top">
      <p className="list-work-top-p">List</p>
        <select
          name="status"
          id="status"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <ul>
          {filteredJobs.map((jobObj, index) => (
            <li
              data-itemid={index}
              style={{
                cursor: "pointer",
                textDecoration: jobObj.status === "done" ? "line-through" : "none",
                color: jobObj.status === "done" ? "#9CA3AF" : "black",
              }}
              className={`work-item ${index}`}
              key={index}
              onClick={handleChangeWork}
            >
              {index + 1}. {jobObj.job}
              <button
                className="delete-icon"
                onClick={() => handleDelete(index)}
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Todo;
