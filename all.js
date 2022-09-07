//新增代辦
const inputText = document.querySelector(".inputText");
const addBtn = document.querySelector(".btn_add");

let todolist = [];
addBtn.addEventListener("click", add);

function add() {
    if (inputText.value.trim() === "") {
        alert("請輸入代辦事項");
        return;
    }
    let obj = {};
    obj.content = inputText.value.trim();
    obj.id = new Date().getTime();
    obj.status = "";
    todolist.push(obj);
    updateList();
    inputText.value = "";
}

//渲染
const list = document.querySelector(".list");
function render(arr) {
    let str = "";
    arr.forEach((i) => {
        str += `
        <li data-id="${i.id}">
        <label class="checkbox" for="">
        <input type="checkbox" ${i.status} >
        <span>${i.content}</span>
        </label>
        <a href="#" class="delete"></a>
        </li>
        `;
    });
    list.innerHTML = str;
}


//刪除代辦事項 與 checkbox切換
list.addEventListener("click", function (e) {
    let id = e.target.closest("li").dataset.id;
    if (e.target.getAttribute("class") == "delete") {
        e.preventDefault();
        let index = todolist.findIndex((i) => i.id == id);
        todolist.splice(index, 1);
        updateList();
    } else {
        todolist.forEach((i) => {
            if (i.id == id) {
                if (i.status == "") {
                    i.status = "checked";
                } else {
                    i.status = "";
                }
            }
        });
    }
    updateList();
});

//切換tab按鈕
const tab = document.querySelector(".tab");
let status = "all";


tab.addEventListener("click", function (e) {
    status = e.target.dataset.status;
    let tabs = document.querySelectorAll(".tab li");
    tabs.forEach((i) => {
        i.classList.remove("active");
    });
    e.target.classList.add("active");
    updateList();
});

function updateList() {
    let showData = [];
    if (status === "all") {
        showData = todolist;
    } else if (status === "undo") {
        showData = todolist.filter((i) => i.status === "");
    } else {
        showData = todolist.filter((i) => i.status == "checked");
    }
    
    const todoNum = document.querySelector("#todoNum");
    let todoNumLength = todolist.filter((i) => i.status === "");
    todoNum.textContent = todoNumLength.length;
    
    render(showData);
}

updateList();

//清除已完成項目 按鈕
const clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", function (e) {
    e.preventDefault();
    todolist = todolist.filter((i) => i.status == "");
    updateList();
});

//案Enter鍵可以代替滑鼠輸入
inputText.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        add();
    }
});