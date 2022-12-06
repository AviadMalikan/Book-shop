'use strict'

var gTrans = {
    title: {
        en: 'Book shop app',
        he: 'אפליקצית חנות ספרים',
    },
    filtering: {
        en: 'Filter:',
        he: 'סינון',
    },
    rate: {
        en: 'Rate',
        he: 'דירוג',
    },
    price: {
        en: 'Price ',
        he: 'מחיר ',
    },
    'id': {
        en: 'ID',
        he: `מס' סידורי`,
    },
    'book-names': {
        en: 'Title',
        he: 'שם',
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'delete': {
        en: 'Delete',
        he: 'מחיקה',
    },
    'update': {
        en: 'Update',
        he: 'עידכון',
    },
    'read': {
        en: 'read',
        he: 'לקריאה',
    },
    'search-box': {
        en: 'Something specific ?',
        he: 'משהו ספציפי ?',
    },
    'create-book': {
        en: 'Add Book',
        he: 'צור ספר חדש',
    },
    'prev-page': {
        en: 'Prev page',
        he: 'חזור',
    },
    'next-page': {
        en: 'Next page',
        he: 'הבא',
    },
    close: {
        en: 'close',
        he: 'סגור',
    },
}

var gCurrLang = 'en'

function getTrans(transKey) {
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    var translation = key[gCurrLang]
    if (!translation) translation = key.en

    return translation
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    console.log('els: ', els)

    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation
        if (el.placeholder) el.placeholder = translation
    })
}


function setLang(lang) {
    gCurrLang = lang
}

function getformatCurrency(num) {
    var currencyType = gCurrLang === 'he' ? 'ILS' : 'USD'
    const numFormat = Intl.NumberFormat('he-IL',
        { style: 'currency', currency: currencyType })
    return numFormat.format(num)
}
