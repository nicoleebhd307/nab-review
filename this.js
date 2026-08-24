// === OBJECT IN JS - CON TRỎ THIS  ===
/** Từ khóa this trong js là để đề cập tới object mà nó đang thuộc về
 * 1. Trong một phương thức, this tham chiếu tới object mà phương thức đó thuộc về
 * 2. Đứng ngòa method, this tham chiếu tới global object (window trong trình duyệt, global trong nodejs)
 ** Lưu ý:
 * 1. This trong hàm tạo (contructor function) đại diện cho obj được tạo 
 * 2. this trong một hàm là undefined khi ở strict mode 
 * 3. các method bind(), call(), apply() có thể tham chiếu this tới đối tượng khác 
 */

const iPhone = {
  // property: thông tin của đối tượng
  name: "iPhone 14 Pro Max",
  color: "Deep Purple",
  weight: "240g",

  // method: hành vi của đối tượng
  takePhoto() {
    console.log(`${this.name} is taking a photo`);
  },

  objChild: {
    name: "Child Object",
    methodChild() {
      
      console.log(this.name);
      // this ở đây sẽ trỏ tới objChild
    },
  },
};
console.log(iPhone.takePhoto());
console.log(iPhone.objChild.methodChild()); // this nằm trong method, obj trước method là objChild 
// Hàm TẠO 
function Car(name, color, weight) {
  this.name = name;
  this.color = color;
  this.weight = weight;

  this.run = function () {
    console.log(`${this.name} is running`);
  }

};

const mercedes50 = new Car("Mercedes 50", "Black", "2000kg");
console.log(mercedes50);
console.log(mercedes50.run());

// const button = document.querySelector('button')

// button.onClick = function(){ 
//     console.log(this) // trả về dòng thẻ <button> trong file html
// }

function myFunc(){
    console.log(this)
}

myFunc() // trả về đối tương global lớn nhất khi này không thuộc về phưng thức nào 