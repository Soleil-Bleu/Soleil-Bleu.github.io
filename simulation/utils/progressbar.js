function updateProgressBar(percentage) {
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = percentage + "%";
}

function hideProgressBar() {
    const progressBar = document.getElementById("progressBar");
    progressBar.style.display = "none";
}

function showProgressBar() {
    const progressBar = document.getElementById("progressBar");
    progressBar.style.display = "block";
}