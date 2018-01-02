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

import 'app/i18n';

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
    console.log("Log", { page: window.location.pathname + window.location.search })
    window.scrollTo(0, 0);
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
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
      <Page onUpdate={ logPageView } >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/queue/" component={Queue} />
          <Route path="/channels/:page?" component={ChannelList} />
          <Route path="/category/:slug" component={Category} />
          <Route path="/episodes/:page?" component={EpisodesList} />
          <Route exact path="/:slug" component={Channel} />
          <Route path="/:slug/episodes/:page(\d+)?" component={Channel} />
          <Route path="/:slug/:episode_slug" component={Episode} />
          <Route component={NoMatch}/>
        </Switch>
      </Page>
    </Router>
  </Provider>
  )
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

registerServiceWorker();
