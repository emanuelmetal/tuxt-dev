const fs = require('fs');
const findIndex = require('lodash/findIndex');
const { getArgs } = require('./utils')

const { fileName, giftCardBalance } = getArgs();

if (!fileName || !giftCardBalance){
  throw new Error("Invalid arguments, expected: filename=some/path giftCardBalance=153.67");
}

let balanceInCents = parseFloat(giftCardBalance) * 100

if (balanceInCents < 0 || isNaN(balanceInCents)){
  throw new Error("Balance must be positive (15.25 for instance).");
}

let inputData;

try {
  inputData = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
} catch (e) {
  console.error("ERROR: Could not open input file: ", e);
  return
}

function spendAllBalance( articles, arrLimit, balance) {
  let diff = Number.MAX_VALUE;

  let res_l, res_r;

  let l = 0, r = arrLimit;
  while (l<arrLimit && r>=0) {

    if (Math.abs(articles[l].price + articles[r].price - balance) < diff) {
      res_l = l;
      res_r = r;
      diff = Math.abs(articles[l].price + articles[r].price - balance);
    }

    if (articles[l].price + articles[r].price > balance) {
      r -= 1;
    } else {
      l += 1
    }
  }

//  Print the result
  if (!res_l || !res_r){
    console.log('Not possible');
    return
  }
  console.log(`The gift card Balance is $${balance / 100}. The gifts that will spend almost or all balance are: ${articles[res_l].id} $${articles[res_l].price / 100} and ${articles[res_r].id} $${articles[res_r].price / 100}  the remaining balance is: $${diff / 100}`);
}



const lastChance = findIndex(inputData, (p) => p.price > balanceInCents);
const limit = lastChance === -1 ? inputData.length - 1 : lastChance;

spendAllBalance(inputData, limit, balanceInCents)
