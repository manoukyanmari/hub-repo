import axios from 'axios';

export default class UserDetails {
    constructor(username) {
        this.username = username;
    }

    async getSingleUserDetails() {
        try {
            const res = await axios(`https://api.github.com/search/users?q=user:${this.username}`);
            this.details = res.data.items[0];
        } catch (error) {
            console.log(error);
        }
    }
    async getSingleUserRepos() {
        try {
            const res = await axios(`https://api.github.com/search/repositories?q=user:${this.username}`);
            this.repos = res.data.items;
        } catch (error) {
            console.log(error);
        }
    }

    async getSingleUser(userDetails) {
        if(!Object.keys(userDetails).length === 0 && userDetails.constructor === Object) {
            this.details = userDetails;
        } else {
            await this.getSingleUserDetails();
        }
        await this.getSingleUserRepos();
    }
}