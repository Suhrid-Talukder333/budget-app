const budgetBox = document.getElementById("budget_box");//budget box
const expenseBox = document.getElementById("expense_box");
const budget_text = document.getElementById("budget_text");
const expense_text = document.getElementById("expense_text");
var budget = document.getElementById("budget");//budget input value
const budget_btn = document.getElementById("budget_btn");//budget input button
const budget_display_value = document.getElementById("budget_value");
const balance = document.getElementById("balance_value");
const expense = document.getElementById("expense_input");
const expense_display_value = document.getElementById("expense_value")
const expense_name = document.getElementById("expense_name");
var id = 0;



//animation
function anim(obj) {
    obj.animate([
        {transform: 'scale(1)', offset: 0, opacity: 0 },
        {transform: 'scale(1.5) rotate(270deg)',  offset: .2, opacity: .5},
        {transform: 'scale(1) rotate(0deg)', offset: 1, opacity: 1},
    ],{
        duration: 2000,
        easing: 'ease-in-out',
        iterations: 1,
        direction: 'alternate',
        fill: 'forwards'
    });
}





function balanceCheck() {
    console.log(balance.innerHTML);
    console.log(budget.value);
    console.log(expense_display_value.innerHTML);
    let a = expense_display_value.innerHTML;
    // if(expense.value == NaN || expense.value == "") {
    //     a = parseInt(expense_display_value.innerHTML,10);
    // }else if(expense_display_value.innerHTML > 0){
    //     a = parseInt(expense.value,10) + parseInt(expense_display_value.innerHTML,10);
    // }
    // else {
    //     a = parseInt(expense.value,10);
    // }
    let b = parseInt(budget.value,10) || parseInt(budget_display_value.innerHTML,10);
    console.log("this " + expense.value); 
    anim(document.getElementById('balance_img'));
    balance.innerHTML = b - a;
    if(balance.innerHTML == 'NaN') {
        balance.innerHTML = 0;
    }
    if(expense_display_value.innerHTML == 'NaN') {
        expense_display_value.innerHTML = 0;
    }
    if(budget_display_value.innerHTML == 'NaN') {
        budget_display_value.innerHTML = 0;
    }
    if(balance.innerHTML < 0) {
        var obj = document.getElementById('display_Balance');
        obj.animate([
            {background:'red', offset:0},
            {background: 'white',offset:.2},
            {background:'red',offset:.6},
            {background: 'white',offset:1},
        ],{
            duration: 1000,
            easing: 'ease-in-out',
            iterations: 1,
            fill: 'forwards'
        });
    }
} 

function budget_submit() {
    if(budget.value < 0 || budget.value === "") {
        var child = document.createElement('p');
        var parent = budget_text;
        child.style.cssText = "width:100%; height:3rem; background-color:red; text-align:center; font-size:1.5rem; font-weight:bolder; font-color:yellow";
        child.innerHTML = 'You havent put anything';
        budgetBox.insertBefore(child,parent);
        setTimeout(()=> child.remove(),1000); 
    }
    else{
        anim(document.getElementById('budget_img'));
        budget_display_value.innerHTML = parseInt(budget.value);
        console.log(parseInt(budget.value));
        balanceCheck();
        budget.value = "";
        if(balance.innerHTML =='NaN') {
            balance.innerHTML = 0;
        }
        if(expense_display_value.innerHTML =='NaN') {
            expense_display_value.innerHTML = 0;
        }
        if(budget_display_value.innerHTML =='NaN') {
            budget_display_value.innerHTML = 0;
        }
    }
}

function expense_submit() {
    if(expense.value < 0 || expense.value === "" || expense_name.value === "") {
        var child = document.createElement('p');
        var parent = expense_text;
        child.style.cssText = "width:100%; height:3rem; background-color:red; text-align:center; font-size:1.5rem; font-weight:bolder; font-color:yellow";
        child.innerHTML = 'You havent put everything';
        expenseBox.insertBefore(child,parent);
        setTimeout(()=> child.remove(),1000); 
    }
    else{
        var obj = {
            name: expense_name.value,
            value: expense.value
        };
        // var title = document.createElement('p');
        // title.setAttribute('id',`${id}`);
        // title.setAttribute('class','queries')
        // title.innerHTML = obj.name;
        // var val = document.createElement('p');
        // val.setAttribute('id',`${id}`);
        // val.setAttribute('class','queries')
        // val.innerHTML = obj.value; 
        // document.getElementById("expense_title").appendChild(title);
        // document.getElementById("expense_amount").appendChild(val);
        // opt.setAttribute('class','opt');
        // opt.setAttribute('id',`${id}`);
        // opt.innerHTML = "<img src='images/edit.png' style='width:30%;height:30%'><img src='images/delete.png' style='width:30%;height:30%'>"
        // document.getElementById('icon').appendChild(opt);
        var opt = document.createElement('div');
        opt.setAttribute('id',`${id}`);
        opt.setAttribute('class','queries');
        opt.innerHTML = `<h4 class='title'>${obj.name}</h4><h4 class='value'>${obj.value}</h4><div id='icon'><img id='edit' src='images/edit.png' style='width:20px;height:20px' onclick='edit(this.parentNode.parentNode.id);'><img id='dlet' src='images/delete.png' style='width:20px;height:20px' onclick='delt(this.parentNode.parentNode.id);'></div>`;
        document.getElementById('stat').appendChild(opt);
        expense_display_value.innerHTML = (parseInt(expense.value,10) + parseInt(expense_display_value.innerHTML));
        id++;
        anim(document.getElementById('expense_img'));
        if(balance.innerHTML =='NaN') {
            balance.innerHTML = 0;
        }
        if(expense_display_value.innerHTML == 'NaN') {
            expense_display_value.innerHTML = 0;
        }
        if(budget_display_value.innerHTML == 'NaN') {
            budget_display_value.innerHTML = 0;
        }
        balanceCheck();
        expense_name.value = "";
        expense.value = "";
    }
}

function delt(obj) {
    let delete_this = document.getElementById(obj).querySelector('.value').innerHTML;
    console.log(delete_this);
    expense_display_value.innerHTML -= delete_this;
    balance.innerHTML =parseInt(balance.innerHTML,10) + parseInt(delete_this,10);
    anim(document.getElementById('expense_img'));
    anim(document.getElementById('balance_img'));
    document.getElementById(obj).remove();
    if(balance.innerHTML =='NaN') {
        balance.innerHTML = 0;
    }
    if(expense_display_value.innerHTML == 'NaN') {
        expense_display_value.innerHTML = 0;
    }
    if(budget_display_value.innerHTML =='NaN') {
        budget_display_value.innerHTML = 0;
    }
}

function edit(obj) {
    let edit_value = document.getElementById(obj).querySelector('.value').innerHTML;
    let edit_name = document.getElementById(obj).querySelector('.title').innerHTML;
    expense_display_value.innerHTML -= edit_value;
    balance.innerHTML =parseInt(balance.innerHTML,10) + parseInt(edit_value,10);
    anim(document.getElementById('expense_img'));
    anim(document.getElementById('balance_img'));
    document.getElementById(obj).remove();
    expense.value = edit_value;
    expense_name.value = edit_name;
    if(balance.innerHTML =='NaN') {
        balance.innerHTML = 0;
    }
    if(expense_display_value.innerHTML == 'NaN') {
        expense_display_value.innerHTML = 0;
    }
    if(budget_display_value.innerHTML == 'NaN') {
        budget_display_value.innerHTML = 0;
    }
}

