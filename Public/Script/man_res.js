const popBg = document.getElementById("pop_bg");
const addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => {
    popBg.style.display = "flex";
});

popBg.addEventListener("click", (e) => {
    if (e.target === popBg) {
        popBg.style.display = "none";
    }
});
