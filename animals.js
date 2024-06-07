(function() {
    "use strict";
    const BASE_URL = "/";

    /**
     * Gets the relevant costumes
     * @returns 
     */
    async function fetchAllCostumes(){
        const url = BASE_URL + "costumes/Animals";
        try{
            let resp = await fetch(url);
            resp = await checkStatus(resp);
            const data = await resp.json();
            displayAllCostumes(data);
        } catch (err) {
            handleError(err);
            return;
        }
    }

    /**
     * For each costume, create a tile with a title and image
     * @param {Array} data 
     */
    function displayAllCostumes(data){
        const costumeTiles = document.getElementById('costume-tiles');
        data.forEach(costume => {
            let title = document.createElement('p');
            title.textContent = costume.name;
            let tile = document.createElement('section');
            let img = document.createElement('img');
            img.src = costume.img;

            tile.appendChild(img);
            tile.appendChild(title);
            costumeTiles.appendChild(tile);

            // Add onclick event listener to each tile so that the 
            // single view can be accessed
            tile.onclick = function() {
                fetchCostumeById(costume.id);
            };
        });
    }

    /**
     * Get the costume by the id
     * @param {string} id 
     */
    async function fetchCostumeById(id) {
        const url = BASE_URL + `costumes/Funny/` + id;
        try {
            let resp = await fetch(url);
            resp = await checkStatus(resp);
            const data = await resp.json();
            displayCostumeByID(data);
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * Populate the close-up view
     * @param {Array} costume 
     */
    function displayCostumeByID(costume) {
        const costumeTiles = document.getElementById('costume-tiles');
        costumeTiles.innerHTML = "";
        
        let tile = document.createElement('section');
        tile.style.width = "80vh";
        tile.style.height = "100vh";

        let title = document.createElement('p');
        title.textContent = costume[0].name;

        let img = document.createElement('img');
        img.src = costume[0].img;
        let id = document.createElement("p");
        id.textContent = "id: " + costume[0].id;

        let description = document.createElement("p");
        description.textContent = costume[0].description;
        description.style.width = "60vh";
        let dropdown = document.createElement("select");
        let placeholder = document.createElement('option');
        placeholder.textContent = "Select Size";
        dropdown.appendChild(placeholder);
        for(const [key, value] of Object.entries(costume[0].size)){
            let option = document.createElement('option');
            option.textContent = key + ":" + value;
            dropdown.appendChild(option);
        }

        let addToCart = document.createElement("button");
        addToCart.textContent = "Add to Cart";

        tile.appendChild(img);
        tile.appendChild(id);
        tile.appendChild(title);
        tile.appendChild(description);
        tile.appendChild(dropdown);
        tile.appendChild(addToCart)
        costumeTiles.appendChild(tile);
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

    fetchAllCostumes();
})(); 