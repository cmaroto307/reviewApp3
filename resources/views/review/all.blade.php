@extends('layouts.app')

@section('scripts')
    <script type="text/javascript" src="{{ url('assets/js/ajax.js') }}?{{rand(2, 20)}}"></script>
@endsection

@section('modalContent')
    <div id="shop" class="bg-light">
        <div class="container">
            <div class="row">
            	
            	<!-- Sidebar
                ===================================== -->
                <div id="sidebar" class="col-md-3 mt25 animated" data-animation="fadeInLeft" data-animation-delay="250">           
                    
                    <!-- Search
                    ===================================== -->
                    <div class="mt75 pr25 pl25 clearfix">
                        <div class="form-group">
                            <input id="searchreview" name="searchreview" type="text" class="form-control" placeholder="Search">
                        </div>
                        <button id="searchreview_btn" name="searchreview_btn" class="button button-sm button-block button-dark mt-10">Search</button>
                        <button id="delete_searchreview_btn" name="delete_searchreview_btn" 
                            style="-webkit-appearance: none; border: none; background: none; margin-right: 10px;"
                            class="hidden">
                            <i class="fa fa-times-circle fa-fw"></i>Remove
                        </button>
                    </div>
                    
                    <!-- Categories
                    ===================================== -->
                    <div class="pr25 pl25 clearfix">
                        <h5 class="mt25">
                            Categories
                            <span class="heading-divider mt10"></span>
                        </h5>
                        </select>
                        <ul class="shop-sidebar pl25">
                			<li>
            			        <input id="filtertype1" name="filtertype1" class="hidden" value="t1">
            			        <button id="filtertype1_btn" name="filtertype1_btn" class="link-delete">Films</button><span id="count_type_film" class="badge badge-pasific pull-right"></span>
                			</li>
                			<li>
            			        <input id="filtertype2" name="filtertype2" class="hidden" value="t2">
            			        <button id="filtertype2_btn" name="filtertype2_btn" class="link-delete">Books</button><span id="count_type_book" class="count_type_book badge badge-pasific pull-right"></span>
                			</li>
                			<li>
            			        <input id="filtertype3" name="filtertype3" class="hidden" value="t3">
            			        <button id="filtertype3_btn" name="filtertype3_btn" class="link-delete">Records</button><span id="count_type_record" class="count_type_record badge badge-pasific pull-right"></span>
                			</li>
                        </ul>
                        <button id="delete_filtertype_btn" name="delete_filtertype_btn" 
                            style="-webkit-appearance: none; border: none; background: none; margin-right: 10px; margin-top: 10px;"
                            class="hidden">
                            <i class="fa fa-times-circle fa-fw"></i>Remove
                        </button>
                    </div>
                    
                    <!-- Filter by Stars
                    ===================================== -->
                    <div class="pr25 pl25 clearfix">
                        <h5 class="mt25">
                            Filter by Stars
                            <span class="heading-divider mt10"></span>
                        </h5>
                        <select id="filterstars" name="filterstars" class="form-control" style="height: 40px;">
                            <option value="" selected disabled hidden>Select stars</option>
                            <option value="s1">1 - 5 stars</option>
                            <option value="s2">2 - 5 stars</option>
                            <option value="s3">3 - 5 stars</option>
                            <option value="s4">4 - 5 stars</option>
                        </select>
                        <button id="delete_filterstars_btn" name="delete_filterstars_btn" 
                            style="-webkit-appearance: none; border: none; background: none; margin-right: 10px; margin-top: 10px;"
                            class="hidden">
                            <i class="fa fa-times-circle fa-fw"></i>Remove
                        </button>
                    </div>
                    
                    <!-- Latest Reviews
                    ===================================== -->
                    <div class="pr25 pl25 clearfix">
                        <h5 class="mt25">
                            Latest Reviews
                            <span class="heading-divider mt10"></span>
                        </h5>
                        <div id="last_reviews_div" class="shop-sidebar-cart"></div>
                    </div>
                </div>                    
                
                <div class="col-md-9">
                
                 	<!-- Filters
                    ===================================== -->
                    <div class="row mt25 mb25 animated" data-animation="fadeInDown" data-animation-delay="100">                   
                        <div class="col-md-12">
                            <div class="form-inline pull-left">
                                <label>Short By:</label>
                                <select id="orderby" name="orderby" class="form-control" style="height: 40px;">
                                    <option value="" selected disabled hidden>Select order</option>
                                    <option value="o1">Best Reviews</option>
                                    <option value="o2">Most Commented</option>
                                    <option value="o3">Alphabetical Order</option>
                                    <option value="o4">Latest Reviews</option>
                                </select>
                                <button id="delete_orderby_btn" name="delete_orderby_btn" 
                                    style="-webkit-appearance: none; border: none; background: none; margin-right: 10px;"
                                    class="hidden">
                                    <i class="fa fa-times-circle fa-fw"></i>Remove
                                </button>
                            </div>
                            <div class="form-inline pull-left ml25">
                                <label>Show:</label>
                                <select id="items_per_page" name="items_per_page" class="form-control" style="height: 40px;">
                                    <option value="" selected disabled hidden>Items per page</option>
                                    <option value="p1">3</option>
                                    <option value="p2">5</option>
                                    <option value="p3">10</option>
                                </select>
                                <button id="delete_items_per_page_btn" name="delete_items_per_page_btn" 
                                    style="-webkit-appearance: none; border: none; background: none; margin-right: 10px;"
                                    class="hidden">
                                    <i class="fa fa-times-circle fa-fw"></i>Remove
                                </button>
                            </div>   
                        </div>              
                    </div>
                    
                    <!-- Tarjets
                	===================================== -->
                	<div id="reviews_ajax_div"></div>
                    
                    <!-- Pagination
                    ===================================== -->
                    <ul id="pagination" class="pagination"></ul>
                </div>
            </div> 
        </div>
    </div>
@endsection