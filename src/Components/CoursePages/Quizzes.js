import React from "react";
import CourseNavBar from "../CourseNavBar";
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Quizzes() {
  const [open, setOpen] = React.useState(false);
  const [trueFalseOpen, setTrueFalseOpen] = React.useState(false);
  const [questionMenuAnchor, setQuestionMenuAnchor] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ width: "100%" }}>
      <CourseNavBar />

      <Button
        className="add-button"
        style = {{display: 'block', margin: 'auto'}}
        onClick={() => {
          handleClickOpen()
        }}
        variant="contained"
      >
        Create New Quiz      
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#E9ECEE',
            boxShadow: 'none',
          },
        }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: "#20232a"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Quiz
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save and close
            </Button>
          </Toolbar>
        </AppBar>

        <div style = {{padding: '1% 5%'}}>
          <TextField
            label="Quiz Name"
            sx={{ margin : '5px', width: "50%", 
                  "& .MuiInputBase-input": { color: 'black !important' },
                  "& .MuiInputLabel-root": { color: '#000A !important' } }}
            variant="standard"
            style={{width: '100%'}}
          />
          <br/>
          <TextField
            label="Grade out of"
            sx={{ margin : '5px', width: "50%", 
                  "& .MuiInputBase-input": { color: 'black !important' },
                  "& .MuiInputLabel-root": { color: '#000A !important' } }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">points</InputAdornment>,
                  }}
            variant="standard"
            style={{width: '20em'}}
          />
          <DateTimePicker
            label="Due Date"
            style={{backgroundColor: "black !important"}}
            sx={{ margin : '5px', width: "50%", 
                  "& .MuiInputBase-input": { color: 'black !important' },
                  "& .MuiInputLabel-root": { color: '#000A !important' },
                }}
          />
          <TextField
            label="Description"
            sx={{ margin : '5px', width: "50%", 
                  "& .MuiInputBase-input": { color: 'black !important' },
                  "& .MuiInputLabel-root": { color: '#000A !important' } }}
            variant="standard"
            style={{width: '100%'}}
            multiline
            minRows="3"
          />
      </div>
          <AppBar sx={{ position: 'relative', bgcolor: "#20232a"}}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 0 }} variant="h6" component="div">
                Questions
              </Typography>

              <Button 
                autoFocus
                color="inherit"
                style={{marginLeft: '50px'}}
                id="create-question-button"
                onClick={(event)=>{setQuestionMenuAnchor(event.currentTarget)}}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Create New
              </Button>
                    
              <Menu
                id="basic-menu"
                open={Boolean(questionMenuAnchor)}
                onClose={() => {setQuestionMenuAnchor(null)}}
                anchorEl = {questionMenuAnchor}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => {
                  setQuestionMenuAnchor(null);
                  setTrueFalseOpen(true);
                }}>True or False</MenuItem>
                <MenuItem onClick={() => {setQuestionMenuAnchor(null)}}>Multiple Choice</MenuItem>
                <MenuItem onClick={() => {setQuestionMenuAnchor(null)}}>Short Answer</MenuItem>
              </Menu> 
              
              <Button autoFocus color="inherit" style={{marginLeft: 'auto'}}>
                Preview
              </Button>
            </Toolbar>
          </AppBar>

          <List >
            <ListItem button>
              <ListItemText primary="Question 1" secondary="Multiple Choice" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Question 2"
                secondary="True or False"
              />
            </ListItem>
          </List>
      </Dialog>

      <Dialog open={trueFalseOpen} sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "750px",
          },
        },
      }}>
        <DialogTitle>New True or False Question</DialogTitle>
        <TextField
          label="Question Text"
          sx={{ margin : '5px', width: "50%", 
                "& .MuiInputBase-input": { color: 'black !important' },
                "& .MuiInputLabel-root": { color: '#000A !important' } }}
          variant="standard"
          fullWidth
          multiline
          minRows="2"
        />
        <TextField
          label="Points"
          sx={{ margin : '5px', width: "50%", 
                "& .MuiInputBase-input": { color: 'black !important' },
                "& .MuiInputLabel-root": { color: '#000A !important' } }}
          variant="standard"
        />
        <DialogActions>
          <Button onClick={()=>{
            setTrueFalseOpen(false)
          }}>Save</Button>
          <Button onClick={()=>{setTrueFalseOpen(false)}}>Cancel</Button>
        </DialogActions>

      </Dialog>
    </div>
    </LocalizationProvider>
  );
}

export default Quizzes;
