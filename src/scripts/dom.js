const renderingFunctions = {
    renderMultiple(location, HTMLString) {
        location.innerHTML += HTMLString
    },
    renderSingle(location, HTMLString) {
        location.innerHTML = HTMLString
    }
}

export default renderingFunctions