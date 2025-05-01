import { getNews } from "./service.js";

let data = [];
async function getData() {
    data = await getNews();
    console.log(data);
    loadDetails()
}

function loadDetails() {
    const cards = document.getElementById('cards');
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const news = data.find(news => news.id == id);
    cards.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-10">
      <!-- Başlıq və Foto -->
      <div class="bg-white shadow-md rounded-xl overflow-hidden dark:bg-gray-100">
        <img src="${news.img}" alt="${news.title}" class="w-full h-64 object-cover sm:h-96">
        <div class="p-6">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">${news.title}</h1>
          
          <!-- Başlıq altında məlumatlar: Author, ID, Kategoriya, Like -->
          <p class="text-sm text-gray-500 mb-6">
            By <span class="font-medium text-indigo-600">Leroy Jenkins</span> | ID: ${news.id} | 
            <span class="font-semibold text-blue-500">${news.category}</span> 
          </p>

          <div class="flex space-x-4 text-sm text-gray-600 mb-6">
            <span>
              <i class="fa-solid fa-thumbs-up text-xl hover:text-green-600"></i> 
              ${news.like} Like
            </span>
            <span>
              <i class="fa-solid fa-thumbs-down text-xl hover:text-red-700"></i> 
              ${news.dislike} Dislike
            </span>
          </div>
          <div class="text-gray-700 leading-relaxed space-y-4">
            <p>${news.content}</p>
          </div>
          <div class="flex space-x-4 mt-6">
            <button class="p-2 text-gray-600 hover:text-indigo-600">
              <i class="fa-solid fa-share-alt"></i> Share
            </button>
            <button class="p-2 text-gray-600 hover:text-blue-500">
              <i class="fa-solid fa-bookmark"></i> Save
            </button>
          </div>
          <div class="mt-10">
            <h2 class="text-2xl font-semibold text-gray-800">Yorumlar</h2>
            <div class="space-y-4 mt-4">
              <!-- Yorumlar -->
              <div class="p-4 bg-gray-50 rounded-md shadow-md">
                <p class="text-sm text-gray-600">"Çox maraqlı bir məqalə! Daha çox bu cür yazılar görmək istərdim!"</p>
                <p class="text-xs text-gray-500 mt-2">- User 123 | 2 hours ago</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-md shadow-md">
                <p class="text-sm text-gray-600">"Həqiqətən faydalı məlumatlar paylaşmısınız, təşəkkür edirəm!"</p>
                <p class="text-xs text-gray-500 mt-2">- User 456 | 5 hours ago</p>
              </div>
              <!-- Yorumlar Sonu -->
            </div>
          </div>

          <!-- Yorum Yazma -->
          <div class="mt-8">
            <h2 class="text-lg font-semibold text-gray-800">Yorum Yazın</h2>
            <textarea class="w-full p-4 mt-2 border rounded-md " placeholder="Yorumunuzu buraya yazın..."></textarea>
            <button class="mt-4 px-6 py-2 bg-[#1894a0]  text-white rounded-md">Yorum Gönder</button>
          </div>
        </div>
      </div>
    </div>
`;


}
getData()
