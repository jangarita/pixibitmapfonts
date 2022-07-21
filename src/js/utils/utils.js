export function setElementVisible(element, visible) {
    if (!visible) {
        element.classList.add('d-none');
    } else {
        element.classList.remove('d-none');
    }
}

export function setElementEnable(element, enable) {
    if (enable) {
        element.removeAttribute('disabled');
    } else {
        element.setAttribute('disabled', 'true');
    }
}
