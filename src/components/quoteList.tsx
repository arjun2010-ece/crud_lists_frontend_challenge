import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Quote from "./quote";
import Dialog from "./dialog";

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
