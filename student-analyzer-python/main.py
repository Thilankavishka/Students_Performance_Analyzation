from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# -----------------------------
# Data Models
# -----------------------------
class Student(BaseModel):
    name: str
    math: int
    science: int
    english: int

class RequestData(BaseModel):
    students: List[Student]

# -----------------------------
# Helper Function
# -----------------------------
def calculate_grade(avg):
    if avg >= 75:
        return "A"
    elif avg >= 60:
        return "B"
    elif avg >= 50:
        return "C"
    else:
        return "F"

# -----------------------------
# API Endpoint
# -----------------------------
@app.post("/analyze")
def analyze(data: RequestData):
    students = data.students

    total_math = 0
    total_science = 0
    total_english = 0

    predictions = []
    top_student = None
    highest_avg = 0

    for s in students:
        avg = (s.math + s.science + s.english) / 3

        grade = calculate_grade(avg)

        predictions.append({
            "name": s.name,
            "average": round(avg, 2),
            "grade": grade
        })

        total_math += s.math
        total_science += s.science
        total_english += s.english

        if avg > highest_avg:
            highest_avg = avg
            top_student = s.name

    count = len(students)

    avg_math = total_math / count
    avg_science = total_science / count
    avg_english = total_english / count

    # Simple insights
    weakest_subject = min(
        {"math": avg_math, "science": avg_science, "english": avg_english},
        key=lambda x: {"math": avg_math, "science": avg_science, "english": avg_english}[x]
    )

    insights = f"Students are weakest in {weakest_subject}"

    return {
        "average": {
            "math": round(avg_math, 2),
            "science": round(avg_science, 2),
            "english": round(avg_english, 2)
        },
        "predictions": predictions,
        "topStudent": top_student,
        "insights": insights
    }