function showDropdown() {
    var dropdownElement = document.getElementById("dropdown");

    var pets = ["chien", "chat", "serpent", "vache"];

    var inputElement = createInputElement();
    dropdownElement.appendChild(inputElement);

    var clearElement = createClearElement();
    dropdownElement.appendChild(clearElement);

    function createInputElement() {
        var element = document.createElement("input");
        element.placeholder = "Search ...";

        element.addEventListener("click", function () {
            var dropdown = document.getElementById("dropdown-animals");
            if (dropdown) {
                dropdown.remove();
            }
            var options = createOptionsElement(pets);
            dropdownElement.appendChild(options);
        });

        return element;
    }

    function createClearElement() {
        var element = document.createElement("span");
        element.innerText = "x";
        element.style.cursor = "pointer";
        element.addEventListener("click", function () {
            inputElement.value = "";
        });
        return element;
    }

    function createOptionsElement(animals) {
        var options = document.createElement("div");
        options.id = "dropdown-animals";
        animals.forEach((animal) => {
            var option = document.createElement("div");
            option.innerText = animal;
            option.addEventListener("click", function () {});
            options.appendChild(option);
        });
        return options;
    }
}
