import React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserRole } from "../Backend/user";

// CSS Styles
const TopbarRow = styled.div`
  height: 4.5em;
  flex-grow: 1;
  display: flex;
  padding: 0 1em;
  background-color: #20232a;
  justify-content: space-around;
  align-items: center;
`;

const TopbarButton = styled.div`
  display: flex;
  align-items: center;
  height: 3em;
  padding-right: 1em;
  padding-left: 1em;
  cursor: pointer;
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

export default function NavBar() {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchrole() {
      try {
        const role = await getUserRole();
        setRole(role);
        // console.log(role);
      } catch (error) {
        console.error(error);
      }
    }
    fetchrole();
  }, []);

  return (
    <TopbarRow>
      <TopbarButton
        onClick={() => {
          navigate("/announcements", { state: { courseId } });
        }}
      >
        <TopbarText>
          <Typography>Announcements</Typography>
        </TopbarText>
      </TopbarButton>
      <TopbarButton
        onClick={() => {
          navigate("/syllabus", { state: { courseId } });
        }}
      >
        <TopbarText>
          <Typography>Syllabus</Typography>
        </TopbarText>
      </TopbarButton>
      <TopbarButton
        onClick={() => {
          navigate("/assignments", { state: { courseId } });
        }}
      >
        <TopbarText>
          <Typography>Assignments</Typography>
        </TopbarText>
      </TopbarButton>
      <TopbarButton
        onClick={() => {
          navigate("/grades", { state: { courseId } });
        }}
      >
        <TopbarText>
          <Typography>Grades</Typography>
        </TopbarText>
      </TopbarButton>

      <TopbarButton
        onClick={() => {
          navigate("/quizzes", { state: { courseId } });
        }}
      >
        <TopbarText>
          <Typography>Quizzes</Typography>
        </TopbarText>
      </TopbarButton>
      <TopbarButton
        onClick={() => {
          navigate("/discussions", { state: { courseId } });
        }}
      >
        <TopbarText>
          <Typography>Discussions</Typography>
        </TopbarText>
      </TopbarButton>
      <TopbarButton
        onClick={() => {
          if (role === "instructor") {
            navigate("/classlist", { state: { courseId } });
          } else {
            navigate("/classlistStudent", { state: { courseId } });
          }
        }}
      >
        <TopbarText>
          <Typography>Classlist</Typography>
        </TopbarText>
      </TopbarButton>
    </TopbarRow>
  );
}
