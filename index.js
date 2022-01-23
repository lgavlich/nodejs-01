const contactOperations = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contactOperations.listContacts();
      console.table(list);

      //console.log(contacts);
      break;

    case "get":
      const contactById = await contactOperations.getContactById(id);
      console.log(contactById);
      break;
    case "add":
      // ... name email phone
      const newContact = await contactOperations.addContact(name, email, phone);
      console.log(newContact);

    case "remove":
      // ... id
      const removeContact = await contactOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

(async () => {
  await invokeAction(argv);
})();
