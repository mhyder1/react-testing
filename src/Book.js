import React from 'react';
import './style.css';
const Book = (props) => {
  const [value, setValue] = React.useState(props.value);
  const [editMode, setEditMode] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const handleEdit = () => {
    props.handleEdit(value);
    toggleEditMode();
  };

  const handleCancel = () => {
    setValue(props.value);
    toggleEditMode();
  };

  const handleDelete = () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    setConfirmed(false);
    props.handleDelete();
  };

  const toggleEditMode = () => setEditMode(!editMode);

  const children = editMode ? (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleEdit();
      }}
    >
      <input
        value={value}
        className="item-input"
        onChange={(event) => setValue(event.target.value)}
        type="text"
      />
      <div className="button-container">
        <button className="button secondary-button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="button primary-button">
          Save
        </button>
      </div>
    </form>
  ) : (
    <>
      <span className="item-text">{value}</span>
      <div className="left button-container">
        {!confirmed ? (
          <button className="button edit-button" onClick={toggleEditMode}>
            Edit
          </button>
        ) : (
          <button className="button" onClick={() => setConfirmed(false)}>
            Cancel
          </button>
        )}
        <button
          className="button edit-button"
          onClick={handleDelete}
          style={confirmed ? { color: 'red' } : {}}
        >
          {!confirmed ? 'Delete' : 'Confirm?'}
        </button>
      </div>
    </>
  );
  return <li className="item-container">{children}</li>;
};
export default Book;
