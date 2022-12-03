import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {Quote, QuoteResponse, QuoteWithId} from "../../types";
import QuoteView from "../QuoteView/QuoteView";

const QuoteDisplay = () => {
  const [quotes, setQuotes] = useState<QuoteWithId[] | null>(null);
  const {category} = useParams();

  const fetchData = useCallback(async () => {
    const response = await axiosApi.get<QuoteResponse>(`/quotes.json?orderBy="category"&equalTo="${category}"`);
    if (response.data !== null && (Object.keys(response.data).length !== 0)) {
      const modifiedQuotes: QuoteWithId[] = [];
      for (let [key, value] of Object.entries(response.data)) {
        modifiedQuotes.push({...value, id: key})
      }
      console.log(modifiedQuotes)
      setQuotes(modifiedQuotes);
    }
  }, [category]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div>
      <h3>{category}</h3>
      <div>
        {quotes && quotes.map((quote) => (
          <QuoteView
            {...quote}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteDisplay;