<?php

namespace Database\Seeders;

use App\Models\Mentor;
use App\Models\Result;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\Tester;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $results = [
        //     [
        //         "student" => [
        //             "name" => "",
        //             "nim" => "",
        //             "pob" => "",
        //             "dob" => "",
        //             "semester" => "",
        //             "phone" => "",
        //         ],
        //         "schedule" => [
        //             "date" => null,
        //             "start_time" => null,
        //             "end_time" => null,
        //             "location" => null,
        //         ],
        //         "code" => "",
        //         "essay_title" => "",
        //         "applicant_sign" => "",
        //         "mentors" => ["", ""],
        //         "testers" => ["", ""],
        //     ]
        // ];
        $results = [
            [
                "student" => [
                    "name" => "Alice Johnson",
                    "nim" => "123456001",
                    "pob" => "New York",
                    "dob" => "2000-01-15",
                    "semester" => "5",
                    "phone" => "555-1234",
                ],
                "schedule" => [
                    "date" => "2024-07-01",
                    "start_time" => "10:00",
                    "end_time" => "12:00",
                    "location" => "Room A101",
                ],
                "code" => "P001",
                "essay_title" => "The Impact of Climate Change on Marine Life",
                "applicant_sign" => "Alice J.",
                "mentors" => [10, 22],
                "testers" => [35, 47],
            ],
            [
                "student" => [
                    "name" => "Bob Smith",
                    "nim" => "123456002",
                    "pob" => "Los Angeles",
                    "dob" => "1999-05-23",
                    "semester" => "6",
                    "phone" => "555-2345",
                ],
                "schedule" => [
                    "date" => "2024-07-02",
                    "start_time" => "11:00",
                    "end_time" => "13:00",
                    "location" => "Room B202",
                ],
                "code" => "P002",
                "essay_title" => "Renewable Energy: Prospects and Challenges",
                "applicant_sign" => "Bob S.",
                "mentors" => [8, 14],
                "testers" => [29, 51],
            ],
            [
                "student" => [
                    "name" => "Cathy Brown",
                    "nim" => "123456003",
                    "pob" => "Chicago",
                    "dob" => "2001-02-10",
                    "semester" => "4",
                    "phone" => "555-3456",
                ],
                "schedule" => [
                    "date" => "2024-07-03",
                    "start_time" => "12:00",
                    "end_time" => "14:00",
                    "location" => "Room C303",
                ],
                "code" => "P003",
                "essay_title" => "Artificial Intelligence in Healthcare",
                "applicant_sign" => "Cathy B.",
                "mentors" => [15, 27],
                "testers" => [39, 50],
            ],
            [
                "student" => [
                    "name" => "David Lee",
                    "nim" => "123456004",
                    "pob" => "Houston",
                    "dob" => "1998-11-05",
                    "semester" => "7",
                    "phone" => "555-4567",
                ],
                "schedule" => [
                    "date" => "2024-07-04",
                    "start_time" => "13:00",
                    "end_time" => "15:00",
                    "location" => "Room D404",
                ],
                "code" => "P004",
                "essay_title" => "Blockchain Technology: A Decentralized Future",
                "applicant_sign" => "David L.",
                "mentors" => [5, 32],
                "testers" => [44, 58],
            ],
            [
                "student" => [
                    "name" => "Eva Martin",
                    "nim" => "123456005",
                    "pob" => "Phoenix",
                    "dob" => "2000-07-19",
                    "semester" => "5",
                    "phone" => "555-5678",
                ],
                "schedule" => [
                    "date" => "2024-07-05",
                    "start_time" => "14:00",
                    "end_time" => "16:00",
                    "location" => "Room E505",
                ],
                "code" => "P005",
                "essay_title" => "The Evolution of Social Media",
                "applicant_sign" => "Eva M.",
                "mentors" => [11, 21],
                "testers" => [38, 52],
            ],
            [
                "student" => [
                    "name" => "Frank Green",
                    "nim" => "123456006",
                    "pob" => "Philadelphia",
                    "dob" => "1999-03-08",
                    "semester" => "6",
                    "phone" => "555-6789",
                ],
                "schedule" => [
                    "date" => "2024-07-06",
                    "start_time" => "15:00",
                    "end_time" => "17:00",
                    "location" => "Room F606",
                ],
                "code" => "P006",
                "essay_title" => "Cybersecurity Threats in the Modern World",
                "applicant_sign" => "Frank G.",
                "mentors" => [13, 28],
                "testers" => [36, 46],
            ],
            [
                "student" => [
                    "name" => "Grace Hill",
                    "nim" => "123456007",
                    "pob" => "San Antonio",
                    "dob" => "2001-09-30",
                    "semester" => "4",
                    "phone" => "555-7890",
                ],
                "schedule" => [
                    "date" => "2024-07-07",
                    "start_time" => "16:00",
                    "end_time" => "18:00",
                    "location" => "Room G707",
                ],
                "code" => "P007",
                "essay_title" => "The Role of Genetics in Modern Medicine",
                "applicant_sign" => "Grace H.",
                "mentors" => [6, 17],
                "testers" => [34, 43],
            ],
            [
                "student" => [
                    "name" => "Henry Wilson",
                    "nim" => "123456008",
                    "pob" => "San Diego",
                    "dob" => "1998-06-17",
                    "semester" => "7",
                    "phone" => "555-8901",
                ],
                "schedule" => [
                    "date" => "2024-07-08",
                    "start_time" => "09:00",
                    "end_time" => "11:00",
                    "location" => "Room H808",
                ],
                "code" => "P008",
                "essay_title" => "Urban Planning and Sustainable Development",
                "applicant_sign" => "Henry W.",
                "mentors" => [9, 19],
                "testers" => [40, 49],
            ],
            [
                "student" => [
                    "name" => "Isabel Adams",
                    "nim" => "123456009",
                    "pob" => "Dallas",
                    "dob" => "2000-04-12",
                    "semester" => "5",
                    "phone" => "555-9012",
                ],
                "schedule" => [
                    "date" => "2024-07-09",
                    "start_time" => "10:30",
                    "end_time" => "12:30",
                    "location" => "Room I909",
                ],
                "code" => "P009",
                "essay_title" => "The Future of Electric Vehicles",
                "applicant_sign" => "Isabel A.",
                "mentors" => [14, 26],
                "testers" => [45, 59],
            ],
            [
                "student" => [
                    "name" => "Jack Scott",
                    "nim" => "123456010",
                    "pob" => "San Jose",
                    "dob" => "1999-08-22",
                    "semester" => "6",
                    "phone" => "555-1233",
                ],
                "schedule" => [
                    "date" => "2024-07-10",
                    "start_time" => "11:30",
                    "end_time" => "13:30",
                    "location" => "Room J1010",
                ],
                "code" => "P010",
                "essay_title" => "Advancements in Renewable Energy Technologies",
                "applicant_sign" => "Jack S.",
                "mentors" => [20, 30],
                "testers" => [37, 48],
            ],
            [
                "student" => [
                    "name" => "Kelly Turner",
                    "nim" => "123456011",
                    "pob" => "Austin",
                    "dob" => "2001-10-02",
                    "semester" => "4",
                    "phone" => "555-2344",
                ],
                "schedule" => [
                    "date" => "2024-07-11",
                    "start_time" => "12:30",
                    "end_time" => "14:30",
                    "location" => "Room K1111",
                ],
                "code" => "P011",
                "essay_title" => "The Effects of Social Media on Mental Health",
                "applicant_sign" => "Kelly T.",
                "mentors" => [7, 18],
                "testers" => [31, 60],
            ],
            [
                "student" => [
                    "name" => "Liam Clark",
                    "nim" => "123456012",
                    "pob" => "Jacksonville",
                    "dob" => "1998-03-21",
                    "semester" => "7",
                    "phone" => "555-3455",
                ],
                "schedule" => [
                    "date" => "2024-07-12",
                    "start_time" => "13:30",
                    "end_time" => "15:30",
                    "location" => "Room L1212",
                ],
                "code" => "P012",
                "essay_title" => "The Future of Financial Technologies",
                "applicant_sign" => "Liam C.",
                "mentors" => [16, 24],
                "testers" => [42, 55],
            ],
            [
                "student" => [
                    "name" => "Mia Davis",
                    "nim" => "123456013",
                    "pob" => "Fort Worth",
                    "dob" => "2000-09-05",
                    "semester" => "5",
                    "phone" => "555-4566",
                ],
                "schedule" => [
                    "date" => "2024-07-13",
                    "start_time" => "14:30",
                    "end_time" => "16:30",
                    "location" => "Room M1313",
                ],
                "code" => "P013",
                "essay_title" => "The Role of Women in STEM Fields",
                "applicant_sign" => "Mia D.",
                "mentors" => [25, 33],
                "testers" => [41, 53],
            ],
            [
                "student" => [
                    "name" => "Noah Edwards",
                    "nim" => "123456014",
                    "pob" => "Columbus",
                    "dob" => "1999-11-11",
                    "semester" => "6",
                    "phone" => "555-5677",
                ],
                "schedule" => [
                    "date" => "2024-07-14",
                    "start_time" => "15:30",
                    "end_time" => "17:30",
                    "location" => "Room N1414",
                ],
                "code" => "P014",
                "essay_title" => "The Future of Renewable Energy",
                "applicant_sign" => "Noah E.",
                "mentors" => [12, 29],
                "testers" => [54, 60],
            ],
            [
                "student" => [
                    "name" => "Olivia White",
                    "nim" => "123456015",
                    "pob" => "Charlotte",
                    "dob" => "2001-12-20",
                    "semester" => "4",
                    "phone" => "555-6788",
                ],
                "schedule" => [
                    "date" => "2024-07-15",
                    "start_time" => "16:30",
                    "end_time" => "18:30",
                    "location" => "Room O1515",
                ],
                "code" => "P015",
                "essay_title" => "Climate Change and Its Economic Impact",
                "applicant_sign" => "Olivia W.",
                "mentors" => [23, 35],
                "testers" => [56, 57],
            ],
            [
                "student" => [
                    "name" => "Paul Young",
                    "nim" => "123456016",
                    "pob" => "San Francisco",
                    "dob" => "1998-01-12",
                    "semester" => "7",
                    "phone" => "555-7899",
                ],
                "schedule" => [
                    "date" => "2024-07-16",
                    "start_time" => "09:00",
                    "end_time" => "11:00",
                    "location" => "Room P1616",
                ],
                "code" => "P016",
                "essay_title" => "Innovations in Biotechnology",
                "applicant_sign" => "Paul Y.",
                "mentors" => [37, 44],
                "testers" => [49, 52],
            ],
            [
                "student" => [
                    "name" => "Quinn Davis",
                    "nim" => "123456017",
                    "pob" => "Indianapolis",
                    "dob" => "2000-05-06",
                    "semester" => "5",
                    "phone" => "555-8900",
                ],
                "schedule" => [
                    "date" => "2024-07-17",
                    "start_time" => "10:00",
                    "end_time" => "12:00",
                    "location" => "Room Q1717",
                ],
                "code" => "P017",
                "essay_title" => "The Ethics of Genetic Engineering",
                "applicant_sign" => "Quinn D.",
                "mentors" => [32, 39],
                "testers" => [48, 57],
            ],
            [
                "student" => [
                    "name" => "Rachel Moore",
                    "nim" => "123456018",
                    "pob" => "Seattle",
                    "dob" => "1999-02-14",
                    "semester" => "6",
                    "phone" => "555-9011",
                ],
                "schedule" => [
                    "date" => "2024-07-18",
                    "start_time" => "11:00",
                    "end_time" => "13:00",
                    "location" => "Room R1818",
                ],
                "code" => "P018",
                "essay_title" => "Sustainable Agriculture Practices",
                "applicant_sign" => "Rachel M.",
                "mentors" => [45, 58],
                "testers" => [50, 51],
            ],
            [
                "student" => [
                    "name" => "Sam Bennett",
                    "nim" => "123456019",
                    "pob" => "Denver",
                    "dob" => "2001-08-05",
                    "semester" => "4",
                    "phone" => "555-0123",
                ],
                "schedule" => [
                    "date" => "2024-07-19",
                    "start_time" => "12:00",
                    "end_time" => "14:00",
                    "location" => "Room S1919",
                ],
                "code" => "P019",
                "essay_title" => "The Future of Space Exploration",
                "applicant_sign" => "Sam B.",
                "mentors" => [33, 43],
                "testers" => [52, 60],
            ],
            [
                "student" => [
                    "name" => "Tina Collins",
                    "nim" => "123456020",
                    "pob" => "Washington",
                    "dob" => "2000-03-21",
                    "semester" => "5",
                    "phone" => "555-1230",
                ],
                "schedule" => [
                    "date" => "2024-07-20",
                    "start_time" => "13:00",
                    "end_time" => "15:00",
                    "location" => "Room T2020",
                ],
                "code" => "P020",
                "essay_title" => "The Role of Education in Economic Development",
                "applicant_sign" => "Tina C.",
                "mentors" => [18, 29],
                "testers" => [53, 54],
            ],
            [
                "student" => [
                    "name" => "Uma Reed",
                    "nim" => "123456021",
                    "pob" => "Boston",
                    "dob" => "1999-06-18",
                    "semester" => "6",
                    "phone" => "555-2341",
                ],
                "schedule" => [
                    "date" => "2024-07-21",
                    "start_time" => "14:00",
                    "end_time" => "16:00",
                    "location" => "Room U2121",
                ],
                "code" => "P021",
                "essay_title" => "The Psychology of Consumer Behavior",
                "applicant_sign" => "Uma R.",
                "mentors" => [35, 40],
                "testers" => [55, 56],
            ],
            [
                "student" => [
                    "name" => "Victor Baker",
                    "nim" => "123456022",
                    "pob" => "El Paso",
                    "dob" => "1998-12-29",
                    "semester" => "7",
                    "phone" => "555-3452",
                ],
                "schedule" => [
                    "date" => "2024-07-22",
                    "start_time" => "15:00",
                    "end_time" => "17:00",
                    "location" => "Room V2222",
                ],
                "code" => "P022",
                "essay_title" => "The Future of Artificial Intelligence",
                "applicant_sign" => "Victor B.",
                "mentors" => [46, 50],
                "testers" => [57, 58],
            ],
            [
                "student" => [
                    "name" => "Wendy Lewis",
                    "nim" => "123456023",
                    "pob" => "Nashville",
                    "dob" => "2000-07-11",
                    "semester" => "5",
                    "phone" => "555-4563",
                ],
                "schedule" => [
                    "date" => "2024-07-23",
                    "start_time" => "16:00",
                    "end_time" => "18:00",
                    "location" => "Room W2323",
                ],
                "code" => "P023",
                "essay_title" => "Mental Health Awareness and Education",
                "applicant_sign" => "Wendy L.",
                "mentors" => [47, 49],
                "testers" => [58, 59],
            ],
            [
                "student" => [
                    "name" => "Xander Harris",
                    "nim" => "123456024",
                    "pob" => "Detroit",
                    "dob" => "1999-04-09",
                    "semester" => "6",
                    "phone" => "555-5674",
                ],
                "schedule" => [
                    "date" => "2024-07-24",
                    "start_time" => "09:00",
                    "end_time" => "11:00",
                    "location" => "Room X2424",
                ],
                "code" => "P024",
                "essay_title" => "The Influence of Technology on Education",
                "applicant_sign" => "Xander H.",
                "mentors" => [51, 55],
                "testers" => [60, 59],
            ],
            [
                "student" => [
                    "name" => "Yara Thompson",
                    "nim" => "123456025",
                    "pob" => "Memphis",
                    "dob" => "1999-09-25",
                    "semester" => "6",
                    "phone" => "555-6785",
                ],
                "schedule" => [
                    "date" => "2024-07-25",
                    "start_time" => "10:00",
                    "end_time" => "12:00",
                    "location" => "Room Y2525",
                ],
                "code" => "P025",
                "essay_title" => "The Future of Work in the Digital Age",
                "applicant_sign" => "Yara T.",
                "mentors" => [53, 54],
                "testers" => [59, 60],
            ],
        ];

        foreach ($results as $index => $result) {
            $newStudent = Student::create($result["student"]);
            $newSchedule = Schedule::create($result["schedule"]);
            $newResult = Result::create([
                "student_id" => $newStudent->id,
                "schedule_id" => $newSchedule->id,
                "code" => $result["code"],
                "essay_title" => $result["essay_title"],
                "applicant_sign" => $result["applicant_sign"],
            ]);
            foreach ($result["mentors"] as $index => $mentor) {
                Mentor::create([
                    "lecturer_id" => $mentor,
                    "order" => $index,
                    "result_id" => $newResult->id,
                ]);
            }
            foreach ($result["testers"] as $index => $tester) {
                Tester::create([
                    "lecturer_id" => $tester,
                    "order" => $index,
                    "result_id" => $newResult->id,
                ]);
            }
        }
    }
}
