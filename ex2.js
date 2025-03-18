let books = [];
let cart = [];

function showBooksByCategory(category) {
    let filteredBooks = books.filter(b => b.category === category);
    console.table(filteredBooks);
}

function addBook() {
    let id = Number(prompt("Nhập ID sách: "));
    let name = prompt("Nhập tên sách: ");
    let price = Number(prompt("Nhập giá sách: "));
    let quantity = Number(prompt("Nhập số lượng: "));
    let category = prompt("Nhập thể loại sách: ");
    books.push({ id, name, price, quantity, category });
    console.log("Thêm sách thành công!");
}

function searchBook() {
    let keyword = prompt("Nhập tên sách hoặc ID để tìm: ");
    let result = books.filter(b => b.name.includes(keyword) || b.id === Number(keyword));
    console.table(result);
}

function buyBook() {
    let id = Number(prompt("Nhập ID sách cần mua: "));
    let quantity = Number(prompt("Nhập số lượng: "));
    let book = books.find(b => b.id === id);
    if (!book) {
        console.log("Sách không có trong kho.");
        return;
    }
    if (book.quantity < quantity) {
        console.log("Sách không đủ số lượng hoặc đã hết hàng.");
        return;
    }
    book.quantity -= quantity;
    let cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ id: book.id, name: book.name, price: book.price, quantity });
    }
    console.log(`Mua thành công ${quantity} quyển ${book.name}.`);
}

function sortBooks() {
    let order = prompt("Nhập 'asc' để sắp xếp tăng dần, 'desc' để sắp xếp giảm dần: ");
    if (order === 'asc') {
        books.sort((a, b) => a.price - b.price);
    } else {
        books.sort((a, b) => b.price - a.price);
    }
    console.table(books);
}

function calculateTotal() {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(`Tổng số lượng sách đã mua: ${totalQuantity}, Tổng tiền: ${totalPrice} VND`);
}

function totalBooksInStock() {
    let total = books.reduce((sum, book) => sum + book.quantity, 0);
    console.log(`Tổng số lượng sách trong kho: ${total}`);
}

function exit() {
    console.log("Thoát chương trình.");
}

function main() {
    let choice;
    do {
        choice = Number(prompt(`Chọn chức năng:\n1. Hiển thị sách theo danh mục\n2. Thêm sách mới\n3. Tìm kiếm sách\n4. Mua sách\n5. Sắp xếp sách theo giá\n6. Tính tổng tiền\n7. Hiển thị tổng số lượng sách trong kho\n8. Thoát`));
        switch (choice) {
            case 1:
                let category = prompt("Nhập thể loại sách: ");
                showBooksByCategory(category);
                break;
            case 2:
                addBook();
                break;
            case 3:
                searchBook();
                break;
            case 4:
                buyBook();
                break;
            case 5:
                sortBooks();
                break;
            case 6:
                calculateTotal();
                break;
            case 7:
                totalBooksInStock();
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
