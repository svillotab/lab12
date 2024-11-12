const contactForm = document.getElementById('contact-form');
const contactos = document.getElementById('contactos');
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];


function displayContacts() {
    contactos.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');
        contactCard.innerHTML = `
            <div>
                <h4>${contact.name}</h4>
                Teléfono: ${contact.phone}<br>
                Email: ${contact.email}<br>
                Dirección: ${contact.address}
            </div>
            <div>
                <button class="edit" onclick="editContact(${index})">Editar</button>
                <button onclick="deleteContact(${index})">Eliminar</button>
            </div>
        `;
        contactos.appendChild(contactCard);
    });
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !email || !address) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const newContact = { name, phone, email, address };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    contactForm.reset();
    displayContacts();
});


function editContact(index) {
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('address').value = contact.address;

    
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}