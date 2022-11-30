const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  let list;
  await fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      list = JSON.parse(data);
    })
    .catch((error) => console.error(error));
  console.table(list);
  return list;
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const findContact = await allContacts.filter(
      (currentContact) => Number(currentContact.id) === contactId
    );
    console.log(findContact);
    return findContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    let removedList;
    const allContacts = await listContacts();
    removedList = allContacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(removedList));
    console.table(removedList);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    let newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
