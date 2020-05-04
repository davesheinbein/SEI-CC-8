const titleEl = document.getElementById('title');


const pEl = document.querySelector('.cool');

// console.log(pEl);
console.dir(pEl);

pEl.style.color = 'red';
// setting the inner Text
pEl.innerText = 'buckets of rain';

// retrieving the innerText
pEl.innerText // 'bucket of rain'
console.log(pEl.innerText);

pEl.innerHTML = "<h1>Buckets of Moonbeams</h1>"




// const aLinkGoogle = document.querySelector('a');
// console.log(aLinkGoogle);

// aLinkGoogle.setAttribute('href', 'https://www.google.com')


// aLinkGoogle.href = 'https://www.google.com'; // totally valid and works

const commentEls = document.querySelectorAll('.comment');
console.log(commentEls);

for (let comment of commentEls){
    console.log(comment)

    comment.style.fontSize = '30px';
}




























