const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Serve theme assets
app.use('/theme-assets', express.static(path.join(__dirname, 'resources/themes/theme_aster/public/assets')));
app.use('/default-assets', express.static(path.join(__dirname, 'resources/themes/default/public/assets')));
app.use('/backend-assets', express.static(path.join(__dirname, 'public/assets/back-end')));
app.use('/frontend-assets', express.static(path.join(__dirname, 'public/assets/front-end')));

// Main route - show complete e-commerce interface
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>6Valley - Multi-vendor E-commerce Platform</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <style>
        /* Custom styles based on 6Valley theme */
        :root {
            --primary-color: #1455ac;
            --secondary-color: #ff6b6b;
            --text-dark: #2d3436;
            --text-light: #636e72;
            --bg-light: #f8f9fa;
        }
        
        /* Global layout */
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-dark);
        }
        
        .navbar {
            background: white !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 1rem 0;
        }
        
        .navbar-brand {
            font-weight: 700;
            font-size: 1.8rem;
            color: var(--primary-color) !important;
        }
        
        .hero-section {
            background: linear-gradient(135deg, var(--primary-color) 0%, #1e3799 100%);
            color: white;
            padding: 120px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><radialGradient id="a" cx="50%" cy="40%"><stop offset="0%" stop-color="white" stop-opacity="0.1"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs><rect width="100" height="20" fill="url(%23a)"/></svg>');
            opacity: 0.3;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
        }
        
        .search-box {
            max-width: 600px;
            margin: 0 auto;
        }
        
        .search-box .form-control {
            border: none;
            border-radius: 50px 0 0 50px;
            padding: 15px 25px;
            font-size: 1.1rem;
        }
        
        .search-box .btn {
            border: none;
            border-radius: 0 50px 50px 0;
            padding: 15px 30px;
            background: var(--secondary-color);
            color: white;
        }
        
        .product-card {
            border: none;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            margin-bottom: 30px;
        }
        
        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        
        .product-card .card-img-top {
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid #eee;
        }
        
        .product-card .card-body {
            padding: 20px;
        }
        
        .price-tag {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary-color);
        }
        
        .add-to-cart-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 8px 16px;
            transition: all 0.3s ease;
        }
        
        .add-to-cart-btn:hover {
            background: #0d3a7a;
            transform: scale(1.05);
        }
        
        .feature-section {
            padding: 80px 0;
            background: var(--bg-light);
        }
        
        .feature-box {
            text-align: center;
            padding: 30px;
            border-radius: 15px;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            margin-bottom: 30px;
        }
        
        .feature-box:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            font-size: 3.5rem;
            color: var(--primary-color);
            margin-bottom: 20px;
            display: block;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 50px;
            color: var(--text-dark);
        }
        
        .category-badge {
            display: inline-block;
            padding: 8px 16px;
            background: var(--primary-color);
            color: white;
            border-radius: 25px;
            font-size: 0.9rem;
            margin: 5px;
            transition: all 0.3s ease;
        }
        
        .category-badge:hover {
            background: #0d3a7a;
            transform: scale(1.05);
        }
        
        footer {
            background: #2d3436;
            color: white;
            padding: 50px 0 30px;
        }
        
        .footer-links a {
            color: #b2bec3;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        .btn-primary {
            background: var(--primary-color);
            border: none;
            border-radius: 50px;
            padding: 12px 30px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            background: #0d3a7a;
            transform: scale(1.05);
        }
        
        .badge-discount {
            background: var(--secondary-color);
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .rating {
            color: #ffa502;
        }
        
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1050;
        }
        
        .toast {
            background: #28a745;
            color: white;
            border: none;
            border-radius: 10px;
        }
        
        @media (max-width: 768px) {
            .hero-section {
                padding: 80px 0;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .navbar-brand {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Toast Container for Notifications -->
    <div class="toast-container">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                <i class="fas fa-check-circle me-2"></i>
                <span id="toastMessage">Product added to cart!</span>
            </div>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="fas fa-shopping-bag me-2"></i>6Valley
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#products">Products</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#categories">Categories</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#features">Features</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user"></i> Account
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/login/admin"><i class="fas fa-sign-in-alt me-2"></i>Login</a></li>
                            <li><a class="dropdown-item" href="/register"><i class="fas fa-user-plus me-2"></i>Register</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/admin/dashboard"><i class="fas fa-store me-2"></i>Vendor Dashboard</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link position-relative" href="/cart" id="cartLink">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCount">
                                0
                                <span class="visually-hidden">items in cart</span>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1 class="display-3 fw-bold mb-4">Welcome to 6Valley</h1>
                <p class="lead mb-5 fs-4">Your Complete Multi-Vendor E-commerce Solution</p>
                <div class="search-box">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products, brands and more..." id="searchInput">
                        <button class="btn" type="button" id="searchBtn">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div class="mt-4">
                    <span class="category-badge"><i class="fas fa-mobile-alt me-1"></i> Electronics</span>
                    <span class="category-badge"><i class="fas fa-tshirt me-1"></i> Fashion</span>
                    <span class="category-badge"><i class="fas fa-home me-1"></i> Home & Garden</span>
                    <span class="category-badge"><i class="fas fa-book me-1"></i> Books</span>
                    <span class="category-badge"><i class="fas fa-gamepad me-1"></i> Gaming</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Products -->
    <section id="products" class="py-5">
        <div class="container">
            <h2 class="section-title">
                <i class="fas fa-star text-warning me-2"></i>Featured Products
            </h2>
            <div class="row" id="productsContainer">
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card product-card">
                        <div class="position-relative">
                            <img src="/theme-assets/img/media/product.png" class="card-img-top" alt="Smartphone">
                            <div class="position-absolute top-0 start-0 m-2">
                                <span class="badge-discount">-15%</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Premium Smartphone</h5>
                            <div class="rating mb-2">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <small class="text-muted ms-1">(128)</small>
                            </div>
                            <p class="card-text text-muted small">Latest model with advanced camera and 5G support</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price-tag">$599</span>
                                <button class="btn add-to-cart-btn" onclick="addToCart('Premium Smartphone', 599, '/theme-assets/img/media/product.png')">
                                    <i class="fas fa-shopping-cart me-1"></i>Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card product-card">
                        <img src="/theme-assets/img/category/product-2.png" class="card-img-top" alt="Laptop">
                        <div class="card-body">
                            <h5 class="card-title">Professional Laptop</h5>
                            <div class="rating mb-2">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <small class="text-muted ms-1">(256)</small>
                            </div>
                            <p class="card-text text-muted small">High-performance laptop for work and gaming</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price-tag">$899</span>
                                <button class="btn add-to-cart-btn" onclick="addToCart('Professional Laptop', 899, '/theme-assets/img/category/product-2.png')">
                                    <i class="fas fa-shopping-cart me-1"></i>Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card product-card">
                        <div class="position-relative">
                            <img src="/theme-assets/img/category/product-3.png" class="card-img-top" alt="Headphones">
                            <div class="position-absolute top-0 start-0 m-2">
                                <span class="badge-discount">-25%</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Wireless Headphones</h5>
                            <div class="rating mb-2">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <small class="text-muted ms-1">(89)</small>
                            </div>
                            <p class="card-text text-muted small">Noise cancellation with premium sound quality</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price-tag">$199</span>
                                <button class="btn add-to-cart-btn" onclick="addToCart('Wireless Headphones', 199, '/theme-assets/img/category/product-3.png')">
                                    <i class="fas fa-shopping-cart me-1"></i>Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card product-card">
                        <img src="/theme-assets/img/category/product-4.png" class="card-img-top" alt="Smart Watch">
                        <div class="card-body">
                            <h5 class="card-title">Smart Watch Pro</h5>
                            <div class="rating mb-2">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <small class="text-muted ms-1">(156)</small>
                            </div>
                            <p class="card-text text-muted small">Track fitness, calls, and notifications</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price-tag">$299</span>
                                <button class="btn add-to-cart-btn" onclick="addToCart('Smart Watch Pro', 299, '/theme-assets/img/category/product-4.png')">
                                    <i class="fas fa-shopping-cart me-1"></i>Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-4">
                <button class="btn btn-primary btn-lg" onclick="viewAllProducts()">
                    <i class="fas fa-eye me-2"></i>View All Products
                </button>
            </div>
        </div>
    </section>

    <!-- Categories -->
    <section id="categories" class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title">
                <i class="fas fa-th-large text-primary me-2"></i>Shop by Category
            </h2>
            <div class="row">
                <div class="col-md-2 col-4">
                    <div class="text-center category-tile" data-slug="electronics">
                        <div class="bg-white rounded-circle p-4 mx-auto mb-3" style="width: 100px; height: 100px;">
                            <i class="fas fa-mobile-alt fa-2x text-primary"></i>
                        </div>
                        <h6>Electronics</h6>
                        <small class="text-muted">2,500+ items</small>
                    </div>
                </div>
                <div class="col-md-2 col-4">
                    <div class="text-center category-tile" data-slug="fashion">
                        <div class="bg-white rounded-circle p-4 mx-auto mb-3" style="width: 100px; height: 100px;">
                            <i class="fas fa-tshirt fa-2x text-primary"></i>
                        </div>
                        <h6>Fashion</h6>
                        <small class="text-muted">5,200+ items</small>
                    </div>
                </div>
                <div class="col-md-2 col-4">
                    <div class="text-center category-tile" data-slug="home">
                        <div class="bg-white rounded-circle p-4 mx-auto mb-3" style="width: 100px; height: 100px;">
                            <i class="fas fa-home fa-2x text-primary"></i>
                        </div>
                        <h6>Home</h6>
                        <small class="text-muted">1,800+ items</small>
                    </div>
                </div>
                <div class="col-md-2 col-4">
                    <div class="text-center category-tile" data-slug="books">
                        <div class="bg-white rounded-circle p-4 mx-auto mb-3" style="width: 100px; height: 100px;">
                            <i class="fas fa-book fa-2x text-primary"></i>
                        </div>
                        <h6>Books</h6>
                        <small class="text-muted">3,100+ items</small>
                    </div>
                </div>
                <div class="col-md-2 col-4">
                    <div class="text-center category-tile" data-slug="gaming">
                        <div class="bg-white rounded-circle p-4 mx-auto mb-3" style="width: 100px; height: 100px;">
                            <i class="fas fa-gamepad fa-2x text-primary"></i>
                        </div>
                        <h6>Gaming</h6>
                        <small class="text-muted">950+ items</small>
                    </div>
                </div>
                <div class="col-md-2 col-4">
                    <div class="text-center category-tile" data-slug="sports">
                        <div class="bg-white rounded-circle p-4 mx-auto mb-3" style="width: 100px; height: 100px;">
                            <i class="fas fa-dumbbell fa-2x text-primary"></i>
                        </div>
                        <h6>Sports</h6>
                        <small class="text-muted">1,200+ items</small>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-5 feature-section">
        <div class="container">
            <h2 class="section-title">
                <i class="fas fa-cog text-primary me-2"></i>Platform Features
            </h2>
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="feature-box">
                        <i class="fas fa-store feature-icon"></i>
                        <h4>Multi-Vendor</h4>
                        <p>Multiple sellers can register and manage their stores with dedicated dashboards</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="feature-box">
                        <i class="fas fa-shield-alt feature-icon"></i>
                        <h4>Secure Payments</h4>
                        <p>Multiple payment gateways with advanced security and fraud protection</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="feature-box">
                        <i class="fas fa-chart-line feature-icon"></i>
                        <h4>Analytics</h4>
                        <p>Detailed reports, sales analytics, and business insights for vendors</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="feature-box">
                        <i class="fas fa-headset feature-icon"></i>
                        <h4>24/7 Support</h4>
                        <p>Round-the-clock customer support and vendor assistance</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Vendor CTA -->
    <section class="py-5" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div class="container text-center text-white">
            <h2 class="mb-4">Want to Become a Vendor?</h2>
            <p class="lead mb-4">Join thousands of sellers and start selling on 6Valley today!</p>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="row text-center mb-4">
                        <div class="col-md-3 col-6">
                            <h3 class="text-warning">50K+</h3>
                            <p>Active Vendors</p>
                        </div>
                        <div class="col-md-3 col-6">
                            <h3 class="text-warning">500K+</h3>
                            <p>Products</p>
                        </div>
                        <div class="col-md-3 col-6">
                            <h3 class="text-warning">1M+</h3>
                            <p>Customers</p>
                        </div>
                        <div class="col-md-3 col-6">
                            <h3 class="text-warning">150+</h3>
                            <p>Countries</p>
                        </div>
                    </div>
                    <button class="btn btn-light btn-lg me-3" onclick="startSelling()">
                        <i class="fas fa-store me-2"></i>Start Selling
                    </button>
                    <button class="btn btn-outline-light btn-lg" onclick="learnMore()">
                        <i class="fas fa-info-circle me-2"></i>Learn More
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4">
                    <h5 class="mb-3">
                        <i class="fas fa-shopping-bag me-2"></i>6Valley
                    </h5>
                    <p class="text-light">Complete multi-vendor e-commerce solution with advanced features for vendors and customers.</p>
                    <div class="mt-3">
                        <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h6 class="mb-3">Quick Links</h6>
                    <ul class="list-unstyled footer-links">
                        <li class="mb-2"><a href="#" onclick="showAlert('About Us')">About Us</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Contact')">Contact</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('FAQs')">FAQs</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Blog')">Blog</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h6 class="mb-3">For Vendors</h6>
                    <ul class="list-unstyled footer-links">
                        <li class="mb-2"><a href="#" onclick="showAlert('Sell on 6Valley')">Sell on 6Valley</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Vendor Dashboard')">Vendor Dashboard</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Pricing')">Pricing</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Success Stories')">Success Stories</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h6 class="mb-3">Support</h6>
                    <ul class="list-unstyled footer-links">
                        <li class="mb-2"><a href="#" onclick="showAlert('Help Center')">Help Center</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Shipping Info')">Shipping Info</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Returns')">Returns</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Track Order')">Track Order</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h6 class="mb-3">Legal</h6>
                    <ul class="list-unstyled footer-links">
                        <li class="mb-2"><a href="#" onclick="showAlert('Privacy Policy')">Privacy Policy</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Terms of Service')">Terms of Service</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Cookie Policy')">Cookie Policy</a></li>
                        <li class="mb-2"><a href="#" onclick="showAlert('Disclaimer')">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            <hr class="my-4">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="mb-0 text-light">&copy; 2024 6Valley. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="mb-0 text-light">Made with <i class="fas fa-heart text-danger"></i> for e-commerce</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script>
      Array.prototype.forEach.call(document.querySelectorAll('.metric-card'), function(card, idx){
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(function(){
          card.style.transition = 'opacity .4s ease, transform .4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 80 * idx);
      });
      Array.prototype.forEach.call(document.querySelectorAll('.chart-bar .bar'), function(bar, idx){
        var target = bar.classList.contains('high') ? '120px' : bar.classList.contains('mid') ? '80px' : '40px';
        bar.style.height = '0px';
        setTimeout(function(){
          bar.style.transition = 'height .6s ease';
          bar.style.height = target;
        }, 120 * idx);
      });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        const CART_KEY = 'cartItems';
        
        function loadCartCount() {
            const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            const count = items.reduce((sum, i) => sum + (Number(i.qty) || 1), 0);
            document.getElementById('cartCount').textContent = count;
        }
        
        function addToCart(productName, price, image) {
            const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            const idx = items.findIndex(i => i.name === productName);
            if (idx > -1) {
                items[idx].qty = (items[idx].qty || 1) + 1;
            } else {
                items.push({ name: productName, price: Number(price), image: image, qty: 1 });
            }
            localStorage.setItem(CART_KEY, JSON.stringify(items));
            loadCartCount();
            
            showToast(productName + ' added to cart!');
            const cartLink = document.getElementById('cartLink');
            cartLink.style.transform = 'scale(1.2)';
            setTimeout(() => { cartLink.style.transform = 'scale(1)'; }, 200);
        }
        
        function showToast(message) {
            const toast = document.getElementById('cartToast');
            const toastMessage = document.getElementById('toastMessage');
            toastMessage.textContent = message;
            
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
        }
        
        function viewAllProducts() {
            window.location.href = '/products';
        }
        
        function startSelling() { window.location.href = '/sell'; }
        function learnMore() { window.location.href = '/about'; }
        
        function showAlert(message) {
            const map = {
                'About Us': '/about',
                'Contact': '/contact',
                'FAQs': '/faqs',
                'Blog': '/blog',
                'Sell on 6Valley': '/sell',
                'Vendor Dashboard': '/admin/dashboard',
                'Pricing': '/pricing',
                'Success Stories': '/stories',
                'Help Center': '/help',
                'Shipping Info': '/shipping',
                'Returns': '/returns',
                'Track Order': '/track-order',
                'Privacy Policy': '/privacy',
                'Terms of Service': '/terms',
                'Cookie Policy': '/cookies',
                'Disclaimer': '/disclaimer'
            };
            const route = map[message];
            if (route) { window.location.href = route; return; }
            alert(message);
        }
        
        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', function() {
            const searchTerm = document.getElementById('searchInput').value.trim();
            if (searchTerm) { window.location.href = '/search?q=' + encodeURIComponent(searchTerm); }
        });
        
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') { document.getElementById('searchBtn').click(); }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Category badge clicks
        document.querySelectorAll('.category-badge').forEach(badge => {
            badge.addEventListener('click', function() {
                const raw = this.textContent.trim().toLowerCase();
                let slug = raw.replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
                if (slug === 'home-garden') slug = 'home';
                window.location.href = '/category/' + slug;
            });
        });

        // Category tiles clicks
        document.querySelectorAll('.category-tile').forEach(tile => {
            tile.addEventListener('click', function(){
                const slug = this.getAttribute('data-slug');
                window.location.href = '/category/' + slug;
            });
        });
        
        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
            loadCartCount();
        });
        
        // Navbar background change on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'white';
                navbar.style.backdropFilter = 'none';
            }
        });
        
        // Product card hover effects
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Feature box animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.feature-box').forEach(box => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(30px)';
            box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(box);
        });
    </script>
</body>
</html>
    `);
});

app.get('/login/admin', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/backend-assets/admin/css/custom.css">
    <link rel="stylesheet" href="/default-assets/css/style.css">
    <link rel="stylesheet" href="/backend-assets/admin/css/custom.css">
    <link rel="stylesheet" href="/frontend-assets/css/style.css">
    <link rel="stylesheet" href="/assets/new/back-end/css/style.css">
    <link rel="stylesheet" href="/assets/new/back-end/css/style_neha.css">
    <style>
        body{background:#f7f7f9}
        .auth-card{max-width:420px;margin:60px auto;box-shadow:0 10px 25px rgba(0,0,0,.08);border-radius:12px}
        .brand{color:#1455ac;font-weight:700;text-decoration:none}
    </style>
</head>
<body>
    <div class="container">
        <div class="text-center mt-4">
            <a href="/" class="brand">6Valley</a>
        </div>
        <div class="card auth-card">
            <div class="card-body p-4 p-md-5">
                <h1 class="h3 mb-3">Sign In</h1>
                <p class="text-muted mb-4">Welcome back to Admin Panel</p>
                <form>
                    <div class="mb-3">
                        <label class="form-label">Your email</label>
                        <input type="email" class="form-control form-control-lg" placeholder="email@address.com">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control form-control-lg" placeholder="8+ characters required">
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">Remember me</label>
                    </div>
                    <a href="/admin/dashboard" class="btn btn-primary btn-lg w-100">Sign In</a>
                </form>
                <div class="text-center text-muted my-3">or</div>
                <div class="d-grid gap-2">
                    <a class="btn btn-outline-danger" href="/auth/google"><i class="fab fa-google me-1"></i> Continue with Google</a>
                    <a class="btn btn-outline-primary" href="/auth/facebook"><i class="fab fa-facebook-f me-1"></i> Continue with Facebook</a>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <footer style="background:#2d3436;color:white" class="mt-5 py-4">
      <div class="container text-center">
        <div class="mb-2"><strong>6Valley</strong> • Multi-vendor e-commerce</div>
        <div><small>&copy; 2024 6Valley. All rights reserved.</small></div>
      </div>
    </footer>
</body>
</html>
    `);
});

app.get('/admin/dashboard', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        :root{--primary-color:#1455ac;--secondary-color:#ff6b6b;--text-dark:#2d3436}
        body{background:#f3f5f9;color:var(--text-dark)}
        .header{background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.06)}
        .card{border:none;box-shadow:0 5px 18px rgba(0,0,0,.06);border-radius:14px}
        .metric-card{position:relative;overflow:hidden}
        .metric-icon{font-size:28px;color:var(--primary-color)}
        .metric-value{font-size:28px;font-weight:700}
        .metric-title{font-size:12px;color:#6c757d}
        .chart-bar{height:140px;display:flex;align-items:flex-end;gap:10px}
        .bar{width:26px;background:linear-gradient(180deg,var(--primary-color),#0d3a7a);border-radius:8px}
        .bar.small{height:40px}.bar.mid{height:80px}.bar.high{height:120px}
        .table-activities .list-group-item{border:0;border-bottom:1px solid #eee}
        .btn-primary{background:var(--primary-color);border:none}
    </style>
</head>
<body>
    <nav class="navbar header mb-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">6Valley Admin</a>
        </div>
    </nav>
    <div class="container">
        <div class="row g-4">
            <div class="col-md-3">
                <div class="card p-3 metric-card">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <div class="metric-title">Total Orders</div>
                            <div class="metric-value">1,245</div>
                        </div>
                        <div class="metric-icon"><i class="fas fa-shopping-bag"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card p-3 metric-card">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <div class="metric-title">Total Vendors</div>
                            <div class="metric-value">78</div>
                        </div>
                        <div class="metric-icon"><i class="fas fa-store"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card p-3 metric-card">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <div class="metric-title">Total Customers</div>
                            <div class="metric-value">5,620</div>
                        </div>
                        <div class="metric-icon"><i class="fas fa-users"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card p-3 metric-card">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <div class="metric-title">Inhouse Earning</div>
                            <div class="metric-value">$42,300</div>
                        </div>
                        <div class="metric-icon"><i class="fas fa-dollar-sign"></i></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4 mt-1">
            <div class="col-lg-8">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0">Earning Statistics</h5>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary">Week</button>
                            <button class="btn btn-sm btn-primary">Month</button>
                            <button class="btn btn-sm btn-outline-primary">Year</button>
                        </div>
                    </div>
                    <div class="chart-bar">
                        <div class="bar small"></div>
                        <div class="bar mid"></div>
                        <div class="bar high"></div>
                        <div class="bar mid"></div>
                        <div class="bar small"></div>
                        <div class="bar mid"></div>
                        <div class="bar high"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card p-4">
                    <h5 class="mb-3">Order Status</h5>
                    <div class="d-flex flex-column gap-2">
                        <div class="d-flex justify-content-between"><span>Pending</span><strong>128</strong></div>
                        <div class="d-flex justify-content-between"><span>Confirmed</span><strong>96</strong></div>
                        <div class="d-flex justify-content-between"><span>Processing</span><strong>72</strong></div>
                        <div class="d-flex justify-content-between"><span>Delivered</span><strong>864</strong></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card p-4 mt-4 table-activities">
            <h5 class="mb-3">Recent Activities</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">New order placed by John Doe</li>
                <li class="list-group-item">Vendor ABC added a new product</li>
                <li class="list-group-item">Customer Sarah left a review</li>
            </ul>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <footer class="bg-dark text-white py-5 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <h5 class="mb-3"><i class="fas fa-shopping-bag me-2"></i>6Valley</h5>
            <p class="text-light">Complete multi-vendor e-commerce solution with advanced features for vendors and customers.</p>
            <div class="mt-3">
              <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="mb-3">Quick Links</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="/about">About Us</a></li>
              <li class="mb-2"><a href="/contact">Contact</a></li>
              <li class="mb-2"><a href="/faqs">FAQs</a></li>
              <li class="mb-2"><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="mb-3">For Vendors</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="/sell">Sell on 6Valley</a></li>
              <li class="mb-2"><a href="/admin/dashboard">Vendor Dashboard</a></li>
              <li class="mb-2"><a href="/pricing">Pricing</a></li>
              <li class="mb-2"><a href="/stories">Success Stories</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="mb-3">Support</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="/help">Help Center</a></li>
              <li class="mb-2"><a href="/shipping">Shipping Info</a></li>
              <li class="mb-2"><a href="/returns">Returns</a></li>
              <li class="mb-2"><a href="/track-order">Track Order</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="mb-3">Legal</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="/privacy">Privacy Policy</a></li>
              <li class="mb-2"><a href="/terms">Terms of Service</a></li>
              <li class="mb-2"><a href="/cookies">Cookie Policy</a></li>
              <li class="mb-2"><a href="/disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <hr class="my-4">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="mb-0 text-light">&copy; 2024 6Valley. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0 text-light">Made with <i class="fas fa-heart text-danger"></i> for e-commerce</p>
          </div>
        </div>
      </div>
    </footer>
</body>
</html>
    `);
});

// Basic products page
app.get('/products', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Products</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<style>
  :root { --primary-color:#1455ac; --secondary-color:#ff6b6b; --text-dark:#2d3436; }
  .price-tag{color:var(--primary-color);font-weight:700}
  .card{border:none;border-radius:12px;box-shadow:0 5px 15px rgba(0,0,0,.08)}
  .btn-primary{background:var(--primary-color);border:none}
  footer{background:#2d3436;color:white}
  .footer-links a{color:#b2bec3;text-decoration:none}
  .footer-links a:hover{color:#fff}
</style></head>
<body><div class="container py-5"><h1 class="mb-4">Products</h1>
<div class="row" id="list"></div></div>
<script>
fetch('/api/products').then(function(r){ return r.json(); }).then(function(items){
  var list = document.getElementById('list');
  list.innerHTML = items.map(function(i){
    return '<div class="col-md-3">'
      + '<div class="card">'
      + '<img src="' + i.image + '" class="card-img-top">'
      + '<div class="card-body">'
      + '<h6>' + i.name + '</h6>'
      + '<div class="d-flex justify-content-between align-items-center">'
      + '<span class="price-tag">$' + i.price + '</span>'
      + '<button class="btn btn-primary btn-sm btn-add" data-name="' + i.name.replace(/\"/g, '&quot;') + '" data-price="' + i.price + '" data-image="' + i.image + '">Add</button>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>';
  }).join('');
  Array.prototype.forEach.call(document.querySelectorAll('.btn-add'), function(btn){
    btn.addEventListener('click', function(){
      var name = this.getAttribute('data-name');
      var price = parseFloat(this.getAttribute('data-price'));
      var image = this.getAttribute('data-image');
      addToCart(name, price, image);
    });
  });
  var cards = list.querySelectorAll('.card');
  Array.prototype.forEach.call(cards, function(c, idx){
    c.style.opacity = '0';
    c.style.transform = 'translateY(16px)';
    setTimeout(function(){
      c.style.transition = 'opacity .4s ease, transform .4s ease';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, 60 * idx);
  });
});
</script>
<footer class="bg-dark text-white py-5 mt-5">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-4">
        <h5 class="mb-3"><i class="fas fa-shopping-bag me-2"></i>6Valley</h5>
        <p class="text-light">Complete multi-vendor e-commerce solution with advanced features for vendors and customers.</p>
        <div class="mt-3">
          <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
          <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Quick Links</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/about">About Us</a></li>
          <li class="mb-2"><a href="/contact">Contact</a></li>
          <li class="mb-2"><a href="/faqs">FAQs</a></li>
          <li class="mb-2"><a href="/blog">Blog</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">For Vendors</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/sell">Sell on 6Valley</a></li>
          <li class="mb-2"><a href="/admin/dashboard">Vendor Dashboard</a></li>
          <li class="mb-2"><a href="/pricing">Pricing</a></li>
          <li class="mb-2"><a href="/stories">Success Stories</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Support</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/help">Help Center</a></li>
          <li class="mb-2"><a href="/shipping">Shipping Info</a></li>
          <li class="mb-2"><a href="/returns">Returns</a></li>
          <li class="mb-2"><a href="/track-order">Track Order</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Legal</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/privacy">Privacy Policy</a></li>
          <li class="mb-2"><a href="/terms">Terms of Service</a></li>
          <li class="mb-2"><a href="/cookies">Cookie Policy</a></li>
          <li class="mb-2"><a href="/disclaimer">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <hr class="my-4">
    <div class="row align-items-center">
      <div class="col-md-6">
        <p class="mb-0 text-light">&copy; 2024 6Valley. All rights reserved.</p>
      </div>
      <div class="col-md-6 text-md-end">
        <p class="mb-0 text-light">Made with <i class="fas fa-heart text-danger"></i> for e-commerce</p>
      </div>
    </div>
  </div>
</footer>
</body></html>
    `);
});

// Search results page
app.get('/search', (req, res) => {
    const q = req.query.q || '';
    res.send(`
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Search</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<style>footer{background:#2d3436;color:white}.footer-links a{color:#b2bec3;text-decoration:none}.footer-links a:hover{color:#fff}</style></head>
<body><div class="container py-5"><h1 class="mb-4">Search: ${q}</h1>
<div id="results" class="row"></div></div>
<script>
fetch('/api/products').then(function(r){ return r.json(); }).then(function(items){
  var res = document.getElementById('results');
  var query = ${JSON.stringify(q)};
  var f = items.filter(function(i){ return i.name.toLowerCase().indexOf(query.toLowerCase()) !== -1; });
  res.innerHTML = f.length ? f.map(function(i){
    return '<div class="col-md-3">'
      + '<div class="card">'
      + '<img src="' + i.image + '" class="card-img-top">'
      + '<div class="card-body">'
      + '<h6>' + i.name + '</h6>'
      + '<div class="d-flex justify-content-between align-items-center">'
      + '<span class="price-tag">$' + i.price + '</span>'
      + '<button class="btn btn-primary btn-sm btn-add" data-name="' + i.name.replace(/\"/g,'&quot;') + '" data-price="' + i.price + '" data-image="' + i.image + '">Add</button>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>';
  }).join('') : '<p>No results found</p>';
  Array.prototype.forEach.call(document.querySelectorAll('.btn-add'), function(btn){
    btn.addEventListener('click', function(){
      var name = this.getAttribute('data-name');
      var price = parseFloat(this.getAttribute('data-price'));
      var image = this.getAttribute('data-image');
      addToCart(name, price, image);
    });
  });
  var cards = res.querySelectorAll('.card');
  Array.prototype.forEach.call(cards, function(c, idx){
    c.style.opacity = '0';
    c.style.transform = 'translateY(16px)';
    setTimeout(function(){
      c.style.transition = 'opacity .4s ease, transform .4s ease';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, 60 * idx);
  });
});
</script>
<footer class="bg-dark text-white py-5 mt-5">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-4">
        <h5 class="mb-3"><i class="fas fa-shopping-bag me-2"></i>6Valley</h5>
        <p class="text-light">Complete multi-vendor e-commerce solution with advanced features for vendors and customers.</p>
        <div class="mt-3">
          <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
          <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Quick Links</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/about">About Us</a></li>
          <li class="mb-2"><a href="/contact">Contact</a></li>
          <li class="mb-2"><a href="/faqs">FAQs</a></li>
          <li class="mb-2"><a href="/blog">Blog</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">For Vendors</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/sell">Sell on 6Valley</a></li>
          <li class="mb-2"><a href="/admin/dashboard">Vendor Dashboard</a></li>
          <li class="mb-2"><a href="/pricing">Pricing</a></li>
          <li class="mb-2"><a href="/stories">Success Stories</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Support</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/help">Help Center</a></li>
          <li class="mb-2"><a href="/shipping">Shipping Info</a></li>
          <li class="mb-2"><a href="/returns">Returns</a></li>
          <li class="mb-2"><a href="/track-order">Track Order</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Legal</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/privacy">Privacy Policy</a></li>
          <li class="mb-2"><a href="/terms">Terms of Service</a></li>
          <li class="mb-2"><a href="/cookies">Cookie Policy</a></li>
          <li class="mb-2"><a href="/disclaimer">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <hr class="my-4">
    <div class="row align-items-center">
      <div class="col-md-6">
        <p class="mb-0 text-light">&copy; 2024 6Valley. All rights reserved.</p>
      </div>
      <div class="col-md-6 text-md-end">
        <p class="mb-0 text-light">Made with <i class="fas fa-heart text-danger"></i> for e-commerce</p>
      </div>
    </div>
  </div>
</footer>
</body></html>
    `);
});

// Category page
app.get('/category/:slug', (req, res) => {
    const slug = req.params.slug;
    res.send(`
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Category: ${slug}</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<style>:root{--primary-color:#1455ac;--secondary-color:#ff6b6b;--text-dark:#2d3436}.price-tag{color:var(--primary-color);font-weight:700}.card{border:none;border-radius:12px;box-shadow:0 5px 15px rgba(0,0,0,.08)}footer{background:#2d3436;color:white}.footer-links a{color:#b2bec3;text-decoration:none}.footer-links a:hover{color:#fff}</style></head>
<body><div class="container py-5"><h1 class="mb-4 text-capitalize">Category: ${slug.replace(/-/g,' ')}</h1>
<div id="results" class="row"></div></div>
<script>
fetch('/api/products').then(function(r){ return r.json(); }).then(function(items){
  var res = document.getElementById('results');
  var slug = ${JSON.stringify(slug)};
  var f = items.filter(function(i){ return i.category === slug;});
  res.innerHTML = f.length ? f.map(function(i){
    return '<div class="col-md-3">\
      <div class="card">\
        <img src="' + i.image + '" class="card-img-top">\
        <div class="card-body">\
          <h6>' + i.name + '</h6>\
          <div class="d-flex justify-content-between align-items-center">\
            <span class="price-tag">$' + i.price + '</span>\
            <button class="btn btn-primary btn-sm btn-add" data-name="' + i.name.replace(/\"/g,'&quot;') + '" data-price="' + i.price + '" data-image="' + i.image + '">Add</button>\
          </div>\
        </div>\
      </div>\
    </div>';
  }).join('') : '<p>No products found in this category</p>';
  Array.prototype.forEach.call(document.querySelectorAll('.btn-add'), function(btn){
    btn.addEventListener('click', function(){
      var name = this.getAttribute('data-name');
      var price = parseFloat(this.getAttribute('data-price'));
      var image = this.getAttribute('data-image');
      addToCart(name, price, image);
    });
  });
  var cards = res.querySelectorAll('.card');
  Array.prototype.forEach.call(cards, function(c, idx){
    c.style.opacity = '0';
    c.style.transform = 'translateY(16px)';
    setTimeout(function(){
      c.style.transition = 'opacity .4s ease, transform .4s ease';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, 60 * idx);
  });
});
</script>
<footer class="bg-dark text-white py-5 mt-5">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-4">
        <h5 class="mb-3"><i class="fas fa-shopping-bag me-2"></i>6Valley</h5>
        <p class="text-light">Complete multi-vendor e-commerce solution with advanced features for vendors and customers.</p>
        <div class="mt-3">
          <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
          <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Quick Links</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/about">About Us</a></li>
          <li class="mb-2"><a href="/contact">Contact</a></li>
          <li class="mb-2"><a href="/faqs">FAQs</a></li>
          <li class="mb-2"><a href="/blog">Blog</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">For Vendors</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/sell">Sell on 6Valley</a></li>
          <li class="mb-2"><a href="/admin/dashboard">Vendor Dashboard</a></li>
          <li class="mb-2"><a href="/pricing">Pricing</a></li>
          <li class="mb-2"><a href="/stories">Success Stories</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Support</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/help">Help Center</a></li>
          <li class="mb-2"><a href="/shipping">Shipping Info</a></li>
          <li class="mb-2"><a href="/returns">Returns</a></li>
          <li class="mb-2"><a href="/track-order">Track Order</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="mb-3">Legal</h6>
        <ul class="list-unstyled footer-links">
          <li class="mb-2"><a href="/privacy">Privacy Policy</a></li>
          <li class="mb-2"><a href="/terms">Terms of Service</a></li>
          <li class="mb-2"><a href="/cookies">Cookie Policy</a></li>
          <li class="mb-2"><a href="/disclaimer">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <hr class="my-4">
    <div class="row align-items-center">
      <div class="col-md-6">
        <p class="mb-0 text-light">&copy; 2024 6Valley. All rights reserved.</p>
      </div>
      <div class="col-md-6 text-md-end">
        <p class="mb-0 text-light">Made with <i class="fas fa-heart text-danger"></i> for e-commerce</p>
      </div>
    </div>
  </div>
</footer>
</body></html>
    `);
});
// Static pages mapping
const staticPages = {
  '/about': 'About Us',
  '/faqs': 'FAQs',
  '/blog': 'Blog',
  '/sell': 'Sell on 6Valley',
  '/pricing': 'Pricing',
  '/stories': 'Success Stories',
  '/help': 'Help Center',
  '/shipping': 'Shipping Info',
  '/returns': 'Returns',
  '/track-order': 'Track Order',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
  '/cookies': 'Cookie Policy',
  '/disclaimer': 'Disclaimer'
};

Object.entries(staticPages).forEach(([path, title]) => {
  app.get(path, (req, res) => {
    res.send(`<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${title}</title><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'></head><body><div class='container py-5'><h1>${title}</h1><p>This is the ${title} page.</p><a class='btn btn-primary' href='/'>Back to Home</a></div></body></html>`);
  });
});
// Contact page with form
app.get('/contact', (req, res) => {
  res.send(`<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Contact</title><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'></head><body><div class='container py-5'><h1>Contact</h1><form method='post' action='/api/contact' id='contactForm' class='mt-3'><div class='mb-3'><label class='form-label'>Name</label><input name='name' class='form-control' required></div><div class='mb-3'><label class='form-label'>Email</label><input name='email' type='email' class='form-control' required></div><div class='mb-3'><label class='form-label'>Message</label><textarea name='message' class='form-control' rows='4' required></textarea></div><button class='btn btn-primary'>Send</button><a class='btn btn-outline-secondary ms-2' href='/'>Back to Home</a></form><script>document.getElementById('contactForm').addEventListener('submit',async function(e){e.preventDefault();const fd=new FormData(this);const payload={name:fd.get('name'),email:fd.get('email'),message:fd.get('message')};const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const d=await r.json();alert(d.success?'Message received, we will contact you shortly':'Failed to send');if(d.success){this.reset();}}</script></div></body></html>`);
});
app.post('/api/contact', (req, res) => {
  res.json({ success: true });
});
app.get('/register', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>body{background:#f7f7f9}.auth-card{max-width:480px;margin:60px auto;box-shadow:0 10px 25px rgba(0,0,0,.08);border-radius:12px}</style>
    </head>
<body>
    <div class="container">
        <div class="card auth-card">
            <div class="card-body p-4 p-md-5">
                <h1 class="h3 mb-3">Register</h1>
                <p class="text-muted mb-4">Create your account</p>
                <form id="registerForm">
                    <div class="mb-3">
                        <label class="form-label">Full name</label>
                        <input type="text" class="form-control form-control-lg" id="regName" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control form-control-lg" id="regEmail" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control form-control-lg" id="regPassword" minlength="8" required>
                    </div>
                    <button class="btn btn-primary btn-lg w-100" type="submit">Create Account</button>
                </form>
                <div class="text-center text-muted my-3">or</div>
                <div class="d-grid gap-2">
                    <a class="btn btn-outline-danger" href="/auth/google"><i class="fab fa-google me-1"></i> Continue with Google</a>
                    <a class="btn btn-outline-primary" href="/auth/facebook"><i class="fab fa-facebook-f me-1"></i> Continue with Facebook</a>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('registerForm').addEventListener('submit', function(e){
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const pass = document.getElementById('regPassword').value;
            if(!name || !email || pass.length < 8){ return; }
            sessionStorage.setItem('user', JSON.stringify({name, email}));
            window.location.href = '/admin/dashboard';
        });
    </script>
</body>
</html>
    `);
});

// OAuth stub routes
app.get('/auth/google', (req, res) => {
    res.redirect('/admin/dashboard');
});
app.get('/auth/facebook', (req, res) => {
    res.redirect('/admin/dashboard');
});

app.get('/cart', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Cart</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
      :root { --primary-color:#1455ac; --secondary-color:#ff6b6b; --text-dark:#2d3436; }
      body{background:#f3f5f9}
      .card{border:none;box-shadow:0 5px 18px rgba(0,0,0,.06);border-radius:14px}
      .price-tag{color:var(--primary-color);font-weight:700}
      .thumb{width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #eee}
      .btn-primary{background:var(--primary-color);border:none}
      footer{background:#2d3436;color:white}
      .footer-links a{color:#b2bec3;text-decoration:none}
      .footer-links a:hover{color:#fff}
    </style>
</head>
<body>
    <div class="container py-5">
        <h1 class="mb-4">Your Cart</h1>
        <div class="row">
          <div class="col-lg-8">
            <div class="card p-4 mb-3">
              <ul class="list-group list-group-flush" id="cartList"></ul>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card p-4 sticky-top" style="top:90px">
              <h5 class="mb-3">Order Summary</h5>
              <div class="d-flex justify-content-between"><span>Items total</span><strong id="itemsTotal">$0</strong></div>
              <div class="d-flex justify-content-between"><span>Shipping</span><strong id="shipping">$0</strong></div>
              <hr>
              <div class="d-flex justify-content-between">
                <span class="fw-bold">Grand Total</span>
                <strong class="price-tag" id="grandTotal">$0</strong>
              </div>
              <div class="d-grid gap-2 mt-3">
                <a class="btn btn-primary btn-lg" href="/checkout">Proceed to Checkout</a>
                <a class="btn btn-outline-secondary" href="/">Continue Shopping</a>
              </div>
            </div>
          </div>
        </div>
    </div>
    <script>
        const items = JSON.parse(localStorage.getItem('cartItems')||'[]');
        const list = document.getElementById('cartList');
        let itemsTotal = 0;
        const shippingFlat = items.length ? 9.99 : 0;
        if(items.length === 0){
            list.innerHTML = '<li class="list-group-item">Your cart is empty</li>';
        } else {
            list.innerHTML = items.map(function(i){
                var lineTotal = (Number(i.price)||0) * (Number(i.qty)||1);
                itemsTotal += lineTotal;
                return '<li class="list-group-item d-flex align-items-center justify-content-between">\
                          <div class="d-flex align-items-center gap-3">\
                            <img class="thumb" src="'+(i.image||'/theme-assets/img/media/product.png')+'" alt="'+i.name+'">\
                            <div>\
                              <div class="fw-bold">'+i.name+'</div>\
                              <div class="d-flex align-items-center gap-2 mt-1">\
                                <button class="btn btn-sm btn-outline-secondary btn-dec" data-name="'+i.name.replace(/"/g,'&quot;')+'">-</button>\
                                <span>'+ (i.qty||1) +'</span>\
                                <button class="btn btn-sm btn-outline-secondary btn-inc" data-name="'+i.name.replace(/"/g,'&quot;')+'">+</button>\
                                <button class="btn btn-sm btn-outline-danger ms-2 btn-del" data-name="'+i.name.replace(/"/g,'&quot;')+'"><i class="fas fa-trash"></i></button>\
                              </div>\
                            </div>\
                          </div>\
                          <div class="text-end">\
                            <div class="price-tag">$'+lineTotal.toFixed(2)+'</div>\
                            <small class="text-muted">$'+(Number(i.price)||0).toFixed(2)+' each</small>\
                          </div>\
                        </li>';
            }).join('');
        }
        document.getElementById('itemsTotal').textContent = '$'+itemsTotal.toFixed(2);
        document.getElementById('shipping').textContent = '$'+shippingFlat.toFixed(2);
        document.getElementById('grandTotal').textContent = '$'+(itemsTotal + shippingFlat).toFixed(2);
        window.changeQty = function(name, delta){
          const items = JSON.parse(localStorage.getItem('cartItems')||'[]');
          const idx = items.findIndex(it => it.name === name);
          if(idx > -1){
            items[idx].qty = (items[idx].qty||1) + delta;
            if(items[idx].qty <= 0){ items.splice(idx,1); }
            localStorage.setItem('cartItems', JSON.stringify(items));
            window.location.reload();
          }
        };
        window.removeItem = function(name){
          const items = JSON.parse(localStorage.getItem('cartItems')||'[]');
          const idx = items.findIndex(it => it.name === name);
          if(idx > -1){
            items.splice(idx,1);
            localStorage.setItem('cartItems', JSON.stringify(items));
            window.location.reload();
          }
        };
        Array.prototype.forEach.call(document.querySelectorAll('.btn-dec'), function(b){
          b.addEventListener('click', function(){ changeQty(this.getAttribute('data-name'), -1); });
        });
        Array.prototype.forEach.call(document.querySelectorAll('.btn-inc'), function(b){
          b.addEventListener('click', function(){ changeQty(this.getAttribute('data-name'), 1); });
        });
        Array.prototype.forEach.call(document.querySelectorAll('.btn-del'), function(b){
          b.addEventListener('click', function(){ removeItem(this.getAttribute('data-name')); });
        });
        Array.prototype.forEach.call(document.querySelectorAll('#cartList .list-group-item'), function(item, idx){
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          setTimeout(function(){
            item.style.transition = 'opacity .4s ease, transform .4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 60 * idx);
        });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <footer class="bg-dark text-white py-5 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <h5 class="mb-3"><i class="fas fa-shopping-bag me-2"></i>6Valley</h5>
            <p class="text-light">Complete multi-vendor e-commerce solution with advanced features for vendors and customers.</p>
            <div class="mt-3">
              <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="mb-3">Quick Links</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="/about">About Us</a></li>
              <li class="mb-2"><a href="/contact">Contact</a></li>
              <li class="mb-2"><a href="/faqs">FAQs</a></li>
              <li class="mb-2"><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="mb-3">For Vendors</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="/sell">Sell on 6Valley</a></li>
              <li class="mb-2"><a href="/admin/dashboard">Vendor Dashboard</a></li>
              <li class="mb-2"><a href="/pricing">Pricing</a></li>
              <li class="mb-2"><a href="/stories">Success Stories</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="mb-3">Support</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="/help">Help Center</a></li>
              <li class="mb-2"><a href="/shipping">Shipping Info</a></li>
              <li class="mb-2"><a href="/returns">Returns</a></li>
              <li class="mb-2"><a href="/track-order">Track Order</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="mb-3">Legal</h6>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="/privacy">Privacy Policy</a></li>
              <li class="mb-2"><a href="/terms">Terms of Service</a></li>
              <li class="mb-2"><a href="/cookies">Cookie Policy</a></li>
              <li class="mb-2"><a href="/disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <hr class="my-4">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="mb-0 text-light">&copy; 2024 6Valley. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0 text-light">Made with <i class="fas fa-heart text-danger"></i> for e-commerce</p>
          </div>
        </div>
      </div>
    </footer>
</body>
</html>
    `);
});

// API routes for demo
app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'Premium Smartphone', price: 599, image: '/theme-assets/img/media/product.png', category: 'electronics', rating: 4.5, reviews: 128 },
        { id: 2, name: 'Professional Laptop', price: 899, image: '/theme-assets/img/category/product-2.png', category: 'electronics', rating: 5.0, reviews: 256 },
        { id: 3, name: 'Wireless Headphones', price: 199, image: '/theme-assets/img/category/product-3.png', category: 'electronics', rating: 4.2, reviews: 89 },
        { id: 4, name: 'Smart Watch Pro', price: 299, image: '/theme-assets/img/category/product-4.png', category: 'electronics', rating: 4.8, reviews: 156 },
        { id: 5, name: 'Ultrabook 13-inch', price: 1099, image: '/theme-assets/img/category/product-2.png', category: 'electronics', rating: 4.7, reviews: 98 },
        { id: 6, name: 'Smart Watch Lite', price: 199, image: '/theme-assets/img/category/product-4.png', category: 'electronics', rating: 4.3, reviews: 76 },
        { id: 7, name: 'Budget Smartphone', price: 299, image: '/theme-assets/img/media/product.png', category: 'electronics', rating: 4.0, reviews: 54 },
        { id: 8, name: 'Studio Headphones', price: 149, image: '/theme-assets/img/category/product-3.png', category: 'electronics', rating: 4.6, reviews: 210 },
        { id: 9, name: 'Gaming Laptop', price: 1299, image: '/theme-assets/img/category/product-2.png', category: 'electronics', rating: 4.5, reviews: 133 }
    ]);
});

app.get('/api/categories', (req, res) => {
    res.json([
        { name: 'Electronics', count: 2500, icon: 'fa-mobile-alt' },
        { name: 'Fashion', count: 5200, icon: 'fa-tshirt' },
        { name: 'Home & Garden', count: 1800, icon: 'fa-home' },
        { name: 'Books', count: 3100, icon: 'fa-book' },
        { name: 'Gaming', count: 950, icon: 'fa-gamepad' },
        { name: 'Sports', count: 1200, icon: 'fa-dumbbell' }
    ]);
});

app.get('/api/cart', (req, res) => {
    res.json({ items: [], total: 0, count: 0 });
});

app.post('/api/cart/add', (req, res) => {
    res.json({ success: true, message: 'Product added to cart' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🛍️  6Valley E-commerce Platform Ready!`);
    console.log(`📱 Multi-vendor platform with advanced features`);
    console.log(`✅ All features working: Cart, Search, Categories, Responsive Design`);
});

module.exports = app;
// Checkout page
app.get('/checkout', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    :root{--primary-color:#1455ac;--secondary-color:#ff6b6b;--text-dark:#2d3436}
    .card{border:none;box-shadow:0 5px 18px rgba(0,0,0,.06);border-radius:14px}
    .price-tag{color:var(--primary-color);font-weight:700}
    .btn-primary{background:var(--primary-color);border:none}
    .thumb{width:56px;height:56px;object-fit:cover;border-radius:8px;border:1px solid #eee}
    footer{background:#2d3436;color:white}
  </style>
</head>
<body>
  <div class="container py-5">
    <h1 class="mb-4">Checkout</h1>
    <div class="row">
      <div class="col-lg-7">
        <div class="card p-4 mb-3">
          <h5 class="mb-3">Shipping Information</h5>
          <form id="checkoutForm">
            <div class="row g-3">
              <div class="col-md-6"><label class="form-label">Full Name</label><input id="name" class="form-control" required></div>
              <div class="col-md-6"><label class="form-label">Phone</label><input id="phone" class="form-control" required></div>
              <div class="col-12"><label class="form-label">Address</label><input id="address" class="form-control" required></div>
              <div class="col-md-6"><label class="form-label">City</label><input id="city" class="form-control" required></div>
              <div class="col-md-6"><label class="form-label">Notes (optional)</label><input id="notes" class="form-control"></div>
            </div>
            <div class="d-flex gap-2 mt-3">
              <a href="/cart" class="btn btn-outline-secondary">Back to Cart</a>
              <button type="submit" class="btn btn-primary">Confirm Order</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card p-4">
          <h5 class="mb-3">Order Summary</h5>
          <ul class="list-group list-group-flush" id="summaryList"></ul>
          <div class="d-flex justify-content-between mt-3"><span>Items total</span><strong id="sumItems">$0</strong></div>
          <div class="d-flex justify-content-between"><span>Shipping</span><strong id="sumShip">$0</strong></div>
          <hr>
          <div class="d-flex justify-content-between"><span class="fw-bold">Grand Total</span><strong class="price-tag" id="sumGrand">$0</strong></div>
        </div>
      </div>
    </div>
  </div>
  <script>
    const items = JSON.parse(localStorage.getItem('cartItems')||'[]');
    const list = document.getElementById('summaryList');
    let itemsTotal = 0; const shippingFlat = items.length ? 9.99 : 0;
    list.innerHTML = items.length ? items.map(function(i){
      var lineTotal = (Number(i.price)||0) * (Number(i.qty)||1);
      itemsTotal += lineTotal;
      return '<li class="list-group-item d-flex align-items-center justify-content-between">\
                <div class="d-flex align-items-center gap-3">\
                  <img class="thumb" src="'+(i.image||'/theme-assets/img/media/product.png')+'">\
                  <div>\
                    <div class="fw-bold">'+i.name+'</div>\
                    <small class="text-muted">Qty: '+(i.qty||1)+'</small>\
                  </div>\
                </div>\
                <div class="price-tag">$'+lineTotal.toFixed(2)+'</div>\
              </li>';
    }).join('') : '<li class="list-group-item">Your cart is empty</li>';
    document.getElementById('sumItems').textContent = '$'+itemsTotal.toFixed(2);
    document.getElementById('sumShip').textContent = '$'+shippingFlat.toFixed(2);
    document.getElementById('sumGrand').textContent = '$'+(itemsTotal+shippingFlat).toFixed(2);

    document.getElementById('checkoutForm').addEventListener('submit', async function(e){
      e.preventDefault();
      if(!items.length){ alert('Your cart is empty'); return; }
      const payload = {
        customer: {
          name: document.getElementById('name').value.trim(),
          phone: document.getElementById('phone').value.trim(),
          address: document.getElementById('address').value.trim(),
          city: document.getElementById('city').value.trim(),
          notes: document.getElementById('notes').value.trim()
        },
        items: items,
        totals: { itemsTotal, shipping: shippingFlat, grandTotal: itemsTotal+shippingFlat }
      };
      try{
        const res = await fetch('/api/order', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
        const data = await res.json();
        if(data && data.success){
          localStorage.removeItem('cartItems');
          window.location.href = '/order/success?orderId=' + encodeURIComponent(data.orderId);
        } else {
          alert('Failed to place order');
        }
      }catch(err){
        alert('Network error while placing order');
      }
    });
  </script>
  <footer class="bg-dark text-white py-5 mt-5">
    <div class="container text-center">
      <div class="mb-2"><strong>6Valley</strong> • Multi-vendor e-commerce</div>
      <div><small>&copy; 2024 6Valley. All rights reserved.</small></div>
    </div>
  </footer>
</body>
</html>
    `);
});

// Order success page
app.get('/order/success', (req, res) => {
    const orderId = req.query.orderId || Math.floor(Math.random()*1e6).toString();
    res.send(`
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Order Success</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>:root{--primary-color:#1455ac}.btn-primary{background:var(--primary-color);border:none}</style></head>
<body>
  <div class="container py-5 text-center">
    <div class="display-6 mb-3">Thank you!</div>
    <p class="lead">Your order has been placed successfully.</p>
    <p>Order ID: <strong>${orderId}</strong></p>
    <div class="mt-4">
      <a class="btn btn-primary" href="/">Back to Home</a>
      <a class="btn btn-outline-secondary ms-2" href="/products">Continue Shopping</a>
    </div>
  </div>
</body></html>
    `);
});

// Order API
app.post('/api/order', (req, res) => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random()*900000);
    res.json({ success: true, orderId });
});