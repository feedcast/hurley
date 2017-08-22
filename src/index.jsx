import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

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
import Episode from './pages/episode';
import Queue from './pages/queue';
import store from './store';

ReactGA.initialize(process.env.REACT_APP_GA);

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}


const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)



function AppRouter() {
  return (
  <Provider store={store}>
    <Router onUpdate={(e) => { window.scrollTo(0, 0); logPageView(e)} }>
      <Page>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/queue/" component={Queue}></Route>
            <Route path="/channels/:page?" component={ChannelList}></Route>
            <Route path="/category/:slug" component={Category}></Route>
            <Route path="/lastEpisodes/:page?" component={EpisodesList}></Route>
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
