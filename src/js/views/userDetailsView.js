import {elements} from "./base";

const renderSingleRepo = repo => {
    let block = document.createElement('li'); // is a node
    block.setAttribute('class', 'repo');
    const markup = `
                        <a class="git-repo__link" href="${repo.html_url}" target="_blank">
                            <figure class="git-repo__item">
                                ${repo.full_name}
                            </figure>
                            <div class="git-repo__data">
                                <p class="git-repo__description">${repo.description}</p>
                            </div>
                        </a>
                    `;
    block.innerHTML = markup;
    elements.reposList.appendChild(block);
};

export const renderRepos = repos => {
    repos.forEach(renderSingleRepo);
};

export const renderUser = user => {
    const markup = `
         <div class="results__link results__link--active" href="#${user.login}" username="${user.login}"
          avatar="${user.avatar_url}">
                        <figure class="results__user">
                            <img src="${user.avatar_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name"><span>${user.login}</span></h4>
                        </div>
                    </div>
    `
    let block = document.createElement('section'); // is a node
    block.innerHTML = markup;
    elements.user.appendChild(block);
}
