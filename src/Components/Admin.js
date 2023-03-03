import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Backend/firebase";
import { Person } from "@mui/icons-material";
import "./Classlist.css";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import ErrorBox from "./Error";
import { getUserByEmail } from "../Backend/user";
import "../App.css";

//From Material UI website example

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, minWidth: "56em", height: "100vh" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [pendingInstructors, setPendingInstructors] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [error, setError] = useState("");
  const [reload, setReload] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApprove = (e) => {
    getUserByEmail(selectedInstructor).then((user) => {
      const userId = user.id;
      const newField = { accepted: true };
      const userRef = doc(firestore, "instructors", userId);
      updateDoc(userRef, newField).then(() => {
        //alert("approve");
        // window.location.reload();
        //setReload(false);
      });
    });
  };

  const handleDeny = (e, user) => {
    alert("deny");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [studentSet, instructorSet] = await Promise.all([
          getDocs(collection(firestore, "students")),
          getDocs(collection(firestore, "instructors")),
        ]);

        const studentList = studentSet.docs.map((doc) => ({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
        }));

        const instructorList = instructorSet.docs.map((doc) => ({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
        }));

        let pendingInstructorList = [];
        instructorSet.forEach((doc) => {
          if (!doc.data().accepted) {
            pendingInstructorList.push({
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email,
            });
          }
        });

        setStudents(studentList);
        setInstructors(instructorList);
        setPendingInstructors(pendingInstructorList);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%", maxHeight: "100vh", overflow: "hidden" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Students" {...allyProps(0)} />
          <Tab label="Instructors" {...allyProps(1)} />
          <Tab label="Pending Requests" {...allyProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="adminPage">
          <div className="classlist-wrapper">
            <h1 className="title">Student List</h1>
            <div
              style={{ overflow: "auto", maxHeight: "70vh", marginBottom: 3 }}
            >
              <table className="classlist">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                  {console.log(students)}
                  {students.map((student) => (
                    <tr>
                      <td>
                        {student.firstName && student.lastName
                          ? `${student.firstName} ${student.lastName}`
                          : "Name not available"}
                      </td>
                      <td>{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p id="student-count-label">Total Students: {students.length}</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="adminPage">
          <div className="classlist-wrapper">
            <h1 className="title">Instructor List</h1>
            <div
              style={{ overflow: "auto", maxHeight: "70vh", marginBottom: 3 }}
            >
              <table className="classlist">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>

                  {instructors.map((instructor) => (
                    <tr>
                      <td>
                        {instructor.lastName}, {instructor.firstName}
                      </td>
                      <td>{instructor.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p id="student-count-label">
              Total Instructors: {instructors.length}
            </p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {reload && (
          <div className="adminPage">
            <div className="classlist-wrapper">
              <h1 className="title">Pending Instructor List</h1>
              {error && <ErrorBox text={error} />}
              <div id="Approve-box">
                <TextField
                  required
                  id="f-name-input"
                  variant="outlined"
                  placeholder="email@organization.edu"
                  value={selectedInstructor}
                  onChange={(e) => {
                    setSelectedInstructor(e.target.value);
                  }}
                />
                <div>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeny}
                  >
                    Deny
                  </Button>
                </div>
              </div>
              <div
                style={{ overflow: "auto", maxHeight: "70vh", marginBottom: 3 }}
              >
                <table className="classlist">
                  <thead>
                    <tr>
                      <th className="accountTypeColumn">Email</th>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingInstructors.map((pendingInstructor) => (
                      <tr>
                        <td className="userTypeColumn">
                          {pendingInstructor.email}
                        </td>
                        <td>
                          {pendingInstructor.lastName},
                          {pendingInstructor.firstName}
                        </td>
                        <td>Pending</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p id="student-count-label">
                Total Pending Instructors: {pendingInstructors.length}
              </p>
            </div>
          </div>
        )}
      </TabPanel>
    </Box>
  );
}

function InstructorInfoRow(props) {
  return (
    <tr>
      <td className="profile-pic"></td>
      <td>
        {props.lastName}, {props.firstName}
      </td>
      <td>{props.email}</td>
    </tr>
  );
}

InstructorInfoRow.defaultProps = {
  firstName: "Firstname",
  lastName: "Lastname",
  email: "example@gmail.com",
};

InstructorInfoRow.defaultProps = {
  firstName: "Firstname",
  lastName: "Lastname",
  email: "example@gmail.com",
};
