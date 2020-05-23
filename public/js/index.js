(() => {
    
    var shoesShop = document.getElementById('shoes-shop')
    var linkShop = document.getElementById('link-shop')
    
    var listProduct
    axios.get('http://localhost:8888/api/V1/categories/list').then(function (response) {
            
        const products = response.data.items

        products.map(product => {
            listProduct = `
                <a data-id="${product.id}" id="product-${product.id}"><li>${product.name}<li></a>
            `
            linkShop.innerHTML += listProduct
        });   
        

        linkShop.addEventListener('click', e => {
            console.log(e.target.closest("a").dataset.item)
        })
        var clickLink = document.getElementById('product-1')
        
        console.log(linkShop)
        
            clickLink.addEventListener('click', productChoise)
        
        function productChoise() {
            event.preventDefault()
            axios.get(`http://localhost:8888/api/V1/categories/${1}`).then(function (response) {
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
})()
