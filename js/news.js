const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displaycategories(data.data.news_category))
        .catch(error => console.log(error))
}

loadCategories();

const displaycategories = categories => {
    const block = document.getElementById('categories-container');
    categories.forEach(category => {
        console.log(category.category_name);
        console.log(category.category_id);
        const div = document.createElement('div');

        div.innerHTML =`
        <a onclick="categoryDetail('${category.category_id}')" style=" text-decoration: none">${category.category_name}</a>
        `;
    block.appendChild(div);
    })
   
}

const categoryDetail = code =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${code}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaydetail(data.data))
}

categoryDetail('01');

const displaydetail = categoriesElement =>{
    const block1 = document.getElementById('single-category');
    block1.textContent = '';
    categoriesElement.forEach(element => {
        
        const div = document.createElement('div');
        div.classList.add('row');
        div.classList.add('m-4');
        div.innerHTML = `
        <div class="row bg-primary bg-opacity-10 rounded p-lg-0">
        <div class="col-12 col-sm-5 p-0 d-flex align-items-center">
            <img class="img-fluid d-block d-md-block d-lg-block rounded h-100" src="${element.thumbnail_url}" alt="">
        </div>
        <div class="col-12 col-sm-7 d-flex align-items-center py-2">
            <div class="mt-5 mt-sm-0 px-3">
                <h2 class="fw-bold fs-3 my-3">${element.title}</h2>
                <p class="fs-6">${element.details.length >400 ? element.details.slice(0, 400) : element.details} ...</p>
                
                <div class="row d-flex justify-content-between align-items-center">
                    <div class="col-6 col-md-4 col-lg-4 d-flex justify-content-evenly align-items-center">
                        <div><img class="author-img" src="${element.author.img}" alt=""></div>
                        <div><h2 class="fw-bold fs-4">${element.author.name}</h2></div>
                        
                    </div>
                    <div class="col-6 col-md-4 col-lg-4 d-flex justify-content-evenly align-items-center">
                        <div><i class="fa-solid fa-eye"></i></div>
                        <div><h2 class="fw-bold fs-3">${element.total_view}</h2></div>
                        
                    </div>
                    
                </div>
                <div class="d-flex justify-content-end mb-3">
                <button class="btn btn-primary button">See Details</button>
                </div>
            </div>
        </div>
        </div>
                `;
        block1.appendChild(div);

    });
}




