(function() {
    "use strict";
    const BASE_URL = "/";

    async function fetchPost(){
        const url = BASE_URL + "feedback";
        const postData = {
            name: "Valerie Hetherington",
            email: "skifastnotlast@gmail.com",
            feedback: "I have something to say"
        };
    
        try {
            let resp = await fetch(url, {
                method: 'POST',    
                body: JSON.stringify(postData),  
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            resp = await checkStatus(resp);
            const data = await resp.json();
        } catch (err) {
            handleError(err);
            return;
        }
    }

    /**
     * Display the error message
     * @param {string} errMsg 
     */
    function handleError(errMsg) {
        const messageArea = document.getElementById("message-area");
        messageArea.textContent = errMsg;
        messageArea.classList.remove("hidden");
    }
    
    fetchPost();
})(); 