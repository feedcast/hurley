const API_URL = process.env.REACT_APP_API_HOST;

class FeedcastApi {

  fetch({ url = null }){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', url, true);

      req.onload = () => {
        let result = JSON.parse(req.response)
        result.total = req.getResponseHeader('total')
        complete(result);
      };

      req.onerror = () => {
        reject(req.statusText);
      };

      req.send();
    })
  }

  getChannels({page = 1, per_page = 24}){
    const url = `${API_URL}/channels?page=${page}&per_page=${per_page}`
    return this.fetch({ url })
  }

  getEpisodesByCategory({page = 1, per_page = 100, slug = ''}){
    const url = `${API_URL}/categories/${slug}?page=${page}&per_page=${per_page}`
    return this.fetch({ url })
  }

  getCategories({page = 1, per_page = 10}){
    const url = `${API_URL}/categories?page=${page}&per_page=${per_page}`
    return this.fetch({ url })
  }

  getEpisodes(params){
    let {page , per_page} = params || { page: 1, per_page: 30 };
    const url = `${API_URL}/episodes?page=${page}&per_page=${per_page}`
    return this.fetch({ url })
  }

  getChannelInfo({slug = null}){
    const url = `${API_URL}/channels/${slug}`
    return this.fetch({ url })
  }

  getChannelEpisodes({ slug = null, page = 1, per_page = 10}){
    const url = `${API_URL}/channels/${slug}/episodes?page=${page}&per_page=${per_page}`
    return this.fetch({ url })
  }

  getEpisode({ slug = null, episode_slug = null}){
    const url = `${API_URL}/episodes/${slug}/${episode_slug}`;
    return this.fetch({ url })
  }

  getNextEpisodes({ slug = null, episode_slug = null, amount = 10}){
    const url = `${API_URL}/episodes/${slug}/${episode_slug}/next/${amount}`;
    return this.fetch({ url })
  }


}

const feedcastApi = new FeedcastApi();

export default feedcastApi;
