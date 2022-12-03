import React from 'react';
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import {CategoryData} from "../../types";

interface Props {
  categories: CategoryData[];
}

const CreateQuote: React.FC<Props> = (props) => {
  return (
    <div className="m-auto pt-3">
      <h2 className="text-center mb-3">Create a new quote</h2>
      <QuoteForm categories={props.categories}/>
    </div>
  );
};

export default CreateQuote;