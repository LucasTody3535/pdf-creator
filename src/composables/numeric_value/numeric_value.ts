function validateKeypress(keyEvent: KeyboardEvent) {
    if(isNaN(Number(keyEvent.key))) keyEvent.preventDefault();
}

export function useRestrictToOnlyNumbersForKeypressings(input: HTMLInputElement) {
    input.removeEventListener("keypress", validateKeypress);
    input.addEventListener("keypress", validateKeypress);
}