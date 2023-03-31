import React from "react";
import {
  Modal,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalWrapper = styled("div")({
  backgroundColor: "rgb(16, 46, 68)",
  padding: "2em",
  borderRadius: "1em",
  width: "32em",
  textAlign: "center",
});

const CloseButton = styled("span")({
  position: "absolute",
  top: "0",
  right: "0",
  padding: "12px",
  cursor: "pointer",
});

function NewDiscussionModal(props) {
  return (
    <StyledModal open={props.showModal} onClose={props.closeModal}>
      <ModalWrapper>
        <CloseButton onClick={props.closeModal}>&times;</CloseButton>
        <h2 style={{ color: "white", paddingBottom: "1em" }}>
          Start a new discussion
        </h2>
        <form style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
          <div>
            <TextField
              label="Title"
              fullWidth
              value={props.newDiscussionTitle}
              onChange={(e) => props.setNewDiscussionTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={props.newDiscussionDesc}
              onChange={(e) => props.setNewDiscussionDesc(e.target.value)}
            />
          </div>
          {props.role === "instructor" && (
            <div>
              <FormControl fullWidth>
                <InputLabel id="privacy-select-label">Privacy</InputLabel>
                <Select
                  label="Privacy"
                  labelId="privacy-select-label"
                  value={props.discussionPrivacy}
                  onChange={(e) => props.setDiscussionPrivacy(e.target.value)}
                >
                  <MenuItem style={{ justifyContent: "center" }} value="open">
                    Open
                  </MenuItem>
                  <MenuItem style={{ justifyContent: "center" }} value="private">
                    Private
                  </MenuItem>
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    value="restricted"
                  >
                    Restricted
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleAddDiscussion}
            style={{
              padding: "1em",
              borderRadius: "1em",
            }}
          >
            Create
          </Button>
        </form>
      </ModalWrapper>
    </StyledModal>
  );
}

export default NewDiscussionModal;
