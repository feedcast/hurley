import { fork, all } from 'redux-saga/effects'
import episodes from './episodes';
import channels from './channels';
import categories from './categories';
import player from './player';

export default function* root() {
  yield all([
    fork(episodes),
    fork(channels),
    fork(categories),
    fork(player),
  ])
}
