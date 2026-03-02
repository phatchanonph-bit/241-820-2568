const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');
    let messageDOM = document.getElementById('message');
        try {

    let interests = '';
    for (let i = 0; i < interestDOMs.length; i++) {
        interests += interestDOMs[i].value;
        if (i != interestDOMs.length - 1) {
            interests += ',';
        }
    }

    let userData = {
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM ? genderDOM.value : '',
        description: descriptionDOM.value,
        interests: interests
    };

        const response = await axios.post('http://localhost:8000/users', userData);
        console.log('submitData', response.data);

        messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = 'message success';

    } catch (error) {
        if (error.response) {
            messageDOM.innerText = `เกิดข้อผิดพลาด: ${error.response.data.message}`;
            messageDOM.className = 'message error';
        } else {
            console.error('Error submitting data:', error.message);
            messageDOM.innerText = 'เกิดข้อผิดพลาด';
            messageDOM.className = 'message danger';
        }
    }
}
