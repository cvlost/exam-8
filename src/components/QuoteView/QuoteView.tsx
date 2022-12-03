import React, {useCallback, useState} from 'react';
import {QuoteWithId} from "../../types";
import {Link} from "react-router-dom";
import axiosApi from "../../axiosApi";

interface Props extends QuoteWithId {
  refreshRequest: () => void;
}

const QuoteView: React.FC<Props> = (props) => {
  const [isFetch, setIsFetch] = useState(false);

  const removeRequest = useCallback(async () => {
    setIsFetch(true);
    await axiosApi.delete(`/quotes/${props.id}.json`);
    setIsFetch(false);
    props.refreshRequest();
  }, [props]);

  const removeQuote = () => {
    removeRequest().catch(console.error);
  };

  return (
    <div className={`card shadow mb-3 custom-mw ${isFetch?'bg-secondary':''}`}>
      <div className="card-header d-flex justify-content-between">
        <p>
          <small>Author: </small>
          <span className="fw-bold">{props.author}</span>
        </p>
        <p className="m-0 text-bg-secondary align-self-center py-0 px-2 rounded-4">
          <small>{props.category}</small>
        </p>
      </div>
      <div className="card-body">
        {props.text}
      </div>
      <div className="card-footer justify-content-center d-flex gap-2">
        <Link to={`/quotes/${props.id}/edit`} className="btn btn-primary">Edit</Link>
        <button className="btn btn-danger" onClick={removeQuote}>Delete</button>
      </div>
    </div>
  );
};

export default QuoteView;