import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {QuoteResponse, QuoteWithId} from "../../types";
import QuoteView from "../QuoteView/QuoteView";
import Spinner from "../Spinner/Spinner";

const QuoteDisplay = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [quotes, setQuotes] = useState<QuoteWithId[] | null>(null);
  const {category} = useParams();
  const [needReload, setNeedReload] = useState(false);

  const fetchData = useCallback(async () => {
    setIsFetch(true);
    const response = await axiosApi.get<QuoteResponse>(`/quotes.json?orderBy="category"&equalTo="${category}"`);
    if (response.data !== null && (Object.keys(response.data).length !== 0)) {
      const modifiedQuotes: QuoteWithId[] = [];
      for (let [key, value] of Object.entries(response.data)) {
        modifiedQuotes.push({...value, id: key})
      }
      setQuotes(modifiedQuotes);
    }
    setIsFetch(false);
  }, [category]);

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

  if (!isFetch) output = (
    <div>
      {quotes && quotes.map((quote) => (
        <QuoteView
          key={quote.id}
          {...quote}
          refreshRequest={() => setNeedReload(true)}
        />
      ))}
    </div>
  );

  return (
    <div>
      <h3>{category}</h3>
      {output}
    </div>
  );
};

export default QuoteDisplay;