(() => {
    
    var shoesShop = document.getElementById('shoes-shop')
    var linkShop = document.getElementById('link-shop')
    
    var listProduct
    axios.get('http://localhost:8888/api/V1/categories/list').then(function (response) {
            
        const products = response.data.items

        products.map(product => {
            listProduct = `
                <a id="product-${product.id}"><li data-id="${product.id}">${product.name}<li></a>
            `
            linkShop.innerHTML += listProduct
        });   
        
        let numberproduct
        
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
                            <img src="${product.image}" alt="${product.path}">
                            <p>${product.name}</p>
                            <p>${product.price}</p>
                            <button>Comprar</button>
                        </div>
                        `
                        return shoesShop.innerHTML += allinfo
                    })
                })
            }
        })
    })
})()
