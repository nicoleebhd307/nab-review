// CÁCH SỬ DỤNG PROMISE 
// sử dụng Async/ await khi các case không phụ thuộc kết quả vào nhau 
// dùng Promise thì 2 case không liên quan đến nhau 

// async/ await 
// getBlogId
// getCommentsById(blogId) >> ràng buộc nhận được blogId
const BlogId = await getBlogId()
const listComment = await getCommentsById(blogId)

// promise 
// getTopListComment 
// getTopListBlog
Promise.all([getTopListComment,getTopListBlog]) // []

const ps1 = new Promise ((resolve, reject) => setTimeout(resolve, 1000, 'promiseResolver 01'))
const ps2 = new Promise ((resolve, reject) => setTimeout(reject, 100, 'promiseResolver 02'))
const ps3 = new Promise ((resolve, reject) => setTimeout(resolve,500,'promiseResolver 03'))


Promise.all([ps1, ps2])
    .then(values => console.log(`result promise.all ${values}`))
    .catch(error => console.log(`result promise.all ${error}`))
// >> trả về ps2
// >> trên tất cả giá trị của Promise
//      - trả về kết quả thất bại, không quan tâm các kết quả đúng 
//      - trả về tất cả giá trị nếu tất cả đều thành công

Promise.any([ps1, ps2])
    .then(values => console.log(`result promise.all ${values}`))
    .catch(error => console.log(`result promise.all ${error}`))
// >> trả về bất kỳ kết quả nào thành công đầu tiên không quan tâm lỗi và các thành công sau khác 
// >> nếu sai hết, trả về 1 danh sách lỗi (dạng file?)

Promise.race([ps1, ps2,ps3])
    .then(values => console.log(`result promise.all ${values}`))
    .catch(error => console.log(`result promise.all ${error}`))
// >> trả về kết quả thành công/ thất bại nhanh nhất (đ quan tâm kết quả, chỉ qt tốc độ nhanh nhất)

Promise.allSettled([ps1, ps2,ps3])
    .then(values => console.log(`result promise.all ${values}`))
    .catch(error => console.log(`result promise.all ${error}`))
// >> lấy hết tất cả kết quả dù là thất bại hay thành công 
