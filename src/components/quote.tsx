import { FC } from "react";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";

type quoteProps = {
  id: string;
  author: string;
  en: string;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
};

const Quote: FC<quoteProps> = ({
  id,
  author,
  en,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className="quote-item">
      <div className="quote">
        <h3>"{en}"</h3>
        <p>{author}</p>
      </div>

      <div className="icons">
        <DeleteIcon onClick={() => handleDelete(id)} />
        <EditIcon onClick={() => handleEdit(id)} />
      </div>
    </div>
  );
};

export default Quote;
