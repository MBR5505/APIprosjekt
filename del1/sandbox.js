// console.log(1);
// console.log(2);
// console.log(3);
// console.log(4);
// console.log(5);

// setTimeout(() => {
//     console.log('callback kaboomed');
// }, 2000);

// console.log(6);
// console.log(7);
// console.log(8);
// console.log(9);
// console.log(10);


const getTodos = () => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
        // console.log(request, request.readyState);
    
        if(request.readyState === 4 && request.status === 200) {
            console.log(request.responseText);
            callback(undefined, request.responseText);
        }
        else if(request.readyState === 4) {
            console.log('could not fetch data');
            callback('could not fetch data', undefined);

        }
    });
    
    
    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/')
    request.send();
    
};

getTodos((error, data) => {
    console.log('callback kaboomed');

    if(error) {
        console.log(error);
    }
    else {
        console.log(data);
    }
});
