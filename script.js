document.querySelector(".enter").addEventListener("click", (e) => {
  const time = document.getElementById("enter").value;
  if (time !== "" && !isNaN(time) && Number(time) >= 0) {
    localStorage.setItem("practiceTime", time);
    alert("Practice time saved: " + time + " minutes");
  } else {
    alert("Please enter a valid time.");
  }
});

document.getElementById("enter").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});
