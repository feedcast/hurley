import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestAllEpisodes } from 'app/actions/episodes';
import FeedcastLoader from 'app/components/FeedcastLoader';
import EpisodesList from './EpisodesList';

class EpisodesListContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: parseInt(this.props.params.page || "1")
    }
  }

  static defaultProps = {
    per_page: 20,
  }

  componentDidMount() {
    const { page } = this.state;
    this.fetchData(page);
  }

  componentDidUpdate(prevProps) {
    const page = parseInt(this.props.params.page || "1")
    if(this.state.page !== page){
      this.setState({ page }, () => {
        this.fetchData(page);
      })
    }
  }

  fetchData(page) {
    this.props.dispatch(requestAllEpisodes({
      page,
      per_page: this.props.per_page,
    }));
  }

  render() {

    if (this.props.isFetching) {
      return <FeedcastLoader />;
    }

    return <EpisodesList {...this.props} />;
  }
}

const mapStateToProps = ({ episodes }) => {
  return episodes;
}

export { EpisodesList };
export default connect(mapStateToProps)(EpisodesListContainer);
