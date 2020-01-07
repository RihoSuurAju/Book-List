//Define UI variables

const form = document.querySelector('#book-form');
const bookList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-books');
const filter = document.querySelector('#filter');
const bookInput = document.querySelector('#book');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getbooks);
  //Add book event
  form.addEventListener('submit', addBook);
  //Remove book event
  bookList.addEventListener('click', removeBook);
  //clear book event
  clearBtn.addEventListener('click', clearbooks);
  //Filter books event
  filter.addEventListener('keyup', filterbooks);
}

//get books from local storage
function getbooks(){
  let books;
  if(localStorage.getItem('books')===null){
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(function(book){
      //Create an li element
  const li = document.createElement('li');
  //add class to the li element
  li.className = 'collection-item';
  //create a textnode and append it to the li
  li.appendChild(document.createTextNode(book));
  //create nw link element 
  const link = document.createElement('a');
  //add class 
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to the li
  li.appendChild(link);

  //Append li to ul
  bookList.appendChild(li);

  });

}

//Add book
function addBook(e){
  if(bookInput.value === ''){
    alert('Add a book');
  }

  //Create an li element
  const li = document.createElement('li');
  //add class to the li element
  li.className = 'collection-item';
  //create a textnode and append it to the li
  li.appendChild(document.createTextNode(bookInput.value));
  //create nw link element 
  const link = document.createElement('a');
  //add class 
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to the li
  li.appendChild(link);

  //Append li to ul
  bookList.appendChild(li);

  //Store in local storage
  storeTaskInLocalStorage(bookInput.value);

  //clear the input
  bookInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(book) {
  let books;

  if(localStorage.getItem('books')===null){
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

}


//Remove book
function removeBook(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
       e.target.parentElement.parentElement.remove();

       //Remove from loca storage
       removeBookFromLocalStorage(e.target.parentElement.parentElement);
       
    }
  }
}

function removeBookFromLocalStorage(bookItem){
  let books;
        if(localStorage.getItem('books')===null){
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));
        }

        books.forEach(function(book, index){
          if(bookItem.textContent === book){
            books.splice(index, 1);
          }
        });

        localStorage.setItem('books', JSON.stringify(books));

}

function clearbooks(){
  //bookList.innerHTML = '';
  //removing with while loop and removechild
  while(bookList.firstChild){
    bookList.removeChild(bookList.firstChild);
  }

  //Clear books from Local Storage
  clearbooksFromLocalStorage();
}

function clearbooksFromLocalStorage(){
  localStorage.clear();
}

function filterbooks(e){
  const text = e.target.value.toLowerCase();
  console.log(text);

  document.querySelectorAll('.collection-item').forEach(function(book){
    const item = book.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      book.style.display = 'block';
    }else{
      book.style.display = 'none';
    }
  });
}