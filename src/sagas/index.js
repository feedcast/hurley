import { fork, all } from 'redux-saga/effects'
import feedcast from './feedcast';

export default function* root() {
  yield all([
    fork(feedcast),
  ])
}
