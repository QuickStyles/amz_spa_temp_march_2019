const BASE_URL = `http://localhost:3000/api/v1`;

const Session = {
  create(params) {
    return fetch(`${BASE_URL}/sessions`, {
      method: 'POST',
      credentials: 'include',
      // to include the cookie when doing fetch, use
      // the "credentials" option with "include" for cross-origin
      // requests or with "same-origin" for same-origin
      // requests.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(res => res.json());
  },
};

// HACK TO LOGIN USER WHILE DEVELOPING!
// Don't do this in a real app
Session.create({ email: 'js@winterfell.gov', password: 'supersecret' });

// DOM helpers
const qS = (query, node = document) => node.querySelector(query);
const qSA = (query, node = document) => node.querySelectorAll(query);
const H = (tagName, attributes, innerText) => {
  const tag = document.createElement(tagName);
  for (let attr in attributes) {
    tag.setAttribute(attr, attributes[attr]);
  }
  tag.innerText = innerText;
  return tag;
}

const Product = {
  all() {
    return fetch(`${BASE_URL}/products`, {
      credentials: 'include',
    }).then(res => res.json());
  },
};

const productsView = products =>
  products
    .map(product => {
      const li = H('li');
      const a = H(
        'a', 
        {class: 'product-link', href: '#', ['data-id']: product.id},
        product.title
      );
      li.appendChild(a);
      return li;
    });

document.addEventListener('DOMContentLoaded', () => {
  const productListTag = qS('.product-list');

  Product.all().then(products => {
    productsView(products).forEach(
      productLi => productListTag.appendChild(productLi)
    );
  });
});
