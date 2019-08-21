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
                    <option value="Italy">Italy</option>
                    <option value="France">France</option>
                    <option value="Switzerland">Switzerland</option>
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
            <p class="interestName">Name: ${interest.name}</p>
            <p class="interestDescription">Description: ${interest.description}</p>
            <p class="interestCost">Cost: ${interest.cost}</p>
            <p class="interestReview">Review: ${interest.review}</p>
            <p class="interestPlace">Place: ${interest.place.name}</p>
        </section>
        `
    }
}

export default factoryFunctions