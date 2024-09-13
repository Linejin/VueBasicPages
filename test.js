const bucketLists = [
    { id: 3, text: '여행가기', done: false },
    { id: 2, text: '치킨 먹기', done: true },
    { id: 1, text: '코딩 하기', done: false }
];
function getValues(key) {
    if(bucketLists.length === 0 || !(key in bucketLists[0]))
        return [];
    return bucketLists.map((item) => item[key]);
}
function addList(data){
    return [
        data,
        ...bucketLists
    ];
}
function removeList(key, value){
    return bucketLists.filter((item) => item[key] !== value);
}
function toggle(id){
    return bucketLists.map((item) => item.id !== id ? item : {...item, done: !item.done});
}

console.log(getValues('id'));
console.log(getValues('text'));
console.log(getValues('done'));
console.log(getValues('1'));
console.log(addList({id : 4, text: 'test', done: true}))
console.log(removeList('id', 3))
console.log(toggle(1));


const array = [1, 2, 3, 4]

const ret = array.reduce((acc, cur) => {

    if(cur > 2){
        acc.push(cur)        
    }
    return acc;
}, [])
console.log(array)
console.log(ret)