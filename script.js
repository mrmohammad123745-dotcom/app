const peopleContainer =
document.getElementById("peopleContainer");

function addPerson(){

const row =
document.createElement("div");

row.className = "person-row";

row.innerHTML = `

<input
type="text"
class="name"
placeholder="نام">

<input
type="number"
class="amount"
placeholder="مبلغ پرداختی (تومان)">

`;

peopleContainer.appendChild(row);

}

addPerson();
addPerson();

function calculate(){

const names =
document.querySelectorAll(".name");

const amounts =
document.querySelectorAll(".amount");

let people = [];

let total = 0;

for(let i=0;i<names.length;i++){

const name =
names[i].value.trim();

const amount =
Number(amounts[i].value);

if(name){

people.push({
name,
paid:amount || 0
});

total += amount || 0;

}

}

if(people.length < 2){

alert("حداقل دو نفر وارد کنید");

return;
}

const share =
total / people.length;

let creditors = [];
let debtors = [];

people.forEach(person=>{

const balance =
person.paid - share;

if(balance > 0){

creditors.push({
name:person.name,
amount:balance
});

}else if(balance < 0){

debtors.push({
name:person.name,
amount:Math.abs(balance)
});

}

});

let transactions = [];

let i = 0;
let j = 0;

while(
i < debtors.length &&
j < creditors.length
){

let pay =
Math.min(
debtors[i].amount,
creditors[j].amount
);

transactions.push({

from: debtors[i].name,

to: creditors[j].name,

amount: pay

});

debtors[i].amount -= pay;
creditors[j].amount -= pay;

if(debtors[i].amount < 1){
i++;
}

if(creditors[j].amount < 1){
j++;
}

}

showResults(
transactions,
share,
total
);

}

function showResults(
transactions,
share,
total
){

const results =
document.getElementById("results");

if(transactions.length === 0){

results.innerHTML = `
<div class="result-item">
همه حساب‌ها تسویه هستند ✅
</div>
`;

return;
}

let html = `

<div class="result-item">
مجموع هزینه:
<b>${Math.round(total).toLocaleString('en-US')}</b>
تومان
</div>

<div class="result-item">
سهم هر نفر:
<b>${Math.round(share).toLocaleString('en-US')}</b>
تومان
</div>

`;

transactions.forEach(t=>{

html += `

<div class="result-item">

${t.from}

باید

<b>

${Math.round(t.amount)
.toLocaleString('en-US')}

</b>

تومان

به

${t.to}

پرداخت کند.

</div>

`;

});

results.innerHTML = html;

}