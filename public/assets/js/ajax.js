/*global fetch*/

var csrf = document.querySelector('meta[name="csrf-token"]').content;

var searchreview = document.getElementById('searchreview');
var searchreview_btn = document.getElementById('searchreview_btn');
var delete_searchreview_btn = document.getElementById('delete_searchreview_btn');

var filtertype = '';
var filtertype1 = document.getElementById('filtertype1');
var filtertype1_btn = document.getElementById('filtertype1_btn');
var filtertype2 = document.getElementById('filtertype2');
var filtertype2_btn = document.getElementById('filtertype2_btn');
var filtertype3 = document.getElementById('filtertype3');
var filtertype3_btn = document.getElementById('filtertype3_btn');
var delete_filtertype_btn = document.getElementById('delete_filtertype_btn');

var filterstars = document.getElementById('filterstars');
var delete_filterstars_btn = document.getElementById('delete_filterstars_btn');

var orderby = document.getElementById('orderby');
var delete_orderby_btn = document.getElementById('delete_orderby_btn');

var items_per_page = document.getElementById('items_per_page');
var delete_items_per_page_btn = document.getElementById('delete_items_per_page_btn');

window.addEventListener('load', () => {
    document.getElementById('pagination').addEventListener('click', handleClick);
    fetchData('fetchdata');
});

window.onpopstate = function(e) {
    if(e.state) {
        console.log('page');
        console.log(e.state);
    }
};

function fetchData(page) {
    pushState('?page=' + Math.floor(Math.random() * 100));
    fetch(page, {
        method: 'POST',
        headers: {
            'Accept'       : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRF-Token' : csrf
        },
        body : JSON.stringify(
            {
                'searchreview'   : searchreview.value,
                'filtertype'     : filtertype,
                'filterstars'    : filterstars.value,
                'orderby'        : orderby.value,
                'items_per_page' : items_per_page.value
            }
        )
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        showData(jsonData);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function handleClick(e) {
    if (e.target.classList.contains('pulsable')) {
        console.log(e.target.getAttribute('data-url'));
        fetchData(e.target.getAttribute('data-url'));
    }
}

function showData(data) {
    let url = data.url;
    
    // Review type counts
    let count_type_film_elem = document.getElementById('count_type_film');
    let count_type_book_elem = document.getElementById('count_type_book');
    let count_type_record_elem = document.getElementById('count_type_record');
    
    count_type_film_elem.innerHTML = data.count_type_film;
    count_type_book_elem.innerHTML = data.count_type_book;
    count_type_record_elem.innerHTML = data.count_type_record;
    
    // Last reviews
    let last_reviews_elem = document.getElementById('last_reviews_div');
    let last_reviews = data.last_reviews;
    let string = '';
    let count = 0;
    
    last_reviews.forEach(review => {
        if(count<3) {
            count++;
            string += `
            <div class="sidebar-cart-container">
	            <a href="${url}/review/${review.id}" 
	            	class="img-responsive center-block shop-item-img-list-view pull-left"
	            	style="background-image: url('data:image/jpeg;base64,${review.thumbnail}');
	            		   width: 50px; height:72px; background-size:cover; background-position:center; margin-right: 10px;"></a>
                <h6>${review.nombre}</h6>
                <span class="sidebar-cart-price text-gray">${review.tipo}</span>
                </br>
                <span class="sidebar-cart-remove">
                `;
                	if(review.ncomments>0){
                		let stars = review.stars;
                		for(let i=1; i<=5; i++){
                			if(i<=stars){
                    			string += `<i class="fa fa-star text-orange"></i> `;
                			}
                			else if(i-stars>0 && i-stars<1){
                        		string += `<i class="fa fa-star-half-o text-orange"></i> `;
                			}
                			else {
                        		string += `<i class="fa fa-star-o text-orange"></i> `;
                			}
                		}
                	} else {
                	    string += `
                    	<i class="fa fa-star-o text-orange"></i> 
                    	<i class="fa fa-star-o text-orange"></i> 
                    	<i class="fa fa-star-o text-orange"></i> 
                    	<i class="fa fa-star-o text-orange"></i> 
                    	<i class="fa fa-star-o text-orange"></i>`;
                	}
                string += `
                </span>
            </div>`;
        }
    });
    last_reviews_elem.innerHTML = string;

    // Tarjets reviews
    let reviews_ajax_elem = document.getElementById('reviews_ajax_div');
    let reviews = data.reviews.data;
    string = '';
    
    reviews.forEach(review => {
        string += `
            <div class="row bt-solid-1 bb-dashed-1 pb25">
						
			    <!-- Item Image
			    ======================== -->
			    <div class="col-md-4 col-sm-4 col-xs-12">
			        <div class="shop-item-container-in">
			            <a href="${url}/review/${review.id}" 
			            	class="img-responsive center-block shop-item-img-list-view"
			            	style="background-image: url('data:image/jpeg;base64,${review.thumbnail}');
			            		   background-size:cover;"></a>
			        </div>
			    </div>
			    
			    <!-- Item Summary
			    ======================== -->
			    <div class="col-md-5 col-sm-4 col-xs-12">
			        <h3>${review.nombre}</h3>
			        <p class="mt20 text-uppercase">
			            <i class="fa fa-calendar"></i> ${review.created_at.substr(0, 10)}
			            <br/>
			            <i class="fa fa-pencil"></i> ${review.username}
			            <br/>
	                    <i class="fa fa-tags"></i> <a href="${url}/reviews/${review.tipo}">${review.tipo}S</a>
			        </p>
			        <div class="mt10 pt10 bt-dotted-1">
			            `;
	                	if(review.ncomments>0){
	                		let stars = review.stars;
	                		for(let i=1; i<=5; i++){
	                			if(i<=stars){
	                        		string += `<i class="fa fa-star color-yellow" aria-hidden="true"></i> `;
	                			}
	                			else if(i-stars>0 && i-stars<1){
	                        		string += `<i class="fa fa-star-half-o color-yellow" aria-hidden="true"></i> `;
	                			}
	                			else {
	                        		string += `<i class="fa fa-star-o color-yellow" aria-hidden="true"></i> `;
	                			}
	                		}
	                	} else {
	                	    string += `
	                    	<i class="fa fa-star-o color-yellow" aria-hidden="true"></i> 
	                    	<i class="fa fa-star-o color-yellow" aria-hidden="true"></i> 
	                    	<i class="fa fa-star-o color-yellow" aria-hidden="true"></i> 
	                    	<i class="fa fa-star-o color-yellow" aria-hidden="true"></i> 
	                    	<i class="fa fa-star-o color-yellow" aria-hidden="true"></i>`;
	                	}
	                	string += `
			            <br/>
			            <i class="fa fa-comment-o mt10"></i> ${review.ncomments} Comments
			        </div>
			    </div>
			    
			    <!-- Link Analysis
			    ======================== -->
			    <div class="col-md-3 col-sm-4 col-xs-12 text-center">
			        <a href="${url}/review/${review.id}" class="button button-md button-pasific hover-icon-wobble-horizontal mt25">
			        	View Analysis<i class="bi bi-bookmark-plus-fill"></i>
			        </a>
			    </div>
			</div>
		`;
    });
    reviews_ajax_elem.innerHTML = string;

    // Pagination
    let pagination_elem = document.getElementById('pagination');
    let pagination = data.reviews.links;
    string = '';
    pagination.forEach(pag => {
        if (pag.active) {
            string += `
                <li class="page-item active" aria-current="page">
                    <span class="page-link pulsable" data-url="${pag.url}">${pag.label}</span>
                </li>
            `;
        } else if (pag.url != null) {
            string += `
                <li class="page-item">
                    <span class="page-link pulsable" data-url="${pag.url}" id="${'pag' + pag.label}">${pag.label}</span>
                </li>
            `;
        } else {
            string += `
                <li class="page-item disabled">
                    <span class="page-link" aria-hidden="true">${pag.label}</span>
                </li>
            `;
        }
    });
    pagination_elem.innerHTML = string;
}

function pushState(url) {
    var jsonPage = {'url': url};
    window.history.pushState(jsonPage, '', url);
}

searchreview_btn.addEventListener('click', () =>{
    delete_searchreview_btn.setAttribute("class","display");
    filtertype = '';
    filtertype1_btn.removeAttribute("style");
    filtertype2_btn.removeAttribute("style");
    filtertype3_btn.removeAttribute("style");
    delete_filtertype_btn.setAttribute("class","hidden");
    filterstars.value = '';
    delete_filterstars_btn.setAttribute("class","hidden");
    orderby.value = '';
    delete_orderby_btn.setAttribute("class","hidden");
    items_per_page.value = '';
    delete_items_per_page_btn.setAttribute("class","hidden");
    fetchData('fetchdata');
});
delete_searchreview_btn.addEventListener('click', () =>{
    delete_searchreview_btn.setAttribute("class","hidden");
    searchreview.value = '';
    fetchData('fetchdata');
});

filtertype1_btn.addEventListener('click', () =>{
    delete_filtertype_btn.setAttribute("class","display");
    filtertype = filtertype1.value;
    filtertype1_btn.setAttribute("style","color: #ff4530;");
    filtertype2_btn.removeAttribute("style");
    filtertype3_btn.removeAttribute("style");
    fetchData('fetchdata');
});
filtertype2_btn.addEventListener('click', () =>{
    delete_filtertype_btn.setAttribute("class","display");
    filtertype = filtertype2.value;
    filtertype1_btn.removeAttribute("style");
    filtertype2_btn.setAttribute("style","color: #ff4530;");
    filtertype3_btn.removeAttribute("style");
    fetchData('fetchdata');
});
filtertype3_btn.addEventListener('click', () =>{
    delete_filtertype_btn.setAttribute("class","display");
    filtertype = filtertype3.value;
    filtertype1_btn.removeAttribute("style");
    filtertype2_btn.removeAttribute("style");
    filtertype3_btn.setAttribute("style","color: #ff4530;");
    fetchData('fetchdata');
});
delete_filtertype_btn.addEventListener('click', () =>{
    delete_filtertype_btn.setAttribute("class","hidden");
    filtertype = '';
    filtertype1_btn.removeAttribute("style");
    filtertype2_btn.removeAttribute("style");
    filtertype3_btn.removeAttribute("style");
    fetchData('fetchdata');
});

filterstars.addEventListener('change', () =>{
    delete_filterstars_btn.setAttribute("class","display");
    fetchData('fetchdata');
});
delete_filterstars_btn.addEventListener('click', () =>{
    delete_filterstars_btn.setAttribute("class","hidden");
    filterstars.value = '';
    fetchData('fetchdata');
});

orderby.addEventListener('change', () =>{
    delete_orderby_btn.setAttribute("class","display");
    fetchData('fetchdata');
});
delete_orderby_btn.addEventListener('click', () =>{
    delete_orderby_btn.setAttribute("class","hidden");
    orderby.value = '';
    fetchData('fetchdata');
});

items_per_page.addEventListener('change', () =>{
    delete_items_per_page_btn.setAttribute("class","display");
    fetchData('fetchdata');
});
delete_items_per_page_btn.addEventListener('click', () =>{
    delete_items_per_page_btn.setAttribute("class","hidden");
    items_per_page.value = '';
    fetchData('fetchdata');
});