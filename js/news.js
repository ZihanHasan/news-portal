const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displaycategories(data.data.news_category))
        .catch(error => console.log(error))
}

loadCategories();

const displaycategories = categories => {
    const block = document.getElementById('categories-container');
    for (const category of categories) {
        console.log(category.category_name);
        block.innerHTML = `
        <a href="#">${category.category_name}</a>
        `
    }

}


