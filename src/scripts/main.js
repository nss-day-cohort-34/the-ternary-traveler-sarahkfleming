import API from "./data";
import factoryFunctions from "./factory";
import renderingFunctions from "./dom";

const interestsContainer = document.querySelector("#mainContainer")
const interestsForm = document.querySelector("#interestsForm")

// Render initial view
const interestHTML = factoryFunctions.createMainHTML()
renderingFunctions.renderMultiple(interestsContainer, interestHTML)
// Get reference to interests list after it is rendered
const interestsList = document.querySelector("#listOfInterests")

API.getPointsOfInterest()
    .then(interests => {
        interests.forEach(interest => {
            const interestHTML = factoryFunctions.createInterestRepresentation(interest)
            renderingFunctions.renderMultiple(interestsList, interestHTML)
        })
    })

const saveInterestButton = document.querySelector("#saveInterest")

const createInterestObject = (place, name, description, cost, review) => {
    return {
        name: name.value,
        // Make sure to figure out what I have to pass through for the placeId to be created
        placeId: place.value,
        description: description.value,
        cost: cost.value,
        review: review.value
    }
}

const hiddenInterestId = document.querySelector("#hiddenInterestId")
const nameInput = document.querySelector("#interestName")
const descriptionInput = document.querySelector("#interestDescription")
const costInput = document.querySelector("#interestCost")
const reviewInput = document.querySelector("#interestReview")
const placeInput = document.querySelector("#placeName")


const clearFormFields = () => {
    hiddenInterestId.value = ""
    nameInput.value = ""
    descriptionInput.value = ""
    costInput.value = ""
    reviewInput.value = ""
    placeInput.value = ""
}

// Add click listener to main container
// interestsContainer.addEventListener("click", () => {
//     if (event.target.id.startsWith("saveInterest")) {
//         if ()
//     } else {
//         event.stopPropagation()
//     }
// })