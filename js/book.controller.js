'use strict'


function onInit() {
    renderFilterByQueryStringParam()
    doTrans()
    renderBooks()
}

function onNextPage(elButton) {
    var page = nextPage()
    if (!page) return

    renderBooks()
}
function onPrevPage(elButton) {
    var page = prevPage()
    if (!page) return
    // if (!page) {
    //     elButton.disabled = true
    // } else elButton.disabled = false
    renderBooks()
}



function renderBooks() {
    const books = getBooks()
    var tableHeaderHTML = `<th data-trans='id'>ID</th>
<th class="title" data-trans='book-names'>Title</th>
<th data-trans='price'>Price</th>  
<th class="rate" data-trans='rate'>rate</th> 
<th class="action" data-trans='actions' >Actions</th>  `
    var strHTMLs = books.map(book => `<tr>
    <td class"table-id">${book.id}</td>
    <td class"table-book">${book.name}</td>
    <td class"table-price" >${book.price}$</td>
    <td class"table-price" >${book.rate ? '⭐'.repeat(book.rate) : '⚫'} </td>
    <td>
        <button class="read action" data-trans='read' onclick="onReadBook(${book.id})">Read</button>
        <button class="update action" data-trans='update' onclick="onUpdateBook(${book.id})">update</button>
        <button class="delete action" data-trans='delete' onclick="onDeleteBook(${book.id})">delete</button>
    </td>
    </tr > `).join('')
    const elTable = document.querySelector('table')
        .innerHTML = tableHeaderHTML + strHTMLs
}

function onUpdateBook(bookId) {
    var price = +prompt('Enter the new price of the book')
    if (price) {
        const book = updateBook(bookId, price)
        renderBooks()
        flashMsg(`Book price updated (${book.id})`)
    }
}

function onAddBook() {
    var name = prompt('Enter the name of the book:')
    var price = +prompt('Enter the price of the book')
    if (name) {
        const book = addBook(name, price)
        renderBooks()
        flashMsg(`book added (${book.id})`)
    }
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    flashMsg(`Book deleted`)
}

function onReadBook(bookId) {
    var book = getBookById(bookId)

    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 .price').innerText = getformatCurrency(book.price)
    elModal.querySelector('p').innerText = book.detail

    var strHTML = `
    <span>${book.rate ? '⭐'.repeat(book.rate) : '⚫'}</span>
    <br><br>
    <button class="rate" onclick="onIncreaseRate(${book.id})">+</button>
    <button class="rate" onclick="onReduceRate(${book.id})">-</button>`
    elModal.querySelector('h5').innerHTML = strHTML
    elModal.classList.add('open')
}

function onIncreaseRate(bookId) {
    const book = getBookById(bookId)
    increaseOrReduceRate(book, true)

    var elSpanModal = document.querySelector('.modal h5 span')
    elSpanModal.innerText = book.rate ? '⭐'.repeat(book.rate) : '⚫'
    renderBooks()
}

function onReduceRate(bookId) {
    const book = getBookById(bookId)
    increaseOrReduceRate(book, false)

    var elSpanModal = document.querySelector('.modal h5 span')
    elSpanModal.innerText = book.rate ? '⭐'.repeat(book.rate) : '⚫'
    renderBooks()
}

function onCloseRead() {
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('open')
}

function flashMsg(msg) {
    const elUserMsg = document.querySelector('.user-msg')
    elUserMsg.innerHTML = msg
    elUserMsg.classList.add('open')
    setTimeout(() => elUserMsg.classList.remove('open'), 3000)
}

function renderFilterByQueryStringParam() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const Name = (queryStringParams.get('name') === 'undefined') ? '' : queryStringParams.get('name')
    const filterBy = {
        name: Name || '',
        minRate: +queryStringParams.get('minRate') || '0',
        maxPrice: +queryStringParams.get('maxPrice') || 100,
    }
    // const modal = queryStringParams.get()

    if (!filterBy.name && !filterBy.minRate && !filterBy.maxPrice) return

    document.querySelector('.filter-name-box').value = filterBy.name
    document.querySelector('.filter-rate-range').value = filterBy.minRate
    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    setFilterBy(filterBy)
}

function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
    renderBooks()

    const queryStringParams = `?name=${filterBy.name}&
    minRate=${filterBy.minRate}&maxPrice=${filterBy.maxPrice}`
    const newUrl = window.location.protocol + '//' + window.location.host +
        window.location.pathname + queryStringParams

    window.history.pushState({ path: newUrl }, '', newUrl)
}


function onSetLang(lang) {
    setLang(lang)

    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    renderBooks()
    doTrans()
}