import {elements} from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
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

export const renderResults = users => {
    users.forEach(renderSingleUser);
};