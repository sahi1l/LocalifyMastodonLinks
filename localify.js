/*global browser, MutationObserver*/
let myserver;
let convertedcolor,homecolor;
function run() {
    browser.storage.local.get().then(
        (result)=> {
            console.debug(result);
            myserver = result["server"]??"tech.lgbt";
            convertedcolor = result["convertedON"] ? result["convertedCOLOR"] : null;
            homecolor = result["homeON"] ? result["homeCOLOR"] : null;
            localify();
        });
}
function localify() {
    ["account__display-name",
     "status__display-name",
     "detailed-status__display-name"].forEach((c)=>{
        for (let a of document.getElementsByClassName(c)){
	    let link = a.getAttribute("href");
            if(link == null) {continue;}
            let account = ""; //the name of the account
            let server = ""; //the name of the server

            let parts = link.split("/");
            if (parts[0].startsWith("http")) {
                parts = parts.slice(2);
            }
            if (parts.length != 2) {continue;}
            
            // matching blahblah/@account@server
            if ([...parts[1].matchAll("@")].length == 2) {
                //exactly two @'s in part 1
                [,account,server] = parts[1].split("@");
            }

            // matching /@person
            else if(parts[0]=="" && parts[1][0]=="@") {
                account = parts[1].slice(1);
                server = document.URL.split("/")[2];
            }
            

            //something like https://server/@account"
            else if (parts[1].startsWith("@")) {
                account = parts[1].slice(1);
                server = parts[0];
            }

            else {continue;}
            if (server == myserver) {
                if(homecolor != null) {a.style.color=homecolor;}
                //IDEA: color this link something different
                continue;}
            let newlink = `https://${myserver}/@${account}@${server}`;
	    a.setAttribute("href",newlink);

            if(convertedcolor!=null) {a.style.color=convertedcolor;}
	}
    });
};
new MutationObserver(run).observe(document.body,{childList:true, subtree:true});
run();
