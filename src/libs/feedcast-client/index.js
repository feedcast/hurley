const API_URL = process.env.REACT_APP_API_HOST;

class FeedcastApi {
  getChannels({page = 1, per_page = 24}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${API_URL}/channels?page=${page}&per_page=${per_page}`, true);

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


  getEpisodesByCategory({page = 1, per_page = 100, slug = ''}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${API_URL}/categories/${slug}?page=${page}&per_page=${per_page}`, true);

      req.onload = () => {
        let result = JSON.parse(req.response)
        complete(result);
      };

      req.onerror = () => {
        reject(req.statusText);
      };

      req.send();
    })
  }




  getCategories({page = 1, per_page = 10}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${API_URL}/categories?page=${page}&per_page=${per_page}`, true);

      req.onload = () => {
        let result = JSON.parse(req.response)
        //result.total = req.getResponseHeader('total')
        complete(result);
      };

      req.onerror = () => {
        reject(req.statusText);
      };

      req.send();
    })
  }


  getEpisodes(params){
    let {page , per_page} = params || { page: 1, per_page: 30 };
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${API_URL}/episodes?page=${page}&per_page=${per_page}`, true);

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



  getChannelInfo({slug = null}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${API_URL}/channels/${slug}`, true);

      req.onload = () => {
        let result = JSON.parse(req.response)
        complete(result);
      };

      req.onerror = () => {
        reject(req.statusText);
      };

      req.send();
    })
  }



  getChannelEpisodes({ slug = null, page = 1, per_page = 10}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      const url = `${API_URL}/channels/${slug}/episodes`;

      req.open('GET',`${url}?page=${page}&per_page=${per_page}`, true);

      req.onload = () => {
        let result = JSON.parse(req.response);
        result.total = req.getResponseHeader('total')
        complete(result);
      };

      req.onerror = () => {
        reject(req.statusText);
      };

      req.send();
    })
  }




}

const feedcastApi = new FeedcastApi();

export default feedcastApi;
