import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import './styles/index.sass';
import registerServiceWorker from './scripts/registerServiceWorker';
import rollbarClient from './scripts/rollbar'

import Page from './pages/Page';
import ChannelList from './pages/channels';
import Category from './pages/category';
import Channel from './pages/channel';
import Home from './pages/home';
import EpisodesList from './pages/episodeslist';
import Episode from './pages/episode';
import Queue from './pages/queue';
import store from './store';

ReactGA.initialize(process.env.REACT_APP_GA);

rollbarClient({
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        environment: process.env.NODE_ENV || 'development'
    }
});


const logPageView = () => {
    window.scrollTo(0, 0);
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
    return null;
};

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

function AppRouter() {
  return (
  <Provider store={store}>
    <Router>
      <Page>
          <Route path="/" component={logPageView}></Route>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/queue/" component={Queue}></Route>
            <Route path="/channels/:page?" component={ChannelList}></Route>
            <Route path="/category/:slug" component={Category}></Route>
            <Route path="/episodes/:page?" component={EpisodesList}></Route>
            <Route exact path="/:slug" component={Channel}></Route>
            <Route path="/:slug/episodes/:page(\d+)?" component={Channel}></Route>
            <Route path="/:slug/:episode_slug" component={Episode}></Route>
            <Route component={NoMatch}/>
          </Switch>
      </Page>
    </Router>
  </Provider>
  )
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

registerServiceWorker();
