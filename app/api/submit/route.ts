import { NextResponse } from "next/server";
import { connectToDatabase } from "../../db/mongodb";
import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
    foods: { type: Object, required: true },
  },
  { collection: "surveys" }
);

let SurveyModel: mongoose.Model<any>;
try {
  SurveyModel = mongoose.model("Survey");
} catch {
  SurveyModel = mongoose.model("Survey", surveySchema);
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newSurvey = new SurveyModel({ foods: body.foods });
    await newSurvey.save();

    return NextResponse.json({ success: true, id: newSurvey._id });
  } catch (error) {
    console.error("❌ MongoDB Save Error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "IDが指定されていません" }, { status: 400 });
    }

    const survey = await SurveyModel.findById(id);
    if (!survey) {
      return NextResponse.json({ error: "データが見つかりません" }, { status: 404 });
    }

    return NextResponse.json(survey);
  } catch (error) {
    console.error("❌ MongoDB GET Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
