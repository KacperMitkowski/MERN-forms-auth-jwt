import mongoose from "mongoose";

const sectionSchema = mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: { type: String, required: true },
  questionDetails: { type: Object },
  required: { type: Boolean, required: true },
});

const Section = mongoose.model("section", sectionSchema);
export default Section;