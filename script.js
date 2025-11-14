
    const contactName = document.getElementById("contactName");
    const contactPhone = document.getElementById("contactPhone");
    const contactEmail = document.getElementById("contactEmail");
    const addContactBtn = document.getElementById("addContactBtn");
    const contactList = document.getElementById("contactList");
    const clearContactBtn = document.getElementById("clearContactBtn");

    addContactBtn.addEventListener("click", addContact);
    clearContactBtn.addEventListener("click", clearContacts);

    function init() {
    

    contactEmail.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addContact();
        }
    });

    contactName.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addContact();
        }
    });

    contactPhone.addEventListener("keydown", function (event) {
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
        contactList.innerHTML = "<p>No contacts available.</p>";
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

        const deleteBtn = document.createElement("button");

        deleteBtn.classList.add("btn-close")
        deleteBtn.setAttribute("aria-label", "Delete contact");

        deleteBtn.addEventListener("click", function () {
            deleteContact(contact.id);
        });
        
        cardBody.appendChild(deleteBtn);
        div.appendChild(cardBody);
        contactList.appendChild(div);
    });
}

function getContactsFromStorage() {
    const contacts = localStorage.getItem("contacts");
    
    if (contacts === null) {
        return [];
    }

    return JSON.parse(contacts);
}

function deleteContact(id) {
    const contacts = getContactsFromStorage();

    const updatedContacts = contacts.filter( function (contact) {
        return contact.id !== id;
    });

    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    displayContacts();
}

function clearContacts() {
    localStorage.removeItem("contacts");
    displayContacts();
}

init();




    