import API from "./data";
import factoryFunctions from "./factory";
import renderingFunctions from "./dom";

const interestsContainer = document.querySelector("#mainContainer")

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

const createInterestObject = (place, name, description, cost, review) => {
    return {
        name: name.value,
        placeId: parseInt(place.value),
        description: description.value,
        cost: parseFloat(cost.value).toFixed(2),
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
    placeInput.value = ""
    nameInput.value = ""
    descriptionInput.value = ""
    costInput.value = ""
    reviewInput.value = ""
}

const inputsArray = [
    placeInput,
    nameInput,
    descriptionInput,
    costInput,
    reviewInput
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
                .then(() => {
                    clearFormFields()
                    return API.getPointsOfInterest()
                })
                .then(interests => {
                    interestsList.innerHTML = ""
                    interests.forEach(interest => {
                        const interestHTML = factoryFunctions.createInterestRepresentation(interest)
                        renderingFunctions.renderMultiple(interestsList, interestHTML)
                    })
                })
        } else {
            // Edit interest
            const editedInterest = {
                id: hiddenInterestId.value,
                placeId: placeInput.value,
                name: nameInput.value,
                description: descriptionInput.value,
                cost: costInput.value,
                review: reviewInput.value,
            }
            API.editInterest(editedInterest)
                .then(interests => {
                    interestsList.innerHTML = ""
                    interests.forEach(interest => {
                        const interestHTML = factoryFunctions.createInterestRepresentation(interest)
                        renderingFunctions.renderMultiple(interestsList, interestHTML)
                    })
                })
                .then(clearFormFields)
        }
    } else {
        event.stopPropagation()
    }
})

interestsList.addEventListener("click", () => {
    if (event.target.id.startsWith("editInterest")) {
        // Edit interest
        const interestToEdit = event.target.id.split("-")[1]
        API.getSingleInterest(interestToEdit)
            .then(interest => {
                const editCostAndReview = document.querySelector(`#costAndReview-${interest.id}`)
                editCostAndReview.innerHTML = ""
                const editInterestFormHTML = factoryFunctions.createEditForm(interest)
                renderingFunctions.renderSingle(editCostAndReview, editInterestFormHTML)
                return interest
            })
            .then(interest => {
                const editCostInput = document.querySelector("#editCost")
                const editReviewInput = document.querySelector("#editReview")
                hiddenInterestId.value = interest.id
                editCostInput.value = interest.cost
                editReviewInput.value = interest.review
                const saveEditButton = document.querySelector(`#saveEditedInterest-${interest.id}`)
                saveEditButton.addEventListener("click", () => {
                    interest.cost = editCostInput.value
                    interest.review = editReviewInput.value
                    return API.editInterest(interest).then(() => API.getPointsOfInterest())
                        .then(interests => {
                            interestsList.innerHTML = ""
                            interests.forEach(interest => {
                                const interestHTML = factoryFunctions.createInterestRepresentation(interest)
                                renderingFunctions.renderMultiple(interestsList, interestHTML)
                            })
                        })
                        .then(clearFormFields)
                })
            })

    } else if (event.target.id.startsWith("deleteInterest")) {
        // Delete interest
        const confirmDeletion = confirm("Do you want to delete this point of interest?")
        if (confirmDeletion) {
            const interestToDelete = event.target.id.split("-")[1]
            API.deleteInterest(interestToDelete)
                .then(API.getPointsOfInterest)
                .then(interests => {
                    interestsList.innerHTML = ""
                    interests.forEach(interest => {
                        const interestHTML = factoryFunctions.createInterestRepresentation(interest)
                        renderingFunctions.renderMultiple(interestsList, interestHTML)
                    })
                })
                .then(clearFormFields)
        }
    }
})