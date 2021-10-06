let books = {};
$(document).ready(function(){
    $('#modal-add-book-ok').on('click', addBookToLibrary);
});

function addBookToLibrary(){
    let formData = $('form').serializeArray();
    let newArray = [];
    for (key in formData){
        newArray[formData[key]['name']] = formData[key]['value'];
    }
    let data = $(this).attr('data');
    if(data == undefined){
        let randomArticle = Math.round(Math.random()*100);
        books[randomArticle] = newArray;
        console.log(books);
        drawBook(randomArticle);
    }else{
        books[data] = newArray;
        drawBook(data)
    }
    $('#modal-add-book').modal('hide');
    
}

function drawBook(article){
    let book = $('.book[data='+article+']');
    if(book.length == 0){
        let div = document.createElement('div');
        div.className = "col-lg-3 book";
        div.setAttribute('data', article);

        let cover = document.createElement('div');
        cover.className = "book-cover";
        cover.style.backgroundImage = `url(${books[article]['book-cover']})`;

        let bookName = document.createElement('h4');
        bookName.className = "book-title";
        bookName.innerHTML = books[article]['book-name'];

        let bookAuthor = document.createElement('p');
        bookAuthor.className = "book-author";
        bookAuthor.innerHTML = books[article]['book-author'];

        let bookYear = document.createElement('p');
        bookYear.className = "book-year";
        bookYear.innerHTML = books[article]['book-year'];

        let buttonEdit = document.createElement('button');
        buttonEdit.className = "btn btn_success edit";
        buttonEdit.innerHTML = 'Редактировать';
        buttonEdit.setAttribute('data', article);
        buttonEdit.onclick = editBook;

        let buttonDelete = document.createElement('button');
        buttonDelete.className = "btn btn_warning edit";
        buttonDelete.innerHTML = 'Удалить';
        buttonDelete.onclick = deleteBook;

        div.appendChild(cover);
        div.appendChild(bookName);
        div.appendChild(bookAuthor);
        div.appendChild(bookYear);
        div.appendChild(buttonEdit);
        div.appendChild(buttonDelete);

        $('.book-panel').append(div);
    }else{
        let bookCover = book.find('.book-cover');
        bookCover.css({'background-image': 'url('+books[article]['book-cover']+')'});
        let bookYear = book.find('.book-year').eq(0);
        bookYear.html(books[article]['book-year']);
        let bookName = book.find('.book-title').eq(0);
        bookName.html(books[article]['book-name']);
        let bookAuthot = book.find('.book-author').eq(0);
        bookAuthot.html(books[article]['book-author']);
        $('#modal-add-book-ok').removeAttr('data');

    }
}

function editBook() {
    let data = $(this).attr('data');
    $('#modal-add-book').modal('show');
    $('form #book-name').val(books[data]['book-name']);
    $('form #book-author').val(books[data]['book-author']);
    $('form #book-cover').val(books[data]['book-cover']);
    $('form #book-year').val(books[data]['book-year']);
    $('#modal-add-book-ok').attr('data', data);
}

function deleteBook () {
    $(this).parent('.book').remove();
}