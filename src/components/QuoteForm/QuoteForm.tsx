import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import {CategoryData, Quote} from "../../types";
import axiosApi from "../../axiosApi";

interface Props {
  categories: CategoryData[];
}

const QuoteForm: React.FC<Props> = (props) => {
  const [isFetch, setIsFetch] = useState(false);
  const [quote, setQuote] = useState<Quote>({
    author: '',
    text: '',
    category: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(quote);
    sendData().catch(console.error);
  }

  const sendData = useCallback(async () => {
    setIsFetch(true);
    await axiosApi.post('/quotes.json', quote);
    setIsFetch(false);
  }, [quote]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setQuote((prev) => ({...prev, [name]: value}));
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isFetch}>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            name="category"
            onChange={handleChange}
          >
            <option defaultValue="">Choose...</option>
            {props.categories.map((category) => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>

        <div className="input-group input-group-default mb-3">
          <span className="input-group-text">Author</span>
          <input
            required
            name="author"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quote-text" className="form-label">Quote Text</label>
          <textarea
            required
            className="form-control"
            id="quote-text"
            name="text"
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2 text-center">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </fieldset>
    </form>
  );
};

export default QuoteForm;