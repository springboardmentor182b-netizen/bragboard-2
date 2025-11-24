import React from "react";
import "./Modal.css";

function CreateShoutoutModal({
  isOpen,
  title,
  teammates,
  description,
  onTitleChange,
  onTeammatesChange,
  onDescriptionChange,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handleInnerClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="bb-modal-backdrop" onClick={handleBackdropClick}>
      <div className="bb-modal" onClick={handleInnerClick}>
        <h2 className="bb-modal-title">Create a Shout-out</h2>

        <div className="bb-modal-body">
          <div className="bb-modal-left">
            <input
              className="bb-input bb-input--full"
              placeholder="Shout-out Title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />

            <input
              className="bb-input bb-input--full"
              placeholder="Search for teammates to tag"
              value={teammates}
              onChange={(e) => onTeammatesChange(e.target.value)}
            />

            <textarea
              className="bb-input bb-textarea"
              placeholder="Add Description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>

          <div className="bb-modal-right">
            <div className="bb-image-drop">
              <span>Add image or Gif</span>
            </div>
          </div>
        </div>

        <div className="bb-modal-footer">
          <button className="bb-modal-post-button" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateShoutoutModal;