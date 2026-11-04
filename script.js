const cidrForm = document.querySelector("#cidr-form");
const cidrInput = document.querySelector("#cidr-input");
const result = document.querySelector("#result");

function showInput(event) {
  event.preventDefault();

  const enteredText = cidrInput.value;
  if (enteredText.trim() === "") {
    result.textContent = "Please enter an IPv4 CIDR block.";
    return;
  }
  result.textContent = "You entered: " + enteredText;
}

cidrForm.addEventListener("submit", showInput);
