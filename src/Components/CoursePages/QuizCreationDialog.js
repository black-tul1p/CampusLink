import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogActions, TableContainer } from "@mui/material";
import { List, ListItem, ListItemText } from '@mui/material';
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
import { useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormGroup from '@mui/material/FormGroup';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import dayjs from 'dayjs';

export function QuizCreationDialog(props) {
    const [questionType, setQuestionType]             = useState(null);
    const [editingIndex, setEditingIndex]             = useState(null);

    const [newQuizName, setNewQuizName]               = useState("");
    const [newQuizDesc, setNewQuizDesc]               = useState("");
    const [newQuizPoints, setNewQuizPoints]           = useState(0);
    const [newQuizDeadline, setNewQuizDeadline]       = useState(new Date());
    const [noDeadline, setNoDeadline]                 = useState(false);
    const [timeLimitHours, setTimeLimitHours]         = useState(0);
    const [timeLimitMinutes, setTimeLimitMinutes]     = useState(0);
    const [noTimeLimit, setNoTimeLimit]               = useState(false);
    const [quizQuestions, setQuizQuestions]           = useState([]);
    const [questionMenuAnchor, setQuestionMenuAnchor] = useState(null);
    const [defaultQuestion, setDefaultQuestion]       = useState({});
    const [attempts, setattempts]             = useState(1);
    const [unlimitedAttempts, setUnlimitedAttempts]   = useState(false);

    const resetFields = () => {
      setNewQuizName(props.default.name);
      setNewQuizDesc(props.default.description);
      setNewQuizPoints(props.default.points);
      setNewQuizDeadline(props.default.deadline ?? new Date());
      setQuizQuestions(props.default.questions);
      setTimeLimitHours(Math.floor((props.default.timeLimit ?? 0) / 60));
      setTimeLimitMinutes((props.default.timeLimit ?? 0) % 60);
      setNoTimeLimit(!Boolean(props.default.timeLimit));
      setNoDeadline(!Boolean(props.default.deadline));
      setUnlimitedAttempts(!Boolean(props.default.attempts));
    }

    const defaultTrueFalse      = {text: "", points: 0, manual: false, answers: ["true"], choices: null};
    const defaultMultipleChoice = {text: "", points: 0, manual: false, answers: [],       choices: ["", "", "", ""]};
    const defaultShortAnswer    = {text: "", points: 0, manual: false, answers: [""],     choices: null};

    useEffect(()=> {
      if (props.open) resetFields();
    }, [props.open])

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
        <AppBar style={{position: "sticky"}} sx={{ position: 'relative', bgcolor: "#20232a"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              style={{height: "auto"}}
              onClick={()=>{
                props.onClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.title}
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>{
              const quiz = {
                name:         newQuizName,
                description:  newQuizDesc,
                points:       newQuizPoints,
                deadline:     noDeadline ? null : newQuizDeadline,
                questions:    quizQuestions,
                timeLimit:    noTimeLimit ? null : Number(timeLimitHours) * 60 + Number(timeLimitMinutes),
                attempts:     unlimitedAttempts ? null : Number(attempts),
              };
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
            defaultValue={props.open ? props.default.name : ""}
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
            style={{width: '20em', paddingRight: '5em'}}
            onChange={e => {
              if (!e.target.value.match(/^[0-9]*$/)) e.target.value = newQuizPoints;
              setNewQuizPoints(e.target.value);
            }}
            defaultValue={props.open ? props.default.points : 0}
          />


          <FormControl style={{paddingRight: '5em'}}>
            <DateTimePicker
              label="Due Date"
              style={{backgroundColor: "black !important"}}
              sx={{ margin : '5px', width: "20em", 
                    "& .MuiInputBase-input": { color: 'black !important' },
                    "& .MuiInputLabel-root": { color: '#000A !important' },
                    "& .MuiSvgIcon-root": { color: "unset" }
                  }}
              onChange={value => {setNewQuizDeadline(value.toDate())}}
              defaultValue={(props.open && props.default.deadline) ? dayjs(props.default.deadline) : dayjs()}
              slotProps={{ textField: { variant: 'standard', } }}
              disabled={noDeadline}
            />
            <FormControlLabel
              label="No Deadline"
              style={{color: "#333"}}
              control={<Checkbox
                sx={{"& .MuiSvgIcon-root": { color: "unset" }}}
                onChange={event => {setNoDeadline(event.target.checked)}}
                defaultChecked={props.open ? !Boolean(props.default.deadline) : true}
              />}
            />
          </FormControl>

          <FormControl style={{paddingRight: '5em'}}>
            <FormGroup row>
              <TextField
                label="Hours"
                sx={{ margin : '5px', width: "50%", 
                      "& .MuiInputBase-input": { color: 'black !important' },
                      "& .MuiInputLabel-root": { color: '#000A !important' } }}
                variant="standard"
                style={{width: '10em'}}
                onChange={e => {
                  if (!e.target.value.match(/^[0-9]*$/)) e.target.value = timeLimitHours;
                  setTimeLimitHours(e.target.value)
                }}
                defaultValue={(props.open && props.default.timeLimit) ? Math.floor(props.default.timeLimit/60) : 0}
                disabled={noTimeLimit}
              />
              <TextField
                label="Minutes"
                sx={{ margin : '5px', width: "50%", 
                      "& .MuiInputBase-input": { color: 'black !important' },
                      "& .MuiInputLabel-root": { color: '#000A !important' } }}
                variant="standard"
                style={{width: '10em'}}
                onChange={e => {
                  if (!e.target.value.match(/^[0-9]*$/)) e.target.value = timeLimitMinutes;
                  if (e.target.value > 59) e.target.value = timeLimitMinutes;
                  setTimeLimitMinutes(e.target.value);
                }}
                defaultValue={(props.open && props.default.timeLimit) ? props.default.timeLimit % 60 : 0}
                disabled={noTimeLimit}
              />
              
            </FormGroup>
            <FormControlLabel
              label="Unlimited Time"
              style={{color: "#333"}}
              control={<Checkbox
                sx={{"& .MuiSvgIcon-root": { color: "unset" }}}
                onChange={event => {setNoTimeLimit(event.target.checked)}}
                defaultChecked={props.open ? !Boolean(props.default.timeLimit) : true}
              />}
            />
            
          </FormControl>

          <FormControl>
              <TextField
                label="Quiz Attempts"
                sx={{
                  margin: "5px",
                  width: "50%",
                  "& .MuiInputBase-input": { color: "black !important" },
                  "& .MuiInputLabel-root": { color: "#000A !important" },
                }}
                variant="standard"
                style={{ width: "10em" }}
                type="number"
                inputProps={{ min: 1 }}
                onChange={(e) => {
                  if (e.target.value < 1) e.target.value = 1;
                  setattempts(e.target.value);
                }}
                defaultValue={props.open ? props.default.attempts : 1}
                disabled={unlimitedAttempts}
              />
            <FormControlLabel
              label="Unlimited Attempts"
              style={{ color: "#333" }}
              control={
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { color: "unset" } }}
                  onChange={(event) => {
                    setUnlimitedAttempts(event.target.checked);
                  }}
                  defaultChecked={props.open ? !Boolean(props.default.attempts) : false}
                />
              }
            />
          </FormControl>

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
            defaultValue={props.open ? props.default.description : ""}
          />
      </div>

        {/* Questions Header */}
        <div style = {{padding: '1% 5%'}}></div>
          <AppBar style={{position: "sticky"}} sx={{ position: 'relative', bgcolor: "#20232a"}}>
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
                  setDefaultQuestion(defaultTrueFalse);
                  setQuestionType("True or False");
                }}>True or False</MenuItem>
                <MenuItem onClick={() => {
                  setQuestionMenuAnchor(null);
                  setDefaultQuestion(defaultMultipleChoice);
                  setQuestionType("Multiple Choice");
                }}>Multiple Choice</MenuItem>
                <MenuItem onClick={() => {
                  setQuestionMenuAnchor(null);
                  setDefaultQuestion(defaultShortAnswer);
                  setQuestionType("Short Answer");
                }}>Short Answer</MenuItem>
              </Menu> 
              
              </Toolbar>
          </AppBar>

          {/* Questions List */}

          <div style = {{padding: '1% 5%'}}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} >
            <colgroup>
              <col width="33%" />
              <col width="33%" />
              <col width="33%" />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Accepted Answers</TableCell>
                <TableCell>Points</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>

              {quizQuestions.map((question, index)=><>
                <TableRow>
                  <TableCell>
                    <div style={{display: "flex", flexDirection: "row"}}>
                      <IconButton
                      sx={{"& .MuiSvgIcon-root": { color: "unset" }}}
                      style={{margin: "auto 10px auto 0"}}
                      onClick={()=>{
                        setQuizQuestions(quizQuestions.filter(quizQuestion => quizQuestion !== question))
                      }}
                      >
                        <RemoveCircleIcon/> 
                      </IconButton>
                      <ListItemText primary={question.text} secondary={question.type}/>
                    </div>
                  </TableCell>
                  <TableCell>{
                    question.manual ? 
                      "Graded Manually" : 
                      question.answers.map(answr => {return '"' + answr + '"'}).join(", ")
                  }</TableCell>
                  <TableCell>{question.points + " pts"}</TableCell>
                  <TableCell>
                    <Button onClick={()=>{
                      setDefaultQuestion(question);
                      setEditingIndex(index);
                    }}>Edit</Button>
                  </TableCell>
                </TableRow>
              </>)}
            </TableBody>
            </Table>
          </TableContainer>
          </div>
          
      <QuestionCreationDialog
        default={defaultQuestion}
        open={Boolean(questionType)}
        onCancel={()=>{setQuestionType(null);}}
        onSave={(question)=>{
          setQuizQuestions([...quizQuestions, question])
          setQuestionType(null)
        }}
        type={questionType}
        title={"New " + questionType + " Question"}
      />

      <QuestionCreationDialog
        default={defaultQuestion}
        open={editingIndex !== null}
        onCancel={()=>{setEditingIndex(null);}}
        onSave={(question)=>{
          let updatedQuestions = quizQuestions;
          updatedQuestions[editingIndex] = question;
          setQuizQuestions(updatedQuestions);
          setEditingIndex(null);
        }}
        type={defaultQuestion.type}
        title={"Editing " + defaultQuestion.type + " Question"}
      />

      </Dialog>
      </LocalizationProvider>
    </>)
}

function QuestionCreationDialog(props) {
  const [newQuestionText, setNewQuestionText]       = useState("");
  const [newQuestionPoints, setNewQuestionPoints]   = useState(0);
  const [gradeManually, setGradeManually]           = useState(false);
  const [answers, setAnswers]                       = useState([]);
  const [choices, setChoices]                       = useState([
    {text: "", correct: false},
    {text: "", correct: false},
    {text: "", correct: false},
    {text: "", correct: false}
  ]);

  const resetFields = () => {
    setNewQuestionText(props.default.text);
    setNewQuestionPoints(props.default.points);
    setGradeManually(props.default.manual);
    setAnswers(props.default.answers);

    if (props.default.choices !== null) {
      setChoices(props.default.choices.map(choice => {
        return {text: choice, text: answers.includes(choice)}
      }));
    }
  }

  useEffect(()=>{
    if (props.open) resetFields();
  }, [props.open])

  const content = () => {
    switch (props.type) {
      case "True or False": return (
        !gradeManually && <>
          <DialogTitle>Answer</DialogTitle>
          <ToggleButtonGroup
            color="primary"
            value={answers[0]}
            exclusive
            onChange={(event, string) => {setAnswers([string]);}}
            aria-label="Platform"
          >
            <ToggleButton disableRipple value="true" >True</ToggleButton>
            <ToggleButton disableRipple value="false">False</ToggleButton>
          </ToggleButtonGroup>
        </>
      );
      case "Multiple Choice": return (<>
          <DialogTitle>Answers</DialogTitle>
          {choices.map((choice, index) => <>
            <div style={{display: "flex"}}>
              {!gradeManually &&
              <Checkbox
                style={{alignSelf: "flex-end"}}
                icon={<CheckCircleOutlineIcon/>}
                checkedIcon={<CheckCircleIcon/>}
                sx={{"& .MuiSvgIcon-root": { color: "unset" }}}
                onChange={(event) => {
                  let updated_choices = choices;
                  updated_choices[index].correct = event.target.checked;
                  setChoices(updated_choices);
                }}
                defaultChecked={props.default.answers.includes(props.default.choices[index])}
              />}
              <TextField
                sx={{ margin : '5px', width: "50%", 
                      "& .MuiInputBase-input": { color: 'black !important' },
                      "& .MuiInputLabel-root": { color: '#000A !important' } }}
                variant="standard"
                label="Answer Choice"
                onChange={(event) => {
                  let updated_choices = choices;
                  updated_choices[index].text = event.target.value;
                  setChoices(updated_choices);
                }}
                defaultValue={props.default.choices[index]}
              />
            </div>
          </>)}
      </>);
      case "Short Answer": return (
        !gradeManually && <>
          <TextField
            sx={{ margin : '5px', width: "50%", 
                  "& .MuiInputBase-input": { color: 'black !important' },
                  "& .MuiInputLabel-root": { color: '#000A !important' } }}
            variant="standard"
            label="Accepted Answer"
            onChange={(event) => {
              setAnswers([event.target.value]);
            }}
          />
        </>
      );
    }
  }

  return (
    <Dialog open={props.open} sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "750px",
            padding: "10px"
          },
        },
      }}>
        <DialogTitle>{props.title}</DialogTitle>
        <TextField
          label="Question Text"
          sx={{ margin : '5px', width: "50%", 
                "& .MuiInputBase-input": { color: 'black !important' },
                "& .MuiInputLabel-root": { color: '#000A !important' } }}
          variant="standard"
          style={{width: '90%'}}
          multiline
          minRows="2"
          onChange={e => {setNewQuestionText(e.target.value)}}
          defaultValue={props.default.text}
        />

        <div style={{display: "flex"}}>
          <TextField
            label="Points"
            sx={{ margin : '5px', width: "50%", 
                  "& .MuiInputBase-input": { color: 'black !important' },
                  "& .MuiInputLabel-root": { color: '#000A !important' } }}
            variant="standard"
            onChange={e => {
              if (!e.target.value.match(/^[0-9]*$/)) e.target.value = newQuestionPoints;
              setNewQuestionPoints(e.target.value);
            }}
            defaultValue={props.default.points}
          />

          <FormControlLabel
            style={{alignSelf: "flex-end", marginLeft: '10%', color: "#333"}}
            control={
              <Checkbox
                sx={{"& .MuiSvgIcon-root": { color: "unset" }}}
                onChange={(event)=>{
                  setGradeManually(event.target.checked);
                }}
                defaultChecked={props.default.manual}
              />
            }
            label="Grade Manually"
          />
        </div>

        {content()}
        
        <DialogActions>
          <Button onClick={()=>{
            let updatedAnswers = answers;
            if (props.type === "Multiple Choice") {
              updatedAnswers = choices.filter(choice => {return choice.correct})
                                      .map(choice => {return choice.text});
            }

            props.onSave({
              text: newQuestionText,
              type: props.type,
              points: newQuestionPoints,
              answers: gradeManually ? null : updatedAnswers,
              manual: gradeManually,
              choices: props.type === "Multiple Choice" ? 
                choices.map(choice => {return choice.text}) 
              :
                null
            });
          }}>Save</Button>
          <Button onClick={() => {props.onCancel()}}>Cancel</Button>
        </DialogActions>

    </Dialog>
  );
}