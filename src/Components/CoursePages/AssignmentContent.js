import { useState } from "react";
import CourseNavBar from "../CourseNavBar";
import ErrorBox from "../Error";

function AssignmentContent() {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [submissionLimit, setSubmissionLimit] = useState("");
    const [error, setError] = useState("");

    const loadData = (assignmentTitle, assignmentDueDate, assignmentDescript, assignmentSubLim) => {
        setTitle(assignmentTitle);
        setDueDate(assignmentDueDate);
        setDescription(assignmentDescript);
        setSubmissionLimit(assignmentSubLim);
        console.log(title + " " + dueDate + " " + description + " " + submissionLimit);
    }

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