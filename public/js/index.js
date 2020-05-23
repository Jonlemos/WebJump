(() => {
    
    var shoesShop = document.getElementById('shoes-shop')
    var linkShop = document.getElementById('link-shop')
    var menuMobile = document.getElementById('menu-mobile')
    var exactProduct = document.getElementById('exactProduct')
    
    menuMobile.addEventListener('click', ClickmenuMobile)
    function ClickmenuMobile(){
        var menuClick = document.getElementById('menu-acess')

        if (menuClick.style.display === "flex") {
            menuClick.style.display = "none";
          } else {
            menuClick.style.display = "flex";
        }
    }
    var listProduct
    axios.get('http://localhost:8888/api/V1/categories/list').then(function (response) {
            
        const products = response.data.items
        products.map(product => {
            listProduct = `
                <a id="product-${product.id}"><li data-id="${product.id}">${product.name}<li></a>
            `
            linkShop.innerHTML += listProduct
        });   
        
        var numberproduct
        
        linkShop.addEventListener('click', e => {
            numberproduct = e.target.closest("li").dataset.id

            var clickLink = document.getElementById(`product-${numberproduct}`)

            clickLink.addEventListener('click', productChoise())

            function productChoise() {
                event.preventDefault()
                axios.get(`http://localhost:8888/api/V1/categories/${numberproduct}`).then(function (response) {
                    const showProduct = response.data.items
                    shoesShop.innerHTML = ''
                    showProduct.map(product => {
                        
                        allinfo = `
                        <div class="only-product">
                            <div>
                                <img src="${product.image}" alt="${product.path}">
                            </div>
                            <div>
                                <p>${product.name}</p>
                            </div>
                            <p>R$ ${ product.price.toFixed(parseInt(product.price, 10) ? 0 : 2) },00</p>
                            <button>Comprar</button>
                        </div>
                        `
                        shoesShop.innerHTML += allinfo
                    })
                })
            }
        })
    })
})()
