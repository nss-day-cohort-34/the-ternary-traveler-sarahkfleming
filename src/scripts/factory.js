const factoryFunctions = {
    createListHTML() {
        return `
        <h1>The Ternary Traveler</h1>
        <section id="interestsForm">
            <input type="hidden" id="hiddenInterestId" value="" />
            <label for="pointOfInterest">Point of Interest</label>
            <fieldset>
            <label for="interestName">Name</label>
            <input type="text" id="eventTitle" name="eventTitle"></input>  
            </fieldset>
            <fieldset>
            <label for="eventDate">Event Date</label>    
            <input type="date" id="eventDate" name="eventDate"></input>  
            </fieldset>
            <fieldset>
            <label for="eventLocation">Event Location</label>    
            <input type="text" id="eventLocation" name="eventLocation"></input>
            </fieldset>
            <button id="saveEvent">Save Event</button>
        </section>
        <section id="listOfInterests">
        </section>
        `
    }
}

export default factoryFunctions