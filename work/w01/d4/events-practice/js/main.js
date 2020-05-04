const btn = document.querySelector('button');

btn.addEventListener('click', function(event){
  // When I click on the button I want to create an Element
  const li = document.createElement('li');
  const input = document.querySelector('input');
    
  li.textContent = input.value;
  console.log(li);
  // select the element we want to put are created element in
  const ul = document.querySelector('ul');
  ul.appendChild(li);
//   console.log(li.previousElementSibling)
});

const ul = document.querySelector('ul');

ul.addEventListener('click', function(e){
    console.log(e.target, " <---- e.target")
    e.target.style.color = 'red'
    console.log(e.currentTarget, "< --- e.currentTarget")
})