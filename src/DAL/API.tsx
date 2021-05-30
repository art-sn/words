import {HashtagIDType, HashtagType, WordIDType, WordType} from "../common-types";
import renderEntireTree from "../index";
import ReactDOM from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import store from "../BLL/store";
import {BrowserRouter} from "react-router-dom";
import App from "../App";

const dbRequest = indexedDB.open('DB', 1)
let db: IDBDatabase

dbRequest.onupgradeneeded = () => {
    db = dbRequest.result
    if(!db.objectStoreNames.contains('words')) {
        db.createObjectStore('hashtags', {
            keyPath: 'id'
        })
    }
    if(!db.objectStoreNames.contains('hashtags')) {
        db.createObjectStore('words', {
            keyPath: 'id'
        })
    }
    renderEntireTree()
}

dbRequest.onsuccess = () => {
    db = dbRequest.result
    renderEntireTree()
}

dbRequest.onerror = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
            </Provider>
            </React.StrictMode>,
    document.getElementById('root')
}

function getElementFromIDB<T>(storeName: string, id: HashtagIDType | WordIDType): Promise<T> {
    return new Promise((res, rej) => {
        const tx = db.transaction(storeName, 'readonly')
        const store = tx.objectStore(storeName)
        const req = store.get(id)
        tx.oncomplete = () => {
            res(req.result)
        }
        tx.onabort = () => {
            rej()
        }
    })
}

function getAllElementsFromIDB<T>(storeName: string): Promise<Array<T>> {
    return new Promise((res, rej) => {
        const tx = db.transaction(storeName, 'readonly')
        const store = tx.objectStore(storeName)
        const req = store.getAll()
        tx.oncomplete = () => {
            res(req.result)
        }
        tx.onabort = () => {
            rej()
        }
    })
}

const API = {
    getWord(id: WordIDType): Promise<WordType> {
        return getElementFromIDB<WordType>('words', id)
    },
    getHashtags(): Promise<Array<HashtagType>> {
        return getAllElementsFromIDB<HashtagType>('hashtags')
    },
    getHashtagById(id: HashtagIDType) {
        return getElementFromIDB<HashtagType>('hashtags', id)
    },
    async getAuthData(): Promise<string> {
        return new Promise((res, rej) => {
            const password = localStorage.getItem('password')
            if (password) res(password)
            rej()
        })
    },
    async setPassword(password: string) {
        localStorage.setItem('password', password)
    },
    async addHashtag(hashtag: HashtagType) {
        const tx = db.transaction('hashtags', 'readwrite')

    }
}

export default API