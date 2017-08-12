import { fork, all } from 'redux-saga/effects'
import episodes from './episodes';
import channels from './channels';

export default function* root() {
  yield all([
    fork(episodes),
    fork(channels),
  ])
}
