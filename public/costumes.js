(function() {
    "use strict";
    const BASE_URL = "/";
    let slideIndex = 1; 

    /**
     * Add event listeners
     */
    function init(){
        const prevButton = document.querySelector(".prev");
        prevButton.addEventListener('click', () => {
            plusSlides(-1);
        });
        const backButton = document.querySelector(".next");
        backButton.addEventListener('click', () => {
            minusSlides(-1);
        });

        showSlides(slideIndex);
        fetchAllCostumes();
    }

    /**
     * Gets the relevant costumes
     * @returns 
     */
    async function fetchAllCostumes(){
        const url = BASE_URL + "costumes";
        try{
            let resp = await fetch(url);
            resp = await checkStatus(resp);
            const data = await resp.json();
            displaySalesSlideshow(data);
            displayAllCostumes(data);
        } catch (err) {
            handleError(err);
            return;
        }
    }

    /**
     * Increment the slide index and run showSlides
     * @param {number} n 
     */
    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    /**
     * Decrement the slide index and run showSlides
     * @param {number} n 
     */
    function minusSlides(n){
        showSlides(slideIndex -= n);
    }

    /**
     * toggle the view on the slides and saleCaptions
     * @param {number} n 
     */
    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("saleImage");
        let saleCaptions = document.getElementsByClassName("saleCaption");
        if (n > slides.length) { 
            slideIndex = 1 
        }
        if (n < 1) { 
            slideIndex = slides.length 
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            saleCaptions[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
        saleCaptions[slideIndex - 1].style.display = "block";
    }

    /**
     * Get a random image and a random number between 5 and 60 and ending
     * in either 5 or 10
     * @param {Array} data 
     */
    function displaySalesSlideshow(data){
        let imageContainers = document.getElementsByClassName("saleImage");
        let saleCaptionContainers = document.getElementsByClassName("saleCaption");
        let alreadyUsed = [];
        for(let i = 0; i < 5; i++){

            let randomIndex = Math.floor(Math.random() * data.length);
            alreadyUsed.push(randomIndex);
            //make sure there are no repeats
            while(randomIndex in alreadyUsed){
                randomIndex = Math.floor(Math.random() * data.length);
            }


            const min = Math.ceil(5 / 10); 
            const max = Math.floor(60 / 10);
            const base =  Math.floor(Math.random() * (max - min + 1) + min) * 10;
            const randomSaleAmount = base + (Math.random() < 0.5 ? 0 : 5);
            imageContainers[i].src = data[randomIndex].img;
            saleCaptionContainers[i].textContent = data[randomIndex].name + " " + randomSaleAmount + "% off";

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

            tile.onclick = function() {
                fetchCostumeById(costume.id);
            };

            tile.appendChild(img);
            tile.appendChild(title);
            costumeTiles.appendChild(tile);
        });
    }
    
    /**
     * Get the costume by the id
     * @param {string} id 
     */
    async function fetchCostumeById(id) {
        const url = BASE_URL + `costumes/Characters/` + id;
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

    init();
})(); 
