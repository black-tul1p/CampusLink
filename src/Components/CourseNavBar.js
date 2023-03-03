import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Typography
} from "@mui/material";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// CSS Styles
const Sidebar = styled.div`
  flex-shrink: 0;
  width:94vw;
  height: 5em;
  background-color: #20232a;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;


const SidebarDivider = styled.div`
  flex-shrink: 0;
  width: 1px;
  background-color: #3c3f4c;
  margin-bottom: 1em;
  margin-top: 0.5em;
`;

const SidebarRow = styled.div`
  flex-shrink: 0;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-content: center;
  padding-top: 1em;
  padding-bottom: 1em;
  margin-top: auto;
  margin-bottom: 1em;
  margin-left: 1em;
`;

const SidebarButton = styled.div`
  display: flex;
  align-items: center;
  height: 3em;
  padding-right: 1em;
  padding-left: 1em;
  cursor: pointer;
  &:hover {
    background-color: teal;
  }
`;

const SidebarText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  width: 8em;
  border-radius: 1em;
  &:hover {
    background-color: teal;
  }
`;

export default function NavBar() {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const navigate = useNavigate();
  alert({courseId});
  return (
    <Sidebar>
      <SidebarDivider />
      <SidebarRow>
        <SidebarButton
          onClick={() => {
            navigate("/announcements", { state: {courseId} });
          }}
        >
            <SidebarText>
              <Typography style={{ fontSize: "1em" }}>Announcements</Typography>
            </SidebarText>
        </SidebarButton>
        <SidebarButton
          onClick={() => {
            navigate("/syllabus" , { state: {courseId} });
          }}
        >
            <SidebarText>
              <Typography style={{ fontSize: "1em" }}>Syllabus</Typography>
            </SidebarText>
        </SidebarButton>
        <SidebarButton
            onClick={() => {
              navigate("/assignments", { state: {courseId} });
            }}
          >
            <SidebarText>
              <Typography style={{ fontSize: "1em" }}>Assignments</Typography>
            </SidebarText>
        </SidebarButton>
        <SidebarButton
            onClick={() => {
              navigate("/grades", { state: {courseId} });
            }}
          >
            <SidebarText>
              <Typography style={{ fontSize: "1em" }}>Grades</Typography>
            </SidebarText>
        </SidebarButton>
        
        <SidebarButton
            onClick={() => {
              navigate("/quizzes", { state: {courseId} });
            }}
          >
            <SidebarText>
              <Typography style={{ fontSize: "1em" }}>Quizzes</Typography>
            </SidebarText>
        </SidebarButton>
        <SidebarButton
            onClick={() => {
              navigate("/discussions", { state: {courseId} });
            }}
          >
            <SidebarText>
              <Typography style={{ fontSize: "1em" }}>Discussions</Typography>
            </SidebarText>
        </SidebarButton>
        <SidebarButton
            onClick={() => {
              navigate("/classlist", { state: {courseId} });
            }}
          >
            <SidebarText>
              <Typography style={{ fontSize: "1em" }}>Classlist</Typography>
            </SidebarText>
        </SidebarButton>
      </SidebarRow>
    </Sidebar>
  );
}