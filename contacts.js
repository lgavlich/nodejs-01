const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

//const contactPath = `${__dirname}\contacts.json`;
const contactPath = path.join("db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  // ...твой код
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const delContact = contacts[idx];
  contacts.splice(idx, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return delContact;
};

const addContact = async (name, email, phone) => {
  // ...твой код
  const newContact = { name, email, phone, id: v4() };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
