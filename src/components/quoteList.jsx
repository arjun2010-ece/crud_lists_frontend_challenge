import { useEffect, useState } from "react";
import axios from "axios";
import Quote from "./quote";
import Dialog from "./dialog";

const QuoteList = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState({
    en: "",
    author: "",
    id: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API);
        setData(data);
      } catch (error) {
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

  const handleChange = (e) => {
    setQuote({
      ...quote,
      [e.target.name]: e.target.value,
      id: window.crypto.randomUUID(),
    });
  };

  const handleAdd = (quote) => {
    setData((prev) => [quote, ...prev]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(quote);
    handleCloseModal();
  };

  const handleDelete = (id) => {
    let filteredData = data.filter((el) => el.id !== id);
    setData(() => [...filteredData]);
  };

  const handleEdit = (quote) => {
    const updateQuote = quote;

    const updateQuotes = data.map((q) => {
      if (q.id === updateQuote.id) {
        return updateQuote;
      }
      return q;
    });

    setData(updateQuotes);
  };

  let programmingQuotes =
    data &&
    data.map((quotes, i) => (
      <Quote
        key={i}
        {...quotes}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    ));

  return (
    <div>
      <h1>Top quotes</h1>
      <button className="add-quote" onClick={handleOpenModal}>
        Add new quote
      </button>

      {/* Add Modal} */}
      <Dialog
        en={quote.en}
        author={quote.author}
        open={open}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
      />
      {programmingQuotes}
    </div>
  );
};

export default QuoteList;
