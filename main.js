document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(event) {
  const issueDesc = document.getElementById("issueDescInput").value;
  const issueSeverity = document.getElementById("issueSeverityInput").value;
  const assignedTo = document.getElementById("issueAssignedInput").value;
  const issueId = chance.guid();
  const issueStatus = "Open";

  const issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: assignedTo,
    status: issueStatus,
  };
  if (localStorage.getItem("issues") === null) {
    const issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    const issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  event.preventDefault();
}

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  for (let i = 0; i < issues.length; i++) {
    const id = issues[i].id;
    const desc = issues[i].description;
    const severity = issues[i].severity;
    const assignedTo = issues[i].assignedTo;
    const status = issues[i].status;

    issuesList.innerHTML +=
      '<div class="card p-3 mb-3">' +
      "<h6>Issue ID: " + id +
      "</h6>" +
      '<p><span class="badge bg-info">' +
      status +
      "</span>" +
      "</p>" +
      "<h3>" +
      desc +
      "</h3>" +
      '<p><i class="bi bi-clock-fill m-1"></i>' +
      severity +
      "</p>" +
      '<p><i class="bi bi-person-fill m-1"></i>' +
      assignedTo +
      "</p>" +
      '<a href="#" onclick="setStatusClosed(\'' +
      id +
      '\')" class="btn btn-warning w-25 mb-1">Close</a>' +
      '<a href="#" onclick="deleteIssue(\'' +
      id +
      '\')" class="btn btn-danger w-25" >Delete</a>' +
      "</div>";
  }
}

function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues[i].status = "Closed";
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}
function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}
