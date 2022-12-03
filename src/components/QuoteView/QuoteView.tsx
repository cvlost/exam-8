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
  }, [props.id]);

  const removeQuote = () => {
    removeRequest().catch(console.error);
  };

  return (
    <div className={`card shadow mb-3 ${isFetch?'bg-secondary':''}`}>
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
        <Link to={`/${props.id}/edit`} className="btn btn-primary">Edit</Link>
        <button className="btn btn-danger" onClick={removeQuote}>Delete</button>
      </div>
    </div>
  );
};

export default QuoteView;