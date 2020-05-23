(() => {
    
    var shoesShop = document.getElementById('shoes-shop')
    var linkShop = document.getElementById('link-shop')
    var exactProduct = document.getElementById('exactProduct')
    
    var listProduct
    axios.get('http://localhost:8888/api/V1/categories/list').then(function (response) {
            
        const products = response.data.items
        console.log(products)
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
