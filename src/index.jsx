import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from "react-router"

import './styles/index.css';
import App from './components/App.jsx';
import registerServiceWorker from './scripts/registerServiceWorker';

import ChannelList from './pages/channelList.jsx'
import CategoriesList from './pages/categoriesList.jsx'
import Featured from './pages/featured.jsx'
import LastEpisodes from './pages/lastEpisodes.jsx'
import Channel from './pages/channel.jsx'



ReactDOM.render(
	<Router history={ browserHistory }>
    <Route path="/" component={App}>
      <IndexRoute component={Featured}></IndexRoute>
      <Route path="/channels" component={ChannelList}>
        <Route path=":page"></Route>
      </Route>
      <Route path="/categoriesList" component={CategoriesList}></Route>
      <Route path="/lastEpisodes" component={LastEpisodes}></Route>
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
