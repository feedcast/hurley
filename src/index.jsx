import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import './styles/index.sass';
import registerServiceWorker from './scripts/registerServiceWorker';

import Page from './pages/Page';
import ChannelList from './pages/channels';
import Category from './pages/category';
import Channel from './pages/channel';
import Home from './pages/home';
import EpisodesList from './pages/episodeslist';
import store from './store';

ReactGA.initialize(process.env.REACT_APP_GA);

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function AppRouter() {
  return (
  <Provider store={store}>
    <Router onUpdate={(e) => { window.scrollTo(0, 0); logPageView(e)} } history={ browserHistory }>
      <Route path="/" component={Page}>
        <IndexRoute component={Home} />
        <Route path="/channels" component={ChannelList}>
          <Route path=":page"></Route>
        </Route>
        <Route path="/category" component={Category}>
          <Route path=":page"></Route>
        </Route>
        <Route path="/lastEpisodes" component={EpisodesList}>
          <Route path=":page"></Route>
        </Route>
        <Route path="/channel" component={Channel}>
          <Route path=":uuid">
            <Route path=":page"></Route>
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
  )
}


ReactDOM.render(<AppRouter />, document.getElementById('root'));


registerServiceWorker();
