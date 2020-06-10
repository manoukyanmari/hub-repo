export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResLink: document.querySelector('.user__item'),
    searchResPages: document.querySelector('.results__pages'),
    user: document.querySelector('.user'),
    reposList: document.querySelector('.git-repos__list')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
          <div class="loading">
             <div></div>
             <div></div>
             <div></div>
           </div>
    </div>
  `;
    let loaderContainer = document.createElement('div'); // is a node
    loaderContainer.innerHTML = loader;
    parent.appendChild(loaderContainer);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}