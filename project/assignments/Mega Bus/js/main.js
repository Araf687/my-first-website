//---------------------------functions-------------------------------------------
//function to get the current value from the input tag
function getValue(id)
{
    var value=document.getElementById(id).value;
    value=parseFloat(value);
    return value;
}
//function to set the value in the input tag
function setValue(id,value){
    document.getElementById(id).value=value;
}
//function to get text from a tag or get the cost form the ticket counter form
function getCost(id)
{
    var cost=document.getElementById(id).innerText;
    cost=parseFloat(cost);
    return cost;
}
//function to set the text in a tag or set the cost int the tag of the  ticket form
function setCost(id,cost){
    document.getElementById(id).innerText=cost;
}
//---------------------------------------------------------------------------//
//increase the booking of first class ticket
document.getElementById("first-class-increase").addEventListener("click",function(){
    var valueIncrease=getValue("quantity-first-class");
    quantity=valueIncrease+1;
    setValue("quantity-first-class",quantity);

    var subTotalCost=quantity*150;//calculating the ticket cost
    var tax=(subTotalCost/100)*10;//calculating the tax on ticket
    var totalCost=subTotalCost+tax;// calculating the total cost for getting the ticket

    setCost("sub-total-cost",subTotalCost);
    setCost("tax",tax);
    setCost("total-cost",totalCost);
})
//decrease the booking of first class ticket
document.getElementById("first-class-decrease").addEventListener("click",function(){
    var valueDecrease=getValue("quantity-first-class");
    quantity=valueDecrease-1;
    setValue("quantity-first-class",quantity);

    var subTotalCost=quantity*150;//calculating the ticket cost
    var tax=(subTotalCost/100)*10;//calculating the tax on ticket
    var totalCost=subTotalCost+tax;// calculating the total cost for getting the ticket
    console.log(subTotalCost,tax,totalCost);
})

//increase the booking of  economy ticket
document.getElementById("economy-increase").addEventListener("click",function(){
    var quantityIncrease=getValue("quantity-economy");
    var quantity=quantityIncrease+1;
    setValue("quantity-economy",quantity);

    var subTotalCost=quantity*100;//calculating the ticket cost
    var tax=(subTotalCost/100)*10;//calculating the tax on ticket
    var totalCost=subTotalCost+tax;// calculating the total cost for getting the ticket
    console.log(subTotalCost,tax,totalCost);
})

//decrease the booking of economy ticket
document.getElementById("economy-decrease").addEventListener("click",function(){
    var quantityDecrease=getValue("quantity-economy");
    var quantity=quantityDecrease-1;
    setValue("quantity-economy",quantity);

    var subTotalCost=quantity*100;//calculating the ticket cost
    var tax=(subTotalCost/100)*10;//calculating the tax on ticket
    var totalCost=subTotalCost+tax;// calculating the total cost for getting the ticket
    console.log(subTotalCost,tax,totalCost);
})