import { FC, useEffect, useState } from "react";
import axios from "axios";
import Quote from "./quote";

export type QuoteType = {
  id: string
  en: string
  author: string
}

const QuoteList: FC = () => {
  const [data, setData] = useState<QuoteType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get<QuoteType[]>(
          process.env.REACT_APP_API as string
        );
        console.log(data);
        setData(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);

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

  return (
    <div>
      <h1>Top quotes</h1>

      {programmingQuotes}
    </div>
  );
};

export default QuoteList;
