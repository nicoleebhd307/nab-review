// === ASYNCHRONOUS ===
/**
 * Sync (đồng bộ): 
    - làm vệc theo trình tự, code nào viết trước thf thực thi trước 
    - js là ngôn ngữ đơn luồng (single- thread), chạy theo thứ tự từ trên xuống
    nhưng khi gặp các tác vụ bất đồng bộ (asynchronous) như setTimeout(), setInterval(), 
    fetch(), XML HTTP Request ... sẽ không chặn luồng chính, mà sẽ được đưa vào hàng đợi (queue) 
    để thực thi sau khi luồng chính hoàn thành.
    >> viết trước nhưng chưa chắc xong trước, do không biết khi nào xong (vd: call API)

    - callback : hàm lồng hàm, cái cha done rồi đến cái con 
      + callback hell: khi lồng nhiều callback function, code khó đọc, khó maintain
      + pyramid of doom: 

 * Async (bất đồng bộ):
    - không làm việc theo trình tự, code nào viết trước chưa chắc thực thi trước
 */
setTimeout(function(){ // setTimeout là async, function trong là callback 
  console.log(1)
}, 1000)
console.log(2)

function test() {
  setTimeout(() => console.log("1"), 0);
  console.log("2");
  console.log("3");
}

test(); // Output: 2, 3, 1

/* 
Browser API cung cấp các function để xử lý bất đồng bộ: setTimeout(), setInterval(),.. xử lý các sự kiện như click, scroll, load, ...
Promises: các đối tượng JS để thực hiện tác vụ bất đồng bộ  */

// === CALLBACK ===
/* 
Khái niệm: Truyền một function vào một function khác để thực hiện tác vụ bất đồng bộ.
>> như ví dụ trên 
Khi nào dùng: Khi muốn trì hoãn việc thực hiện một tác vụ cho đến khi một tác vụ khác hoàn thành và trả về kết quả.

*/
// function calculate(a, b, callback) {
//     let result = a + b;
//     callback(result);
// }

// calculate(2, 3,
//     function(result){ // callback function/ anonymous function
//         console.log(result);
//     }
// );
// function httpGetAsync(theUrl, callback) {
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.onreadystatechange = function () {
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp); // funtion sẽ được thực thi khi nhận được response từ server, và truyền vào xmlHttp để xử lý dữ liệu trả về
//   };
//   xmlHttp.open("GET", theUrl, true); // true for asynchronous
//   xmlHttp.send(null);
// }

// httpGetAsync("https://picsum.photos/200/300", (data) => {
//   console.log(data);
//   document.getElementById("img_1").setAttribute("src", data.responseURL);

//   httpGetAsync("https://picsum.photos/200/300", (data) => {
//     document.getElementById("img_2").setAttribute("src", data.responseURL);

//     httpGetAsync("https://picsum.photos/200/300", (data) => {
//       document.getElementById("img_3").setAttribute("src", data.responseURL);
//     });
//   });
// });
// >> đang lồng nhiều callback function -> khó đọc, khó update

// === PROMISE ===
/*
Lời hứa: là một object đại diện cho một tác vụ bất đồng bộ, có thể thành công hoặc thất bại.
*/
function httpGetAsync(theUrl, resolve) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve(xmlHttp); // funtion sẽ được thực thi khi nhận được response từ server, và truyền vào xmlHttp để xử lý dữ liệu trả về
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

httpGetAsync("https://picsum.photos/200/300", (data) => {
  console.log(data);
  document.getElementById("img_1").setAttribute("src", data.responseURL);

  httpGetAsync("https://picsum.photos/200/300", (data) => {
    document.getElementById("img_2").setAttribute("src", data.responseURL);

    httpGetAsync("https://picsum.photos/200/300", (data) => {
      document.getElementById("img_3").setAttribute("src", data.responseURL);
    });
  });
});
const currentPromise = new Promise((resolve, reject) => {
    httpGetAssync("https://picsum.photos/200/300", resolve);
});

const promise2 = new Promise((resolve, reject) => {
    httpGetAssync("https://picsum.photos/200/300", resolve);
});

currentPromise // code viết bằng promise dễ đọc và dễ maintain 
  .then((data) => {
    // then được sử dụng khi promise thành công
    console.log(data);
    document.getElementById("img_1").setAttribute("src", data.responseURL);
    return promise2;
  })
  .then(data => {
    document.getElementById("img_2").setAttribute("src", data.responseURL);
    return promise3
  })
  .then(data => {
    document.getElementById("img_3").setAttribute("src", data.responseURL);
  })
  .catch((error) => {
    // catch được sử dụng khi promise thất bại
    console.log(error);
  });
// *** VER 2.0 ***
/**
 * Tạo một đối tượng Promise: 
 * 1. tạo 1 object constructor, truyền vào executor function
 * 2. executor function có 2 tham số: resolve, reject (không có thì bị treo, không thể hoàn thành -> memory leak)
 
  * 3 trạng thái của Promise:
  *   - pending: đang chờ thực hiện, đang memory leak 
  *   - fulfilled: đã hoàn thành
  *   - rejected: đã thất bại

* Sử dụng Promise với 3 methods:
* 1. then(): được gọi khi promise thành công, nhận callback function
* 2. catch(): khi promise thất bại
* 3. finally(): khi promise hoàn thành, luôn được gọi khi then, catch xong 
*/
var promise = new Promise(
  // executor function
  // thực thi executor trước khi thực thi promise 
  function(resolve, reject){
    // logic code 
    // thành công: gọi resolve()
    // thất bại: gọi reject()
    resolve()
  }
)
// sử dụng 
promise // 3 methods, nhận callback
  .then(function(){ 
    console.log('Successfully')
  })
  .catch(function(){
    console.log('Failure')                                        
  })
  .finally(function(){ 
    console.log('Done')
  })

// === PROMISE CHAIN: tính chất chuỗi ===
/* Dùng để xử lý call back hell (hàm sau cần value nhận từ hàm trước done)
 * Khi có nhiều then() liên tiếp, thì then() sẽ được gọi theo thứ tự từ trên xuống dưới,
 * và giá trị trả về của then() trước sẽ được truyền vào then() sau.
 * 
 * 
 */
promise 
  .then(function(){
    return 1 // nếu không return -> undefined
    // nếu return một promist --> chờ promise được giải quyết --> then() kế típ 
  })
  .then(function(value){
    console.log(value) // 1
    return value + 1
  })
  .then(function(value){
    console.log(value) // 2
    return value + 1
  })

// === ASYNC/AWAIT ===
// dùng await trước mỗi promise, function chứa các promise phải được khai báo là async, khi promise thành công sẽ trả về kết quả, khi promise thất bại sẽ ném ra lỗi
// ở cấp độ global, không được dùng keyword await, chỉ được dùng trong function async

// const executeAsync = async () => {
//     await currentPromise;
//     await promise2;
//     await promise3;
//     //thực hiện từ trên xuống dưới: trên xong mới đến dưới 
// }

// = TRY/CATCH =
// khi dùng async/await, nếu promise thất bại sẽ ném ra lỗi >> catch được thực thi, nên cần dùng try/catch để bắt lỗi
const executeAsync = async () => {
    try {
        const response = await currentPromise;
        document.getElementById("img_1").setAttribute("src", response.responseURL);
        const response2 = await promise2;
        document.getElementById("img_2").setAttribute("src", response2.responseURL);
        const response3 = await promise3;
        document.getElementById("img_3").setAttribute("src", response3.responseURL);
    } catch (error) {
        console.log({error});
    }
}
executeAsync(); // là một function nên cần call để execute 

// === FETCH === 
/** API (Application Programming Interface): cổng giao tiếp giữa các phần mềm, là url -> trả về dữ liệu -> hiển thị lên giao diện 
 * Backend trả về API (url) --> Fetch lấy dữ liệu --> JSON/XML --> JSON.parse() --> JS types --> render ra giao diện
 * Frontend : giao diện người dùng 
 * Backend: các logic xử lý dữ liệu, cơ sở dữ liệu 
 */
var postApi = "https://jsonplaceholder.typicode.com/posts/1";
//stream 
fetch(postApi) // hàm fetch() return 1 Promise 
  .then(function(response){ // tham số response cũng là 1 object Promise 
    return response.json() // trả về 1 Promise, khi promise thành công sẽ trả về dữ liệu dạng JSON
  })
  .then(function(post){ // tham số post là dữ liệu dạng JSON
    console.log(post)
  })
  .catch(function(error){
    console.log(error)
  })