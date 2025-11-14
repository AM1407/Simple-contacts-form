function init() {
    const contactName = document.getElementById("contactName");
    const contactPhone = document.getElementById("contactPhone");
    const contactEmail = document.getElementById("contactEmail");
    const addContactBtn = document.getElementById("addContactBtn");
    const contactList = document.getElementById("contactList");

    addContactBtn.addEventListener("click", addContact);

    contactName, contactPhone, contactEmail.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addContact();
        }
    });

    displayContacts();
}

function addContact() {
    const newContact = {
        id: Date.now(),
        name: contactName.value.trim(),
        phone: contactPhone.value.trim(),
        email: contactEmail.value.trim(),
    };

    if (newContact.name === "" || newContact.phone === "" || newContact.email === "") {
        alert("Please fill in all contact fields.");
        return;
    }
    const contacts = getContactsFromStorage();

    contacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    displayContacts();

    contactName.value = "";
    contactPhone.value = "";
    contactEmail.value = "";
}

function displayContacts() {
    const contactList = document.getElementById("contactList");
    const contacts = getContactsFromStorage();

    contactList.innerHTML = "";

    if (contacts.length === 0) {
        contactList.innerHTML = "<li>No contacts yet.</li>";
        return;
    }

    contacts.forEach((contact) => {
        const div = document.createElement("div");
        div.classList.add("card", "col-md-4");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `
            <h5 class="card-title">${contact.name}</h5>
            <p class="card-text">Phone: ${contact.phone}</p>
            <p class="card-text">Email: ${contact.email}</p>
        `;
        div.appendChild(cardBody);
        contactList.appendChild(div);
    });
}


    