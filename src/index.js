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
// import registerServiceWorker from './scripts/registerServiceWorker';
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
import { I18nextProvider } from 'react-i18next';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import i18n from 'app/i18n';

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

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
    <Router path="/">
      <Page>
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

ReactDOM.render(
 <I18nextProvider i18n={ i18n }>
   <AppRouter />
 </I18nextProvider>,
 document.getElementById('root'));
