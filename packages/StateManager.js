class StateManager {
    /* StateManager
     * @param prefix - the prefix for the state url component (i.e. ?{prefix}=abc)
     */
    // TODO more sensible method names
    constructor(prefix) {
        this.prefix = prefix;
        this.vals = {};
        this.getters = {};
    }

    /* Add a key to the state variable */
    add_key(name, callback) {
        /* Register a new key
         * @param name - the unique name of the key
         * @param callback - what to do with the value if present on load
         */
        this.getters[name] = callback;
    }

    // TODO how to deal with setting values

    encode(state_object) {
        return encodeURIComponent(btoa(JSON.stringify(state_object)));
    }

    decode(encoded_string){
      return JSON.parse(atob(decodeURIComponent(encoded_string)));
    }

    /* sets the current url state */
    set_url() {
        var state_string = this.encode(this.vals);
        // get all url components
        var previous = location.search.substring(1);
        var p_var = previous ? JSON.parse('{"' + previous.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            function(key, value) {
                return key === "" ? value : decodeURIComponent(value)
            }) : {}
        // switch out our state value
        p_var[this.prefix] = state_string;
        // put paramater string back together, as modified
        var params = Object.keys(p_var).map((i) => i + '=' + p_var[i]).join('&');
        window.history.pushState("hi", "Encoded", "?" + params);
    }

    get_url_state() {
        // get all url components
        var previous = location.search.substring(1);
        var p_var = previous ? JSON.parse('{"' + previous.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            function(key, value) {
                return key === "" ? value : decodeURIComponent(value)
            }) : {}
        // return ours
        return p_var[this.prefix];
    }

    /* run all set functions based on the url and registry */
    initialize() {
        var state = this.decode(this.get_url_state());
        for (var i in state) {
            if (i in this.getters) {
                this.getters[i](state[i]);
            }
        }
    }


}
