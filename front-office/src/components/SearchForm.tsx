import React from 'react';

const SearchForm: React.FC = () => (
  <div className="columns is-centered">
    <div className="column is-four-fifths">
      <div className="box">
        <h1 className="title">商品を検索する</h1>
        <form className="form">
          <div className="field">
            <label className="label" htmlFor="code">商品名</label>
            <div className="control">
              <input className="input" type="text" id="code" name="code" />
            </div>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-primary" type="submit">検索</button>
            </div>
            <div className="control">
              <button className="button is-light" type="reset">クリア</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default SearchForm;
