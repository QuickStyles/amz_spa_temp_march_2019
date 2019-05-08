// DOM helpers
const querySelector = (query, node = document) => node.querySelector(query);
const querySelectorAll = (query, node = document) => node.querySelectorAll(query);
const createTag = (tagName, attributes, innerText) => {
  if (!tagName) {
    throw new Error(`expected tagName to be a HTML tag, instead got: ${tagName}`);
  }
  if(!attributes) {
    attributes = '';
  }
  if(!innerText) {
    innerText = '';
  }
  const tag = document.createElement(tagName);
  for (let attr in attributes) {
    tag.setAttribute(attr, attributes[attr]);
  }
  tag.innerText = innerText;
  return tag;
}

// will create a <li> for each product
const productsView = products =>
  products
    .map(product => {
      const li = createTag('li');
      const a = createTag(
        'a', 
        {class: 'product-link', href: '#', ['data-id']: product.id},
        product.title
      );
      li.appendChild(a);
      return li;
    });

// will create a detailed view for one product
const detailedProductView = product => `
  <h1>${product.title}</h1>
  <p>${product.description}</p>
  <small>Seller: ${product.seller.full_name}</small>
  <h3>Review</h3>
  <ul>
    ${product.reviews.map(r => `<li>Rating: ${r.rating} ${r.body}</li>`).join("")}
  </ul>
`;

// changes the navbar styling depending on what page it is on
const navigateTo = id => {
  querySelectorAll(".page.active").forEach(node => {
    node.classList.remove("active");
  });
   querySelector(`#${id}.page`).classList.add("active");
};