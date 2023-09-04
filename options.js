/*global browser*/
let MO = {};
class Input {
    constructor(query,key,initial,checkQ=false) {
        this.widget = document.querySelector(query);
        this.key = key;
        this.fn = checkQ?"checked":"value";
        this.save = this.save.bind(this);
        this.set(initial);
    }
    set(value) {
        if (value == null) {return;}
        this.value = value;
        this.widget[this.fn] = this.value;
    }
    get() {
        return this.widget[this.fn];
    }
    save(e) {
        this.widget.classList.remove("dirty");
        let key = this.key; //this makes the syntax checker happy *shrug*
        let S = {};
        S[key] = this.get();
        console.debug("Saving:",S);
        try {
            browser.storage.local.set(S);
        } catch {}
    }
}
function typing(e) {
    MO.server.widget.classList.add("dirty");
}

function getValues() {
    try {
        browser.storage.local.get().then(
            (data) => {
                for (let obj of Object.values(MO)) {
                    obj.set(data[obj.key]);
                    obj.save();
                }
            });
    } catch {;}
}
    
function init() {
    MO = {
        server: new Input("#server", "server", "tech.lgbt",),
        convertedCOLOR: new Input("#converted .color", "convertedCOLOR", "#00ccff"),
        convertedON: new Input("#converted .on", "convertedON", true, true),
        homeCOLOR: new Input("#home .color", "homeCOLOR", "#ffcc00"),
        homeON: new Input("#home .on", "homeON", true, true)
    };
    getValues();
    for(let obj of Object.values(MO)) {
            obj.widget.addEventListener("change", obj.save);
    };
    
    MO.server.widget.addEventListener("keypress",typing,{});
//    MO.color.addEventListener("change",saveColor,{});
//    MO.coloron.addEventListener("change",saveColor,{});
}
init();
