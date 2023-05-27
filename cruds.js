
// الخطوة الاولي: انادي علي كل المدخلات
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let time = 'create';
let tmp;

// get total
// step2: function => total price
function getTotal() {
    //  اولا اتااكد ان السعر فية بيانات مع وضع + لتحويلها لرقم
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'rgb(17 162 127)';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(190, 23, 79)';
    }
}
// create product
// احسن مكان تحفظي فية الداتا هو ال Array
// save localstorage

let arrayData;
if (localStorage.product != null) {
    arrayData = JSON.parse(localStorage.product)
} else {
    arrayData = [];
}

submit.onclick = function () {
    let proData = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    getTotal();
    let notEmty = title.value != '' &&  price.value != '' &&  taxes.value != '' &&  ads.value != '' &&  discount.value != '' &&  count.value != '' &&  category.value != '' && count.value <= 1000; 
    if (notEmty) {
        if (time === 'create') {
            arrayData.push(proData);
        } else {
            arrayData[tmp] = proData;
            // بعد ما تعدل البيانات رجع ال create
            time = 'create';
            submit.innerHTML = 'Create';
        }
    }

    // عشان يحتفظ بالبيانات
    localStorage.setItem('product', JSON.stringify(arrayData));
    clearData();
    showData();
}

// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < arrayData.length; i++) {
        // get data than array to table
        table += `
        <tr>
            <td>${i}</td>
            <td>${arrayData[i].title}</td>
            <td>${arrayData[i].price}</td>
            <td>${arrayData[i].taxes}</td>
            <td>${arrayData[i].ads}</td>
            <td>${arrayData[i].discount}</td>
            <td>${arrayData[i].total}</td>
            <td>${arrayData[i].count}</td>
            <td>${arrayData[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
        </tr>`;

    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if (arrayData.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick="deleteDataAll()">Delete All</button>`;
    } else {
        btnDeleteAll.innerHTML = '';
    }
}
showData();
// delete
function deleteData(i) {
    // امسحلي الداتا دي بس من الاراي
    arrayData.splice(i, 1);
    // امسح نفس الداتا من ال لوكال
    localStorage.product = JSON.stringify(arrayData);
    showData();
}
// امسح جميع البيانات
function deleteDataAll() {
    // امسح نفس الداتا من ال لوكال
    localStorage.clear();
    // امسحلي الداتا دي بس من الاراي
    arrayData.splice(0);
    showData();
    getTotal();
}
// count
// update
function updateData(i) {
    title.value = arrayData[i].title;
    price.value = arrayData[i].price;
    taxes.value = arrayData[i].taxes;
    ads.value = arrayData[i].ads;
    discount.value = arrayData[i].discount;
    total.innerHTML = arrayData[i].total;
    count.value = arrayData[i].count;
    category.value = arrayData[i].category;
    submit.innerHTML = 'Update';
    time = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
    getTotal();
}
// search
let searchMood = 'title';
let search = document.getElementById("search");
function getSearchType(id) {
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.focus()
}
// //////////////////////////////////////////////////////////
function searchData(value) {
    let table = '';

    for (let i = 0; i < arrayData.length; i++) {
        if (searchMood == 'title') {
            if (arrayData[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${arrayData[i].title}</td>
                        <td>${arrayData[i].price}</td>
                        <td>${arrayData[i].taxes}</td>
                        <td>${arrayData[i].ads}</td>
                        <td>${arrayData[i].discount}</td>
                        <td>${arrayData[i].total}</td>
                        <td>${arrayData[i].count}</td>
                        <td>${arrayData[i].category}</td>
                        <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                    </tr>
                `;
            };
        } else {
            if (arrayData[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${arrayData[i].title}</td>
                        <td>${arrayData[i].price}</td>
                        <td>${arrayData[i].taxes}</td>
                        <td>${arrayData[i].ads}</td>
                        <td>${arrayData[i].discount}</td>
                        <td>${arrayData[i].total}</td>
                        <td>${arrayData[i].count}</td>
                        <td>${arrayData[i].category}</td>
                        <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                    </tr>`;
            };
        };
    }

    document.getElementById('tbody').innerHTML = table;
};
// clean data

//
//================================
