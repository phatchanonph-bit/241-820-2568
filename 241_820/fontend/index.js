function submitData() {
    let firstnameDOM = document.querySelector('input[name="firstname"]');
    let lastnameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="age"]');

    let genderDOM = document.querySelector('input[name="gender"]:checked');
    let interestDOMs = document.querySelectorAll('input[name="interest"]:checked');
    let descriptionDOM = document.querySelector('textarea[name="description"]');

    let interests = [];
    interestDOMs.forEach(item => {
        interests.push(item.value);
    });

    let usersData = {
        firstname: firstnameDOM.value,
        lastname: lastnameDOM.value,
        age: ageDOM.value,
        gender: genderDOM ? genderDOM.value : null,
        description: descriptionDOM.value,
        interests: interests
    };

    console.log('submitData', usersData);
}
