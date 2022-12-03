import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {QuoteResponse, QuoteWithId} from "../../types";
import QuoteView from "../QuoteView/QuoteView";
import Spinner from "../Spinner/Spinner";

const QuoteDisplay = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [quotes, setQuotes] = useState<QuoteWithId[]>([]);
  const {category} = useParams();
  const [needReload, setNeedReload] = useState(false);
  const title = category ?? 'All';
  const address = category ? `/quotes.json?orderBy="category"&equalTo="${category}"` : '/quotes.json'

  const fetchData = useCallback(async () => {
    setIsFetch(true);
    const response = await axiosApi.get<QuoteResponse>(address);
    if (response.data !== null && (Object.keys(response.data).length !== 0)) {
      const modifiedQuotes: QuoteWithId[] = [];
      for (let [key, value] of Object.entries(response.data)) {
        modifiedQuotes.push({...value, id: key});
      }
      setQuotes(modifiedQuotes);
    } else {
      setQuotes([]);
    }
    setIsFetch(false);
  }, [address]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  useEffect(() => {
    if (needReload) {
      fetchData().catch(console.error);
      setNeedReload(false);
    }
  }, [fetchData, needReload])

  let output = <Spinner/>

  if (!isFetch && quotes.length > 0)
    output = (
      <div>
        {quotes.map((quote) => (
          <QuoteView
            key={quote.id}
            {...quote}
            refreshRequest={() => setNeedReload(true)}
          />
        ))}
      </div>
    );
  else if (!isFetch && quotes.length === 0)
    output = <div className="alert alert-warning custom-mw text-center">There's <strong>nothing</strong> to show</div>;

  return (
    <div>
      <h3 className="py-3 text-center text-capitalize">{title}</h3>
      {output}
    </div>
  );
};

export default QuoteDisplay;