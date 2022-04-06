import React from "react";
import Button from "../../styles/components/Button";
import ModalWrapper from "../../styles/wrappers/ModalWrapper";

interface Props {
  show: boolean;
  onDelete: (confirm: boolean) => void;
}

const Model: React.FC<Props> = (props) => {
  return (
    <ModalWrapper show={props.show}>
      <div className="modal">
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone
        </p>
        <div className="modal-action">
          <Button modifier="ghost" onClick={(_) => props.onDelete(false)}>
            No, Cancel
          </Button>
          <Button modifier="secondary" onClick={(_) => props.onDelete(true)}>
            Yes, Delete
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Model;
