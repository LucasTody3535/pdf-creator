const DIGITS = [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0"
];

const NUMPADS = [
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "Numpad0"
];

export function isValidDigit(code: string) {
    return DIGITS.includes(code);
}

export function isValidNumpad(code: string) {
    return NUMPADS.includes(code);
}
