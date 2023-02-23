import { isValidDigit, isValidNumpad } from "../../utils/validation/validation_utils";

function validateKeypress(keyEvent: KeyboardEvent) {
    if(isValidDigit(keyEvent.code) || isValidNumpad(keyEvent.code)) return;
    keyEvent.preventDefault();
}

export function useRestrictToOnlyNumbersForKeypressings(input: HTMLInputElement) {
    input.removeEventListener("keypress", validateKeypress);
    input.addEventListener("keypress", validateKeypress);
}