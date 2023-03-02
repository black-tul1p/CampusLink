import {collection, doc, getDoc, getDocs} from "@firebase/firestore";
import {useState, useEffect} from "react";
import { firestore } from "../Backend/firebase";
import { useSearchParams } from "react-router-dom";
import "./Classlist.css";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { PropTypes } from "prop-types";

//From Material UI website example

function TabPanel(props) {
    const {children, value, index, ...other } = props;

    return (
        <div
        	role="tabpanel"
        	hidden={value !== index}
        	id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
        	{...other}
        >
            {value === index && (
                <Box sx={{ p:3 }}>
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
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function handleApprove() {
	alert("approve");
}

function handleDeny() {
	alert("deny");
}

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [pendingInstructors, setPendingInstructors] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
	setValue(newValue);
  }

  useEffect(() => {
    getDocs(collection(firestore, 'students')) 
    .then((studentSet) => {
      let studentList = []
      studentSet.forEach((doc) => {
        studentList.push({firstName: doc.data().firstName,
                          lastName:  doc.data().lastName,
                          email:     doc.data().email});
      });
      setStudents(studentList);
    });
	
    getDocs(collection(firestore, 'instructors')) 
    .then((instructorSet) => {
      let instructorList = []
      instructorSet.forEach((doc) => {
        if (doc.data().accepted) {
        instructorList.push({firstName: doc.data().firstName,
                          lastName:  doc.data().lastName,
                          email:     doc.data().email});
        }
      });
      setInstructors(instructorList);
    });

	getDocs(collection(firestore, 'instructors')) 
    .then((pendingInstructorSet) => {
      let pendingInstructorList = []
      pendingInstructorSet.forEach((doc) => {
        if (!doc.data().accepted) {
        pendingInstructorList.push({firstName: doc.data().firstName,
                          lastName:  doc.data().lastName,
                          email:     doc.data().email});
        }
      });
      setPendingInstructors(pendingInstructorList);
    });
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
			value={value}
			onChange={handleChange}
			centered
			>
                <Tab label="Students" {...allyProps(0)} />
                <Tab label="Instructors" {...allyProps(1)} />
                <Tab label="Pending Requests" {...allyProps(2)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
		<div className="adminPage">
      	<div className="classlist-wrapper">
        <h1 className="title" >Student List</h1>

        <table className="classlist">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>

            {students.map(student => (
              <tr>
                <td>{student.lastName}, {student.firstName}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p id="student-count-label">Total Students: {students.length}</p>
      </div>
    </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
		<div className="adminPage">
      	<div className="classlist-wrapper">
        <h1 className="title" >Instructor List</h1>

        <table className="classlist">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>

            {instructors.map(instructor => (
              <tr>
                <td>{instructor.lastName}, {instructor.firstName}</td>
                <td>{instructor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p id="student-count-label">Total Instructors: {instructors.length}</p>
      </div>
    </div> 
        </TabPanel>
        <TabPanel value={value} index={2}>
		<div className="adminPage">
      	<div className="classlist-wrapper">
        <h1 className="title" >Pending Instructor List</h1>

        <table className="classlist">
          <tbody>
            <tr>
              <th className="accountTypeColumn">Status</th>
              <th>Name</th>
              <th>Email</th>
            </tr>

            {pendingInstructors.map(pendingInstructor => (
              <tr>
                <td className="userTypeColumn">
                  <Button className="Mini-button"
				  	onClick={handleApprove}
					>
						Approve
					</Button> 
					<Button className="Mini-button"
				  	onClick={handleDeny}
					>
						Deny
					</Button>
                </td>
                <td>{pendingInstructor.lastName}, {pendingInstructor.firstName}</td>
                <td>{pendingInstructor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p id="student-count-label">Total Pending Instructors: {pendingInstructors.length}</p>
      </div>
    </div>
        </TabPanel>
    </Box>
  );
}

function InstructorInfoRow(props) {
  return (
    <tr>
      <td className="profile-pic"></td>
      <td>{props.lastName}, {props.firstName}</td>
      <td>{props.email}</td>
    </tr>
  );
}

InstructorInfoRow.defaultProps = {
  firstName: "Firstname",
  lastName: "Lastname",
  email: "example@gmail.com",
}