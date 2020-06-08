import {elements} from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

const renderSingleUser = user => {
    console.log(user,'user');
    const markup = `
                    <a class="results__link results__link--active" href="#${user.id}">
                        <figure class="results__fig">
                            <img src="${user.avatar_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name"><span>UserName: ${user.login}</span></h4>
                        </div>
                    </a>
                `;
    let block = document.createElement('li'); // is a node
    block.innerHTML = markup;
    elements.searchResList.appendChild(block);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1) {
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

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (users, page = 1, resPerPage = 10) => {
    // render results of currente page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    users.slice(start, end).forEach(renderSingleUser);

    // render pagination buttons
    renderButtons(page, users.length, resPerPage);
};