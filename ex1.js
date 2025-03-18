let products = [];
let cart = [];

function showProductsByCategory(category) {
    let filteredProducts = products.filter(p => p.category === category);
    console.table(filteredProducts);
}

function addProduct() {
    let id = Number(prompt("Nhập ID sản phẩm: "));
    let name = prompt("Nhập tên sản phẩm: ");
    let price = Number(prompt("Nhập giá sản phẩm: "));
    let quantity = Number(prompt("Nhập số lượng: "));
    let category = prompt("Nhập thể loại sản phẩm: ");
    products.push({ id, name, price, quantity, category });
    console.log("Thêm sản phẩm thành công!");
}

function searchProduct() {
    let keyword = prompt("Nhập tên sản phẩm hoặc ID để tìm: ");
    let result = products.filter(p => p.name.includes(keyword) || p.id === Number(keyword));
    console.table(result);
}

function buyProduct() {
    let id = Number(prompt("Nhập ID sản phẩm cần mua: "));
    let quantity = Number(prompt("Nhập số lượng: "));
    let product = products.find(p => p.id === id);
    if (!product) {
        console.log("Sản phẩm không có trong kho.");
        return;
    }
    if (product.quantity < quantity) {
        console.log("Sản phẩm không đủ số lượng hoặc đã hết hàng.");
        return;
    }
    product.quantity -= quantity;
    let cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity });
    }
    console.log(`Mua thành công ${quantity} sản phẩm ${product.name}.`);
}

function sortProducts() {
    let order = prompt("Nhập 'asc' để sắp xếp tăng dần, 'desc' để sắp xếp giảm dần: ");
    if (order === 'asc') {
        products.sort((a, b) => a.price - b.price);
    } else {
        products.sort((a, b) => b.price - a.price);
    }
    console.table(products);
}

function calculateTotal() {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(`Tổng số lượng sản phẩm đã mua: ${totalQuantity}, Tổng tiền: ${totalPrice} VND`);
}

function totalProductsInStock() {
    let total = products.reduce((sum, product) => sum + product.quantity, 0);
    console.log(`Tổng số lượng sản phẩm trong kho: ${total}`);
}

function exit() {
    console.log("Thoát chương trình.");
}

function main() {
    let choice;
    do {
        choice = Number(prompt(`Chọn chức năng:\n1. Hiển thị sản phẩm theo danh mục\n2. Thêm sản phẩm mới\n3. Tìm kiếm sản phẩm\n4. Mua sản phẩm\n5. Sắp xếp sản phẩm theo giá\n6. Tính tổng tiền\n7. Hiển thị tổng số lượng sản phẩm trong kho\n8. Thoát`));
        switch (choice) {
            case 1:
                let category = prompt("Nhập thể loại sản phẩm: ");
                showProductsByCategory(category);
                break;
            case 2:
                addProduct();
                break;
            case 3:
                searchProduct();
                break;
            case 4:
                buyProduct();
                break;
            case 5:
                sortProducts();
                break;
            case 6:
                calculateTotal();
                break;
            case 7:
                totalProductsInStock();
                break;
            case 8:
                exit();
                break;
            default:
                console.log("Lựa chọn không hợp lệ, vui lòng nhập lại.");
        }
    } while (choice !== 8);
}

main();
