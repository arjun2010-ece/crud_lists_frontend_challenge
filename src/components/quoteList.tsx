import { FC, useEffect, useState } from "react";
import axios from "axios";
import Quote from "./quote";

const QuoteList: FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API as string);
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleDelete = (id: string) => {
    let filteredData = data.filter((el : any) => el.id !== id);
    setData(() => [ ...filteredData])
  };

  const handleEdit = (id: string) => {
    console.log(id);
  };

  let programmingQuotes =
    data &&
    data.map((quotes: any, i: number) => (
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
