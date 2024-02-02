import datas from "../graphql/graphql.js";
import formatBytes from "../utils/formatBytes.js";

function talentInformations() {
  console.log(datas);
  const {
    firstName,
    lastName,
    email,
    login: username,
    createdAt,
    campus,
  } = datas[0];
  let userInformationsContent = document.querySelector(
    ".user-info .user-informations-content"
  );
  document.querySelector(".talent-full-name").innerHTML =
    firstName + " " + lastName;
  userInformationsContent.innerHTML = `
    <ul class="space-y-3">
    <li class="hover:text-emerald-500"> 👨🏿 Full Name : ${firstName} ${lastName}</li>
    <li class="hover:text-emerald-500"> 🔑 Login Git : <a target="_blank" class="hover:underline" href="https://learn.zone01dakar.sn/git/${username}">${username}</a></li>
    <li class="hover:text-emerald-500">✉️ Full Name : ${email}</li>
    <li class="hover:text-emerald-500">⏲️ Join Zone01 since : ${new Date(
      createdAt
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}</li>
    <li class="hover:text-emerald-500">🌍 Location : ${campus}</li>

    <ul>
    `;
}

function chart() {
  // Destructure transactions from datas[0]
  const { xps: transactions } = datas[0];

  // Sort transactions by amount in ascending order
  transactions.sort((a, b) => a.amount - b.amount);

  // Set the dimensions of the chart
  const chartWidth = 600;
  const chartHeight = 230;

  // Extract labels and data points from transactions
  const labels = transactions.map(
    (transaction) =>
      transaction.path.split("/")[transaction.path.split("/").length - 1]
  );
  const dataPoints = transactions.map((transaction) => transaction.amount);

  // Calculate the maximum data value and the scale for the chart
  const maxData = Math.max(...dataPoints);
  const dataScale = chartHeight / maxData;

  // Get the SVG element by ID
  const svg = document.getElementById("barChart");

  // Create a tooltip element
  const tooltip = document.createElement("div");

  tooltip.className = "bg-blue-400/45 text-blue-600 w-[220px]";
  tooltip.style.position = "absolute";
  tooltip.style.display = "none";

  tooltip.style.padding = "8px";
  tooltip.style.borderRadius = "4px";
  tooltip.style.pointerEvents = "none";

  document.querySelector(".chart").appendChild(tooltip);

  // Draw bars
  dataPoints.forEach((value, index) => {
    const x = (index + 1) * (chartWidth / (dataPoints.length + 1));
    const y = chartHeight - value * dataScale;
    const barHeight = value * dataScale;

    // Draw rectangle for the bar
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.classList.add("cursor-pointer");
    rect.setAttribute("x", x - 15); // Adjust for bar width and spacing
    rect.setAttribute("y", y);
    rect.setAttribute("width", 15); // Bar width
    rect.setAttribute("height", barHeight);
    rect.setAttribute("fill", "#60a5fa");

    // Add event listeners for hover
    rect.addEventListener("mouseover", () => {
      // Update tooltip content
      tooltip.innerHTML = `
      <ul class="text-sm">
      <li><span class="underline">Project name:</span> ${labels[index]}</li>
          <li><span class="underline">XP earned:</span> ${formatBytes(
            value
          )} </li>
      <ul>`;
      // Position and display the tooltip
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y - 30}px`; // Adjust position as needed
      tooltip.style.display = "block";
    });

    rect.addEventListener("mouseout", () => {
      // Hide the tooltip on mouseout
      tooltip.style.display = "none";
    });

    svg.appendChild(rect);
  });
  // Draw Y-axis labels
  const yAxisLabels = [0, maxData / 2, maxData];
}

function skills() {
  const { transactions: skills } = datas[0];
  console.log(skills[0].type);
  const skillsEmoji = {
    algo: "🧠",
    "back-end": "📂",
    css: "🖌️",
    docker: "⛵",
    "front-end": "🎨",
    game: "🎮",
    go: "🦫",
    html: "✨",
    js: "🟨",
    prog: "⚙️",
    sql: "💬",
    stats: "📶",
    "sys-admin": "🔌",
    tcp: "🔭",
    unix: "🔋",
  };
  let markup = skills
    .map(
      (
        element
      ) => `<li class="py-2 opacity-75 hover:opacity-100 cursor-pointer flex items-center justify-between">
    <p>
        ${
          skillsEmoji[element?.type?.split("_")[1]]
            ? skillsEmoji[element?.type?.split("_")[1]]
            : "😀"
        } ${element?.type?.split("_")[1]}
      </p>
     <p class="font-bold">${element.amount} %</p>
    </li>`
    )
    .join("");
  document.querySelector(".skills .content").innerHTML = `
  <ul class="divide-y divide-indigo-200">
  ${markup}
  </ul>
  `;
}
function XPandRatio() {
  const { auditRatio, transactions_aggregate } = datas[0];

  document.querySelector(".xp-and-ratio .content").innerHTML = `
    <ul>
    <li class="p-4" >
    <span>You have </span>
    <div class="flex items-end gap-2">
    <h1 class="text-7xl">${auditRatio.toFixed(1)}</h1>
    <span class="mb-3">of ratio</span>
    </div>
    </li>
    <li class="bg-cyan-600 py-2 px-4 text-white">
    <span>And </span>
    <div class="flex items-end gap-2">
    <h1 class="text-7xl">${formatBytes(
      transactions_aggregate?.aggregate?.sum?.amount,
      1
    )}</h1>

    </div>
    </li>
    </ul>
    `;
}
function projects() {
  const { xps } = datas[0];

  let a = xps
    .map(
      (x) =>
        `<li class="py-2 opacity-80 hover:opacity-100 cursor-pointer">📂 ${
          x.path.split("/")[x.path.split("/").length - 1]
        }</li>`
    )
    .join("");
  document.querySelector(".projects .content").innerHTML = `
  <h1 class="px-2 py-1 text-xl bg-yellow-200/45 rounded-md w-fit">
 ✔️ You successfully finished ${xps.length} projects
  </h1>
  <ul class="divide-y grid mt-2 grid-cols-4 hidd divide-yellow-200/50">
 ${a}
  </ul>
  `;
}
function audits() {
  const { totalUp, totalDown, audits } = datas[0];
  // console.log(audits.filter);
  let validAudits = audits.filter((audit) => audit.grade);
  let approvedAudits = validAudits.filter((audit) => audit.grade >= 1).length;
  let failedAudits = validAudits.filter((audit) => audit.grade < 1).length;
  console.log(validAudits);

  document.querySelector(".audits").innerHTML = `<div class="p-4" >
  <span>You have audited </span>
  <div class="flex items-end gap-2">
  <h1 class="text-7xl">${validAudits.length}</h1>
  <span class="mb-3">times</span>
  </div>
  <div class="flex gap-2 my-2 flex-col">
    <small> ✅You have approved <span class="font-bold">${approvedAudits}</span> project(s)</small>
    <small> ❌You have failed <span class="font-bold">${failedAudits}</span>  project(s)</small>
  </div>

  </div>`;

  const auditDone = Math.round(totalUp / 1000);
  const auditReceived = Math.round(totalDown / 1000);
  const totalAudit = auditDone + auditReceived;
  const radius = 70;
  const center = { x: 70, y: 80 };

  // Calculate angles
  const angleAuditDone = (auditDone / totalAudit) * 360;
  const angleAuditReceived = (auditReceived / totalAudit) * 360;

  // Create SVG container for pie chart
  const pieChartSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  pieChartSVG.setAttribute("id", "pieChart");
  pieChartSVG.setAttribute("width", "100%");
  pieChartSVG.setAttribute("height", "100%");
  // Function to create arc path
  const createArcPath = (startAngle, endAngle) => {
    const startX =
      center.x + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
    const startY =
      center.y + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
    const endX =
      center.x + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
    const endY =
      center.y + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${center.x} ${center.y} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  const pathAuditDone = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathAuditDone.setAttribute("d", createArcPath(0, angleAuditDone));
  pathAuditDone.setAttribute("fill", "#ec4899");
  pathAuditDone.setAttribute(
    "transform",
    "rotate(-90 " + center.x + " " + center.y + ")"
  );
  pieChartSVG.appendChild(pathAuditDone);

  // Create auditReceived arc
  const pathAuditReceived = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathAuditReceived.setAttribute(
    "d",
    createArcPath(angleAuditDone, angleAuditDone + angleAuditReceived)
  );
  pathAuditReceived.setAttribute("fill", "#f472b6");
  pathAuditReceived.setAttribute(
    "transform",
    "rotate(-90 " + center.x + " " + center.y + ")"
  );
  pieChartSVG.appendChild(pathAuditReceived);

  // Create labels for auditDone and auditReceived
  const labelAuditDone = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  labelAuditDone.textContent = formatBytes(totalUp / 1000);
  labelAuditDone.setAttribute("x", center.x - 30);
  labelAuditDone.setAttribute("y", center.y - 20);
  labelAuditDone.setAttribute("fill", "white");
  pieChartSVG.appendChild(labelAuditDone);

  const labelAuditReceived = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  labelAuditReceived.textContent = formatBytes(totalDown / 1000);
  labelAuditReceived.setAttribute("x", center.x - 30);
  labelAuditReceived.setAttribute("y", center.y + 50);
  labelAuditReceived.setAttribute("fill", "white");
  pieChartSVG.appendChild(labelAuditReceived);

  // Append SVG to the body of the document
  document.getElementById("ratioGraph").innerHTML = `
  <ul class="space-y-2">
    <li class="text-sm flex items-center  gap-2">
    <div class="bg-[#f472b6] rounded-sm w-4 h-4"></div>
    Audit Received
    </li>
    <li class="text-sm flex items-center  gap-2">
    <div class="bg-[#ec4899] rounded-sm w-4 h-4"></div>
    Audit Done
    </li>
  </ul>`;
  document.getElementById("ratioGraph").appendChild(pieChartSVG);
}
projects();
XPandRatio();
skills();
talentInformations();
chart();
audits();
