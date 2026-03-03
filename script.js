let data = JSON.parse(localStorage.getItem("hadithData")) || {
  categories: {
    Namaz: [],
    Wudu: [],
    Fasting: [],
    Dua: [],
    Akhlaq: [],
    Hajj: [],
    Zakat: []
  }
};

let currentCategory = null;
let currentIndex = 0;

/* Save */
function saveData(){
  localStorage.setItem("hadithData", JSON.stringify(data));
}

/* Toast */
function showToast(msg){
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(()=>toast.style.display="none",3000);
}

/* Landing */
function renderLanding(){
  app.innerHTML = `
    <div class="landing">
      <button class="learn-btn" onclick="renderCategories()">Let's Learn</button>
    </div>
  `;
}

/* Categories */
function renderCategories(){
  let html = `<h2>Categories</h2>`;
  Object.keys(data.categories).forEach(cat=>{
    html+=`
    <div class="card" onclick="openCategory('${cat}')">
      <h3>${cat}</h3>
      <p>${data.categories[cat].length} Hadith</p>
    </div>
    `;
  });
  app.innerHTML = html;
}

/* Open Category */
function openCategory(cat){
  currentCategory = cat;
  currentIndex = 0;
  renderHadith();
}

/* Render Hadith */
function renderHadith(){
  let list = data.categories[currentCategory];
  if(list.length===0){
    app.innerHTML=`<h2>No Hadith Found</h2>`;
    return;
  }

  let h = list[currentIndex];

  app.innerHTML=`
  <div class="hadith-view">
    <div class="hadith-text">${h.text}</div>
    <div class="reference">${h.reference}</div>
    <p>${currentIndex+1} / ${list.length}</p>
    <button ${currentIndex===0?'class="hidden"':''} onclick="prevHadith()">Previous</button>
    <button ${currentIndex===list.length-1?'class="hidden"':''} onclick="nextHadith()">Next</button>
    <button onclick="deleteHadith()">Delete</button>
  </div>
  `;
}

/* Navigation */
function prevHadith(){currentIndex--;renderHadith();}
function nextHadith(){currentIndex++;renderHadith();}

/* Delete */
function deleteHadith(){
  if(confirm("Delete this hadith?")){
    data.categories[currentCategory].splice(currentIndex,1);
    saveData();
    showToast("Deleted");
    renderHadith();
  }
}

/* Modal */
function openModal(){
  document.getElementById("hadithModal").style.display="flex";
  loadCategories();
}

function loadCategories(){
  let select = document.getElementById("categorySelect");
  select.innerHTML="";
  Object.keys(data.categories).forEach(cat=>{
    select.innerHTML+=`<option value="${cat}">${cat}</option>`;
  });
}

function saveHadith(){
  let cat = document.getElementById("categorySelect").value;
  let newCat = document.getElementById("newCategory").value;
  let text = document.getElementById("hadithText").value;
  let ref = document.getElementById("hadithReference").value;

  if(newCat){
    data.categories[newCat]=[];
    cat=newCat;
  }

  data.categories[cat].push({text:text,reference:ref});
  saveData();
  showToast("Hadith Added Successfully");
  document.getElementById("hadithModal").style.display="none";
}

/* Theme */
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light"));
}

/* Load Theme */
if(localStorage.getItem("theme")==="true"){
  document.body.classList.add("light");
}

/* Loader */
window.onload=()=>{
  setTimeout(()=>{
    document.getElementById("loader").style.display="none";
    renderLanding();
  },1000);
};