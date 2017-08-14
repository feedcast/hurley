import { fork, all } from 'redux-saga/effects'
import episodes from './episodes';
import channels from './channels';
import categories from './categories';

export default function* root() {
  yield all([
    fork(episodes),
    fork(channels),
    fork(categories),
  ])
}
