import axios from 'axios';

function stringify(str) {
    return Object.keys(str).map(key => key + '=' + str[key]).join('&');
}
function parseLink(s) {
    const output = {};
    const regex = /<([^>]+)>; rel="([^"]+)"/g;

    let m;
    while (m = regex.exec(s)) {
        const [_, v, k] = m;
        output[k] = v;
    }

    return output;
}

export default class Users {
    constructor(query) {
        this.query = query;
    }
    async getUsers() {
        console.log('doshol')
        try {
            let q = this.query ? this.query : {};
            const res = await axios(`https://api.github.com/search/users?q=${q}`);
            console.log(res,'res');
            const links = res.headers.link;
            this.result = res.data.items;
            console.log(links, 'reees');
            const urls =  links.split(',');
            const allURIs = urls.map(a=> {
                return {
                    url: a.split(";")[0].replace(/\s/g, '').slice(1,-1),
                    title:a.split(";")[1]
                }
            })
            console.log(allURIs,'allURIs');

        } catch (error) {
            console.error(error);
        }
    }
}

// AXIOS Automatically returns JSON, much better (also much better on error handling, so I use it)
