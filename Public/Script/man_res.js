const popBg = document.getElementById("pop_bg");
const addBtn = document.getElementById("add");
const form = document.querySelector("#popup form");
const resContainer = document.getElementById("res_container");
const popupTitle = document.getElementById("popup_title");

const detailsBg = document.getElementById("details_bg");
const detailsContent = document.getElementById("details_content");
const closeDetailsBtn = document.getElementById("close_details");


let residents = JSON.parse(localStorage.getItem("residents")) || [];


function saveResidents() {
    localStorage.setItem("residents", JSON.stringify(residents));
}


function createResidentCard(resident, index) {
    const card = document.createElement("div");
    card.classList.add("resident-card");
    card.innerHTML = `
        <h3>${resident.name}</h3>
        <p>Age: ${resident.age}</p>
        <div class="card-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    
    card.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "button") return;
        detailsContent.innerHTML = `
            <p><strong>Name:</strong> ${resident.name}</p>
            <p><strong>Age:</strong> ${resident.age}</p>
            <p><strong>Gender:</strong> ${resident.gender || "N/A"}</p>
            <p><strong>Date of Birth:</strong> ${resident.dob || "N/A"}</p>
            <p><strong>Contact:</strong> ${resident.contact || "N/A"}</p>
            <p><strong>Medical Conditions:</strong> ${resident.medical || "None"}</p>
            <p><strong>Additional Notes:</strong> ${resident.notes || "None"}</p>
        `;
        detailsBg.style.display = "flex";
    });

    
    card.querySelector(".delete-btn").addEventListener("click", () => {
        residents.splice(index, 1);
        saveResidents();
        renderResidents();
    });

    
    card.querySelector(".edit-btn").addEventListener("click", () => {
        popupTitle.textContent = "Edit Resident";
        document.getElementById("name").value = resident.name;
        document.getElementById("age").value = resident.age;
        document.getElementById("gender").value = resident.gender;
        document.getElementById("dob").value = resident.dob;
        document.getElementById("contact").value = resident.contact;
        document.getElementById("medical").value = resident.medical;
        document.getElementById("notes").value = resident.notes;
        popBg.style.display = "flex";

        form.onsubmit = function(e) {
            e.preventDefault();
            residents[index] = {
                name: document.getElementById("name").value.trim(),
                age: document.getElementById("age").value.trim(),
                gender: document.getElementById("gender").value,
                dob: document.getElementById("dob").value,
                contact: document.getElementById("contact").value.trim(),
                medical: document.getElementById("medical").value.trim(),
                notes: document.getElementById("notes").value.trim()
            };
            saveResidents();
            renderResidents();
            form.reset();
            popBg.style.display = "none";
            popupTitle.textContent = "Add Resident";
            form.onsubmit = defaultSubmitHandler;
        };
    });

    resContainer.appendChild(card);
}


function renderResidents() {
    resContainer.innerHTML = "";
    residents.forEach((resident, index) => createResidentCard(resident, index));
}


const defaultSubmitHandler = (e) => {
    e.preventDefault();
    const resident = {
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value.trim(),
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value,
        contact: document.getElementById("contact").value.trim(),
        medical: document.getElementById("medical").value.trim(),
        notes: document.getElementById("notes").value.trim()
    };
    if (!resident.name || !resident.age) return;
    residents.push(resident);
    saveResidents();
    renderResidents();
    form.reset();
    popBg.style.display = "none";
};


addBtn.addEventListener("click", () => {
    popupTitle.textContent = "Add Resident";
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
renderResidents();
