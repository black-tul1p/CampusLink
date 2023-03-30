import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { auth } from "../../Backend/firebase";

function DiscussionList(props) {
  const handlePrivacyChange = async (discussion, e) => {
    e.stopPropagation();
    const newValue = e.target.value;
    console.log(`Discussion: ${discussion.id}, privacy: ${newValue}`);
  
    const updatedDiscussions = props.discussions.map((d) => {
      if (d.id === discussion.id) {
        return { ...d, privacy: newValue };
      }
      return d;
    });
  
    try {
      await props.updateDiscussionPrivacy(discussion.id, newValue);
      console.log("Privacy updated successfully");
    } catch (error) {
      console.error("Error updating privacy:", error);
    } finally {
      props.setDiscussions(updatedDiscussions);
    }
  };
  
  return (
    <List
      sx={{
        padding: 0,
        overflow: "auto",
        color: "whitesmoke",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      {props.discussions.map((discussion) => (
        <ListItem
          key={discussion.id}
          onClick={() => props.setSelectedDiscussion(discussion)}
          className={`discussion-item ${
            props.selectedDiscussion === discussion ? "expanded" : ""
          }`}
          style={{
            border: "rgb(255, 255, 255, 0.5) thin solid",
            borderRadius: "0.5em",
            display: "flex",
            flexDirection: "column",
            gap: "0.5em",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <ListItemText
              primary={
                <Typography variant="h6" component="div">
                  {discussion.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" color="gray">
                    {new Date(
                      discussion.createdAt.toMillis()
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography component="span" variant="body2" color="gray">
                    {" by "}
                    {discussion.creatorName}
                  </Typography>
                </>
              }
            />
            {props.role === "instructor" && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FormControl>
                  <InputLabel htmlFor="privacy-select">Privacy</InputLabel>
                  <Select
                    id="privacy-select"
                    value={discussion.privacy}
                    onChange={(e) => handlePrivacyChange(discussion, e)}
                  >
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                    <MenuItem value="restricted">Restricted</MenuItem>
                  </Select>
                </FormControl>
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.handleEditDiscussion(discussion);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </div>
          {props.selectedDiscussion === discussion && (
            <div className="discussion-content">
              {props.editingDiscussion &&
              props.editingDiscussion.id === props.selectedDiscussion.id ? (
                <>
                  <div>
                    <label
                      htmlFor="edit-title-input"
                      style={{ display: "block" }}
                    >
                      Title:
                    </label>
                    <TextField
                      id="edit-title-input"
                      type="text"
                      value={props.editingDiscussion.title}
                      onChange={(e) =>
                        props.setEditingDiscussion({
                          ...props.editingDiscussion,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-description-input"
                      style={{ display: "block" }}
                    >
                      Description:
                    </label>
                    <TextField
                      id="edit-description-input"
                      value={props.editingDiscussion.description}
                      onChange={(e) =>
                        props.setEditingDiscussion({
                          ...props.editingDiscussion,
                          description: e.target.value,
                        })
                      }
                      multiline
                      rows={4}
                    />
                  </div>
                  <Button onClick={props.updateDiscussion} variant="contained">
                    Save
                  </Button>
                  <Button onClick={props.cancelEditing} variant="outlined">
                    Cancel
                  </Button>
                </>
              ) : (
                <div>
                  <Typography variant="body1">
                    {props.selectedDiscussion.description}
                  </Typography>
                  {props.selectedDiscussion?.attachment_url && (
                    <a
                      href={props.selectedDiscussion.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Attachment
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default DiscussionList;
