// ok uhh time to lay out the scheme
//DONE: make certain fields required; amt, payer, min 1 bene.
//DONE: make outdiv hidden and change this on click "done"
//DONE: fix required thing for boxes
//DONE: if the outdiv is already displayed, then running newpay calls finalprtout
//DONE: favicon.
//DONE: empty payment handling.
//----
//TODO: make look nice - though more of a subjective thing.
//TODO: host on github?
//TODO: sum to zero handling?



//store userids umm idk why but channels array is important - stores transaction data
const userArray = [1,2,3,4] 
var channelsArray = [0,0,0,0,0,0]

//le funny display text
const outTextArrInverted = ["1 owes 2", "1 owes 3", "1 owes 4", "2 owes 3", "2 owes 4", "3 owes 4"]
const outTextArr = ["2 owes 1", "3 owes 1", "4 owes 1", "3 owes 2", "4 owes 2", "4 owes 3"]

//create some sort of directory for all possible payment channels? 
//e.g. 1-2, 1-3, 1-4, 2-3, 2-4, 3-4
    //becoming 0,1,2,3,4,5 in an array, perhaps? switch statement to choose the correct channel

//channels would add when money goes from LO to HI e.g. 1 owes 2.
//directories would go negative for the opposite direction, cancelling out payments
//final out would of course adjust this such that it reads 2 owes 1 $5, not 1 owes 2 $-5 thatd be silly

//thx to google AI for this single line

//on load
document.addEventListener('DOMContentLoaded', function() {
    
    for (let i = 1; i < 5; i++) {
        document.getElementById("user" + i).addEventListener("change", function() {
            // Handle checkbox selection here
            // Example: check if at least one is checked
            let anyChecked = false;
            for (let j = 1; j < 5; j++) {
                if (document.getElementById("user" + j).checked) {
                    anyChecked = true;
                    unRequire();
                    break;
                }
            }
            // You can now use anyChecked to enable/disable submit, etc.
            // Example: console.log(anyChecked);
        });
    }
    
    //on form submit
    document.getElementById("formID").addEventListener("submit", function (e) {
        e.preventDefault();
        getData(e.target);
    });

});



function unRequire(){
    for(i = 1; i < 5; i ++){
        document.getElementById("user"+i).removeAttribute("required");
    }
    //alert("unrequired!");
}




//take data from form and run the newPay on it
function getData(form){
    var fd = new FormData(form);
    var bArray = []
    var fPayer = 0;
    var fAmt = 0;
    
    // formdata --> vars
    for (var pair of fd.entries()){
        
        if (pair[0] == 'usergroup'){
            bArray.push(pair[1]);
        }
        else if (pair[0] == 'payer'){
            fPayer = pair[1];
        }
        else if (pair[0] == 'amt'){
            fAmt = pair[1];
        }
    }

    console.log("payer: " + fPayer.toString());
    console.log("b arr: " + bArray);
    console.log("f amt: " + fAmt);
    newPay(fAmt, bArray, fPayer);
}

//i know, I know, I KNOW THAT THIS IS TERRIBLE WORDING
//PAYER in this context paid FIRST
//BENEFICIARIES are those that got something for free and are now paying back...
 

//called by getData with form input
function newPay(amt, beneficiary, payer){

    let amtEach = 0;
    amtEach = parseFloat((amt/beneficiary.length).toFixed(2));
    //console.log(typeof amtEach);

    for (let i = 0; i < beneficiary.length; i++) {
        
        
        //logging system in channels
        //i know, I know, I KNOW THAT THIS IS TERRIBLE STRUCTURE... but it works.
        //todo: switch case?? not worst code ever but still, uhh, really bad.
        //is there a way I can separately ID each user using fun mathematics tricks
        //what if I made them each like a different prime and chose the channel based on the unique product
            //e.g. map userID 1 and 2 to primes 2,3. product 6 --> 1/2 transaction --> channelArray[0] 
            //still needs like a six part switch case but its just one layer no nesting
            //from there just do a comparator check, which one's bigger
            //from there decide positive or negative yeah
            //fun fact! by design this thing doesn't support uhh splitting bills so hopefully that's handled eventually
            //while uhh its theoretically cleaner it still needs a bunch of checking and doesn't scale as nice - improves by 2x but still not good enough
            //look into how to OOP this thing

        if (beneficiary[i] !== payer) {

            if (payer == 1){
                if (beneficiary[i] == 2){
                    //0 - positive
                    channelsArray[0] = channelsArray[0] + amtEach;

                }
                else if (beneficiary[i] == 3){
                    //1 - positive
                    channelsArray[1] = channelsArray[1] + amtEach;
                    
                }
                else if (beneficiary[i] == 4){
                    //2 - positive
                    channelsArray[2] = channelsArray[2] + amtEach;

                }
            }
            else if (payer == 2){
                if (beneficiary[i] == 1){
                    //0 - negative
                    channelsArray[0] = channelsArray[0] - amtEach;

                }
                else if (beneficiary[i] == 3){
                    //3 - positive
                    channelsArray[3] = channelsArray[3] + amtEach;
                }
                else if (beneficiary[i] == 4){
                    //4 - positive
                    channelsArray[4] = channelsArray[4] + amtEach;
                }
            } 
            else if (payer == 3){
                if (beneficiary[i] == 2){
                    //3 - negative
                    channelsArray[3] = channelsArray[3] - amtEach;
                }
                else if (beneficiary[i] == 1){
                    //1 - negative
                    channelsArray[1] = channelsArray[1] - amtEach;
                }
                else if (beneficiary[i] == 4){
                    //5 - positive
                    channelsArray[5] = channelsArray[5] + amtEach;
                }
            } 
            else if (payer == 4){
                if (beneficiary[i] == 2){
                    //4 - negative
                    channelsArray[4] = channelsArray[4] - amtEach;

                }
                else if (beneficiary[i] == 3){
                    //5 - negative
                    channelsArray[5] = channelsArray[5] - amtEach;

                }
                else if (beneficiary[i] == 1){
                    //2 - negative
                    channelsArray[2] = channelsArray[2] - amtEach;

                }
            }

        



        //debug basic output for the single payment
        
        console.log(`Pay ${amtEach} from guy ${beneficiary[i]} to guy ${payer}`);
            
        }



    }
    //end of if loop is just above.

    if(document.getElementById("outdiv").style.visibility == "visible"){
        //update prtout on the fly!
        finalPrtOut();
    }    
    alert("Payment recorded. Continue recording payments, or click DONE for the final calculation.");
}


//called by done button
function finalPrtOut(){
    console.log("__________")
    console.log("FINAL OUT:")

//final prtout
    var finalOut = "" 
    var EmptyMsg = "No payments needed!"   

for (let i = 0; i < channelsArray.length; i++){
        if (channelsArray[i] == 0){
            //do nothing
        }
        else if (channelsArray[i] >= 0){
            var a = (outTextArr[i] + ": " + channelsArray[i].toFixed(2) + " bucks. <br>");
            finalOut = finalOut + a;
        }
        else {
            var b = (outTextArrInverted[i] + ": " + (-channelsArray[i]).toFixed(2) + " bucks. <br>");
            finalOut = finalOut + b;
        }
    }
    document.getElementById("outdiv").style.visibility = "visible";
    
    if (finalOut != ""){
        document.getElementById("outbox").innerHTML = finalOut;

    }else{
        document.getElementById("outbox").innerHTML = EmptyMsg;   
    }
    //
    console.log(finalOut)
}
    

//newPay(30.25, [1,2,3], 1)
//newPay(9.99, [2,3], 1)
//newPay(23,[1],3)
//newPay(99.20,[4,2],1)

//so new pay can effectively handle each transaction and only record the final out. Now for webapp time...

//finalPrtOut()

