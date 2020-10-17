"use strict"

let form = document.querySelector('.reservation');
let formBtn = form.querySelector('.form-btn');

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

function nameValidation(nameInput, nameLabel) {
    if (nameInput.value === "") {
        nameInput.classList.remove('valid');
        nameLabel.classList.remove('valid-text');
        nameInput.classList.remove('error');
        nameLabel.classList.remove('error-text');
        nameLabel.textContent = "Your name";
    } else {
        if (!isNameValid(nameInput.value)) {
            nameInput.classList.remove('valid');
            nameLabel.classList.remove('valid-text');
            nameInput.classList.add('error');
            nameLabel.classList.add('error-text');
            nameLabel.textContent = "Имя не может содержать"
        } else {
            nameInput.classList.remove('error');
            nameLabel.classList.remove('error-text');
            nameInput.classList.add('valid');
            nameLabel.classList.add('valid-text');
            nameLabel.textContent = "Your name";
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
});

function phoneNumberValidation(phoneInput, phoneLabel, isFull = true) {
    if (isFull) {
        let regexp1 = /^[+][0-9]{1}$/
        let regexp2 = /^[+][0-9]{1}[(]{1}[0-9]{3}$/
        let regexp3 = /^[+][0-9]{1}[(]{1}[0-9]{3}[)]{1}\s{1}[0-9]{3}$/
        let regexp4 = /^[+][0-9]{1}[(]{1}[0-9]{3}[)]{1}\s{1}[0-9]{3}[-]{1}[0-9]{2}$/
        let regexp5 = /^[+][0-9]{1}[(]{1}[0-9]{3}[)]{1}\s{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/

        let curSign = phoneInput.value.slice(-1) === " " ? NaN : Number(phoneInput.value.slice(-1));

        if (phoneInput.value === "")
            phoneInput.value = "+";

        if (phoneInput.value.length > phonePrevValue.length) {
            if (!Number.isInteger(curSign) || isPhoneValid) {
                phoneInput.value = phoneInput.value.slice(0, -1);
            } else {
                if (regexp1.test(phoneInput.value)) {
                    phoneInput.value += '(';
                } else if (regexp2.test(phoneInput.value)) {
                    phoneInput.value += ') ';
                } else if (regexp3.test(phoneInput.value) || regexp4.test(phoneInput.value)) {
                    phoneInput.value += '-';
                } else if (regexp5.test(phoneInput.value)) {
                    isPhoneValid = true;
                }
            }
        } else {
            if (!Number.isInteger(curSign)) {
                phoneInput.value = phoneInput.value.slice(0, -2);
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
    let regexp = /^[+][0-9]{1}[(]{1}[0-9]{3}[)]{1}\s{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/
    if (regexp.test(number))
        return true;
    return false;
}






formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nameValidation(nameInput, nameLabel);



    let date = form.querySelector('#input-date');




});