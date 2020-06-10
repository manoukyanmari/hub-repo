import {elements} from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
    elements.user.innerHTML = '';
    elements.reposList.innerHTML = '';
};

const renderSingleUser = user => {
    let block = document.createElement('li'); // is a node
    block.setAttribute('class', 'user__item');
    const markup = `
                    <a class="results__link results__link--active" href="#${user.login}" username="${user.login}" avatar="${user.avatar_url}">
                        <figure class="results__user">
                            <img src="${user.avatar_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name"><span>${user.login}</span></h4>
                        </div>
                    </a>
                `;
    block.innerHTML = markup;
    elements.searchResList.appendChild(block);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <a class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>${type === 'prev' ? '❮' : ''}</span>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <span>${type === 'next' ? '❯' : ''}</span>
    </a>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    // URIs.forEach(u=>{
    //     const btn = document.createElement('button');
    //     btn.textContent = u.title;
    //
    //     btn.addEventListener("click", e => {
    //         Users.getUsers(e.url);
    //     });
    // });

    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    let block = document.createElement('div'); // is a node
    block.innerHTML = button;
    elements.searchResPages.appendChild(block);
};

export const renderResults = (users, page = 1, resPerPage = 14) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    users.slice(start, end).forEach(renderSingleUser);

    // render pagination buttons
    renderButtons(page, users.length, resPerPage);


};