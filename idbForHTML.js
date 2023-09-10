// idb.js
class idb {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    static async openCostsDB(CostsManagerDB, version) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(CostsManagerDB, version);


            request.onsuccess = (event) => {
                const db = event.target.result;
                //console.log("Database opened successfully:", db);
                resolve(new idb(db));
            };

            request.onerror = (event) => {
                console.error("Error opening database:", event.target.error);
                reject(event.target.error);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                //console.log("test");
                // Create the "costs" object store if it doesn't exist
                if (!db.objectStoreNames.contains("costs")) {
                    db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
                }
                //resolve(new idb(db));

            };
        });
    }

    async addCost(item) {
        const transaction = this.db.transaction("costs", "readwrite");
        const store = transaction.objectStore("costs");
        store.add(item);
    }

    async getCost() {

        const transaction = this.db.transaction("costs", "readonly");
        const store = await transaction.objectStore("costs");
        const result = await store.getAll();
        return new Promise((resolve, reject) => {
            result.onsuccess = (event) => {
                const res2 = event.target.result;
               // console.log("result:", res2);
                resolve(res2);
            };
            result.onerror = (event) => {
                console.error("Error opening database:", event.target.error);
                reject(event.target.error);
            };
        })
       // console.log("the result is: ", result);
        return result;
    }

}

//export default idb;





/*
class idb{
    constructor(dbConnection) {
        this.db=dbConnection;
    }
    static async openCostsDB(CostsManagerDB, version){
        // Open or create IndexedDB database
        const request = await indexedDB.open(CostsManagerDB, version);
        request.onsuccess = (event) =>  {
            console.log(event.target.result);
            return event.target.result;
        }
        console.log("test")
        const db = await request.result;)
        await db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
        return new idb(db);
        //const db = await request.result;)
        //await db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
        //return new idb(db);
    }

    async addCost(item){
        const db = await this.openDatabase();
        //const db = await this.openDatabase();
        const transaction = this.db.transaction("costs", "readwrite");
        const store = transaction.objectStore("costs");
        store.add(item);
    }

    async getCost(){
        const db = await this.openDatabase();
        //const db = await this.openDatabase();
        const transaction = this.db.transaction("costs", "readonly");
        const store = transaction.objectStore("costs");
        return await store.getAll();
        return items;
        //return items;
    }

}
// Export other functions as needed
export default idb;
//export default idb;
*/