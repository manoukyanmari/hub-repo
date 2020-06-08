"use strict";

import Home         from './components/shared/main/Home.js'
import Users        from './components/users/main/Users.js'
import Error404     from './components/shared/main/Error404.js'
import UserDetail   from './components/users/user-detail/UserDetail.js'
import Repositories from './components/repositories/Repositories.js'

import Header     from './components/shared/header/Header.js'
import Footer     from './components/shared/footer/Footer.js'

import Utils        from './services/Utils.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/' : Home,
    '/users' : Users,
    '/user-detail/:id' : UserDetail,
    '/repositories'   : Repositories,
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');

    // Render the Header and footer of the page
    header.innerHTML = await Header.render();
    await header.after_render();
    footer.innerHTML = await Footer.render();
    await footer.after_render();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);