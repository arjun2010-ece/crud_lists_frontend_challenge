import {  useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";



const Dialog = ({
  open,
  handleCloseModal,
  handleChange,
  handleSubmit,
  en,
  author,
  id,
}) => {
  const [dialogQuote, setDialogQuote] = useState({
    en: "",
    author: "",
    id: "",
  });

  useEffect(() => {
    setDialogQuote({ en, author, id });
  }, [en, author, id]);

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={handleCloseModal}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <h2 className="title">Edit Quote</h2>
          <form onSubmit={(e) => handleSubmit(e, dialogQuote)}>
            <div className="form-group">
              <label>
                <b>Enter quote</b>
              </label>
              <textarea
                value={dialogQuote.en}
                name="en"
                className="form-control"
                rows={4}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Author</b>
              </label>
              <input
                value={dialogQuote.author}
                name="author"
                className="form-control"
                type="text"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="add-quote">
              Submit
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Dialog;
