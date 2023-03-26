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

function NewDiscussionModal({
  showModal,
  closeModal,
  handleAddDiscussion,
  newDiscussionTitle,
  setNewDiscussionTitle,
  newDiscussionDescription,
  setNewDiscussionDescription,
  discussionPrivacy,
  setDiscussionPrivacy,
}) {
  return (
    <StyledModal open={showModal} onClose={closeModal}>
      <ModalWrapper>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <h2 style={{ color: "white", paddingBottom: "1em" }}>
          Start a new discussion
        </h2>
        <form style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
          <div>
            <TextField
              label="Title"
              fullWidth
              value={newDiscussionTitle}
              onChange={(e) => setNewDiscussionTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newDiscussionDescription}
              onChange={(e) => setNewDiscussionDescription(e.target.value)}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="privacy-select-label">Privacy</InputLabel>
              <Select
                label="Privacy"
                labelId="privacy-select-label"
                value={discussionPrivacy}
                onChange={(e) => setDiscussionPrivacy(e.target.value)}
              >
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDiscussion}
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
