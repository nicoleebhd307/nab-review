// SCOPE trong JS
/** Các loại Scope
 * 1. Global: có thể được gọi ở bất cứ đâu
 * 2. Code block: khối mã {} : let,const
 * 3. Local scope: var, function
 *
 * Khi gọi mỗi hàm luôn có một phạm vi mới được tạo ra
 * Các hàm có thể truy cập được biến khai báo bên trong nó và bên ngoài nó
 * Khi nào một biến bị xóa khỏi bộ nhớ?
 *  - Khi khai báo biến thì auto cấp phát bộ nhớ
 *  - Global Var được xóa khi chương trình bị tắt/ xóa
 *      >> tránh khai báo global vì nó tồn tại theo suốt chương trìh
 *      >> lãng phí bộ nhớ khi không sử dụng
 *  - khi thoát khỏi code block thì xóa biến const, let
 *  - Biến trong hàm được tham chiếu bởi một hàm?
 *      function makeCouter(){
 *          let couter = 0
 *          function IncCouter(){
 *              return ++couter
 *           }
 *          return couter
 *      }
 *      >> couter ở dòng 2 vẫn chưa xóa khỏi bộ nhớ
 */

const message = "Message..."; // Global Scope
function log() {
  console.log(log);
}
function logger() {
  console.log(message);
  log(); // Global Function nên được gọi ở bất cứ đâu
}
logger();

function blockScope() {
  let a = 123;
}
//console.log(a) // not defined

// function cũng là phạm vi hàm
function Func1() {
  function Func2() {
    console.log("Inside Func");
  }
  Func2();
}
Func1();
//Func2() // not defined

// mỗi lần gọi hàm sẽ tạo 1 phạm vi hàm khác nhau
function callFunc(first, last) {
  console.log(first, last);
}

callFunc("Dieu", "Bui"); // 2 lần gọi là 2 phạm vi hàm khác nhau
callFunc("Linh", "Khanh");

// Biến trong hàm được tham chiếu bởi một hàm khác >> Closure 
function makeCouter() {
  let couter = 0;
  function IncCouter() {
    return ++couter;
  }
  return IncCouter;
}

const increase1 = makeCouter();

console.log(increase1())
console.log(increase1())
console.log(increase1())