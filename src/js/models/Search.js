import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getUsers(URI) {
        try {
            let q = this.query ? this.query : {};
            let reqURL = URI ? URI : `https://api.github.com/search/users?q=${q}+in:name`;
            const res = await axios(reqURL);
            if(res) {
                const links = res.headers.link;
                const urls =  links.split(',');
                this.allURIs = urls.map(a=> {
                    return {
                        url: a.split(";")[0].replace(/\s/g, '').slice(1,-1),
                        title:a.split(";")[1]
                    }
                });
                this.result = res.data.items;
            }

        } catch (error) {
        }
    }
}

// AXIOS Automatically returns JSON, much better (also much better on error handling, so I use it)
