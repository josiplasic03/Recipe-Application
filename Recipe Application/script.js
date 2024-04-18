const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search');
const resultsList = document.querySelector('.results');

searchForm.addEventListener('submit', event => {
    e.preventDefault();

    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=ccd8f7310a452cc7dc34fb3f3d932904&app_key=cdaa8b59&from=0&to=10`);
    const data = response.json();
    displayRecipes(data.hits);
};

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach(recipe => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `;
    });

    resultsList.innerHTML = html;
}