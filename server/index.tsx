import fs from 'fs';
import path from 'path';

import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { applyMiddleware, createStore } from 'redux';
import serialize from 'serialize-javascript';

import { HomePage } from '../src/components/HomePage';
import ItemsList from '../src/components/ItemsList';
import { customMiddleware } from '../src/store/middlewares';
import { rootReducer } from '../src/store/store';

const app = express();

const htmlFile = path.join(__dirname, '../build/index.html');
const htmlContent = fs.readFileSync(htmlFile, { encoding: 'utf-8' });
const initialState = {
  users: ['Pavel', 'Dan'],
  items: [
    'React',
    'Angular',
    'Vue',
    'Svelte',
    '</script><script>window.confirm()</script>',
  ],
};
const store = createStore(rootReducer, initialState, applyMiddleware(customMiddleware));

app.use('/public', express.static('build'));

app.get('*', (req, res) => {
  const reactComponentsString = renderToString(
    <Provider store={store}>
      <StaticRouter basename="/test" location={req.url}>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ItemsList ownerName="Mark Zuckerberg" />} path="/items" />
            </Routes>
          </header>
        </div>
      </StaticRouter>
    </Provider>,
  );

  res.send(
    htmlContent
      .replace('<div id="root"></div>', `<div id="root">${reactComponentsString}</div>`)
      .replace(
        'window.initialState=null',
        `window.initialState=${serialize(initialState)}`,
        // `window.initialState=${JSON.stringify(initialState)}`,
      ),
  );
});

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
app.listen(7777);
