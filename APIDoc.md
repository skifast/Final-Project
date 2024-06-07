# *app.* API Documentation
This API serves as an interface for accessing costume data stored in a server-side directory, allowing clients to retrieve various categories and specific costume details. It is designed to handle requests robustly, providing structured responses, including error handling for server-side issues.

## *GET costume by id (GET text/plain Example)*
**Request Format:** costumes/:categories/:costumeid
**Request Type:** GET
**Returned Data Format**: JSON

**Description:** Retrieves costumes by their id

**Supported Parameters** categories, costumeid

**Example Request:** costumes/Funny/444452

**Example Response:**
{
    "id": "444452",
    "name" : "Banana",
    "size" : {
        "S" : 54.0,
        "M" : 55.0,
        "L" : 55.0,
        "XL": 56.0,
        "1X": 57.0,
        "2X": 58.0, 
        "3X": 59.0
    },
    "img" : "imgs/banana.png",
    "keywords" : ["Yellow", "Fruit", "Banana", "Gender neutral"],
    "categories" : ["Funny"],
    "description" : "Go bananas this Halloween with our vibrant Banana Costume! Perfect for parties or trick-or-treating, this costume features a realistic banana peel design that wraps around for a comfortable fit. It's easy to slip on and off, making it a great choice for those who value both fun and convenience."
}

**Error Handling:**
Errors include failing to read files or directory.
Response: 500 Internal Server Error
Body: "Failed to read file"

## *Fill in Endpoint 2 Title (GET json  Example)*
**Request Format:** costumes/:categories

**Returned Data Format**: JSON

**Description:** Retrieves a list of costumes in a particular category

**Supported Parameters** categories

**Example Request:** costumes/Occupations

**Example Response:**
*Replace the {} with the example response*
*note response is partial
```json
[{
    "id": "444448",
    "name" : "Delivery Person",
    "size" : {
        "S" : 54.0,
        "M" : 55.0,
        "L" : 55.0,
        "XL": 56.0,
        "1X": 57.0,
        "2X": 58.0, 
        "3X": 59.0
    },
    "img" : "imgs/delivery-person.png",
    "keywords" : ["Brown", "Delivery Person", "Gender neutral"],
    "categories" : ["Occupations"],
    "description": "Deliver smiles at your next costume party with our Delivery Person Costume! This outfit includes a logoed brown shirt, matching shorts, and a cap, complete with a handheld package to complete the look. It's ideal for those who enjoy a costume that combines humor with a touch of realism."
},
{
    "id": "444447",
    "name" : "Medical Scrubs",
    "size" : {
        "S" : 54.0,
        "M" : 55.0,
        "L" : 55.0,
        "XL": 56.0,
        "1X": 57.0,
        "2X": 58.0, 
        "3X": 59.0
    },
    "img" : "imgs/medical-scrubs.png",
    "keywords" : ["Blue", "Nurse", "Doctor", "Gender neutral"],
    "categories" : ["Occupations"],
    "description" : "Dress up as the everyday hero with our Medical Scrubs Costume. This realistic set includes blue scrubs and a stethoscope accessory, making it ideal for those who admire our healthcare heroes or for a no-fuss costume option."
}]

**Error Handling:**
failed to read file or failed to read directory
res.status(500).send("Failed to read directory");

## *Fill in Endpoint 3 Title (POST Example)*
**Request Format:** userfeedback

**Returned Data Format**: text

**Description:** Posts user feedback

**Supported Parameters** None

**Example Request:** 
{
    name: Valerie Hetherington
    email: vhetheri@caltech.edu
    message: I was satisfied with my product
}

**Example Response:**
Thank you for your feedback, we will get back to you soon

**Error Handling:**
Missing required form elements
Response: 400 Client-side error
Body: "Form must be completed"

## Response 4
## *GET all costumes*
**Request Format:** costumes
**Request Type:** GET
**Returned Data Format**: JSON

**Description:** Retrieves costumes

**Supported Parameters** none

**Example Request:** costumes

**Example (partial) Response:**
{
    "id": "444452",
    "name" : "Banana",
    "size" : {
        "S" : 54.0,
        "M" : 55.0,
        "L" : 55.0,
        "XL": 56.0,
        "1X": 57.0,
        "2X": 58.0, 
        "3X": 59.0
    },
    "img" : "imgs/banana.png",
    "keywords" : ["Yellow", "Fruit", "Banana", "Gender neutral"],
    "categories" : ["Funny"],
    "description" : "Go bananas this Halloween with our vibrant Banana Costume! Perfect for parties or trick-or-treating, this costume features a realistic banana peel design that wraps around for a comfortable fit. It's easy to slip on and off, making it a great choice for those who value both fun and convenience."
}
{
    "id": "444444",
    "name" : "Zappy Zebra",
    "size" : {
        "S" : 54.0,
        "M" : 55.0,
        "L" : 55.0,
        "XL": 56.0,
        "1X": 57.0,
        "2X": 58.0, 
        "3X": 59.0
    },
    "img" : "imgs/zappy-zebra.jpeg",
    "keywords" : ["Black and White", "Zebra", "Gender neutral"],
    "categories" : ["Animals"],
    "description" : "Stripe up your life this Halloween with our Zappy Zebra Costume! This full-body suit includes a headpiece with ears and the distinctive black and white stripes, making it a perfect pick for kids' parties, dress-up days, or any animal-themed event. Comfortable and adorable, it’s sure to be a hit at any festive occasion."
}

**Error Handling:**
failed to read file or failed to read directory
res.status(500).send("Failed to read directory");