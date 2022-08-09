import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Quote from "./quote";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export type QuoteType = {
  id: string;
  en: string;
  author: string;
};

const QuoteList: FC = () => {
  const [data, setData] = useState<QuoteType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [quote, setQuote] = useState<QuoteType>({
    en: "",
    author: "",
    id: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get<QuoteType[]>(
          process.env.REACT_APP_API as string
        );
        setData(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setQuote({
      en: "",
      author: "",
      id: "",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuote({
      ...quote,
      [e.target.name]: e.target.value,
      id: window.crypto.randomUUID(),
    });
  };

  const handleAdd = (quote: QuoteType) => {
    console.log("ADD");
    setData((prev) => [quote, ...prev]);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleAdd(quote);
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    let filteredData = data.filter((el: QuoteType) => el.id !== id);
    setData(() => [...filteredData]);
  };

  const handleEdit = (quote: QuoteType) => {
    console.log(quote);
    const updateQuote: QuoteType = quote;

    const updateQuotes: QuoteType[] = data.map((q: QuoteType) => {
      if (q.id === updateQuote.id) {
        return updateQuote;
      }
      return q;
    });

    setData(updateQuotes);
  };

  let programmingQuotes =
    data &&
    data.map((quotes: QuoteType, i: number) => (
      <Quote
        key={i}
        {...quotes}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    ));

  let addModals = open && (
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
  );

  return (
    <div>
      <h1>Top quotes</h1>
      <button className="add-quote" onClick={handleOpenModal}>
        Add new quote
      </button>
      {addModals}
      {programmingQuotes}
    </div>
  );
};

export default QuoteList;
