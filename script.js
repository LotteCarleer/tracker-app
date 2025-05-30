window.addEventListener("DOMContentLoaded", () => {
  const isLogPage = document.querySelector(".enter") !== null;
  const isIndexPage = document.getElementById("practice-log") !== null;

  if (isLogPage) {
    const submitBtn = document.querySelector(".enter");
    const inputField = document.getElementById("enter");

    if (submitBtn && inputField) {
      submitBtn.addEventListener("click", () => {
        const time = inputField.value.trim();
        if (time !== "" && !isNaN(time) && Number(time) >= 0) {
          const today = new Date().toISOString().split("T")[0];
          const timesObject =
            JSON.parse(localStorage.getItem("practiceTimes")) || {};

          timesObject[today] = Number(time);

          localStorage.setItem("practiceTimes", JSON.stringify(timesObject));
          inputField.value = "";
        }
      });

      inputField.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
      });
    }

    const todayElement = document.querySelector(".today");
    if (todayElement) {
      const today = new Date();
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = today.toLocaleDateString("en-GB", options);
      todayElement.textContent = `Today: ${formattedDate}`;
    }
  }

  if (isIndexPage) {
    const todayBox = document.querySelector(".vandaag .time");
    const monthBox = document.querySelector(".month .time");
    const logContainer = document.getElementById("practice-log");
    const timesObject = JSON.parse(localStorage.getItem("practiceTimes")) || {};

    const today = new Date().toISOString().split("T")[0];
    const todayTime = timesObject[today] || 0;
    if (todayBox) todayBox.textContent = `${todayTime} min`;

    const monthTotal = Object.values(timesObject)
      .filter((t) => !isNaN(t) && t >= 0)
      .reduce((sum, t) => sum + t, 0);
    if (monthBox) monthBox.textContent = `${monthTotal} min`;

    Object.entries(timesObject)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .forEach(([date, minutes]) => {
        const section = document.createElement("section");
        section.classList.add("entry");
        section.innerHTML = `
          <div class="date">${formatDate(date)}</div>
          <div>${minutes} min</div>
        `;
        logContainer.appendChild(section);
      });

    const style = document.createElement("style");
    style.textContent = `
      .entry {
        display: flex;
        padding: 17px;
        background: #ff8d6000;
        color: #ff8d60;
        margin-bottom: 5px;
        border: solid #ff8d60 2px;
        border-radius: 10px;
      }
      .entry .date {
        padding-right: 45%;
        font-weight: bolder;
      }
    `;
    document.head.appendChild(style);
  }
});

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
