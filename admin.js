import { getNews, deleteByID, addNews,updateNews } from "./service.js";

const tbody = document.querySelector('tbody');
let data = [];

async function getData() {
    data = await getNews();
    printTable();
}

window.handleDelete = async (id) => {
    await deleteByID(id);
    data = data.filter(item => item.id !== id);
    printTable();
};

window.openModule = function () {
    document.getElementById("newsModal").classList.remove("hidden");
};

window.closeModule = function () {
    document.getElementById("newsModal").classList.add("hidden");
};

window.saveNews = async function () {
    const title = document.getElementById("titleInput").value;
    const content = tinymce.get("contentInput").getContent();
    const img = document.getElementById("imgInput").value;
    const date = new Date().toISOString().split("T")[0];

    const newNews = {
        title,
        content,
        img,
        like: 0,
        dislike: 0,
        view: 0,
        date
    };

    await addNews(newNews);
    document.getElementById("titleInput").value = "";
    tinymce.get("contentInput").setContent(""); // düz budur!
    document.getElementById("imgInput").value = "";
    closeModule();
    getData();
};


function printTable() {
    tbody.innerHTML = ''; 
    data.forEach(item => {
        const truncatedContent = item.content.length > 30 ? item.content.slice(0, 70) + '...' : item.content;
        tbody.innerHTML += `
        <tr class="bg-gray-900   border-b border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                ${item.title}
            </th>
            <td class="px-6 py-4">${truncatedContent}</td>
            <td class=" px-6 py-4"><img class="w-[70px] h-[70px]" src="${item.img}"></td>
            <td class="px-6 py-4">${item.like}, ${item.dislike}, ${item.view}</td>
            <td class="px-6 py-4">${item.date}</td>
            <td class="px-6 py-4">
                <a href="#" onclick="handleEdit(${item.id})" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                <a href="#" onclick="handleDelete(${item.id})" class="font-medium text-red-700 hover:underline">Delete</a>
            </td>
        </tr>`;
    });
}
window.handleEdit = function(id){
    const selectedItem = data.find(item => item.id == id);

    document.getElementById("titleInput").value = selectedItem.title;
    tinymce.get("contentInput").setContent(selectedItem.content);

    document.getElementById("imgInput").value = selectedItem.img;

    document.getElementById("saveButton").onclick = async function () {
        const updatedTitle = document.getElementById("titleInput").value;
        const updatedContent = tinymce.get("contentInput").getContent();
        const updatedImg = document.getElementById("imgInput").value;

        const updatedNews = {
            title: updatedTitle,
            content: updatedContent,
            img: updatedImg,
            like: selectedItem.like,
            dislike: selectedItem.dislike,
            view: selectedItem.view,
            date: selectedItem.date
        };

        await updateNews(id, updatedNews);
        closeModule();
        getData();
    };

    openModule();
};


getData();
