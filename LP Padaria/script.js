// Carrinho de Compras
let cart = [];

// Elementos DOM
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartTotalItems = document.getElementById('cartTotalItems');
const cartCount = document.getElementById('cartCount');
const menuGrid = document.getElementById('menuGrid');
const categoryBtns = document.querySelectorAll('.category-btn');
const addCartBtns = document.querySelectorAll('.add-cart');
const checkoutBtn = document.querySelector('.checkout-btn');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    initCategories();
    initAddToCart();
    initMobileMenu();
    updateCartDisplay();
});

// Inicializar Carrinho
function initCart() {
    // Carregar carrinho do localStorage
    const savedCart = localStorage.getItem('padariaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Filtros de Categoria
function initCategories() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Ativar botão ativo
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar itens
            filterMenuItems(category);
        });
    });
}

function filterMenuItems(category) {
    const items = document.querySelectorAll('.menu-item');
    
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

// Adicionar ao Carrinho
function initAddToCart() {
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            addToCart(name, price);
            showNotification(`${name} adicionado ao carrinho!`);
            
            // Animação do botão
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function addToCart(name, price) {
    // Verificar se item já existe
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // Salvar no localStorage
    localStorage.setItem('padariaCart', JSON.stringify(cart));
    updateCartDisplay();
}

// Atualizar Display do Carrinho
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotalItems.textContent = `(${totalItems})`;
    cartTotal.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    
    renderCartItems();
}

// Renderizar Itens do Carrinho
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
                <a href="#menu" class="cta-primary">Ver Cardápio</a>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${index}, -1)" class="qty-btn">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)" class="qty-btn">+</button>
                </div>
                <button onclick="removeItem(${index})" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="item-total">
                    R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </div>
            </div>
        </div>
    `).join('');
}

// Mudar Quantidade
function changeQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('padariaCart', JSON.stringify(cart));
    updateCartDisplay();
}

// Remover Item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('padariaCart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Item removido do carrinho!');
}

// Eventos do Modal Carrinho
cartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', function() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

checkoutBtn.addEventListener('click', function() {
    if (cart.length > 0) {
        alert('Pedido enviado! Em breve entraremos em contato via WhatsApp. 😊');
        clearCart();
    }
});

// Limpar Carrinho
function clearCart() {
    cart = [];
    localStorage.removeItem('padariaCart');
    updateCartDisplay();
    cartModal.classList.remove('active');
}

// Notificação Toast
function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Menu Mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
    });
}

// Scroll Suave
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

// Fechar modal ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Parallax Effect no Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// Animações de Hover nos Cards do Menu
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.menu-item')) {
        const item = e.target.closest('.menu-item');
        item.style.transform = 'translateY(-10px) scale(1.02)';
        item.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.3)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.menu-item')) {
        const item = e.target.closest('.menu-item');
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }
});

// Contador de Visitantes (Demo)
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);