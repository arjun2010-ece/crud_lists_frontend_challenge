import { FC, useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import { QuoteType } from "./quoteList";
import Dialog from "./dialog";

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

  const handleSubmit = (e: SyntheticEvent, q?: QuoteType) => {
    e.preventDefault();
    handleEdit(q || quote);
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
        open={open}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
      />
    </>
  );
};

export default Quote;
