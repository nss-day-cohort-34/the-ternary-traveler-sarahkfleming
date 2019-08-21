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
        placeId: parseInt(place.value),
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

const inputsArray = [
    nameInput,
    descriptionInput,
    costInput,
    reviewInput,
    placeInput
]

const formValidationCheck = () => {
    let validated
    for (let index = 0; index < inputsArray.length; index++) {
        const input = inputsArray[index]
        if (input.value === "") {
            validated = false
            alert("Please fill out all fields")
            break
        } else {
            validated = true
        }
    }
    return validated
}
    // Add click listener to main container
    interestsContainer.addEventListener("click", () => {
        if (event.target.id.startsWith("saveInterest")) {
            const resultOfValidation = formValidationCheck()
                if (resultOfValidation && hiddenInterestId.value === "") {
                    // Create new interest
                    const newInterest = createInterestObject(placeInput, nameInput, descriptionInput, costInput, reviewInput)
                    API.savePointOfInterest(newInterest)
                } else {
                    // Edit interest
                }
        } else {
            event.stopPropagation()
        }
    })