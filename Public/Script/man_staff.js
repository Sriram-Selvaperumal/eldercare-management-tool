const popBg = document.getElementById("pop_bg");
const addBtn = document.getElementById("add");
const form = document.querySelector("#popup form");
const resContainer = document.getElementById("res_container");
const popupTitle = document.getElementById("popup_title");

const detailsBg = document.getElementById("details_bg");
const detailsContent = document.getElementById("details_content");
const closeDetailsBtn = document.getElementById("close_details");

let staff = JSON.parse(localStorage.getItem("staff")) || [];

function saveStaff() {
    localStorage.setItem("staff", JSON.stringify(staff));
}

function createStaffCard(member, index) {
    const card = document.createElement("div");
    card.classList.add("resident-card");
    card.innerHTML = `
        <h3>${member.name}</h3>
        <p>Age: ${member.age}</p>
        <div class="card-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    card.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "button") return;
        detailsContent.innerHTML = `
            <p><strong>Name:</strong> ${member.name}</p>
            <p><strong>Age:</strong> ${member.age}</p>
            <p><strong>Gender:</strong> ${member.gender || "N/A"}</p>
            <p><strong>Date of Birth:</strong> ${member.dob || "N/A"}</p>
            <p><strong>Contact:</strong> ${member.contact || "N/A"}</p>
            <p><strong>Medical Conditions:</strong> ${member.medical || "None"}</p>
            <p><strong>Additional Notes:</strong> ${member.notes || "None"}</p>
        `;
        detailsBg.style.display = "flex";
    });

    card.querySelector(".delete-btn").addEventListener("click", () => {
        staff.splice(index, 1);
        saveStaff();
        renderStaff();
    });

    card.querySelector(".edit-btn").addEventListener("click", () => {
        popupTitle.textContent = "Edit Staff";
        document.getElementById("name").value = member.name;
        document.getElementById("age").value = member.age;
        document.getElementById("gender").value = member.gender;
        document.getElementById("dob").value = member.dob;
        document.getElementById("contact").value = member.contact;
        document.getElementById("medical").value = member.medical;
        document.getElementById("notes").value = member.notes;
        popBg.style.display = "flex";

        form.onsubmit = function(e) {
            e.preventDefault();
            staff[index] = {
                name: document.getElementById("name").value.trim(),
                age: document.getElementById("age").value.trim(),
                gender: document.getElementById("gender").value,
                dob: document.getElementById("dob").value,
                contact: document.getElementById("contact").value.trim(),
                medical: document.getElementById("medical").value.trim(),
                notes: document.getElementById("notes").value.trim()
            };
            saveStaff();
            renderStaff();
            form.reset();
            popBg.style.display = "none";
            popupTitle.textContent = "Add Staff";
            form.onsubmit = defaultSubmitHandler;
        };
    });

    resContainer.appendChild(card);
}

function renderStaff() {
    resContainer.innerHTML = "";
    staff.forEach((member, index) => createStaffCard(member, index));
}

const defaultSubmitHandler = (e) => {
    e.preventDefault();
    const member = {
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value.trim(),
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value,
        contact: document.getElementById("contact").value.trim(),
        medical: document.getElementById("medical").value.trim(),
        notes: document.getElementById("notes").value.trim()
    };
    if (!member.name || !member.age) return;
    staff.push(member);
    saveStaff();
    renderStaff();
    form.reset();
    popBg.style.display = "none";
};

addBtn.addEventListener("click", () => {
    popupTitle.textContent = "Add Staff";
    form.reset();
    popBg.style.display = "flex";
    form.onsubmit = defaultSubmitHandler;
});

popBg.addEventListener("click", (e) => {
    if (e.target === popBg) {
        popBg.style.display = "none";
    }
});

closeDetailsBtn.addEventListener("click", () => {
    detailsBg.style.display = "none";
});

detailsBg.addEventListener("click", (e) => {
    if (e.target === detailsBg) {
        detailsBg.style.display = "none";
    }
});

form.addEventListener("submit", defaultSubmitHandler);
renderStaff();
