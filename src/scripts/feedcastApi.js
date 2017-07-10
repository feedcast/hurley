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
        //TODO: get total from responseHeaders
        // when it is allowed by server
        result.total = 178
        complete(result);
      };

      req.onerror = () => {
        reject(Error(req.statusText));
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
        reject(Error(req.statusText));
      };

      req.send();
    })
  }




}

const feedcastApi = new FeedcastApi();

export default feedcastApi;
