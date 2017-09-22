/* Spoke - communicate state information with hub using (this).state = {Value}
 * @constructor
 * @param hub_id - the hub's hash, and this item's base hash
 * @param id - identifier for the spoke given the parent
 */
class Spoke {
    constructor(hub_id, id) {
        this.hub_id = hub_id
        this.id = hub_id + "-" + id;
        this._state = "";
        window.addEventListener('storage', (e) => this.listen(e));
    }

    listen(event){
      if (event.key == this.hub_id){
        this._state = event.newValue;
      }
    }

    set state (value) {
        /* set this hub's state and update hub */
        this._state = value;
        window.localStorage.setItem(this.id, value);
    }
    get state() {
        /* get parent state */
        // the last hub state is the state we need alyways
        return this._state;
    }

}

/* Hub - communicate state information with spokes using (this).state = {Value}
 * @constructor
 * @param callback - what to do with new information
 */
class Hub {
    constructor() {
        this._state = "";
        // INSECURE HASH FUNCTION to avoid collision
        var dt = new Date().toString(),
            hash = 0;
        for (var i = 0; i < dt.length; i++) {
            var char = dt.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
            hash = Math.abs(hash);
        }
        this.id = hash;
        window.addEventListener('storage', (e) => this.listen(e));
    }

    // TODO confirm it won't self trigger. I think storage doesn't apply in window
    listen(event){
      if (event.key.split("-")[0] == this.id){
        this._state = event.newValue;
      }
    }

    set state(value) {
        /* set this hub's state and update spokes*/
        this._state = value;
        window.localStorage.setItem(this.id, value);
    }
    get state(){
      // the state is the last updated of all states
      return this._state;
    }

}
