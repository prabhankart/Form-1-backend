// server/models/Form.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    required: true,
    enum: ['Categorize', 'Cloze', 'Comprehension']
  },
  questionTitle: { type: String },
  description: { type: String, default: '' }, // ADD THIS LINE
  points: { type: Number, default: 1 }, // ADD THIS LINE
  image: { type: String, default: '' }, 

  // Categorize
  categories: [{ type: String }],
  items: [{ text: String, category: String }],

  // UPDATED: Cloze fields
  clozeSentence: { type: String }, // Stores the HTML from the rich text editor
  clozeOptions: [{ text: String, isCorrect: Boolean }], // Stores correct answers and distractors

 passage: { type: String },
  mcqs: [{
    question: String,
    options: [String],
    correctAnswer: Number // Add this line to store the index of the correct option
  }]
}, { _id: true });

// ... (the rest of the file remains the same) ...
const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headerImage: { type: String, default: '' },
  questions: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);