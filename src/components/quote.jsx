import { useState, useEffect } from "react";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import Dialog from "./dialog";

const Quote = ({ id, author, en, handleDelete, handleEdit }) => {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState({
    en: "",
    author: "",
    id: "",
  });

  useEffect(() => {
    const selectedQuote = { en, author, id };
    setQuote(selectedQuote);
  }, [en, author, id]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  const handleChange = (e) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, q) => {
    e.preventDefault();
    handleEdit(q);
    handleCloseModal();
  };

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

      {/* Edit Modal */}
      <Dialog
        en={quote.en}
        author={quote.author}
        id={quote.id}
        open={open}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
      />
    </>
  );
};

export default Quote;
