const date = document.querySelector("input[type=date]");
const find = document.querySelector("#find");
const reset = document.querySelector("#reset");
const accept = document.querySelector("#hide");
const output = document.querySelector(".message");


reset.addEventListener("click", () => {
  date.value = null;
  document.querySelector(".message").innerText = "";
});

accept.addEventListener("click", (e) => {
  e.target.parentElement.style.display = "none";
});

find.addEventListener("click", clickHandler);

const reverseStr = (str) => {
  let listOfChars = str.split("");
  let reversedList = listOfChars.reverse();
  return reversedList.join("");
};

// To check if string 'str' is palindrome
const isPalindrome = (str) => {
  const reversedStr = reverseStr(str);
  return str === reversedStr;
};

// To convert date to string format with corrections for < 10 digits
const toStr = (date) => {
  let dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
};

// To get date in all formats
const getFormatsOfDate = (date) => {
  const ddmmyyyy = date.day + date.month + date.year;
  const mmddyyyy = date.month + date.day + date.year;
  const yyyymmdd = date.year + date.month + date.day;
  const ddmmyy = date.day + date.month + date.year.slice(-2);
  const mmddyy = date.month + date.day + date.year.slice(-2);
  const yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

// To check if any of the formats of date are palindrome
const checkPalindromeForAllFormats = (date) => {
  const dateFormats = getFormatsOfDate(date);
  const palindromeList = [];

  dateFormats.forEach((date) => {
    palindromeList.push(isPalindrome(date));
  });

  return palindromeList;
};

const isLeapYear = (year) => {
  if (year % 400 == 0)
    return true;
  
  if (year % 100 == 0)
    return false;
  
  if (year % 4 == 0)
    return true; 
}

// For next closest palindrome date
const getNextDate = (date) => {
  let day = date.day+1;
  let month = date.month;
  let year = date.year;

  daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  }
  else {
    if(day > daysPerMonth[month-1]){
      day = 1;
      month++;
    }
  }

  if (month > 12) {
      month = 1;
      year++;
  }

  return { day, month, year };
};

const getNextPalindromeDate = (date) => {
  let nextDate = getNextDate(date);
  let count = 0;

  while (1) {
    count++;
    let dateStr = toStr(nextDate);
    let dates = checkPalindromeForAllFormats(dateStr);
    
    for (let i = 0; i < dates.length; i++){
      if (dates[i]) {
        return [count, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);

  }
}

// For previous closest palindrome date
const getPrevDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      day = 31;
      month = 12;
      year--;
    }
    else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      }
      else {
        day = 28;
      }
    }
    else {
      day = daysPerMonth[month - 1];
    }
  }

  return { day, month, year };
};

const getPrevPalindromeDate = (date) => {
  let prevDate = getPrevDate(date);
  let count = 0;

  while (1) {
    count++;
    let dateStr = toStr(prevDate);
    let dates = checkPalindromeForAllFormats(dateStr);

    for (let i = 0; i < dates.length; i++) {
      if (dates[i]) {
        return [count, prevDate];
      }
    }
    prevDate = getPrevDate(prevDate);
  }
};

const showMessage = (response) => {

  if (response.length == 1) {
    output.innerText = response[0];
  } else {
    const [cnt, date] = response;

    output.innerText = `Oops! You missed by ${
      cnt > 1 ? `${cnt} days` : "1 day "
    }. The nearest palindrome date was ${date.day}-${date.month}-${date.year}. `;
  }
}

// Loader
const loader = () => {
  const loading = document.querySelector(".loader");

  output.style.display = "none";
  loading.style.display = "inline";
 
  setTimeout(() => {
    loading.style.display = "none";
    output.style.display = "inline";
  },1200);
}

function clickHandler(e) {
  const ddmmyy = date.value;

  if (ddmmyy !== '') {
    loader();
    let bdate = ddmmyy.split('-');
    let day = bdate[2];
    let month = bdate[1];
    let year = bdate[0];
    const date = {
      day: Number(day),
      month: Number(month),
      year: Number(year)
    };
    let isPalindrome = false;

    let dateStr = toStr(date);
    let dates = checkPalindromeForAllFormats(dateStr);

    for (let i = 0; i < dates.length; i++){
      if (dates[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      const [cnt1, prevDate] = getPrevPalindromeDate(date);
      const [cnt2, nextDate] = getNextPalindromeDate(date);

      if (cnt1 > cnt2) {
        showMessage([cnt2, nextDate]);
      } else {
        showMessage([cnt1, prevDate]);
      }
    } else {
      showMessage(["Yay!, Your birthday is a palindrome."]);
    } 
  } else {
    showMessage(["Select the date."]);
  }
};