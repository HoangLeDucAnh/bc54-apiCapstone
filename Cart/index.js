import { renderProductList, popUp, renderToCart } from "./controller.js";
import { https } from "./services.js";

let showData = () => {
  https
    .get("/product")
    .then((res) => {
      renderProductList(res.data);
      filterProduct(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
showData();

// xử lý modal
// lấy thông tin sản phẩm hiện lên modal
// bật tắt modal
window.popUp = (id) => {
  https
    .get(`/product/${id}`)
    .then((res) => {
      console.log(res.data);
      $("#my_modal").modal("show");
      $(".modal-backdrop").remove();
      popUp(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
function btnClose() {
  $("#my_modal").modal("hide");
  $(".modal-backdrop").remove();
}
window.btnClose = btnClose;

// add to cart
let productArr = [];

function addProductToArr(product) {
  productArr.push(product);
  // console.log("array", productArr);
  return productArr;
}
window.addProductToArr = addProductToArr;

window.addProduct = (id) => {
  https
    .get(`/product/${id}`)
    .then((res) => {
      // console.log(res.data);
      addProductToArr(res.data);
      renderToCart(productArr);
    })
    .catch((err) => {
      console.log(err);
    });
};
window.renderToCart = renderToCart;

// lọc sản phẩm
function filterProduct(arr) {
  var filteredProductArr = [];
  var selectElement = document.getElementById(`filter`);
  selectElement.onchange = function () {
    var selectedValue = selectElement.value;

    if (selectedValue === "all") {
      renderProductList(arr);
    } else {
      // lọc object theo type dã chọn
      filteredProductArr = arr.filter(function (product) {
        return product.type === selectedValue;
      });
      renderProductList(filteredProductArr);
    }
  };
}
window.filterProduct = filterProduct;

// shopping bag
document.addEventListener("DOMContentLoaded", function () {
  var scrollingElement = document.querySelector(".scrolling");
  var contentContainer = document.querySelectorAll("body");

  // Lắng nghe sự kiện scroll
  window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY;
  });
});

// Chuyển tới giỏ hàng
document.addEventListener("DOMContentLoaded", function () {
  var targetElement = document.getElementById("cart");
  document.querySelector(".scrolling").addEventListener("click", function () {
    window.location.hash = targetElement.id;
  });
});
// xử lú cart
const closeCart = document.getElementById("closeCart");
const showCart = document.querySelector(".scrolling");
showCart.addEventListener("click", function () {
  document.querySelector(".cart").style.right = "0";
});
closeCart.addEventListener("click", function () {
  document.querySelector(".cart").style.right = "-100%";
});
