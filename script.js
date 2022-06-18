const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const allInputElement = document.querySelectorAll('input')

function showError(input, message) {
    const formControl = input.parentElement;
    const formInput = input
    formInput.className = 'form-input icon-rtl'
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    const formInput = input
    formInput.className = 'form-input'
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Looks like this is not an email');
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} cannot be empty`);
        } else {
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}



function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([firstname, lastname, email, password]);
    checkEmail(email);
    checkLength(password, 6, 25);
});

allInputElement.forEach((el) => {
    el.addEventListener('input', (e) => {
        const parElement = el.parentElement
        const formInput = el
        formInput.className = 'form-input'
        parElement.className = 'form-control'

    })
})