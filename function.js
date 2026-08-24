// === ARROW FUNCTION ===
/**
 * 
 */

function myFunc(log){
    console.log(log)
}

myFunc('my log...')

// const <ten-ham> = (<ten-thamso>) => {
//     cau-lenh
// }

const myArrowFunc = (log) => { 
    console.log(log)
}

myArrowFunc('my arrow log...')

const sum = (a,b) => {
    return a+b
}

console.log(sum(3,9))

// có thể bỏ return 
const sumReturn = (a,b) => a+b;
console.log(sumReturn(9,9))

const course = {
    name: 'Basic JS',
    getName: function() {
        return this; // this là một context 
    }
}
console.log(course.getName())
const courseArrow = {
    name: 'Basic JS',
    getName: () => {
        return this; // this của arrow func không có context >> undefined 
    }
}
console.log(courseArrow.getName())

// Arrow func không tạo ra được func constructor 
const Course = function(name, price){
    this.name = name 
    this.price = price 
}
const jsCourse = new Course('JS', 500)
console.log(jsCourse)

// const CourseArrow = (name, price) => {
//     this.name = name 
//     this.price = price 
// }
// const jsCourseArrow = new CourseArrow('JS', 500)
// console.log(jsCourseArrow)

// >> báo lỗi 

