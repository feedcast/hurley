const API_URL = process.env.REACT_APP_API_HOST;

class FeedcastApi {

  fetch({ url = null, cache = false, cacheTime = 60*60*1000 }){
    return new Promise((complete, reject) => {
      let fromcache = false

      if(cache === true) {
        let fromcache = this.storage('get', { url, cache, cacheTime })
        console.log(fromcache)
        if(fromcache !== false){
          complete(fromcache);
        }
      }

      if(fromcache === false){
        const req = new XMLHttpRequest();

        req.open('GET', url, true);

        req.onload = () => {
          let result = JSON.parse(req.response)
          result.total = req.getResponseHeader('total')
          if(cache === true) this.storage('set', { url, cache, cacheTime, response: result });
          complete(result);
        };

        req.onerror = () => {
          reject(req.statusText);
        };

        req.send();
      }

    })
  }

  storage(action, payload){

      const {
        url,
        cache,
        cacheTime,
        response = {}
      } = payload

      const key = btoa(Date.now())

      switch(action){
        case 'set':
          return this.setCacheList({
            config: { key, cacheTime, timestamp: Date.now(), url },
            response
          });
        break;
        case 'get':
          return this.getRequestFromCache({ url, cacheTime})
        break;
      }

    return false
  }

  getRequestFromCache({ url, cacheTime }){

    let ls = localStorage

    if(ls.getItem('cachelist') !== null){
      const cachelist = JSON.parse(ls.getItem('cachelist'))

      let fetchCache = ( u, c ) => {
        for(let i in c)
          if(c[i].url === u)
            return c[i]
          return false
      }

      const res = fetchCache(url, cachelist)

      if(res !== false){
        let cache = ls.getItem(res.key)
        if(cache !== null){
          cache = JSON.parse(cache)
          if( ( Date.now() - cache.timestamp ) < cacheTime ){
            return cache
          } else {
            ls.removeItem(res.key)
          }
        }
      }

    }

    return false
  }


  setCacheList({ config = null, response = {} }){
    let ls = localStorage
    if(ls.getItem('cachelist') === null){
      ls.setItem('cachelist', '[]')
    }

    if(config !== null
      && typeof config === 'object'
      && ls.getItem('cachelist') !== null){

      let cachelist = JSON.parse(ls.getItem('cachelist'))

      if(Array.isArray(cachelist)){
        cachelist.push(config)
        ls.setItem('cachelist', JSON.stringify(cachelist))
        ls.setItem(config.key, JSON.stringify(response))
        console.info('new item cached on local storage')
      }

    }
  }


  getChannels({page = 1, per_page = 24}){
    const url = `${API_URL}/channels?page=${page}&per_page=${per_page}`
    return this.fetch({ url, cache: true })
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
