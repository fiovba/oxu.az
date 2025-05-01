import { getNews, updateNews } from "./service.js";

let data = [];

const menuToggle = document.getElementById("menu-btn");
const dropdownWrapper = document.getElementById("dropdownWrapper");
const cardsDiv = document.getElementById("cardsDiv");
let isOpen = false;
if (menuToggle && dropdownWrapper) {
    menuToggle.addEventListener("click", () => {
        isOpen = !isOpen;
        dropdownWrapper.style.maxHeight = isOpen ? dropdownWrapper.scrollHeight + "px" : "0px";
    });

    window.addEventListener("resize", () => {
        if (isOpen) {
            dropdownWrapper.style.maxHeight = dropdownWrapper.scrollHeight + "px";
        }
    });
}
function getUserReaction(id) {
    return localStorage.getItem(`reaction-${id}`); // məsələn: "like" / "dislike"
}

function setUserReaction(id, reaction) {
    localStorage.setItem(`reaction-${id}`, reaction); // yadda saxla
}

if (document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

async function getData() {
    data = await getNews();
    console.log(data);

    if (cardsDiv) printNewsCards();
}
window.handleReaction = async function(id, count, status) {
    let obj = {};
    const storageKey = `reaction-${id}`;
    const currentReaction = localStorage.getItem(storageKey);

    if (status == true && currentReaction != "like") {
        obj.like = currentReaction == "dislike" ? count + 1 : count + 1;
        obj.dislike = currentReaction == "dislike" ? count - 1 : count;
        localStorage.setItem(storageKey, "like");
    } else if (status == false && currentReaction != "dislike") {
        obj.dislike = currentReaction == "like" ? count + 1 : count + 1;
        obj.like = currentReaction == "like" ? count - 1 : count;
        localStorage.setItem(storageKey, "dislike");
    } else {
        return; 
    }

    await updateNews(id, obj);
    getData();
}

window.handleView = async function(id, view){
    await updateNews(id, {view:view+1});
    console.log("clicked", id, view);  
    window.location.href = `details.htm?id=${id}`;
}

function printNewsCards() {
    cardsDiv.innerHTML = ''
    data.forEach(news => {
        const truncatedContent = news.content.length > 30 ? news.content.slice(0, 70) + '...' : news.content;
        const reaction = localStorage.getItem(`reaction-${news.id}`) || "";
        const likeClass = reaction === "like" ? "text-green-600" : "";
        const dislikeClass = reaction === "dislike" ? "text-red-700" : "";

        cardsDiv.innerHTML += `
        <div class="max-w-sm w-full p-4 space-y-4 overflow-hidden rounded-lg shadow-md bg-white text-gray-800">
            <div>
                <a onclick="handleView(${news.id},${news.view})">
                    <img src="${news.img}" alt="" class="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500">
                    <h2 class="mb-1 text-xl font-semibold">${news.title}</h2>
                    <span>${news.category}</span>
                    <p class="text-sm dark:text-gray-600">${truncatedContent}</p>
                </a>
            </div>
            <div class="flex flex-wrap justify-between">
                <div class="space-x-2">
                    <button aria-label="Share this post" type="button" class="p-2 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current dark:text-violet-600">
                            <path d="..."></path>
                        </svg>
                    </button>
                    <button aria-label="Bookmark this post" type="button" class="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current dark:text-violet-600">
                            <path d="..."></path>
                        </svg>
                    </button>
                </div>
                <div class="flex space-x-2 text-sm dark:text-gray-600">
                    <button type="button" class="flex items-center p-1 space-x-1.5">
                        <span>
                            <i class="fa-regular fa-thumbs-up text-xl hover:text-[#1894a0] ${likeClass}" 
                               onclick="handleReaction(${news.id}, ${news.like}, true)">
                            </i> ${news.like}
                        </span>
                        <span>
                            <i class="fa-regular fa-thumbs-down text-xl hover:text-[#1894a0] ${dislikeClass}" 
                               onclick="handleReaction(${news.id}, ${news.dislike}, false)">
                            </i> ${news.dislike}
                        </span>
                        <span>
                            <i class="fa-solid fa-eye"></i> ${news.view}
                        </span>
                    </button>
                </div>
            </div>
        </div>`;
    });
}


window.goDetails = function(id){
    window.location.href=`https://oxu-az-lovat.vercel.app/?id=${id}`
}

getData();
