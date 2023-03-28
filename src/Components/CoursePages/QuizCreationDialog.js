import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import { List, ListItem, ListItemText } from '@mui/material';
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
import { useState } from "react";

export function QuizCreationDialog(props) {
    const [trueFalseOpen, setTrueFalseOpen]           = useState(false);
    const [questionMenuAnchor, setQuestionMenuAnchor] = useState(null);
    const [quizQuestions, setQuizQuestions]           = useState([]);
    const [newQuestionText, setNewQuestionText]       = useState("");
    const [newQuestionPoints, setNewQuestionPoints]   = useState(0);
    const [newQuizName, setNewQuizName]               = useState("");
    const [newQuizDesc, setNewQuizDesc]               = useState("");
    const [newQuizPoints, setNewQuizPoints]           = useState(0);
    const [newQuizDeadline, setNewQuizDeadline]       = useState(new Date());

    const resetFields = () => {
      setNewQuizName("");
      setNewQuizName("");
      setNewQuizDesc("");
      setNewQuizPoints(0)
      setNewQuizDeadline(new Date());

      setQuizQuestions([]);
      setNewQuestionText("");
      setNewQuestionPoints(0);
    }

    return (<>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}
        PaperProps={{
          style: {
            backgroundColor: '#E9ECEE',
            boxShadow: 'none',
          },
        }}
      >
        {/* Topmost header */}
        <AppBar sx={{ position: 'relative', bgcolor: "#20232a"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>{
                resetFields();
                props.onClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Quiz
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>{
              const quiz = {
                name:         newQuizName,
                description:  newQuizDesc,
                points:       newQuizPoints,
                deadline:     newQuizDeadline,
                questions:    quizQuestions,
              };
              resetFields();
              props.onSave(quiz);
            }}>
              save and close
            </Button>
          </Toolbar>
        </AppBar>

        {/* Quiz property input fields */}
        <div style = {{padding: '1% 5%'}}>
          <TextField
            label="Quiz Name"
            sx={{ margin : '5px', width: "50%", 
                  "& .MuiInputBase-input": { color: 'black !important' },
                  "& .MuiInputLabel-root": { color: '#000A !important' } }}
            variant="standard"
            style={{width: '100%'}}
            onChange={e => {setNewQuizName(e.target.value)}}
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
            onChange={e => {setNewQuizPoints(e.target.value)}}
          />
          <DateTimePicker
            label="Due Date"
            style={{backgroundColor: "black !important"}}
            sx={{ margin : '5px', width: "50%", 
                  "& .MuiInputBase-input": { color: 'black !important' },
                  "& .MuiInputLabel-root": { color: '#000A !important' },
                }}
            onChange={value => {setNewQuizDeadline(value.toDate())}}
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
            onChange={e => {setNewQuizDesc(e.target.value)}}
          />
      </div>

        {/* Questions Header */}
        <div style = {{padding: '1% 5%'}}></div>
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
              
              </Toolbar>
          </AppBar>

          {/* Questions List */}
          <List >
            {quizQuestions.map((question)=><>
              <ListItem button>
                <ListItemText
                  primary={question.text}
                  secondary={question.type}
                />

                <ListItemText primary={question.points + " pts"} />
              </ListItem>
              <Divider />
            </>)}
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
          onChange={e => {setNewQuestionText(e.target.value)}}
        />
        <TextField
          label="Points"
          sx={{ margin : '5px', width: "50%", 
                "& .MuiInputBase-input": { color: 'black !important' },
                "& .MuiInputLabel-root": { color: '#000A !important' } }}
          variant="standard"
          onChange={e => {setNewQuestionPoints(e.target.value)}}
        />
        <DialogActions>
          <Button onClick={()=>{
            setTrueFalseOpen(false)
            setQuizQuestions([
              ...quizQuestions, {
              text: newQuestionText,
              type: "True or False",
              points: newQuestionPoints
            }])
          }}>Save</Button>
          <Button onClick={()=>{setTrueFalseOpen(false)}}>Cancel</Button>
        </DialogActions>

      </Dialog>
      </LocalizationProvider>
    </>)
}