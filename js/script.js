"use strict"

let form = document.querySelector('.reservation-form');
let formBtn = form.querySelector('.reservation-form__btn');

let nameInput = form.querySelector('#input-name');
let nameLabel = form.querySelector('#input-name + label');

let phoneInput = form.querySelector('#input-phone');
let phoneLabel = form.querySelector('#input-phone + label');
let phonePrevValue = "";
let isPhoneValid = false;

nameInput.addEventListener('change', (e) => {
    e.preventDefault();
    nameValidation(nameInput, nameLabel);
});

nameInput.addEventListener('input', (e) => {
    e.preventDefault();
    nameValidation(nameInput, nameLabel);
});

function isNameValid(name) {
    let trimName = name.trim();
    let regexp = /[^a-zа-яё]+/i;
    if (!regexp.test(name))
        return true;
    return false;
}

function nameValidation(nameInput, nameLabel, isFull = false) {
    if (nameInput.value === "") {
        if (isFull) {
            nameInput.classList.add('error');
            nameLabel.classList.add('error-text');
        } else {
            nameInput.classList.remove('error');
            nameLabel.classList.remove('error-text');
        }
        nameInput.classList.remove('valid');
        nameLabel.classList.remove('valid-text');

        nameLabel.textContent = "Your name";
    } else {
        if (!isNameValid(nameInput.value)) {
            nameInput.classList.remove('valid');
            nameLabel.classList.remove('valid-text');
            nameInput.classList.add('error');
            nameLabel.classList.add('error-text');
            nameLabel.textContent = "The name can only contain letters"
        } else {
            nameInput.classList.remove('error');
            nameLabel.classList.remove('error-text');
            nameInput.classList.add('valid');
            nameLabel.classList.add('valid-text');
            nameLabel.textContent = "Your name";
            return true;
        }
    }
}

phoneInput.addEventListener('focus', (e) => {
    e.preventDefault();
    if (phoneInput.value === "")
        phoneInput.value = "+";
});

phoneInput.addEventListener('input', (e) => {
    e.preventDefault();
    phoneNumberValidation(phoneInput, phoneLabel);
});

phoneInput.addEventListener('blur', (e) => {
    e.preventDefault();
    phoneNumberValidation(phoneInput, phoneLabel, false);
    if (phoneInput.value === "+") {
        phoneInput.value = "";
        phoneLabel.classList.remove('error-text')
        phoneInput.classList.remove('error');
        phoneLabel.classList.remove('valid-text')
        phoneInput.classList.remove('valid');
    }
});

function phoneNumberValidation(phoneInput, phoneLabel, isFull = true) {
    if (isFull) {
        let regexp1 = /^[+][0-9]{1}$/
        let regexp2 = /^[+][0-9]{1}\s{1}[(]{1}[0-9]{3}$/
        let regexp3 = /^[+][0-9]{1}\s{1}[(]{1}[0-9]{3}[)]{1}\s{1}[0-9]{3}$/
        let regexp4 = /^[+][0-9]{1}\s{1}[(]{1}[0-9]{3}[)]{1}\s{1}[0-9]{3}[-]{1}[0-9]{2}$/
        let regexp5 = /^[+][0-9]{1}\s{1}[(]{1}[0-9]{3}[)]{1}\s{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/

        let curSign = phoneInput.value.slice(-1) === " " ? NaN : Number(phoneInput.value.slice(-1));

        if (phoneInput.value === "")
            phoneInput.value = "+";

        if (phoneInput.value.length > phonePrevValue.length) {
            if (!Number.isInteger(curSign) || isPhoneValid) {
                phoneInput.value = phoneInput.value.slice(0, -1);
            } else {
                if (regexp1.test(phoneInput.value)) {
                    phoneInput.value += ' (';
                } else if (regexp2.test(phoneInput.value)) {
                    phoneInput.value += ') ';
                } else if (regexp3.test(phoneInput.value) || regexp4.test(phoneInput.value)) {
                    phoneInput.value += '-';
                } else if (regexp5.test(phoneInput.value)) {
                    isPhoneValid = true;
                }
            }
        } else {
            let delSign = phonePrevValue.slice(-1);

            if (!Number.isInteger(delSign)) {
                if (delSign === ' ' || delSign === '(')
                    phoneInput.value = phoneInput.value.slice(0, -2);
                else if (delSign === '-')
                    phoneInput.value = phoneInput.value.slice(0, -1);
            }

            if (phoneInput.value === "")
                phoneInput.value = "+";
        }
    }

    if (isPhoneNumberValid(phoneInput.value)) {
        phoneLabel.classList.remove('error-text')
        phoneInput.classList.remove('error');
        phoneLabel.classList.add('valid-text')
        phoneInput.classList.add('valid');
        isPhoneValid = true;
        return true;
    } else {
        phoneLabel.classList.remove('valid-text')
        phoneInput.classList.remove('valid');
        phoneLabel.classList.add('error-text')
        phoneInput.classList.add('error');
        isPhoneValid = false;
    }
    phonePrevValue = phoneInput.value;
}

function isPhoneNumberValid(number) {
    let trimName = number.trim();
    let regexp = /^[+][0-9]{1}\s{1}[(]{1}[0-9]{3}[)]{1}\s{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/;
    if (regexp.test(number))
        return true;
    return false;
}

function phoneReset(phoneInput, phoneLabel) {
    phoneInput.classList.remove('valid');
    phoneLabel.classList.remove('valid-text');
    phoneInput.value = "";
}

function nameReset(nameInput, nameLabel) {
    nameInput.classList.remove('valid');
    nameLabel.classList.remove('valid-text');
    nameInput.value = "";
}

formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (nameValidation(nameInput, nameLabel, true) && phoneNumberValidation(phoneInput, phoneLabel, false)) {
        nameReset(nameInput, nameLabel);
        phoneReset(phoneInput, phoneLabel)
    }
});

//--------
let subscriptionForm = document.querySelector('.footer__subscription-form');
let subscriptionInput = subscriptionForm.querySelector('.footer__subscription-input');
let subscriptionLabel = subscriptionForm.querySelector('.footer__subscription-input + label');
let subscriptionBtn = subscriptionForm.querySelector('.main-btn_mini');

function emailValidation(subscriptionInput, subscriptionLabel, isFull = false) {
    let regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (subscriptionInput.value !== "") {
        if (regexp.test(subscriptionInput.value)) {
            if (isFull) {
                subscriptionInput.value = "";
                subscriptionLabel.classList.remove('error-text');
                subscriptionInput.classList.remove('error');
                subscriptionLabel.classList.remove('valid-text');
                subscriptionInput.classList.remove('valid');
                subscriptionLabel.textContent = "Enter your email";
            } else {
                subscriptionLabel.classList.add('valid-text');
                subscriptionInput.classList.add('valid');
            }
        } else {
            let tmp = /.+@/;
            if (!tmp.test(subscriptionInput.value)) {
                subscriptionLabel.textContent = "Missing @ symbol";
                subscriptionLabel.classList.add('error-text');
                subscriptionInput.classList.add('error');
            } else {
                tmp = /.+@.+\..+/;
                if (!tmp.test(subscriptionInput.value)) {
                    subscriptionLabel.textContent = "Missing domain name";
                    subscriptionLabel.classList.add('error-text');
                    subscriptionInput.classList.add('error');
                }
            }
        }
    } else {
        subscriptionLabel.classList.remove('error-text');
        subscriptionInput.classList.remove('error');
        subscriptionLabel.classList.remove('valid-text');
        subscriptionInput.classList.remove('valid');
        subscriptionLabel.textContent = "Enter your email";
    }
}

subscriptionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    emailValidation(subscriptionInput, subscriptionLabel, true);
});

subscriptionInput.addEventListener('blur', (e) => {
    e.preventDefault();
    emailValidation(subscriptionInput, subscriptionLabel);
});

//-------- Popup --------
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupCloseBtn = popupClose.querySelector('.popup__close-btn');

setTimeout(() => {
    popup.classList.remove('hidden');
}, 2000);

setTimeout(() => {
    popupClose.classList.remove('hidden');
}, 4000);

popupCloseBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    popupClose.classList.add('hidden');
})