import Header     from './shared/header/Header.js'
import Footer     from './shared/footer/Footer.js'
import Search from './models/Search'
import UserDetails from './models/UserDetails'
import * as searchView from './views/searchView'
import * as userDetailsView from './views/userDetailsView'
import {elements, renderLoader, clearLoader} from "./views/base";

/** Global State of the app
 *
 * Page 1:
 * - Users Page - no user by default
 * - Search functionality on Users' page responding on Enter with avatar and username
 * (20 users per page (<prev next>))
 * - On clicking the user - User Details Page opened
 *
 * Page 2:
 * - User details' Page (avatar, username and list of Repositories)
 *
 * Page 3:
 * - Repositories' page - no repo by default
 * - Search functionality with an input responding on enter - with name and URL
 * (20 repos per page (<prev next>))
 * - On clicking the Repo
 *
 * Navigation history should be preserved so i make use of browser’s back/forward buttons.
 * Need to stay on the same page even if we refresh the browser window
 *
 */

const state = {search: null};

const initView = async function() {
    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');

    // Render the Header and footer of the page
    header.innerHTML = await Header.render();
    footer.innerHTML = await Footer.render();
};

initView();

/***SEARCH CONTROLLER **/

const controlUserSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if(query) {
        // 2) prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        // 3) New Search Object and add to state
        state.search = new Search(query);
        renderLoader(elements.searchRes);

        try {
            // 4) Search for users
            await state.search.getUsers();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (err) {
            //alert('Something wrong with the search...');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
   controlUserSearch();
    e.preventDefault();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn && state.search!==null) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});



/***USER CONTROLLER **/


const controlUserDetailsPage  = async (e) => {
    e.preventDefault();

    // Get the userName from the URI
    const username = window.location.hash.replace('#', '');
    if(username) {
        // Prepare UI for changes
        renderLoader(elements.user);

        // Create new User page
        state.userDetails = new UserDetails(username);

        try {
            let userObj = {};

            const userInfo = document.querySelector(`[username=${username}]`);
            if (userInfo) {
                userObj = {
                    avatar_url: userInfo.getAttribute("avatar"),
                    login: userInfo.getAttribute("username")
                };
            }

            // Get Current User Details
            await state.userDetails.getSingleUser(userObj);

            // Render The User
            clearLoader();
            elements.user.innerHTML = '';
            elements.reposList.innerHTML = '';
            userDetailsView.renderUser(state.userDetails.details);
            userDetailsView.renderRepos(state.userDetails.repos);

        } catch(error) {
           // alert('Error Processing the User Details');
        }



    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlUserDetailsPage));