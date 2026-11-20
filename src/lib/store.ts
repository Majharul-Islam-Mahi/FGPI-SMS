import { createClient } from "@supabase/supabase-js";
import { useSyncExternalStore } from "react";

const supabaseUrl = "https://glnznqudtpeqrbbofvuj.supabase.co";
const supabaseKey = "sb_publishable_t_ECNkw21IatDqlcKp805A_AoCATAA4";
const supabase = createClient(supabaseUrl, supabaseKey);

// ═══════════ BTEB Subject Codes (2016 & 2022 Regulations) ═══════════
export interface SubjectCode {
  code: string;
  name: string;
}

export const BTEB_SUBJECTS: Record<string, Record<string, Record<number, SubjectCode[]>>> = {
  "2016": {
    CIVIL: {
      1: [
        { code: "61011", name: "Engineering Drawing" },
        { code: "65711", name: "Bangla" },
        { code: "65712", name: "English" },
        { code: "65911", name: "Mathematics-1" },
        { code: "65912", name: "Physics-1" },
        { code: "66712", name: "Electrical Engineering Fundamentals" },
        { code: "67012", name: "Workshop Practice" },
      ],
      2: [
        { code: "66421", name: "Civil Engineering Materials" },
        { code: "65722", name: "Communicative English" },
        { code: "65921", name: "Mathematics-2" },
        { code: "65922", name: "Physics-2" },
        { code: "66611", name: "Computer Application" },
        { code: "66822", name: "Electronic Engineering Fundamentals" },
        { code: "65812", name: "Physical Education & Life Skill Development" },
      ],
      3: [
        { code: "66431", name: "Civil Engineering Drawing-1" },
        { code: "66432", name: "Surveying-1" },
        { code: "66433", name: "Construction Process-1" },
        { code: "66434", name: "Civil Workshop Practice" },
        { code: "65931", name: "Mathematics-3" },
        { code: "65913", name: "Chemistry" },
        { code: "65811", name: "Social Science" },
      ],
      4: [
        { code: "66441", name: "Structural Mechanics" },
        { code: "66442", name: "Estimating & Costing-1" },
        { code: "66443", name: "Civil Engineering Drawing-2 (CAD)" },
        { code: "66444", name: "Surveying-2" },
        { code: "66445", name: "Geotechnical Engineering" },
        { code: "69054", name: "Environmental Studies" },
        { code: "65841", name: "Business Organization & Communication" },
      ],
      5: [
        { code: "66451", name: "Construction Process-II" },
        { code: "66452", name: "Surveying-III" },
        { code: "66453", name: "Water Supply Engineering" },
        { code: "66454", name: "Theory of Structure" },
        { code: "66455", name: "Estimating & Costing-II" },
        { code: "66456", name: "Hydraulics" },
        { code: "65851", name: "Accounting Theory & Practice" },
      ],
      6: [
        { code: "66461", name: "Advance Surveying" },
        { code: "66462", name: "Transportation Engineering-1" },
        { code: "66463", name: "Design of Structure-1" },
        { code: "66464", name: "Civil Engineering Drawing-3 (CAD)" },
        { code: "66465", name: "Foundation Engineering" },
        { code: "66466", name: "Civil Engineering Software" },
        { code: "65852", name: "Industrial Management" },
      ],
      7: [
        { code: "66471", name: "Civil Engineering Project" },
        { code: "66472", name: "Sanitary Engineering" },
        { code: "66473", name: "Transportation Engineering-2" },
        { code: "66474", name: "Design of Structure-2" },
        { code: "66475", name: "Water Resources Engineering" },
        { code: "68873", name: "Construction Management & Documentation" },
        { code: "65853", name: "Innovation & Entrepreneurship" },
      ],
      8: [{ code: "66481", name: "Industrial Training" }],
    },
    CST: {
      1: [
        { code: "66612", name: "Computer Laboratory Practices" },
        { code: "65811", name: "Social Science" },
        { code: "65812", name: "Physical Education & Life Skill Development" },
        { code: "65911", name: "Mathematics-1" },
        { code: "65913", name: "Chemistry" },
        { code: "66611", name: "Computer Application" },
        { code: "66712", name: "Electrical Engineering Fundamentals" },
      ],
      2: [
        { code: "65711", name: "Bangla" },
        { code: "65712", name: "English" },
        { code: "65912", name: "Physics-1" },
        { code: "65921", name: "Mathematics-2" },
        { code: "66623", name: "Graphic Design-1" },
        { code: "66823", name: "Analog Electronics" },
        { code: "66621", name: "Database Application" },
      ],
      3: [
        { code: "66631", name: "Programming Essentials" },
        { code: "66632", name: "Web Design" },
        { code: "66633", name: "Graphics Design-II" },
        { code: "66834", name: "Digital Electronics" },
        { code: "65931", name: "Mathematics-3" },
        { code: "65922", name: "Physics-2" },
        { code: "65722", name: "Communicative English" },
      ],
      4: [
        { code: "68541", name: "Operating System" },
        { code: "68542", name: "Web Programming" },
        { code: "68543", name: "Mathematics for Computing" },
        { code: "66641", name: "Object Oriented Programming" },
        { code: "66642", name: "Data Structure & Algorithm" },
        { code: "66653", name: "Sequential Logic Systems" },
        { code: "65841", name: "Business Origination & Communication" },
      ],
      5: [
        { code: "68552", name: "Content Management System" },
        { code: "66644", name: "Data Communication System" },
        { code: "66651", name: "Programming in Java" },
        { code: "66662", name: "Microprocessor & Interfacing" },
        { code: "66664", name: "Database Management System" },
        { code: "69054", name: "Environmental Studies" },
        { code: "65851", name: "Accounting Theory & Practice" },
      ],
      6: [
        { code: "68561", name: "MVC Framework Development" },
        { code: "68562", name: "Software Testing" },
        { code: "66678", name: "Advanced Database Management System" },
        { code: "66668", name: "Multimedia & Animation" },
        { code: "66669", name: "Programming in Advanced Java" },
        { code: "66672", name: "Network Administration & Services" },
        { code: "65852", name: "Industrial Management" },
      ],
      7: [
        { code: "68571", name: "Digital Marketing Techniques" },
        { code: "68572", name: "Information Management & Security System" },
        { code: "68573", name: "Scripting with Python" },
        { code: "68574", name: "Computer Science Project" },
        { code: "66671", name: "System Analysis and Design" },
        { code: "66673", name: "Apps Development Project" },
        { code: "65853", name: "Innovation & Entrepreneurship" },
      ],
      8: [{ code: "66681", name: "Industrial Training" }],
    },
    MECH: {
      1: [
        { code: "61011", name: "Engineering Drawing" },
        { code: "65711", name: "Bangla" },
        { code: "65812", name: "Physical Education & Life Skill Development" },
        { code: "67021", name: "Advanced Mechanical Engineering Drawing" },
        { code: "65912", name: "Physics-1" },
        { code: "65911", name: "Mathematics-1" },
        { code: "65913", name: "Chemistry" },
      ],
      2: [
        { code: "67022", name: "Machine Shop Practice-1" },
        { code: "67023", name: "Mechanical Workshop Practice" },
        { code: "65712", name: "English" },
        { code: "65921", name: "Mathematics-2" },
        { code: "65922", name: "Physics-2" },
        { code: "65811", name: "Social Science" },
      ],
      3: [
        { code: "67031", name: "Machine Shop Practice-2" },
        { code: "66822", name: "Electronic Engineering Fundamentals" },
        { code: "65722", name: "Communicative English" },
        { code: "65931", name: "Mathematics-3" },
        { code: "65923", name: "Chemistry" },
        { code: "66611", name: "Computer Application" },
        { code: "67032", name: "Foundry & Pattern Making" },
      ],
      4: [
        { code: "67041", name: "Engineering Mechanics" },
        { code: "67042", name: "Metallurgy" },
        { code: "67043", name: "Machine Shop Practice-3" },
        { code: "66631", name: "Programming Essentials" },
        { code: "66743", name: "Electrical Circuits & Machines" },
        { code: "69054", name: "Environmental Studies" },
        { code: "65841", name: "Business Origination & Communication" },
      ],
      5: [
        { code: "67051", name: "Hydraulics & Hydraulic Machineries" },
        { code: "67052", name: "Mechanical Estimating & Costing" },
        { code: "67053", name: "Advance Welding-1" },
        { code: "67054", name: "CAD & CAM" },
        { code: "67055", name: "Manufacturing Process" },
        { code: "65851", name: "Accounting Theory & Practice" },
      ],
      6: [
        { code: "67061", name: "Thermodynamics and Heat Engine" },
        { code: "67062", name: "Mechanical Measurement & Metrology" },
        { code: "67063", name: "Plant Engineering" },
        { code: "67064", name: "Strength of Materials" },
        { code: "67065", name: "Advance Welding-2" },
        { code: "65852", name: "Industrial Management" },
      ],
      7: [
        { code: "67071", name: "Design of Machine Elements" },
        { code: "67072", name: "Tool Design" },
        { code: "67073", name: "Heat Treatment of Metal" },
        { code: "67074", name: "Mechanical Engineering Project" },
        { code: "67075", name: "Production Planning and Control" },
        { code: "67076", name: "Mechatronics & PLC" },
        { code: "65853", name: "Innovation & Entrepreneurship" },
      ],
      8: [{ code: "67081", name: "Industrial Training" }],
    },
    ELEC: {
      1: [
        { code: "61011", name: "Engineering Drawing" },
        { code: "65812", name: "Physical Education & Life Skill Development" },
        { code: "65911", name: "Mathematics-1" },
        { code: "65913", name: "Chemistry" },
        { code: "66711", name: "Basic Electricity" },
        { code: "66713", name: "Electrical Engineering Materials" },
        { code: "66811", name: "Basic Electronics" },
      ],
      2: [
        { code: "66721", name: "Electrical Circuits-1" },
        { code: "66722", name: "Electrical Appliances" },
        { code: "66611", name: "Computer Application" },
        { code: "65921", name: "Mathematics-2" },
        { code: "65912", name: "Physics-1" },
        { code: "65711", name: "Bangla" },
        { code: "65712", name: "English" },
      ],
      3: [
        { code: "66731", name: "Electrical Circuit-2" },
        { code: "66732", name: "Advance Electricity" },
        { code: "66733", name: "Electrical Engineering Drawing" },
        { code: "65931", name: "Mathematics-3" },
        { code: "65922", name: "Physics-2" },
        { code: "65722", name: "Communicative English" },
        { code: "65811", name: "Social Science" },
      ],
      4: [
        { code: "66741", name: "Electrical Installation Planning & Estimating" },
        { code: "66742", name: "DC Machines" },
        { code: "66845", name: "Industrial Electronics" },
        { code: "67045", name: "Applied Mechanics" },
        { code: "66631", name: "Programming Essentials" },
        { code: "65841", name: "Business Origination & Communication" },
      ],
      5: [
        { code: "66751", name: "Electrical & Electronic Measurement-I" },
        { code: "66752", name: "Generation of Electrical Power" },
        { code: "66753", name: "Renewable Energy" },
        { code: "66856", name: "Digital Electronics & Microprocessor" },
        { code: "69054", name: "Environmental Studies" },
        { code: "65851", name: "Accounting Theory & Practice" },
      ],
      6: [
        { code: "66761", name: "Alternating Current Machines-1" },
        { code: "66762", name: "Electrical & Electronic Measurement-2" },
        { code: "66763", name: "Transmission and Distribution of Electrical Power-1" },
        { code: "66867", name: "Communication Engineering" },
        { code: "66868", name: "Micro Controller & PLC" },
        { code: "65852", name: "Industrial Management" },
      ],
      7: [
        { code: "66771", name: "Alternating Current Machines-2" },
        { code: "66772", name: "Electrical Engineering Project" },
        { code: "66773", name: "Switch Gear & Protection" },
        { code: "66774", name: "Transmission and Distribution of Electrical Power-2" },
        { code: "66775", name: "Testing and Maintenance of Electrical Equipment" },
        { code: "66863", name: "Instrumentation & Process Control" },
        { code: "65853", name: "Innovation & Entrepreneurship" },
      ],
      8: [{ code: "66781", name: "Industrial Training" }],
    },
    POWER: {
      1: [
        { code: "61011", name: "Engineering Drawing" },
        { code: "65711", name: "Bangla" },
        { code: "65712", name: "English" },
        { code: "65911", name: "Mathematics-1" },
        { code: "65912", name: "Physics-1" },
        { code: "67111", name: "Power Engineering Fundamentals" },
        { code: "66711", name: "Basic Electricity" },
      ],
      2: [
        { code: "67121", name: "Workshop Safety & Management" },
        { code: "66711", name: "Basic Electricity" },
        { code: "65922", name: "Physics-2" },
        { code: "65722", name: "Communicative English" },
        { code: "65921", name: "Mathematics-2" },
        { code: "65812", name: "Physical Education & Life Skill Development" },
      ],
      3: [
        { code: "67131", name: "Engineering Thermodynamics" },
        { code: "67033", name: "Machine Shop Practice" },
        { code: "66611", name: "Computer Application" },
        { code: "65931", name: "Mathematics-3" },
        { code: "65913", name: "Chemistry" },
        { code: "65811", name: "Social Science" },
        { code: "66822", name: "Electronic Engineering Fundamentals" },
      ],
      4: [
        { code: "67141", name: "Engine Details" },
        { code: "67041", name: "Engineering Mechanics" },
        { code: "67142", name: "Automotive Suspension, Brake, Steering & Transmission System" },
        { code: "67143", name: "Fuels & Lubricants" },
        { code: "66743", name: "Electrical Circuits & Machines" },
        { code: "65841", name: "Business Origination & Communication" },
      ],
      5: [
        { code: "67151", name: "Power Plant Engineering" },
        { code: "67152", name: "Boiler Operation & Maintenance" },
        { code: "67153", name: "Engine Overhauling & Inspection" },
        { code: "66271", name: "Service Station Operation & Estimating" },
        { code: "69054", name: "Environmental Studies" },
        { code: "65851", name: "Accounting Theory & Practice" },
      ],
      6: [
        { code: "67161", name: "Engine Testing & Performance" },
        { code: "66274", name: "Vehicle Automation & Signaling" },
        { code: "66241", name: "Automotive Body Building" },
        { code: "67162", name: "Fluid Mechanics & Machineries" },
        { code: "66764", name: "Transmission & Distribution of Electrical Power" },
        { code: "65852", name: "Industrial Management" },
      ],
      7: [
        { code: "67171", name: "Auto Electricity & Electronic" },
        { code: "67172", name: "Automobile Trouble Shooting & Driving" },
        { code: "67173", name: "Power Engineering Project" },
        { code: "66253", name: "Automobile Air-conditioning" },
        { code: "66773", name: "Switch Gear & Protection" },
        { code: "65853", name: "Innovation & Entrepreneurship" },
      ],
      8: [{ code: "67181", name: "Industrial Training" }],
    },
    ARCH: {
      1: [
        { code: "65811", name: "Social Science" },
        { code: "65812", name: "Physical Education & Life Skill Development" },
        { code: "65911", name: "Mathematics-1" },
        { code: "65913", name: "Chemistry" },
        { code: "66111", name: "Architectural Drawing & Drafting" },
        { code: "66112", name: "Architectural Materials" },
        { code: "66712", name: "Electrical Engineering Fundamentals" },
      ],
      2: [
        { code: "66121", name: "Architectural Design-1" },
        { code: "66122", name: "Creativity & Concept Development" },
        { code: "66611", name: "Computer Application" },
        { code: "65711", name: "Bangla" },
        { code: "65712", name: "English" },
        { code: "65921", name: "Mathematics-2" },
        { code: "65912", name: "Physics-1" },
      ],
      3: [
        { code: "66131", name: "Architectural Design-2" },
        { code: "66132", name: "Computer Aided Drawing" },
        { code: "66133", name: "Architectural Graphics" },
        { code: "66435", name: "Fundamental Surveying" },
        { code: "65722", name: "Communicative English" },
        { code: "65931", name: "Mathematics-3" },
        { code: "65922", name: "Physics-2" },
      ],
      4: [
        { code: "66142", name: "Architectural Design-3" },
        { code: "66141", name: "History of Architecture-1" },
        { code: "66143", name: "Working Drawing With CAD" },
        { code: "66446", name: "Fundamental Construction Process" },
        { code: "66144", name: "Model Making" },
        { code: "66447", name: "Basic Estimating & Costing" },
        { code: "65841", name: "Business Origination & Communication" },
      ],
      5: [
        { code: "66151", name: "Architectural Design-4" },
        { code: "66152", name: "History of Architecture-2" },
        { code: "66153", name: "Interior Design" },
        { code: "66154", name: "Presentation & Visual Technique" },
        { code: "66441", name: "Structural Mechanics" },
        { code: "66457", name: "Water Supply & Sanitary Engineering" },
        { code: "65851", name: "Accounting Theory & Practice" },
      ],
      6: [
        { code: "66161", name: "Architectural Design-5" },
        { code: "66162", name: "Computer Rendering & Animation-1" },
        { code: "66163", name: "Landscape Design" },
        { code: "66164", name: "Contemporary Architecture" },
        { code: "69054", name: "Environmental Studies" },
        { code: "66454", name: "Theory of Structure" },
        { code: "65852", name: "Industrial Management" },
      ],
      7: [
        { code: "66171", name: "Architectural Project" },
        { code: "66172", name: "Professional Practice" },
        { code: "66173", name: "Interior Design-2" },
        { code: "66174", name: "Urban Planning" },
        { code: "66175", name: "Computer Rendering & Animation-2" },
        { code: "66463", name: "Design of Structure-1" },
        { code: "65853", name: "Innovation & Entrepreneurship" },
      ],
      8: [{ code: "66181", name: "Industrial Training" }],
    },
  },
  "2022": {
    CIVIL: {
      1: [
        { code: "21011", name: "Engineering Drawing" },
        { code: "25711", name: "Bangla-I" },
        { code: "25712", name: "English-I" },
        { code: "26711", name: "Basic Electricity" },
        { code: "26421", name: "Civil Engineering Drawing" },
        { code: "26811", name: "Basic Electronics" },
        { code: "25911", name: "Mathematics-I" },
        { code: "25912", name: "Physics-I" },
      ],
      2: [
        { code: "25721", name: "Bangla-II" },
        { code: "25722", name: "English-II" },
        { code: "25921", name: "Mathematics-II" },
        { code: "25922", name: "Physics-II" },
        { code: "25812", name: "Physical Education & Life Skills Development" },
        { code: "26411", name: "Civil Engineering Materials" },
        { code: "27011", name: "Basic Workshop Practice" },
      ],
      3: [
        { code: "25931", name: "Mathematics-III" },
        { code: "25913", name: "Chemistry" },
        { code: "26611", name: "Computer Office Application" },
        { code: "26431", name: "Civil Engineering Drawing-II" },
        { code: "26432", name: "Surveying-I" },
        { code: "26433", name: "Construction Process-I" },
        { code: "25811", name: "Social Science" },
      ],
      4: [
        { code: "25841", name: "Accounting" },
        { code: "26441", name: "Structural Mechanics" },
        { code: "26442", name: "Estimating & Costing-I" },
        { code: "26443", name: "Civil CAD-I" },
        { code: "26444", name: "Surveying-II" },
        { code: "26445", name: "Geotechnical Engineering" },
        { code: "29041", name: "Environmental Studies" },
      ],
      5: [
        { code: "25851", name: "Principles of Marketing" },
        { code: "25852", name: "Industrial Management" },
        { code: "26451", name: "Construction Process-II" },
        { code: "26452", name: "Surveying-III" },
        { code: "26453", name: "Water Supply Engineering" },
        { code: "26454", name: "Theory of Structure" },
        { code: "26455", name: "Estimating & Costing-II" },
      ],
      6: [
        { code: "25831", name: "Business Communication" },
        { code: "25853", name: "Innovation & Entrepreneurship" },
        { code: "26461", name: "Advance Surveying" },
        { code: "26462", name: "Transportation Engineering-I" },
        { code: "26463", name: "Design of Structure-I" },
        { code: "26464", name: "Civil CAD-II" },
        { code: "26465", name: "Foundation Engineering" },
      ],
      7: [
        { code: "26471", name: "Civil Engineering Project" },
        { code: "26472", name: "Sanitary Engineering" },
        { code: "26473", name: "Transportation Engineering-II" },
        { code: "26474", name: "Design of Structure-II" },
        { code: "26475", name: "Water Resources Engineering" },
        { code: "28873", name: "Construction Management & Documentation" },
      ],
      8: [{ code: "26481", name: "Industrial Attachment & Project Presentation" }],
    },
    CST: {
      1: [
        { code: "21011", name: "Engineering Drawing" },
        { code: "25711", name: "Bangla-I" },
        { code: "25712", name: "English-I" },
        { code: "25911", name: "Mathematics-I" },
        { code: "25912", name: "Physics-I" },
        { code: "28511", name: "Computer Office Application" },
        { code: "26811", name: "Basic Electronics" },
        { code: "26711", name: "Basic Electricity" },
      ],
      2: [
        { code: "25721", name: "Bangla-II" },
        { code: "25722", name: "English-II" },
        { code: "25921", name: "Mathematics-II" },
        { code: "25922", name: "Physics-II" },
        { code: "28521", name: "Python Programming" },
        { code: "26621", name: "Database Application" },
        { code: "26823", name: "Analog Electronics" },
        { code: "25812", name: "Physical Education & Life Skills Development" },
      ],
      3: [
        { code: "25931", name: "Mathematics-III" },
        { code: "25913", name: "Chemistry" },
        { code: "26631", name: "Programming Essentials" },
        { code: "26632", name: "Web Design" },
        { code: "26633", name: "Graphics Design-II" },
        { code: "26834", name: "Digital Electronics" },
        { code: "25811", name: "Social Science" },
      ],
      4: [
        { code: "25841", name: "Accounting" },
        { code: "26641", name: "Object Oriented Programming" },
        { code: "26642", name: "Data Structure & Algorithm" },
        { code: "26643", name: "Web Programming" },
        { code: "26644", name: "Data Communication System" },
        { code: "26645", name: "Sequential Logic Systems" },
        { code: "29041", name: "Environmental Studies" },
      ],
      5: [
        { code: "25851", name: "Principles of Marketing" },
        { code: "25852", name: "Industrial Management" },
        { code: "26651", name: "Programming in Java" },
        { code: "26652", name: "Microprocessor & Interfacing" },
        { code: "26653", name: "Database Management System" },
        { code: "26654", name: "Content Management System" },
        { code: "26856", name: "Digital Electronics & Microprocessor" },
      ],
      6: [
        { code: "25831", name: "Business Communication" },
        { code: "25853", name: "Innovation & Entrepreneurship" },
        { code: "26661", name: "MVC Framework Development" },
        { code: "26662", name: "Software Testing" },
        { code: "26663", name: "Advanced Database Management System" },
        { code: "26664", name: "Multimedia & Animation" },
        { code: "26665", name: "Network Administration & Services" },
      ],
      7: [
        { code: "26671", name: "Digital Marketing Techniques" },
        { code: "26672", name: "Information Management & Security System" },
        { code: "26673", name: "Scripting with Python" },
        { code: "26674", name: "Computer Science Project" },
        { code: "26675", name: "System Analysis and Design" },
        { code: "26676", name: "Apps Development Project" },
      ],
      8: [{ code: "26681", name: "Industrial Attachment & Project Presentation" }],
    },
    MECH: {
      1: [
        { code: "21011", name: "Engineering Drawing" },
        { code: "25711", name: "Bangla-I" },
        { code: "25712", name: "English-I" },
        { code: "25911", name: "Mathematics-I" },
        { code: "25912", name: "Physics-I" },
        { code: "26711", name: "Basic Electricity" },
        { code: "27011", name: "Basic Workshop Practice" },
        { code: "27012", name: "Machine Shop Practice-I" },
      ],
      2: [
        { code: "25721", name: "Bangla-II" },
        { code: "25722", name: "English-II" },
        { code: "25921", name: "Mathematics-II" },
        { code: "25922", name: "Physics-II" },
        { code: "27021", name: "Advanced Mechanical Engineering Drawing" },
        { code: "27022", name: "Machine Shop Practice-II" },
        { code: "25812", name: "Physical Education & Life Skills Development" },
      ],
      3: [
        { code: "25931", name: "Mathematics-III" },
        { code: "25913", name: "Chemistry" },
        { code: "26611", name: "Computer Office Application" },
        { code: "27031", name: "Foundry & Pattern Making" },
        { code: "27032", name: "Machine Shop Practice-III" },
        { code: "26833", name: "Industrial Electronics" },
        { code: "25811", name: "Social Science" },
      ],
      4: [
        { code: "25841", name: "Accounting" },
        { code: "27041", name: "Engineering Mechanics" },
        { code: "27042", name: "Metallurgy" },
        { code: "27043", name: "Machine Shop Practice-IV" },
        { code: "27044", name: "Applied Mechanics" },
        { code: "29041", name: "Environmental Studies" },
      ],
      5: [
        { code: "25851", name: "Principles of Marketing" },
        { code: "25852", name: "Industrial Management" },
        { code: "27051", name: "Hydraulics & Hydraulic Machineries" },
        { code: "27052", name: "Mechanical Estimating & Costing" },
        { code: "27053", name: "Advance Welding-I" },
        { code: "27054", name: "CAD & CAM" },
        { code: "27055", name: "Manufacturing Process" },
      ],
      6: [
        { code: "25831", name: "Business Communication" },
        { code: "25853", name: "Innovation & Entrepreneurship" },
        { code: "27061", name: "Thermodynamics and Heat Engine" },
        { code: "27062", name: "Mechanical Measurement & Metrology" },
        { code: "27063", name: "Plant Engineering" },
        { code: "27064", name: "Strength of Materials" },
        { code: "27065", name: "Advance Welding-II" },
      ],
      7: [
        { code: "27071", name: "Design of Machine Elements" },
        { code: "27072", name: "Tool Design" },
        { code: "27073", name: "Heat Treatment of Metal" },
        { code: "27074", name: "Mechanical Engineering Project" },
        { code: "27075", name: "Production Planning and Control" },
        { code: "27076", name: "Mechatronics & PLC" },
      ],
      8: [{ code: "27081", name: "Industrial Attachment & Project Presentation" }],
    },
    ELEC: {
      1: [
        { code: "21011", name: "Engineering Drawing" },
        { code: "25711", name: "Bangla-I" },
        { code: "25712", name: "English-I" },
        { code: "25812", name: "Physical Education & Life Skills Development" },
        { code: "25911", name: "Mathematics-I" },
        { code: "25912", name: "Physics-I" },
        { code: "26711", name: "Basic Electricity" },
        { code: "26712", name: "Electrical Engineering Materials" },
      ],
      2: [
        { code: "25721", name: "Bangla-II" },
        { code: "25722", name: "English-II" },
        { code: "25921", name: "Mathematics-II" },
        { code: "25922", name: "Physics-II" },
        { code: "26721", name: "Electrical Circuits-I" },
        { code: "26722", name: "Electrical Engineering Drawing" },
        { code: "26811", name: "Basic Electronics" },
      ],
      3: [
        { code: "25931", name: "Mathematics-III" },
        { code: "25913", name: "Chemistry" },
        { code: "26611", name: "Computer Office Application" },
        { code: "26731", name: "Electrical Circuits-II" },
        { code: "26732", name: "Electrical Appliances" },
        { code: "26833", name: "Industrial Electronics" },
      ],
      4: [
        { code: "25811", name: "Social Science" },
        { code: "25841", name: "Accounting" },
        { code: "26741", name: "Electrical Installation, Planning and Estimating" },
        { code: "26742", name: "DC Machine" },
        { code: "26743", name: "Electrical Engineering Project-I" },
        { code: "26845", name: "Digital Electronics" },
        { code: "27044", name: "Applied Mechanics" },
      ],
      5: [
        { code: "25851", name: "Principles of Marketing" },
        { code: "25852", name: "Industrial Management" },
        { code: "26751", name: "Generation of Electrical Power" },
        { code: "26752", name: "Electrical & Electronic Measurements-I" },
        { code: "26753", name: "Testing and Maintenance of Electrical Equipments" },
        { code: "26754", name: "Electrical Engineering Project-II" },
        { code: "26853", name: "Microprocessor & Microcontroller" },
      ],
      6: [
        { code: "26667", name: "Programming in C" },
        { code: "26761", name: "AC Machine-I" },
        { code: "26762", name: "Transmission and Distribution of Electrical Power-I" },
        { code: "26763", name: "Electrical & Electronic Measurements-II" },
        { code: "26842", name: "Communication Engineering" },
        { code: "29041", name: "Environmental Studies" },
      ],
      7: [
        { code: "25831", name: "Business Communication" },
        { code: "25853", name: "Innovation & Entrepreneurship" },
        { code: "26771", name: "AC Machine-II" },
        { code: "26772", name: "Transmission and Distribution of Electrical Power-II" },
        { code: "26773", name: "Switch Gear and Protection" },
        { code: "26774", name: "Electrical Engineering Project-III" },
        { code: "26875", name: "Automation Engineering & PLC" },
      ],
      8: [{ code: "26781", name: "Industrial Attachment & Project Presentation" }],
    },
    POWER: {
      1: [
        { code: "21011", name: "Engineering Drawing" },
        { code: "25711", name: "Bangla-I" },
        { code: "25712", name: "English-I" },
        { code: "25911", name: "Mathematics-I" },
        { code: "25912", name: "Physics-I" },
        { code: "26711", name: "Basic Electricity" },
        { code: "27111", name: "Power Engineering Fundamentals" },
      ],
      2: [
        { code: "25721", name: "Bangla-II" },
        { code: "25722", name: "English-II" },
        { code: "25921", name: "Mathematics-II" },
        { code: "25922", name: "Physics-II" },
        { code: "27121", name: "Workshop Safety & Management" },
        { code: "25812", name: "Physical Education & Life Skills Development" },
      ],
      3: [
        { code: "25931", name: "Mathematics-III" },
        { code: "25913", name: "Chemistry" },
        { code: "26611", name: "Computer Office Application" },
        { code: "27131", name: "Engineering Thermodynamics" },
        { code: "27033", name: "Machine Shop Practice" },
        { code: "26822", name: "Electronic Engineering Fundamentals" },
        { code: "25811", name: "Social Science" },
      ],
      4: [
        { code: "25841", name: "Accounting" },
        { code: "27141", name: "Engine Details" },
        { code: "27041", name: "Engineering Mechanics" },
        { code: "27142", name: "Automotive Suspension, Brake, Steering & Transmission System" },
        { code: "27143", name: "Fuels & Lubricants" },
        { code: "26743", name: "Electrical Circuits & Machines" },
      ],
      5: [
        { code: "25851", name: "Principles of Marketing" },
        { code: "25852", name: "Industrial Management" },
        { code: "27151", name: "Power Plant Engineering" },
        { code: "27152", name: "Boiler Operation & Maintenance" },
        { code: "27153", name: "Engine Overhauling & Inspection" },
        { code: "26271", name: "Service Station Operation & Estimating" },
        { code: "29041", name: "Environmental Studies" },
      ],
      6: [
        { code: "25831", name: "Business Communication" },
        { code: "25853", name: "Innovation & Entrepreneurship" },
        { code: "27161", name: "Engine Testing & Performance" },
        { code: "26274", name: "Vehicle Automation & Signaling" },
        { code: "26241", name: "Automotive Body Building" },
        { code: "27162", name: "Fluid Mechanics & Machineries" },
        { code: "26764", name: "Transmission & Distribution of Electrical Power" },
      ],
      7: [
        { code: "27171", name: "Auto Electricity & Electronic" },
        { code: "27172", name: "Automobile Trouble Shooting & Driving" },
        { code: "27173", name: "Power Engineering Project" },
        { code: "26253", name: "Automobile Air-conditioning" },
        { code: "26773", name: "Switch Gear & Protection" },
      ],
      8: [{ code: "27181", name: "Industrial Attachment & Project Presentation" }],
    },
    ARCH: {
      1: [
        { code: "21011", name: "Engineering Drawing" },
        { code: "25711", name: "Bangla-I" },
        { code: "25712", name: "English-I" },
        { code: "25811", name: "Social Science" },
        { code: "25812", name: "Physical Education & Life Skills Development" },
        { code: "25911", name: "Mathematics-I" },
        { code: "25913", name: "Chemistry" },
        { code: "26111", name: "Architectural Drawing & Drafting" },
      ],
      2: [
        { code: "25721", name: "Bangla-II" },
        { code: "25722", name: "English-II" },
        { code: "25921", name: "Mathematics-II" },
        { code: "25922", name: "Physics-I" },
        { code: "26121", name: "Architectural Design-I" },
        { code: "26122", name: "Creativity & Concept Development" },
        { code: "26611", name: "Computer Office Application" },
      ],
      3: [
        { code: "25931", name: "Mathematics-III" },
        { code: "25923", name: "Physics-II" },
        { code: "26131", name: "Architectural Design-II" },
        { code: "26132", name: "Computer Aided Drawing" },
        { code: "26133", name: "Architectural Graphics" },
        { code: "26435", name: "Fundamental Surveying" },
        { code: "25831", name: "Business Communication" },
      ],
      4: [
        { code: "25841", name: "Accounting" },
        { code: "26141", name: "History of Architecture-I" },
        { code: "26142", name: "Architectural Design-III" },
        { code: "26143", name: "Working Drawing With CAD" },
        { code: "26446", name: "Fundamental Construction Process" },
        { code: "26144", name: "Model Making" },
        { code: "26447", name: "Basic Estimating & Costing" },
      ],
      5: [
        { code: "25851", name: "Principles of Marketing" },
        { code: "25852", name: "Industrial Management" },
        { code: "26151", name: "Architectural Design-IV" },
        { code: "26152", name: "History of Architecture-II" },
        { code: "26153", name: "Interior Design" },
        { code: "26154", name: "Presentation & Visual Technique" },
        { code: "26441", name: "Structural Mechanics" },
      ],
      6: [
        { code: "25853", name: "Innovation & Entrepreneurship" },
        { code: "26161", name: "Architectural Design-V" },
        { code: "26162", name: "Computer Rendering & Animation-I" },
        { code: "26163", name: "Landscape Design" },
        { code: "26164", name: "Contemporary Architecture" },
        { code: "29041", name: "Environmental Studies" },
        { code: "26454", name: "Theory of Structure" },
      ],
      7: [
        { code: "26171", name: "Architectural Project" },
        { code: "26172", name: "Professional Practice" },
        { code: "26173", name: "Interior Design-II" },
        { code: "26174", name: "Urban Planning" },
        { code: "26175", name: "Computer Rendering & Animation-II" },
        { code: "26463", name: "Design of Structure-I" },
      ],
      8: [{ code: "26181", name: "Industrial Attachment & Project Presentation" }],
    },
  },
};

// ═══════════ Existing Interfaces & State ═══════════
export const DEPARTMENTS = [
  // cspell:disable
  { code: "CIVIL", name: "Civil Technology", bn: "সিভিল টেকনোলজি" },
  { code: "CST", name: "Computer Science & Technology", bn: "কম্পিউটার সায়েন্স" },
  { code: "MECH", name: "Mechanical Technology", bn: "মেকানিক্যাল টেকনোলজি" },
  { code: "ELEC", name: "Electrical Technology", bn: "ইলেকট্রিক্যাল টেকনোলজি" },
  { code: "POWER", name: "Power Technology", bn: "পাওয়ার টেকনোলজি" },
  { code: "ARCH", name: "Architecture Technology", bn: "আর্কিটেকচার টেকনোলজি" },
  // cspell:enable
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
export type Role = "admin" | "teacher" | "student";

export interface Student {
  id: string;
  roll: string;
  name: string;
  department: string;
  semester: number;
  session: string;
  phone: string;
  gender: "Male" | "Female";
  shift?: string;
  mis_id?: string;
  scholarship_status?: string;
  backlog_status?: string;
  documents_url?: string;
}

export interface AttendanceRecord {
  date: string;
  studentId: string;
  subject: string;
  present: boolean;
}
export interface ResultRecord {
  id: string;
  studentId: string;
  subject: string;
  semester: number;
  marks: number;
  mid_term_marks?: number;
  practical_marks?: number;
  final_marks?: number;
}
export interface NoticeRecord {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}
export interface FeeRecord {
  id: string;
  studentId: string;
  amount: number;
  status: "paid" | "unpaid";
  dueDate: string;
}
export interface RoutineRecord {
  id: string;
  department: string;
  semester: number;
  shift: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}
export interface ApplicationRecord {
  id: string;
  studentId: string;
  type: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}
export interface Session {
  role: Role;
  name: string;
  studentId?: string;
}

export interface AdmissionRecord {
  id: string;
  name: string;
  email: string;
  gpa: string;
  status: string;
}
export interface FacultyRecord {
  id: string;
  teacherId?: string;
  name: string;
  department: string;
  course: string;
  designation?: string;
}
export interface HostelRecord {
  id: string;
  roomNo: string;
  status: string;
  seatCount?: number;
  bookedSeats?: number;
  building?: string;
}
export interface LibraryRecord {
  id: string;
  title: string;
  author: string;
  status: string;
  fine?: number;
}
export interface TransportRecord {
  id: string;
  routeName: string;
  busNo: string;
  departureTime?: string;
  location?: string;
}
export interface SmsRecord {
  id: string;
  target: string;
  message: string;
  date: string;
}

export interface MultiCampusRecord {
  id: string;
  campusName: string;
  location: string;
}
export interface FeeLedgerRecord {
  id: string;
  studentId: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
  date: string;
}
export interface LibraryFineRecord {
  id: string;
  studentId: string;
  bookTitle: string;
  fineAmount: number;
  status: string;
}
export interface NotificationLog {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  date: string;
}

interface State {
  students: Student[];
  attendance: AttendanceRecord[];
  results: ResultRecord[];
  notices: NoticeRecord[];
  fees: FeeRecord[];
  routines: RoutineRecord[];
  applications: ApplicationRecord[];
  admissions: AdmissionRecord[];
  faculties: FacultyRecord[];
  hostels: HostelRecord[];
  libraries: LibraryRecord[];
  transports: TransportRecord[];
  smsAlerts: SmsRecord[];
  session: Session | null;
  campuses: MultiCampusRecord[];
  feeLedgers: FeeLedgerRecord[];
  libraryFines: LibraryFineRecord[];
  notificationLogs: NotificationLog[];
  isLoading: boolean;
}

export function gradeFor(marks: number): { grade: string; gp: number } {
  const scale: [number, string, number][] = [
    [80, "A+", 4.0],
    [75, "A", 3.75],
    [70, "A-", 3.5],
    [65, "B+", 3.25],
    [60, "B", 3.0],
    [55, "B-", 2.75],
    [50, "C+", 2.5],
    [45, "C", 2.25],
    [40, "D", 2.0],
  ];
  for (const [min, grade, gp] of scale) if (marks >= min) return { grade, gp };
  return { grade: "F", gp: 0 };
}

let state: State = {
  students: [],
  attendance: [],
  results: [],
  notices: [],
  fees: [],
  routines: [],
  applications: [],
  admissions: [],
  faculties: [],
  hostels: [],
  libraries: [],
  transports: [],
  smsAlerts: [],
  session: null,
  campuses: [],
  feeLedgers: [],
  libraryFines: [],
  notificationLogs: [],
  isLoading: true,
};
const listeners = new Set<() => void>();
let loaded = false;

async function load() {
  if (loaded) return;
  loaded = true;

  try {
    const { data: students } = await supabase.from("students").select("*");
    const { data: attendance } = await supabase.from("attendance").select("*");
    const { data: results } = await supabase.from("results").select("*");
    const { data: notices } = await supabase
      .from("notices")
      .select("*")
      .order("date", { ascending: false });
    const { data: fees } = await supabase.from("fees").select("*");
    const { data: routines } = await supabase.from("routines").select("*");
    const { data: applications } = await supabase
      .from("applications")
      .select("*")
      .order("date", { ascending: false });
    const { data: admissions } = await supabase.from("admissions").select("*");
    const { data: faculties } = await supabase.from("faculties").select("*");
    const { data: hostels } = await supabase.from("hostels").select("*");
    const { data: libraries } = await supabase.from("library_books").select("*");
    const { data: transports } = await supabase.from("transports").select("*");
    const { data: smsAlerts } = await supabase.from("sms_alerts").select("*");

    if (students) state.students = students as unknown as Student[];
    if (attendance)
      state.attendance = attendance.map(
        (a: Record<string, unknown>) =>
          ({
            ...a,
            studentId: a["student_id"],
            subject: a["subject"] || "General",
          }) as unknown as AttendanceRecord,
      );
    if (results)
      state.results = results.map(
        (r: Record<string, unknown>) =>
          ({ ...r, studentId: r["student_id"] }) as unknown as ResultRecord,
      );
    if (notices) state.notices = notices as unknown as NoticeRecord[];
    if (fees)
      state.fees = fees.map(
        (f: Record<string, unknown>) =>
          ({ ...f, studentId: f["student_id"], dueDate: f["due_date"] }) as unknown as FeeRecord,
      );
    if (routines) state.routines = routines as unknown as RoutineRecord[];
    if (applications)
      state.applications = applications.map(
        (a: Record<string, unknown>) =>
          ({ ...a, studentId: a["student_id"] }) as unknown as ApplicationRecord,
      );
    if (admissions) state.admissions = admissions as unknown as AdmissionRecord[];
    if (faculties)
      state.faculties = faculties.map(
        (f: Record<string, unknown>) =>
          ({
            ...f,
            teacherId: f["teacher_id"],
            designation: f["designation"],
          }) as unknown as FacultyRecord,
      );
    if (hostels)
      state.hostels = hostels.map(
        (h: Record<string, unknown>) =>
          ({
            ...h,
            roomNo: h["room_no"],
            seatCount: h["seat_count"],
            bookedSeats: h["booked_seats"],
            building: h["building"],
          }) as unknown as HostelRecord,
      );
    if (libraries) state.libraries = libraries as unknown as LibraryRecord[];
    if (transports)
      state.transports = transports.map(
        (t: Record<string, unknown>) =>
          ({
            ...t,
            routeName: t["route_name"],
            busNo: t["bus_no"],
            departureTime: t["departure_time"],
            location: t["location"],
          }) as unknown as TransportRecord,
      );
    if (smsAlerts) state.smsAlerts = smsAlerts as unknown as SmsRecord[];

    state.campuses = [
      { id: "c1", campusName: "Main Campus", location: "Feni Sadar" },
      { id: "c2", campusName: "City Campus", location: "Trunk Road" },
    ];

    const savedSession = localStorage.getItem("fgpi-session");
    if (savedSession) state.session = JSON.parse(savedSession);
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    set((s) => ({ ...s, isLoading: false }));
  }
}

function set(fn: (s: State) => State) {
  state = fn(state);
  listeners.forEach((l) => l());
}

export function useStore(): State {
  return useSyncExternalStore(
    (l) => {
      if (!loaded) load();
      listeners.add(l);
      l();
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}

export const actions = {
  login(role: Role, username: string, password: string): Session | null {
    // Trailing spaces are also trimmed before processing.
    const u = username.trim();
    const p = password.trim();
    let session: Session | null = null;

    if (role === "admin" && u === "admin" && p === "admin123")
      session = { role, name: "Administrator" };
    if (role === "teacher" && u === "teacher" && p === "teacher123")
      session = { role, name: "Teacher" };
    if (role === "student") {
      const st = state.students.find((s) => s.roll === u);
      if (st && p === "1234") session = { role, name: st.name, studentId: st.id };
    }

    if (session) {
      set((s) => ({ ...s, session }));
      localStorage.setItem("fgpi-session", JSON.stringify(session));
    }
    return session;
  },
  logout: () => {
    set((s) => ({ ...s, session: null }));
    localStorage.removeItem("fgpi-session");
  },
  async saveStudent(st: Student) {
    set((s) => ({
      ...s,
      students: s.students.some((x) => x.id === st.id)
        ? s.students.map((x) => (x.id === st.id ? st : x))
        : [...s.students, st],
    }));
    await supabase.from("students").upsert(st);
  },
  async deleteStudent(id: string) {
    set((s) => ({ ...s, students: s.students.filter((x) => x.id !== id) }));
    await supabase.from("students").delete().eq("id", id);
  },
  async setAttendance(date: string, studentId: string, subject: string, present: boolean) {
    set((s) => ({
      ...s,
      attendance: [
        ...s.attendance.filter(
          (a) => !(a.date === date && a.studentId === studentId && a.subject === subject),
        ),
        { date, studentId, subject, present },
      ],
    }));
    await supabase
      .from("attendance")
      .upsert(
        { date, student_id: studentId, subject, present },
        { onConflict: "date,student_id,subject" },
      );
  },
  async addResult(r: ResultRecord) {
    set((s) => ({ ...s, results: [...s.results, r] }));
    await supabase.from("results").insert({
      id: r.id,
      student_id: r.studentId,
      subject: r.subject,
      semester: r.semester,
      marks: r.marks,
      mid_term_marks: r.mid_term_marks,
      practical_marks: r.practical_marks,
      final_marks: r.final_marks,
    });
  },
  async deleteResult(id: string) {
    set((s) => ({ ...s, results: s.results.filter((r) => r.id !== id) }));
    await supabase.from("results").delete().eq("id", id);
  },
  async addNotice(n: NoticeRecord) {
    set((s) => ({ ...s, notices: [n, ...s.notices] }));
    await supabase.from("notices").insert(n);
  },
  async addFee(f: FeeRecord) {
    set((s) => ({ ...s, fees: [...s.fees, f] }));
    await supabase.from("fees").insert({
      id: f.id,
      student_id: f.studentId,
      amount: f.amount,
      status: f.status,
      due_date: f.dueDate,
    });
  },
  async payFee(id: string) {
    set((s) => ({ ...s, fees: s.fees.map((f) => (f.id === id ? { ...f, status: "paid" } : f)) }));
    await supabase.from("fees").update({ status: "paid" }).eq("id", id);
  },
  async addRoutine(r: RoutineRecord) {
    set((s) => ({ ...s, routines: [...s.routines, r] }));
    await supabase.from("routines").insert({
      id: r.id,
      department: r.department,
      semester: r.semester,
      shift: r.shift,
      day: r.day,
      time: r.time,
      subject: r.subject,
      teacher: r.teacher,
      room: r.room,
    });
  },
  async addApplication(a: ApplicationRecord) {
    set((s) => ({ ...s, applications: [a, ...s.applications] }));
    await supabase.from("applications").insert({
      id: a.id,
      student_id: a.studentId,
      type: a.type,
      reason: a.reason,
      status: a.status,
      date: a.date,
    });
  },
  async updateApplicationStatus(id: string, status: "approved" | "rejected") {
    set((s) => ({
      ...s,
      applications: s.applications.map((a) => (a.id === id ? { ...a, status } : a)),
    }));
    await supabase.from("applications").update({ status }).eq("id", id);
  },
  async addAdmission(a: AdmissionRecord) {
    set((s) => ({ ...s, admissions: [...s.admissions, a] }));
    await supabase.from("admissions").insert(a);
  },
  async addFaculty(f: FacultyRecord) {
    set((s) => ({ ...s, faculties: [...s.faculties, f] }));
    await supabase.from("faculties").insert({
      id: f.id,
      name: f.name,
      department: f.department,
      course: f.course,
      teacher_id: f.teacherId,
      designation: f["designation"],
    });
  },
  async deleteFaculty(id: string) {
    set((s) => ({ ...s, faculties: s.faculties.filter((f) => f.id !== id) }));
    await supabase.from("faculties").delete().eq("id", id);
  },
  async addHostel(h: HostelRecord) {
    set((s) => ({ ...s, hostels: [...s.hostels, h] }));
    await supabase.from("hostels").insert({
      id: h.id,
      room_no: h.roomNo,
      status: h.status,
      seat_count: h.seatCount,
      booked_seats: h.bookedSeats,
      building: h["building"],
    });
  },
  async bookHostelSeat(id: string) {
    set((s) => ({
      ...s,
      hostels: s.hostels.map((h) => {
        if (h.id === id && (h.bookedSeats || 0) < (h.seatCount || 4)) {
          const newBooked = (h.bookedSeats || 0) + 1;
          return {
            ...h,
            bookedSeats: newBooked,
            status: newBooked >= (h.seatCount || 4) ? "Full" : "Available",
          };
        }
        return h;
      }),
    }));
  },
  async addLibrary(l: LibraryRecord) {
    set((s) => ({ ...s, libraries: [...s.libraries, l] }));
    await supabase.from("library_books").insert(l);
  },
  async addTransport(t: TransportRecord) {
    set((s) => ({ ...s, transports: [...s.transports, t] }));
    await supabase.from("transports").insert({
      id: t.id,
      route_name: t.routeName,
      bus_no: t.busNo,
      departure_time: t.departureTime,
      location: t["location"],
    });
  },
  async addSms(sms: SmsRecord) {
    set((current) => ({ ...current, smsAlerts: [...current.smsAlerts, sms] }));
    await supabase.from("sms_alerts").insert(sms);
  },
  async addFeeLedger(f: FeeLedgerRecord) {
    set((s) => ({ ...s, feeLedgers: [...s.feeLedgers, f] }));
  },
  async addLibraryFine(f: LibraryFineRecord) {
    set((s) => ({ ...s, libraryFines: [...s.libraryFines, f] }));
  },
  async addNotification(n: NotificationLog) {
    set((s) => ({ ...s, notificationLogs: [n, ...s.notificationLogs] }));
  },
};

export const deptName = (code: string) => DEPARTMENTS.find((d) => d.code === code)?.name ?? code;
