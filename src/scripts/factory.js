const factoryFunctions = {
    createMainHTML() {
        return `
        <h1>The Ternary Traveler</h1>
        <section id="interestsForm">
            <input type="hidden" id="hiddenInterestId" value="" />
            <fieldset>
                <label for="interestName">Point of Interest Name</label>
                <input type="text" id="interestName" name="interestName"></input>  
            </fieldset>
            <fieldset>
                <label for="interestDescription">Description</label>    
                <input type="text" id="interestDescription" name="interestDescription"></input>  
            </fieldset>
            <fieldset>
                <label for="interestCost">Cost</label>    
                <input type="text" id="interestCost" name="interestCost"></input>
            </fieldset>
            <fieldset>
                <label for="interestReview">Review</label>    
                <textarea name="interestReview" rows="5" cols="50" id="interestReview"></textarea>
            </fieldset>
            <fieldset>
                <label for="placeName">Place</label>
                <select name="placeName" id="placeName" required>
                    <option value="">Select One</option>
                    <option value="1">Italy</option>
                    <option value="2">Switzerland</option>
                    <option value="3">France</option>
                </select>
             </fieldset>
            <button id="saveInterest">Save</button>
        </section>
        <section id="listOfInterests">
        </section>
        `
    },
    createInterestRepresentation(interest) {
        return `
        <section class="interest">
        <button id="editInterest-${interest.id}">Edit</button>
        <button id="deleteInterest-${interest.id}">Delete</button>
            <h2 class="interestPlace">${interest.place.name}</h2>
            <p class="interestName">Name: ${interest.name}</p>
            <p class="interestDescription">Description: ${interest.description}</p>
            <div id="costAndReview-${interest.id}">
                <p class="interestCost">Cost: ${interest.cost}</p>
                <p class="interestReview">Review: ${interest.review}</p>
            </div>
        </section>
        `
    },
    createEditForm(interest) {
        return `
            <label for="editCost">Cost</label>    
            <input type="text" id="editCost" name="editCost" value="${interest.cost}"></input>
            <label for="editReview">Review</label>    
            <textarea name="editReview" rows="5" cols="15" id="editReview" value="${interest.review}"></textarea>
            <button id="saveEditedInterest-${interest.id}">Save</button>
        `
    }
}

export default factoryFunctions