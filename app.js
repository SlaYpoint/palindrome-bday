const date = document.querySelector("input[type=date]");
const reset = document.querySelector("#reset");
const accept = document.querySelector("#hide");

// To reset/clear values
// reset.addEventListener("click", () => {
//   date.value = null;
//   document.querySelector(".message").innerText = "";
// });

// Hide pop-up
accept.addEventListener("click", (e) => {
  e.target.parentElement.style.display = "none";
});

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
  const dateStr = { day: "", month: "", year: "" };

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
  const mmddyyyy = date.month + date.date + date.year;
  const yyyymmdd = date.year + date.month + date.day;
  const ddmmyy = date.day + date.month + date.year.slice(-2);
  const mmddyy = date.month + date.day + date.year(-2);
  const yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

// To check if any of the formats of date are palindrome
const checkPalindromeForAllFormats = (date) => {
  const dateFormats = getFormatsOfDate(date);
  const palindromeList = [];

  dateFormats.forEach((date) => {
    palindromeList.push(isPalindrome(date));
    console.log(palindromeList);
  });

  // console.log(dateFormats[0]);
  return palindromeList;
};

const getNextDate = (date) => {};

console.log(
  checkPalindromeForAllFormats({ day: "01", month: "09", year: "2021" })
);
