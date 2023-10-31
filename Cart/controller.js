export let renderProductList = (arr) => {
  var content = ``;
  for (var i = 0; i < arr.length; i++) {
    var product = arr[i];
    var div = `<div id="product_list">
                  <img src="${product.img}" alt="" />
                  <span class="text-xl">${product.name}</span>
                  <p>${product.price} $</p>
                  <button class="open_modal" onclick="popUp(${product.id})">Mô Tả</button>
                  <button onclick="addProduct(${product.id})">Thêm Vào Giỏ hàng</button>
                </div>`;

    content += div;
  }
  document.getElementById(`show_data`).innerHTML = content;
};

export let renderToCart = (productArr) => {
  var cartTable = document.querySelector(".tbody");
  var productCount = {};
  var total = 0;
  for (var i = 0; i < productArr.length; i++) {
    let product = productArr[i];

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    if (!productCount[product.id]) {
      productCount[product.id] = 0;
    }
    productCount[product.id]++;
    var content = `<tr id="${product.id}">
                    <td style="display:flex; justify-content:center; align-items:center"><img style="width:200px; height:200px" src="${
                      product.img
                    }" alt="" />${product.name}</td>
                    <td id="priceItem">${product.price}$</td>
                    <td><input class="inputValue" id='input_${
                      product.id
                    }' style="width:50px" type="number" onchange="updateInput(${
      product.id
    })" value="${productCount[product.id]}" min="1"></td>
                    <td><button class="btn btn-danger" onclick="removeProduct(${
                      product.id
                    }) ">Xoá</button></td>
                  </tr>`;

    var existingRow = document.getElementById(`${product.id}`);

    // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng và nội dung
    if (existingRow) {
      existingRow.innerHTML = content;
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
      cartTable.innerHTML += content;
    }
    totalPrice();
  }
};
// tổng giá tiền
function totalPrice() {
  var cartRows = document.querySelectorAll(".tbody tr");
  var total = 0;

  cartRows.forEach(function (row) {
    var inputElement = row.querySelector('input[type="number"]');
    var priceElement = row.querySelector("#priceItem");
    var quantity = parseInt(inputElement.value);
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    total += quantity * price;
  });

  document.getElementById("price_total").innerText = total + "$";
}

// xoá sản phẩm trong cart
function removeProduct(id) {
  const rowToRemove = document.getElementById(id);
  rowToRemove.remove();
  totalPrice();
}

window.removeProduct = removeProduct;

//  thay đổi giá sản phẩm khi tăng input
function updateInput(id) {
  var selectedInput = document.getElementById(`input_${id}`);
  selectedInput.addEventListener("change", function () {
    totalPrice();
  });
}
window.updateInput = updateInput;

// modal
export let popUp = (product) => {
  let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
    product;
  document.getElementById("namePhone").innerHTML = `Sản Phẩm: ` + product.name;
  document.getElementById("pricePhone").innerHTML =
    `Giá: ` + product.price + `$`;
  document.getElementById("screenPhone").innerHTML =
    `Màn Hình: ` + product.screen;
  document.getElementById("backCamera").innerHTML =
    `Thông Số Camera Sau: ` + product.backCamera;
  document.getElementById("frontCamera").innerHTML =
    `Thông Số Camera Trước: ` + product.frontCamera;
  document.getElementById("descPhone").innerText = `Mô Tả: ` + product.desc;
};
