import React from "react";

function Modal({
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
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        <h2>Create New Discussion</h2>
        <form>
          <div>
            <label htmlFor="title-input" style={{ display: "block" }}>
              Title:
            </label>
            <input
              id="title-input"
              type="text"
              value={newDiscussionTitle}
              onChange={(e) => setNewDiscussionTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description-input" style={{ display: "block" }}>
              Description:
            </label>
            <textarea
              id="description-input"
              value={newDiscussionDescription}
              onChange={(e) => setNewDiscussionDescription(e.target.value)}
            />
          </div>
          <div>
  <label htmlFor="privacy-select" style={{ display: "block" }}>
    Privacy:
  </label>
  <select
    id="privacy-select"
    value={discussionPrivacy}
    onChange={(e) => setDiscussionPrivacy(e.target.value)}
  >
    <option value="private">Private</option>
    <option value="restricted">Restricted</option>
  </select>
</div>
          <button type="button" onClick={handleAddDiscussion}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;