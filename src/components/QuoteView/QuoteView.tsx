import React from 'react';
import {QuoteWithId} from "../../types";

interface Props extends QuoteWithId {

}

const QuoteView: React.FC<Props> = (props) => {
  return (
    <div className="card shadow mb-3">
      <div className="card-header d-flex justify-content-between">
        <p>
          {props.author}
        </p>
        <p>
          {props.category}
        </p>
      </div>
      <div className="card-body">
        {props.text}
      </div>
      <div className="card-footer text-center d-flex gap-2">
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default QuoteView;