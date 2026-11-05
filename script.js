const cidrForm = document.querySelector("#cidr-form");
const cidrInput = document.querySelector("#cidr-input");
const result = document.querySelector("#result");

function showInput(event) {
  event.preventDefault();

  const enteredText = cidrInput.value.trim();
  if (enteredText === "") {
    result.textContent = "Please enter an IPv4 CIDR block.";
    return;
  }

  const cidrParts = enteredText.split("/");
  if (cidrParts.length !== 2 || cidrParts[0] === "" || cidrParts[1] === "") {
    result.textContent = "Use IPv4/prefix format, for example 192.168.1.42/24.";
    return;
  }

  const ipAddress = cidrParts[0];
  const prefixText = cidrParts[1];
  const octets = ipAddress.split(".");

  if (octets.length !== 4) {
    result.textContent = "Enter an IPv4 address with exactly four octets.";
    return;
  }

  for (const octetText of octets) {
    if (octetText === "" || /[^0-9]/.test(octetText)) {
      result.textContent = "Each IPv4 octet must contain decimal digits only.";
      return;
    }

    if (octetText.length > 1 && octetText.startsWith("0")) {
      result.textContent = "IPv4 octets must not have leading zeros.";
      return;
    }

    const octet = Number(octetText);
    if (octet < 0 || octet > 255) {
      result.textContent = "Each IPv4 octet must be between 0 and 255.";
      return;
    }
  }

  if (/[^0-9]/.test(prefixText)) {
    result.textContent = "The prefix must contain decimal digits only.";
    return;
  }

  if (prefixText.length > 1 && prefixText.startsWith("0")) {
    result.textContent = "The prefix must not have leading zeros.";
    return;
  }

  const prefix = Number(prefixText);
  if (prefix < 0 || prefix > 32) {
    result.textContent = "The prefix must be between 0 and 32.";
    return;
  }

  result.textContent = "Valid input: " + enteredText;
}

cidrForm.addEventListener("submit", showInput);
