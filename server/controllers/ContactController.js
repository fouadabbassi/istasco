import Contact from "../models/ContactModel.js"; // Ensure the path is correct

// Create a new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, object, message } = req.body;

    const contact = new Contact({
      name,
      email,
      object,
      message,
    });

    await contact.save();
    res.status(201).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all contact messages
export const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a contact message
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Contact deleted successfully", contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
