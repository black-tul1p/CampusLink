import React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserRole } from "../Backend/user";
import { Menu } from "@mui/icons-material";

// CSS Styles
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

const HamburgerIcon = styled(Menu)`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    left: 1.75rem;
    top: 5.5rem;
    z-index: 2;
  }
`;

const NavigationLinks = styled.div`
  display: flex;
  margin-left: 5rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: calc(100% - 5rem);
    left: 0;
    background-color: #20232a;
    z-index: 1;
    padding: 1em 0;
  }
`;

export default function NavBar() {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [showNavLinks, setShowNavLinks] = useState(false);

  const TopbarRow = styled.div`
    width: calc(100vw-4.5em);
    height: 4.5em;
    flex-grow: 1;
    display: flex;
    padding: 0 2em;
    justify-content: space-between;
    background-color: #20232a;
    align-items: center;
    @media (max-width: 768px) {
      display: none;
    }
  `;

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

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <div>
      <HamburgerIcon onClick={toggleNavLinks} />
      <TopbarRow showNavLinks={showNavLinks}>
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
            navigate("/bookmarks", { state: { courseId } });
          }}
        >
          <TopbarText>
            <Typography>Bookmarks</Typography>
          </TopbarText>
        </TopbarButton>
        {/* <TopbarButton
          onClick={() => {
            navigate("/syllabus", { state: { courseId } });
          }}
        >
          <TopbarText>
            <Typography>Syllabus</Typography>
          </TopbarText>
        </TopbarButton> */}
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
      {showNavLinks && (
        <NavigationLinks>
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
              navigate("/bookmarks", { state: { courseId } });
            }}
          >
            <TopbarText>
              <Typography>Bookmarks</Typography>
            </TopbarText>
          </TopbarButton>
          {/* <TopbarButton
            onClick={() => {
              navigate("/syllabus", { state: { courseId } });
            }}
          >
            <TopbarText>
              <Typography>Syllabus</Typography>
            </TopbarText>
          </TopbarButton> */}
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
        </NavigationLinks>
      )}
    </div>
  );
}
