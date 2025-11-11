// models/SurveyResponse.ts
import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema({
  userId: { type: String },
  answers: { type: Map, of: Number }, // key: 質問ID, value: 回答値
  diiScore: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.SurveyResponse ||
  mongoose.model("SurveyResponse", surveyResponseSchema);
