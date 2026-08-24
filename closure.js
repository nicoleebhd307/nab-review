// === CLOSURE === 
/** Một function có thể "nhớ" và truy cập các biến bên ngoài scope của nó 
 * ngay cả khi scope bên ngoài đã được chạy xong 
 * 
 */
function createCounter(){
    let counter = 0 

    function increase(){
        counter ++ 
        return counter
    }
    return increase 
}
// mỗi hàm khi được gọi sẽ tạo ra một môi trường/ phạm vi của nó 
// const khởi tại counter = increase (vì createCounter return về inc)
const counter1 = createCounter() 

// gọi counter1 --> gọi func increase --> lúc này biến counter = 0 
// --> thực thi inc thì counter = 1 (biến counter nằm trong phạm vi createCouter())
console.log(counter1())
console.log(counter1())
console.log(counter1())