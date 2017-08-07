import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from "react-router"




import './styles/index.sass';
import App from './components/App.jsx';
import registerServiceWorker from './scripts/registerServiceWorker';

import ChannelList from './pages/channelList.jsx'
import Category from './pages/category.jsx'
import Channel from './pages/channel.jsx'
import Home from './pages/home.jsx'

import EpisodesList from './components/EpisodesList.jsx'



import ReactGA from 'react-ga';

ReactGA.initialize(process.env.FEEDCAST_GA);

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}




ReactDOM.render(
	<Router onUpdate={(e) => { window.scrollTo(0, 0); logPageView(e)} } history={ browserHistory }>
    <Route path="/" component={App}>
      <IndexRoute component={Home}></IndexRoute>
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
	</Router>,
	document.getElementById('root')
);


registerServiceWorker();
