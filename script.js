document.querySelector(".enter").addEventListener("click", (e) => {
  const time = document.getElementById("enter").value;
  if (time !== "" && !isNaN(time) && Number(time) >= 0) {
    let timesArray = JSON.parse(localStorage.getItem("practiceTimes")) || [];
    timesArray.push(time);
    localStorage.setItem("practiceTimes", JSON.stringify(timesArray));
    document.getElementById("enter").value = ""; // Maak het invoerveld leeg na het indienen
  }
});

document.getElementById("enter").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});
