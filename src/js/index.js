import Header     from './shared/header/Header.js'
import Footer     from './shared/footer/Footer.js'
import Users from './models/Users'
import * as searchView from './views/searchView'
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

const state = {};

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

const controlUserSearch = async () => {
    // 1) Get query from view
    const query = `${searchView.getInput()}+in:name`;
    console.log(query, 'query');
    if(query) {
        // 2) New Search Object and add to state
        state.search = new Users(query)

        // 3) prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for Users
        await state.search.getUsers();

        // 5) render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }

};

elements.searchForm.addEventListener('submit', e=>{
   e.preventDefault();
   controlUserSearch();
});