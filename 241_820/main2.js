let a = 10;
let b = 20;
let c = 30;
console.log('a:', 'b:', b, 'c:', c);

let ages = [10 , 20, 30]; // array 3 items
console.log('ages', ages);
console.log('ages[1]:', ages[1]);

//1. แทนที่ ค่าข้อมูลใน  array
ages[1] = [15,25];
console.log('ages list:', ages);
//2. ต่อ array
ages.push(35)
console.log('ages after push:', ages);

//3. เอา ค่าข้อมูล ออกจาก array
ages.pop();
console.log('ages after pop:', ages);

/*
array
*/

let ages = [25,30,35,40,45]
console.log('Ages:', ages);

let fruits = ['apple', 'banana', 'cherry']
console.log('Fruits:', fruits);
fruits.push('mango');
console.log('Fruits after push:', fruits);
console.log('Fruits fruit:',fruits.length)

for (let i = 0: i < fruits.length; i++) {
    console.log('Fruit at index', i, ':', fruits[i]);
}

/*
object
*/

let student = [{
    age: 30;
    name: "john",
    grade: 'A',
}, {
    let age = 30;
    let name = "Jane";
    let grade = 'B';
}]

for(let i = 0; i < students.length; i++) {
    console.log("Student " + (i + 1) + ":");
console.log(student);
console.log('name:', student.name);
console.log ('age:',student.age);
console.log('grade:', student.grade);
}

student.push({
    age: 28,
    name: "Mike",
    grade: 'C',
});
console.log("Added new student:", student[student.length - 1]);

student.pop();
console.log("Removed last student. Current students:", student);

/*
function
*/

let score1 = 10
let score2 = 80
// ประกาศฟังก์ชัน calculatation_grade
function calculatation_grade(parameter) {
if (score1 >= 80 ){
    grade = 'A'
    } else if (score >= 70) {
    grade = 'B'
    } else if (score >= 60) {
    grade = 'C'
    } else if (score >= 50) {
    grade = 'D'
    } else {
    grade = 'F'
    }
    return grade;
}

// เรียกใช้ฟังก์ชัน calculatation_grade
let grade1= calculatation_grade(score1);
let grade2= calculatation_grade(score2);
console.log('Score1: ' + score1 + ', Grade:' + grade1);
console.log('Score2: ' + score2 + ', Grade:' + grade2);

/*
array
*/

let scores = [90,80,70,60,50];

for (let i = 0; i < scores.length; i++1) {
    console.log(`Score: ${i + 1}`, ${scores[i]}`);
}

scores = scores.map((s)) >= {
    return s - 10;
}

scores.forEach(s) => {
    console.log('Score:', s);
}

//map, filter


let scores = [90,80,70,60,50];
let newScores = []

for (let i = 0; i < scores.length; i++) {
    console.log(scores[i]);
    // if (score[i] >= 60) {
    //     newScores.push(scores[i]);
    // }
}

let newScores = scores.filter(function(score)) {
    if (score >= 70) {
    }

}
newScores.forEach((ns) => {
    console.log('new score: ' + ns);
    })

/*
object functions
*/

let student = [
    {name: "John", age: 20, grade: "A"},
    {name: "Jane", age: 22, grade: "B"},
    {name: "Jim", age: 21, grade: "C"}
]
console.log('Students:', student[0]);

let student = students.find((s)) => {
    return s.name === "Jane";
}

let doublescoreStudent = students.filter.map((s)) => {
    s.age = s.age * 2;
    return s;
}

let HighGradeStudents = students.filter((s)) => {
    return s.grade === "A";
}

console.log('student:', student);
console.log('Doubled Score Students:', doublescoreStudent);
console.log('High Grade Students',HighGradeStudents);