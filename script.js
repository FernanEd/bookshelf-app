
const LISTED_BOOKS = [];

function Book(title, author, pages, hasBeenRead, isbn){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
    this.isbn = isbn;
}


let HarryPoter = new Book("Harry Potter", "J. K Rowling", 278, true, 9780747532743);
addBook(HarryPoter);

let LordRings = new Book("Lord of the Rings", "T. K Tolkien", 400, false);
addBook(LordRings);

displayBooks();

// PAGE NAV
const LISTINGS = document.querySelector("#listings");
LISTINGS.addEventListener("click", e => {
    displayBooks();
    selectLink(LISTINGS);
});
const BOOKS_READ = document.querySelector("#books-read");
BOOKS_READ.addEventListener("click", e => {
    displayBooks(LISTED_BOOKS.filter(book => book.hasBeenRead));
    selectLink(BOOKS_READ);
});
const BOOKS_PENDING = document.querySelector("#books-pending");
BOOKS_PENDING.addEventListener("click", e => {
    displayBooks(LISTED_BOOKS.filter(book => !book.hasBeenRead));
    selectLink(BOOKS_PENDING);
});

let currentPage = LISTINGS;

function selectLink(link){
    const NAVLINKS = [LISTINGS, BOOKS_READ, BOOKS_PENDING];
    NAVLINKS.forEach(link => link.classList.remove("selected-page"));
    link.classList.add("selected-page");
    currentPage = link;
}

// BOOK CRUD

const ADD_BOOK_FORM = document.querySelector("#add-form");
const EDIT_BOOK_FORM = document.querySelector("#edit-form");
const FORM_BG = document.querySelector(".form-bg")

ADD_BOOK_FORM.addEventListener("submit", e => {
    //Don't let form close
    e.preventDefault();
    submitForm(ADD_BOOK_FORM);
    ADD_BOOK_FORM.reset();
    currentPage.click();
})

function submitForm(form){
    let title = form.querySelector("#title-input").value;
    let author = form.querySelector("#author-input").value;
    let pages = form.querySelector("#pages-input").value;
    let isbn = form.querySelector("#isbn-input").value;
    let hasBeenRead = form.querySelector("#read-input").checked;

    const newBook = new Book(title, author, pages, hasBeenRead, isbn);
    addBook(newBook);

    makeNotification("New book added!");
}

function makeNotification(msg){
    const NOTIFICATION_HTML = document.createElement("div");
    NOTIFICATION_HTML.innerHTML = msg;
    NOTIFICATION_HTML.classList.add("notification");

    document.body.appendChild(NOTIFICATION_HTML);
    //Wait 2 seconds and delete element
    setTimeout(() => {document.body.removeChild(NOTIFICATION_HTML)}, 5000);
}

//Adding a book

const ADD_BOOK_BTN = document.querySelector("#add-btn");

ADD_BOOK_BTN.addEventListener("click", e => {
    launchForm(ADD_BOOK_FORM);
})



function launchForm(form){
    let bg = form.parentElement;
    let closeBtn = form.querySelector(".close-btn");

    form.style.cssText = "display: show;";
    bg.style.cssText = "display: show;";

    //Close form
    closeBtn.addEventListener("click", e => {
        form.style.cssText = "display: none;";
        bg.style.cssText = "display: none;";
    })
}



function addBook(bookObj){
    LISTED_BOOKS.push(bookObj)
}



function displayBooks(booksArray){
    const BOOKS_WRAPPER = document.querySelector("#books-wrapper");
    //Clear books html
    BOOKS_WRAPPER.innerHTML = "";

    if(arguments.length === 0)
    {
        booksArray = LISTED_BOOKS;
    }

    if(booksArray.length === 0)
    {
        BOOKS_WRAPPER.innerHTML = "You have no books yet."
    }

    booksArray.forEach(book => {
        const HTML_BOOK = 
        `<div class="book-item">
            <header class="book-title">
                <div class="title">
                    <h2>${book.title}</h1>
                </div>
                <div class="author">
                    <p>by ${book.author}</p>
                </div>
                <div class="edit">
                    <button class="icon-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </button>
                </div>
            </header>
            ${book.isbn? `<section class="book-cover">
            <img src="http://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg" alt="No cover avalaible">
        </section>`: ''}
            <footer class="book-footer">
                <p>${book.pages} pages</p>
                <p>${book.hasBeenRead? "Read": "Not read"}</p>
            </footer>
        </div>`;

        BOOKS_WRAPPER.innerHTML += HTML_BOOK;
    })    
}
