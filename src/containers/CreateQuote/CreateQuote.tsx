import React from 'react';
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import {CategoryData} from "../../types";

interface Props {
  categories: CategoryData[];
}

const CreateQuote: React.FC<Props> = (props) => {
  return (
    <div className="m-auto">
      <h2>Create a new quote</h2>
      <QuoteForm categories={props.categories}/>
    </div>
  );
};

export default CreateQuote;