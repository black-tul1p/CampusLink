import {collection, doc, getDoc, getDocs} from "@firebase/firestore";
import {useState, useEffect} from "react";
import { firestore } from "../Backend/firebase";
import { useSearchParams } from "react-router-dom";
import "./Classlist.css";
import { Box, Tab, Tabs, Typography } from "@mui/material";
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

export default function Admin() {
  const [instructors, setInstructors] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
	setValue(newValue);
  }

  useEffect(() => {
    //Get students and add to list
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
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} >
                <Tab label="Students" {...allyProps(0)} />
                <Tab label="Instructors" {...allyProps(1)} />
                <Tab label="Pending Requests" {...allyProps(2)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            This is changed
        </TabPanel>
        <TabPanel value={value} index={1}>
            Instructor 
        </TabPanel>
        <TabPanel value={value} index={2}>
            Pending Requests
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