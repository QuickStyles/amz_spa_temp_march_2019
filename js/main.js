document.addEventListener('DOMContentLoaded', () => {
  const productListTag = querySelector('.product-list');

  // initializes app by grabing all products and appending them to the DOM.
  Product.all().then(products => {
    productsView(products).forEach(
      productLi => productListTag.appendChild(productLi)
    );
  });

  // respond to items in the list being clicked
  querySelector("#product-index").addEventListener("click", event => {
    const productLink = event.target.closest(".product-link");
     if (productLink) {
      event.preventDefault();
       // Use the .dataset property nodes to easily retrieve
      // custome attributes beginning in data-.
       // The line below assigns the value of the attribute "data-id"
      // to "productId"
      const productId = productLink.dataset.id;
       Product.one(productId).then(product => {
        querySelector("#product-show").innerHTML = detailedProductView(product);
        navigateTo("product-show");
      });
    }
  });

  // navigation logic
  querySelector(".navbar").addEventListener("click", event => {
    const link = event.target.closest("[data-target]");
     if (link) {
      event.preventDefault();
      const targetPage = link.dataset.target;
      navigateTo(targetPage);
    }
  });

  // new product form logic
  querySelector("#new-product-form").addEventListener("submit", event => {
    event.preventDefault();
     const form = event.currentTarget;
    const formData = new FormData(form);
     Product.create({
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
    })
      .then(data => {
        if (data.errors) {
          return Promise.reject(data.errors);
        }
         querySelector("#product-show").innerHTML = detailedProductView(data);
        navigateTo("product-show");
        form.reset();
      })
      .catch(error => {
        console.log(error)
        alert(error.join(", "));
      });
  });
});
