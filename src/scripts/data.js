const API = {
    getPointsOfInterest() {
        return fetch("http://localhost:8088/interests?_expand=place")
            .then(response => response.json())
    },
    savePointOfInterest(interestObject) {
        console.log(interestObject)
        return fetch("http://localhost:8088/interests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interestObject)
        })
            .then(response => response.json())
    },
    deleteInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    },
    editInterest(interest) {
        return fetch(`http://localhost:8088/interests/${interest.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interest)
        })
            .then(response => response.json())
    },
    getSingleInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`)
            .then(response => response.json())
    }
}

export default API