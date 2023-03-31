import { useState, useEffect } from "react";
import CourseNavBar from "../CourseNavBar";
import ErrorBox from "../Error";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography} from "@mui/material";
import styled from "@emotion/styled";
import { Timestamp } from "@firebase/firestore";
import "../../Styles/Assignments.css";
import "../../Styles/App.css";

const TopbarRow = styled.div`
  height: 4.5em;
  flex-grow: 1;
  display: flex;
  padding: 0 2em;
  justify-content: space-between;
  background-color: #20232a;
  align-items: center;
`;

const TopbarButton = styled.div`
  display: flex;
  sizing: border-box;
  align-items: center;
  width: 8em;
  cursor: pointer;
  padding: 0 0.5em;
  border-radius: 2em;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: teal;
  }
`;

const TopbarText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  width: 8em;
  border-radius: 1em;
  font-size: 1em;
`;

function AssignmentContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const title = location.state?.assignmentTitle;
    const dueDate = location.state?.assignmentDueDate;
    const description = location.state?.assignmentDescript;
    const submissionLimit = location.state?.assignmentSumLim;
    console.log("Stuff should display here " + title + " " + dueDate + " " + description + " " + submissionLimit);
    
    const displayDueDate = (new Date(dueDate)).toDateString();
    console.log((new Date(dueDate)));

    return(
        <div className = "main-box" style={{ width: "100%" }}>
            {error && <ErrorBox text={error} />}
            <div className="top-row">
                <TopbarRow>
                    <TopbarButton
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                    <TopbarText>
                        <Typography>Back</Typography>
                    </TopbarText>
                    </TopbarButton>
                </TopbarRow>
            </div>
            <h1 className="title">
                {title}
            </h1>
            <h2>
                {displayDueDate}
            </h2>
        </div>
    );
}

export default AssignmentContent;