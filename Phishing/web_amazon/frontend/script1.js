var arrow = document.querySelector("#arrowimg");
var text = document.querySelector(".need")
var list = document.querySelector("#help_list");
let where = 0;

arrow.addEventListener("click", placedown)
text.addEventListener("click", placedown)

function placedown() {
    if (where == 0) {
        arrow.classList.remove("onea")
        arrow.classList.add("onea2")
        list.classList.remove("onel")
        list.classList.add("onel2")
        where = 1;
    }
    else {
        arrow.classList.remove("onea2")
        arrow.classList.add("onea")
        list.classList.remove("onel2")
        list.classList.add("onel")
        where = 0;
    }
}

function replaces() {
    var emailInput = document.querySelector('input[name="email"]');
    localStorage.setItem("email", emailInput.value);
    var emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

    if (!emailPattern.test(emailInput.value)) {
        return;
    }

    // Proceed with navigation to index2.html
    location.replace("verify/index2.html");
}
