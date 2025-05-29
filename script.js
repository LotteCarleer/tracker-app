window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".enter");
  const inputField = document.getElementById("enter");

  // Check of we op log.html zijn (daar bestaat .enter wel)
  if (submitBtn && inputField) {
    submitBtn.addEventListener("click", () => {
      const time = inputField.value;
      if (time !== "" && !isNaN(time) && Number(time) >= 0) {
        let timesArray =
          JSON.parse(localStorage.getItem("practiceTimes")) || [];
        timesArray.push(time);
        localStorage.setItem("practiceTimes", JSON.stringify(timesArray));
        inputField.value = ""; // Maak het invoerveld leeg na het indienen
      }
    });

    inputField.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
    });
  }

  // Code voor index.html
  const todayBox = document.querySelector(".vandaag .time");
  const monthBox = document.querySelector(".month .time");

  if (todayBox && monthBox) {
    const timesArray = JSON.parse(localStorage.getItem("practiceTimes")) || [];
    const todayTime = timesArray[timesArray.length - 1] || 0;
    todayBox.textContent = `${todayTime} min`;

    const monthTotal = timesArray.reduce(
      (total, current) => total + Number(current),
      0
    );
    monthBox.textContent = `${monthTotal} min`;
  }
});
