window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".enter");
  const inputField = document.getElementById("enter");

  if (submitBtn && inputField) {
    submitBtn.addEventListener("click", () => {
      const time = inputField.value.trim();
      if (time !== "" && !isNaN(time) && Number(time) >= 0) {
        let timesArray =
          JSON.parse(localStorage.getItem("practiceTimes")) || [];
        timesArray.push(Number(time));
        localStorage.setItem("practiceTimes", JSON.stringify(timesArray));
        inputField.value = "";
      }
    });

    inputField.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
    });
  }

  const todayBox = document.querySelector(".vandaag .time");
  const monthBox = document.querySelector(".month .time");

  if (todayBox && monthBox) {
    const timesArray = JSON.parse(localStorage.getItem("practiceTimes")) || [];

    const todayTime =
      timesArray.length > 0 && !isNaN(timesArray[timesArray.length - 1])
        ? timesArray[timesArray.length - 1]
        : 0;
    todayBox.textContent = `${todayTime} min`;

    const monthTotal = timesArray
      .filter((t) => !isNaN(t) && t >= 0)
      .reduce((total, current) => total + Number(current), 0);

    monthBox.textContent = `${monthTotal} min`;
  }
});
