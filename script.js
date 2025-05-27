document.getElementById("moreInfoBtn").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("modal").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});
