/* Work with a client database to store and get values */
class ClientPrefManager {
    constructor(schema) {
        this.schema = schema;
        var indexedDB = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB;
        var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
        var openCopy = indexedDB && indexedDB.open;
        var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
        if (IDBTransaction) {
            IDBTransaction.READ_WRITE = IDBTransaction.READ_WRITE || 'readwrite';
            IDBTransaction.READ_ONLY = IDBTransaction.READ_ONLY || 'readonly';
        }
        var request = indexedDB.open(this.schema);
        request.onupgradeneeded = function(e) {
            var idb = e.target.result;
            if (!idb.objectStoreNames.contains(this.schema)) {
                var store = idb.createObjectStore(this.schema, {
                    keyPath: 'pref'
                });
            }
        }
    }
    set_pref(pref, val) {
        /* Set a preference for pesistence
         * @param {string} pref - The key to store as
         * @param {string} val - the value to store as pref
         */
        var request = indexedDB.open(this.schema);

        request.onsuccess = function(e) {
            var idb = e.target.result;
            var trans = idb.transaction(this.schema, IDBTransaction.READ_WRITE);
            var store = trans.objectStore(this.schema);

            var requestAdd = store.put({
                pref: pref,
                value: val
            });
            requestAdd.onsuccess = function(e) {
                console.log(`Stored {pref: ${pref}, value: ${val}}`)
            };

            requestAdd.onfailure = function(e) {
                console.log("There was some issue with storing the requested preference.")
            };
        };
    }
    get_pref(pref, cb) {
        /* Set a preference for pesistence
         * @param {string} pref - The key to search
         * @param {function} cv - the callback called with fetched value
         */
        var request = indexedDB.open(this.schema);
        request.onsuccess = function(e) {
            var idb = e.target.result;
            var transaction = idb.transaction(this.schema, IDBTransaction.READ_ONLY);
            var objectStore = transaction.objectStore(this.schema);

            var request = objectStore.get(pref)
            request.onsuccess = function(event) {
                var data = event.target.result;
                if (data) {
                    console.log(`Found ${data.pref} = ${data.value}`);
                    cb(data.value);
                } else {
                    console.log('No Entry Found.');
                    cb(null);
                }
            };
        };
    }
}

/**var PrefMan = new ClientPrefManager("viewer");
// on a new press, do the following...
window.onkeypress = function(event) {
    if (event.keyCode == 122 || event.key == "z") {
        var toggle = function(e) {
            if (e) {
                // if it's off, set it on
                PrefMan.set_pref("scroll_zoom", false);
                viewer.zoomPerScroll = 1.2;
                console.log("Scroll Wheel Enabled")
            } else {
                // if it's on, set it off
                PrefMan.set_pref("scroll_zoom", true);
                viewer.zoomPerScroll = 1;
                console.log("Scroll Wheel Disabled")
            }
        }
        PrefMan.get_pref("scroll_zoom", toggle);
    }
}
// Deal previously set
var disable_if_true = function(e) {
    console.log(e);
    if (e) {
        viewer.zoomPerScroll = 1;
        // setting to one makes scroll not change zoom level
        console.log("Scroll Wheel Disabled")
    }
};
PrefMan.get_pref("scroll_zoom", disable_if_true);
**/
