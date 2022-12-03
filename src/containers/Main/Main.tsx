import React, {useCallback, useEffect, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {CategoryData, QuoteResponse, QuoteWithId} from "../../types";
import {useOutlet} from "react-router-dom";
import axiosApi from "../../axiosApi";
import QuoteView from "../../components/QuoteView/QuoteView";
import Spinner from "../../components/Spinner/Spinner";

interface Props {
  categories: CategoryData[];
}

const Main: React.FC<Props> = (props) => {
  const [isFetch, setIsFetch] = useState(false);
  const [quotes, setQuotes] = useState<QuoteWithId[] | null>(null);
  const [needReload, setNeedReload] = useState(false);
  const outlet = useOutlet();

  const fetchData = useCallback(async () => {
    setIsFetch(true);
    const response = await axiosApi.get<QuoteResponse>(`/quotes.json`);
    if (response.data !== null) {
      const modifiedQuotes: QuoteWithId[] = [];
      for (let [key, value] of Object.entries(response.data)) {
        modifiedQuotes.push({...value, id: key})
      }
      setQuotes(modifiedQuotes);
    }
    setIsFetch(false);
  }, []);

  useEffect(() => {
    if (outlet === null) {
      fetchData().catch(console.error);
    }
  }, [fetchData, outlet]);

  useEffect(() => {
    if (needReload) {
      fetchData().catch(console.error);
      setNeedReload(false);
    }
  }, [fetchData, needReload])

  return (
    <>
      <Sidebar categories={props.categories}/>
      <div className="container-fluid">
        {outlet || (isFetch ? <Spinner/> : null) || (
          <div>
            <h3 className="py-3 text-center text-capitalize">All</h3>
            {quotes && quotes.map((quote) => (
              <QuoteView
                key={quote.id}
                {...quote}
                refreshRequest={() => setNeedReload(true)}
              />
            ))}
          </div>
        )}
      </div>
    </>

  );
};

export default Main;