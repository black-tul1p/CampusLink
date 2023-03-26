import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function DiscussionList({
  discussions,
  selectedDiscussion,
  setSelectedDiscussion,
  currentUser,
  handleEditDiscussion,
  editingDiscussion,
  setEditingDiscussion,
  updateDiscussion,
  cancelEditing,
}) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {discussions.map((discussion) => (
        <li
          key={discussion.id}
          onClick={() => setSelectedDiscussion(discussion)}
          className={`discussion-item ${
            selectedDiscussion === discussion ? "expanded" : ""
          }`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>{discussion.title}</h2>
            <div>
              <span>
                {new Date(discussion.created_at.toMillis()).toLocaleDateString()}
              </span>
              <span> by {discussion.creator_name}</span>
              {currentUser && currentUser.uid === discussion.creator_id && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditDiscussion(discussion);
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </div>
          </div>
          {selectedDiscussion === discussion && (
            <div className="discussion-content">
              {editingDiscussion &&
              editingDiscussion.id === selectedDiscussion.id ? (
                <>
                  <div>
                    <label htmlFor="edit-title-input" style={{ display: "block" }}>
                      Title:
                    </label>
                    <input
                      id="edit-title-input"
                      type="text"
                      value={editingDiscussion.title}
                      onChange={(e) =>
                        setEditingDiscussion({
                          ...editingDiscussion,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-description-input" style={{ display: "block" }}>
                      Description:
                    </label>
                    <textarea
                      id="edit-description-input"
                      value={editingDiscussion.description}
                      onChange={(e) =>
                        setEditingDiscussion({
                          ...editingDiscussion,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button type="button" onClick={updateDiscussion}>
                    Save
                  </button>
                  <button type="button" onClick={cancelEditing}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{selectedDiscussion.description}</p>
                  {selectedDiscussion?.attachment_url && (
                    <a
                      href={selectedDiscussion.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Attachment
                    </a>
                  )}
                </>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default DiscussionList;