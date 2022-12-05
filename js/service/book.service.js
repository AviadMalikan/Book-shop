'use strict'


const STORAGE_KEY = 'booksDB'
const gBooksNames = ['Harry Poter', 'Robin Hood', 'The Jungle Book', '5 Balloons']
const PAGE_SIZE = 5
var gPageIdx = 0

var gBooks
var gFilterBy = {
    name: '',
    minRate: 0,
    maxPrice: 100,
}

_createBooks()


function nextPage() {
    if ((gPageIdx + 1) * PAGE_SIZE >= gBooks.length) return false
    gPageIdx++
    return true
}
function prevPage() {
    if (gPageIdx * PAGE_SIZE <= 0) return false
    gPageIdx--
    return true
}

function setFilterBy(filterBy) {
    console.log('filterBy: ', filterBy)
    gPageIdx = 0
    if (filterBy.name !== undefined) gFilterBy.name = filterBy.name
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
}

function getBooks() {
    const books = gBooks.filter(book => book.name.includes(gFilterBy.name) &&
        book.price <= gFilterBy.maxPrice && book.rate >= gFilterBy.minRate)
    var startIdx = gPageIdx * PAGE_SIZE
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function reduceOrIncreaseRate(book) {
    if (book.rate <= 0) return console.log('Reach to bottom rate')
    book.rate--
    _saveBooksToStorage()
}

function increaseOrReduceRate(book, isIncrease) {
    var num = isIncrease ? +1 : -1
    if (!isIncrease && book.rate <= 0) return console.log('Reach to bottom rate')
    if (isIncrease && book.rate >= 5) return console.log('Reach the top rate!')
    book.rate += num
    console.log('Book rate now is: ', book.rate)
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function addBook(name, price) {
    const book = _createBook(name, price)
    gBooks.push(book)
    _saveBooksToStorage()
    return book
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function _createBook(name, price) {
    return {
        id: makeId(),
        name,
        price: price || getRandomInt(10, 100),
        detail: makeLorem(),
        rate: 0,
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 20; i++) {
            var name = gBooksNames[getRandomInt(0, gBooksNames.length - 1)]
            books.push(_createBook(name))
        }
    }

    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

