// I want to change the class of our AddHome button
// to bootstraps success class "btn-success"
var reallyLOngVar = 'pollution'
$('#addHome').removeClass('btn-danger').addClass('btn-success');
const id = 'zillowlink'

const $newLink = $(`<br><br><a id=${id} href="http://www.zillow.com">Visit Zillow.com</a>` );

$('body').append($newLink);

// this code says when you click on the link
// open in a new tab
const $zillowlink = $('#zillowlink');

$zillowlink.attr("target", "_blank")

console.log($zillowlink.attr("href"))

$('#addHome').click(function(evt){
  console.log(evt)
  console.log("========================")  
  console.log($(this))
  console.log("========================")
});

// on this click we want to remove the row of the button
// clicked on
$('#homes tbody').on('click', 'button', function(e) {
    // got the element we clicked on with e.target
    // we used the closest method to find the able row we are inside of
    // then we used .remove to remove it
//    $(e.target).closest('tr').remove();
    console.log(this, "< outside the fadeOut method")

// find out the element then remove it
    $(this).closest('tr').fadeOut(1500, function(){
        console.log(this, ' inside of our callback')
        $(this).remove();
    })
  });







