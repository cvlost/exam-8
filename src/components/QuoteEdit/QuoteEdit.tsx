import React from 'react';
import QuoteForm from "../QuoteForm/QuoteForm";
import {CategoryData} from "../../types";

interface Props {
  categories: CategoryData[];
}

const QuoteEdit: React.FC<Props> = ({categories}) => {
  return (
    <div>
      <h3 className="text-center py-3">Edit</h3>
      <QuoteForm categories={categories}/>
    </div>
  );
};

export default QuoteEdit;