import React, { useState } from "react";
import { getAssignmentById } from "../../Backend/assigment";
import CourseNavBar from "../CourseNavBar";
import ErrorBox from "../Error";

function AssignmentContent(assignment) {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [submissionLimit, setSubmissionLimit] = useState("");
    const [error, setError] = useState("");

    setTitle(assignment.title);
    setDueDate(assignment.dueDate);
    setDescription(assignment.description);
    setSubmissionLimit(assignment.submissionLimit);

    return(
        <div className = "main-box" style={{ width: "100%" }}>
            <CourseNavBar />
            {error && <ErrorBox text={error} />}
            <div className="assignment-box">
                <h1>{title}</h1>
                <h2>{dueDate}</h2>
                <p>{description}</p>
                <p>{submissionLimit} </p>
            </div>
        </div>
    );
}

export default AssignmentContent;