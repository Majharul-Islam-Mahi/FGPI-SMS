# Feni Govt Polytechnic Institute — Student Management System

শিক্ষার্থী ব্যবস্থাপনা সিস্টেম — a full-featured student, attendance, and results
management prototype for Feni Govt Polytechnic Institute.

## Features

- **Three roles** — Admin, Teacher, Student with role-gated access
- **Student records** — add/edit/delete (admin), search & filter by department + semester
- **Attendance** — day-by-day present/absent marking, student sees only own record
- **Results** — subject marks → grade & GPA on BTEB scale
- **Dashboard** — totals, pass rate, chart of students per department
- **Departments** — semester 1–8 student counts per department
- **Presentation** — 10-slide HTML deck with fullscreen "Present" mode

## Demo Logins

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Teacher | `teacher` | `teacher123` |
| Student | Roll `510100` | `1234` |

## Development

```sh
npm install
npm run dev