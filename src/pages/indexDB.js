//  IndexedDB Setup
const DB_NAME = "LernsetsDB";
const STORE_NAME = "lernsets";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export async function getAllLernsets() {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction("lernsets", "readonly");
        const store = tx.objectStore("lernsets");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function saveLernset(lernset) {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);

        const request = store.add(lernset);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}