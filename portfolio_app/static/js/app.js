const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");
const date = document.querySelector("#date");
const txta = document.getElementsByTagName("textarea");
const addTagBtn = document.querySelector("#add-btn");
const blogArticle = document.querySelector(".blog-article");
const expandSearchBtn = document.querySelector(".expand-search-btn");
const contactBtn = document.querySelector(".hero-btn");
const flashMessages = document.querySelector(".flash");

// show sidebar
navBtn.addEventListener("click", function() {
  sidebar.classList.add("show-sidebar");
});
closeBtn.addEventListener("click", function() {
  sidebar.classList.remove("show-sidebar");
});
// set year
date.innerHTML = new Date().getFullYear();

// add resizable textarea
for (let i = 0; i < txta.length; i++) {
  txta[i].setAttribute(
    "style",
    "height:" + txta[i].scrollHeight + "px;overflow-y:hidden;"
  );
  txta[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

if (contactBtn) {
  const contactInfos = document.querySelectorAll(".contact-info");
  contactBtn.addEventListener("click", () => {
    contactInfos.forEach(info => {
      info.classList.add("show-contact");
      setTimeout(() => {
        info.classList.remove("show-contact");
      }, 20000);
    });
  });
}

// send filesize as a cookie
function filesize(elem) {
  document.cookie = `filesize=${elem.files[0].size}`;
}

// add and delete tags
if (addTagBtn) {
  const deleteTagBtn = document.querySelector(".delete-tag-btn");
  const articleTags = document.querySelector(".article-tags");
  const tagText = document.querySelector(".tag-text");
  addTagBtn.addEventListener("click", function() {
    let input = document.createElement("input");
    input.type = "text";
    input.name = `tag${articleTags.childNodes.length}`;
    input.classList.add("create-tag");
    articleTags.appendChild(input);
    tagText.classList.remove("show");
    // }
  });

  deleteTagBtn.addEventListener("click", function() {
    if (articleTags.firstChild) {
      articleTags.removeChild(articleTags.lastChild);
      if (articleTags.childNodes.length === 0) {
        tagText.classList.add("show");
      }
    }
  });

  // show image name for image input in create_article
  const input = document.querySelector(".hidden-btn");
  const selectedImage = document.querySelector(".selected-image");

  input.addEventListener("change", function(e) {
    let fileName = e.target.value.split("\\").pop();

    selectedImage.innerText = fileName;
  });
}

// submit search on pressing enter
const searchInput = document.querySelector(".search");
const searchForm = document.getElementById("search-form");
if (searchInput) {
  searchInput.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchForm.action = `/blog/${searchInput.value}`;
      document.getElementById("search-btn").click();
    }
  });
}

if (blogArticle) {
  const otherArticles = document.querySelector(".other-articles");
  if (otherArticles.childNodes.length === 1) {
    otherArticles.classList.remove("article-footer");
    otherArticles.classList.add("article-footer-only-one");
  }
}

if (expandSearchBtn) {
  const expandSearchArrow = document.querySelector(".fa-angle-down");
  const searchContainer = document.querySelector(".expanded-blog-search");
  const articlesSection = document.querySelector(".blog-articles");
  expandSearchBtn.addEventListener("click", function() {
    articlesSection.classList.toggle("blog-articles-small");
    articlesSection.classList.toggle("blog-articles");
    if (expandSearchArrow.classList.contains("rotate")) {
      searchContainer.classList.remove("z-index");
      setTimeout(function() {
        expandSearchArrow.classList.toggle("rotate");
        searchContainer.classList.toggle("show-blog-search");
      }, 200);
    } else {
      expandSearchArrow.classList.toggle("rotate");
      searchContainer.classList.toggle("show-blog-search");
      setTimeout(function() {
        searchContainer.classList.toggle("z-index");
      }, 300);
    }
  });

  const dropdownBtns = document.querySelectorAll("#dropdown-btn");

  dropdownBtns.forEach(btn => {
    const dropdownContent = btn.nextElementSibling;
    btn.addEventListener("click", () => {
      dropdownContent.classList.toggle("show");
    });

    window.addEventListener("click", function(event) {
      if (event.target != btn && event.target.parentElement != btn) {
        if (dropdownContent.classList.contains("show")) {
          dropdownContent.classList.remove("show");
        }
      }
    });
  });
}

const projectsCenter = document.querySelector(".projects-center");

async function ajaxUser() {
  const base = "https://api.github.com/users/";
  const clientID = "4425ed62040a0d1ace3b";
  const clientSecret = "fe313c4b30f340241ddab787a77f2116f861f732";
  const user = "erwinru";
  // repos url
  const reposURL = `${base}${user}/repos?client_id="${clientID}"&client_secret="${clientSecret}"`;

  // get repos
  const reposData = await fetch(reposURL, {
    headers: {
      accept: "application/vnd.github.mercy-preview+json"
    }
  });
  const repos = await reposData.json();
  console.log(repos);

  const repoNames = [
    "a-star-visualization",
    "chess-engine",
    "computational-physics",
    "portfolio"
  ];

  return repos.filter(repo => repoNames.includes(repo.name));
}

function displayRepos(repos) {
  repos.forEach((repo, i) => {
    console.log(repo);
    const a = document.createElement("a");
    a.classList.add(`project-${i + 1}`);
    a.href = `${repo.html_url}`;
    a.target = "_blank";
    let topicsString = "";
    repo.topics.forEach(topic => {
      topicsString += `<span class="tag">${topic}</span>`;
    });
    a.innerHTML = `
    <article class="project">
      <img src="https://raw.githubusercontent.com/erwinru/${repo.name}/master/img/readme-example.png" alt="single project" class="project-img">
      <div class="project-info">
        <h4>${repo.name}</h4>
        <p>${repo.description}</p>
        <div class="tags justify-center">
          ${topicsString}
        </div>
      </div>
    </article>
    `;
    projectsCenter.appendChild(a);
  });
}

if (projectsCenter) {
  console.log(projectsCenter);
  ajaxUser().then(data => displayRepos(data));
}

if (flashMessages) {
  setTimeout(() => {
    flashMessages.style.display = "none";
  }, 2000);
}
