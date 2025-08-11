const Form = require('../models/Form');
// You will need a Response model later, but let's focus on forms first.
const Response = require('../models/Response'); // Import the new model

// Create and save a new form
exports.createForm = async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(201).json({ message: 'Form created successfully!', formId: newForm._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single form by its ID
exports.getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.submitResponse = async (req, res) => {
    try {
        const { answers } = req.body;
        const { id: formId } = req.params;

        // Check if the form exists
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        const newResponse = new Response({
            formId,
            answers
        });

        await newResponse.save();
        res.status(201).json({ message: 'Response submitted successfully!' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};