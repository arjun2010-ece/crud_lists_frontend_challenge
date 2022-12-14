import { FC, useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { QuoteType } from "./quoteList";

type DialogProps = {
  en: string;
  author: string;
  open: boolean;
  handleSubmit: (e: SyntheticEvent, q?: QuoteType) => void;
  handleCloseModal: () => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const Dialog: FC<DialogProps> = ({
  open,
  handleCloseModal,
  handleChange,
  handleSubmit,
  en,
  author,
}) => {
  const [dialogQuote, setDialogQuote] = useState<QuoteType>({
    en: "",
    author: "",
    id: "",
  });

  useEffect(() => {
    setDialogQuote({ en, author, id: window.crypto.randomUUID() });
  }, [en, author]);

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
