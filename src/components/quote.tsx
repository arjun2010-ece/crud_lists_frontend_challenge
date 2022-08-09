import { FC, useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { QuoteType } from "./quoteList";

type QuoteProps = {
  id: string;
  author: string;
  en: string;
  handleDelete: (id: string) => void;
  handleEdit: (quote: QuoteType) => void;
};

const Quote: FC<QuoteProps> = ({
  id,
  author,
  en,
  handleDelete,
  handleEdit,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [quote, setQuote] = useState<QuoteType>({
    en: "",
    author: "",
    id: "",
  });

  useEffect(() => {
    const selectedQuote: QuoteType = { en, author, id };
    setQuote(selectedQuote);
  }, [en, author, id]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleEdit(quote);
    handleCloseModal();
  };

  let editModal =  open && (
        <Modal
          open={open}
          onClose={handleCloseModal}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <h2 className="title">Edit Quote</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <b>Enter quote</b>
              </label>
              <textarea
                value={quote.en}
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
                value={quote.author}
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
      )

  return (
    <>
      <div className="quote-item">
        <div className="quote">
          <h3>"{en}"</h3>
          <p>{author}</p>
        </div>

        <div className="icons">
          <DeleteIcon onClick={() => handleDelete(id)} />
          <EditIcon onClick={() => handleOpenModal()} />
        </div>
      </div>
      {editModal}
    </>
  );
};

export default Quote;
