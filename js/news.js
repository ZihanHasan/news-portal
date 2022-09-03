const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displaycategories(data.data.news_category))
        .catch(error => console.log(error))
}

loadCategories();

// spinner

const toggleSpinner = isLoading => {
    const loder = document.getElementById('loder');
    if (isLoading) {
        loder.classList.remove('d-none');
    }
    else {
        loder.classList.add('d-none');
    }
}

const displaycategories = categories => {
    const block = document.getElementById('categories-container');
    
    categories.forEach(category => {
        console.log(category.category_name);
        console.log(category.category_id);
        const div = document.createElement('div');

        div.innerHTML = `
        <a onclick="categoryDetail('${category.category_id}')" class="fs-4 category" style=" text-decoration: none">${category.category_name}</a>
        `;

        block.appendChild(div);
    })

}



const categoryDetail = code => {
    // spiner start
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${code}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaydetail(data.data))
        .catch(error => console.log(error))
}

categoryDetail('01');

const displaydetail = categoriesElement => {
    console.log(categoriesElement);
    const block1 = document.getElementById('single-category');
    block1.textContent = '';
    const block2 = document.getElementById('total-news');
    block2.innerHTML = `
    <h2 class="fs-3">News found : ${categoriesElement.length}</h2>
    `;

    const footer = document.getElementById('footer');
    const noNews = document.getElementById('message');
    if (categoriesElement.length === 0) {
        noNews.classList.remove('d-none');
        loder.classList.add('d-none');
        footer.classList.add('d-none') 
    }
    else {
        noNews.classList.add('d-none')
        footer.classList.remove('d-none')
    }

    categoriesElement.sort(function(a, b){
        return b.total_view - a.total_view;
    })
    categoriesElement.forEach(element => {

        const div = document.createElement('div');
        div.classList.add('row');
        div.classList.add('m-4');
        div.innerHTML = `
        <div class="row bg-primary bg-opacity-10 rounded p-lg-0">
        <div class="col-12 col-sm-5 p-2 d-flex align-items-center">
            <img class="img-fluid d-block d-md-block d-lg-block rounded h-100" src="${element.thumbnail_url}" alt="">
        </div>
        <div class="col-12 col-sm-7 d-flex align-items-center py-2">
            <div class="mt-5 mt-sm-0 px-3">
                <h2 class="fw-bold fs-3 my-3">${element.title}</h2>
                <p class="fs-6">${element.details.length > 400 ? element.details.slice(0, 400) : element.details} ...</p>
                
                <div class="row d-flex justify-content-between align-items-center">
                    <div class="col-6 col-md-4 col-lg-4 d-flex justify-content-evenly align-items-center">
                        <div><img class="author-img" src="${element.author.img ? element.author.img : 'No author'}" alt=""></div>
                        <div><h2 class="fw-bold fs-4">${element.author.name ? element.author.name : 'No author'}</h2></div>
                        
                    </div>
                    <div class="col-6 col-md-4 col-lg-4 d-flex justify-content-evenly align-items-center">
                        <div><i class="fa-solid fa-eye"></i></div>
                        <div><h2 class="fw-bold fs-3">${element.total_view ? element.total_view : '0'}</h2></div>
                        
                    </div>
                    
                </div>
                <div class="d-flex justify-content-end mb-3">
                <button onclick="loadDetails('${element._id}')" class="btn btn-primary button" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">See Details</button>
                </div>
            </div>
        </div>
        </div>
                `;
        block1.appendChild(div);
        // spiner end
        toggleSpinner(false);

    });
   
}



// Modal

const loadDetails = code => {
    const url = `https://openapi.programming-hero.com/api/news/${code}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data[0]))
        .catch(error => console.log(error))
}

const displayDetails = news => {
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
        <h2 class="fw-bold fs-4">Author: ${news.author.name ? news.author.name : 'No author'}</h2>
        <img class="author-img" src="${news.author.img ? news.author.img : 'No author'}" alt="">
        <h2 class="fw-bold fs-6">Date: ${news.author.published_date ? news.author.published_date : 'No date found'}</h2>
        <p class="fs-6">${news.details ? news.details : 'No details found'}</p>
        <img class="news-img" src="${news.image_url ? news.image_url : 'No image'}" alt="">
        <h2 class="fw-bold fs-6">Rating: ${news.rating.badge ? news.rating.badge : 'No rating found'} !! ... View: ${news.total_view ? news.total_view : 'No view found'}.</h2>
    `
}

