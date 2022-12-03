import React, {useCallback, useEffect, useState} from 'react';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import Main from "./containers/Main/Main";
import CreateQuote from "./containers/CreateQuote/CreateQuote";
import {CategoryData} from "./types";
import axiosApi from "./axiosApi";
import QuoteDisplay from "./components/QuoteDisplay/QuoteDisplay";
import NotFound from "./components/NotFound/NotFound";
import QuoteEdit from "./components/QuoteEdit/QuoteEdit";

function App() {
  const [isFetch, setIsFetch] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const fetchCategories = useCallback(async () => {
    setIsFetch(true);
    const response = await axiosApi.get<CategoryData[]>('/quote-categories.json');
    if (response.data !== null) setCategories(response.data);
    setIsFetch(false);
  }, []);

  useEffect(() => {
      fetchCategories().catch(console.error);
  }, [fetchCategories]);

  return (
    <div className="vh-100 d-flex flex-column overflow-auto">
      <header className="sticky-top">
        <Navbar/>
      </header>
      <main className="flex-grow-1 d-flex overflow-auto">
        <Routes>
          <Route path="/" element={<Main categories={categories} isFetch={isFetch}/>}>
            <Route path="/" element={<QuoteDisplay/>}/>
            <Route path="quotes/:category" element={<QuoteDisplay/>}/>
            <Route path="quotes/:id/edit" element={<QuoteEdit categories={categories}/>}/>
            <Route path="add-quote" element={<CreateQuote categories={categories}/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      <footer className="py-2 text-center text-secondary bg-dark">
        <small>Quotes Central - 2022</small>
      </footer>
    </div>
  );
}

export default App;
