import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import {CategoryData, Quote} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";

interface Props {
  categories: CategoryData[];
}

const QuoteForm: React.FC<Props> = (props) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [isFetch, setIsFetch] = useState(false);
  const [quote, setQuote] = useState<Quote>({
    author: '',
    text: '',
    category: '',
  });

  const getData = useCallback(async  () => {
    setIsFetch(true);
    const response = await axiosApi.get<Quote>(`/quotes/${id}.json`);
    if (response.data !== null) {
      setQuote(response.data);
    }
    setIsFetch(false);
  }, [id]);

  const putData = useCallback(async () => {
    setIsFetch(true);
    await axiosApi.put(`/quotes/${id}.json`, quote);
    setIsFetch(false);
    navigate(-1);
  }, [id, navigate, quote]);

  useEffect(() => {
    if (id) {
      getData().catch(console.error);
    }
  }, [getData, id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      putData().catch(console.error);
    } else {
      sendData().catch(console.error);
    }
  }

  const sendData = useCallback(async () => {
    setIsFetch(true);
    await axiosApi.post('/quotes.json', quote);
    setIsFetch(false);
    navigate(-1);
  }, [navigate, quote]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setQuote((prev) => ({...prev, [name]: value}));
  }

  return (
    <form onSubmit={handleSubmit} className="custom-mw card p-4 shadow">
      <fieldset disabled={isFetch}>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
          <select
            required
            className="form-select"
            id="inputGroupSelect01"
            name="category"
            onChange={handleChange}
            value={quote.category}
          >
            <option value="" disabled>Choose...</option>
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
            value={quote.author}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quote-text" className="form-label">Quote Text</label>
          <textarea
            required
            className="form-control"
            id="quote-text"
            name="text"
            value={quote.text}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <div className="d-flex gap-2 justify-content-center">
          <button type="submit" className="btn btn-primary">Save</button>
          {id && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
};

export default QuoteForm;