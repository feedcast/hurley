import EventEmitter from 'events'

class FeedcastApi extends EventEmitter {
  constructor(){
    super();
    this.apiUrl = 'https://www.feedcast.com.br/api'
  }


  getChannels({page = 1, per_page = 24}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${this.apiUrl}/channels?page=${page}&per_page=${per_page}`, true);

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

      req.open('GET', `${this.apiUrl}/categories/${slug}?page=${page}&per_page=${per_page}`, true);

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




  getCategories(){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${this.apiUrl}/categories`, true);

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


  getEpisodes({page = 1, per_page = 30}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${this.apiUrl}/episodes?page=${page}&per_page=${per_page}`, true);

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



  getChannelInfo({uuid = null}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      req.open('GET', `${this.apiUrl}/channels/${uuid}`, true);

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



  getChannelEpisodes({ uuid = null, page = 1, per_page = 10}){
    return new Promise((complete, reject) => {
      const req = new XMLHttpRequest();

      const url = `${this.apiUrl}/channels/${uuid}/episodes`;

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
