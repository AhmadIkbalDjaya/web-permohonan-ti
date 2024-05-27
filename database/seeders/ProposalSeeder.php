<?php

namespace Database\Seeders;

use App\Models\Proposal;
use App\Models\Schedule;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $proposals = [
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
        //             "time" => null,
        //             "location" => null,
        //         ],
        //         "essay_title" => "",
        //         "applicant_sign" => "",
        //     ]
        // ];
        $proposals = [
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
                    "date" => "2024-06-01",
                    "time" => "10:00",
                    "location" => "Room A101",
                ],
                "essay_title" => "The Impact of Climate Change on Marine Life",
                "applicant_sign" => "Alice J.",
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
                    "date" => "2024-06-02",
                    "time" => "11:00",
                    "location" => "Room B202",
                ],
                "essay_title" => "Renewable Energy: Prospects and Challenges",
                "applicant_sign" => "Bob S.",
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
                    "date" => "2024-06-03",
                    "time" => "12:00",
                    "location" => "Room C303",
                ],
                "essay_title" => "Artificial Intelligence in Healthcare",
                "applicant_sign" => "Cathy B.",
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
                    "date" => "2024-06-04",
                    "time" => "13:00",
                    "location" => "Room D404",
                ],
                "essay_title" => "Blockchain Technology: A Decentralized Future",
                "applicant_sign" => "David L.",
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
                    "date" => "2024-06-05",
                    "time" => "14:00",
                    "location" => "Room E505",
                ],
                "essay_title" => "The Evolution of Social Media",
                "applicant_sign" => "Eva M.",
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
                    "date" => "2024-06-06",
                    "time" => "15:00",
                    "location" => "Room F606",
                ],
                "essay_title" => "Cybersecurity Threats in the Modern World",
                "applicant_sign" => "Frank G.",
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
                    "date" => "2024-06-07",
                    "time" => "16:00",
                    "location" => "Room G707",
                ],
                "essay_title" => "The Role of Genetics in Modern Medicine",
                "applicant_sign" => "Grace H.",
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
                    "date" => "2024-06-08",
                    "time" => "09:00",
                    "location" => "Room H808",
                ],
                "essay_title" => "Urban Planning and Sustainable Development",
                "applicant_sign" => "Henry W.",
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
                    "date" => "2024-06-09",
                    "time" => "10:30",
                    "location" => "Room I909",
                ],
                "essay_title" => "The Future of Electric Vehicles",
                "applicant_sign" => "Isabel A.",
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
                    "date" => "2024-06-10",
                    "time" => "11:30",
                    "location" => "Room J1010",
                ],
                "essay_title" => "Advancements in Renewable Energy Technologies",
                "applicant_sign" => "Jack S.",
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
                    "date" => "2024-06-11",
                    "time" => "12:30",
                    "location" => "Room K1111",
                ],
                "essay_title" => "Artificial Intelligence: Ethical Considerations",
                "applicant_sign" => "Kelly T.",
            ],
            [
                "student" => [
                    "name" => "Liam Campbell",
                    "nim" => "123456012",
                    "pob" => "Jacksonville",
                    "dob" => "1998-03-15",
                    "semester" => "7",
                    "phone" => "555-3455",
                ],
                "schedule" => [
                    "date" => "2024-06-12",
                    "time" => "13:30",
                    "location" => "Room L1212",
                ],
                "essay_title" => "The Impact of Globalization on Local Cultures",
                "applicant_sign" => "Liam C.",
            ],
            [
                "student" => [
                    "name" => "Mia Harris",
                    "nim" => "123456013",
                    "pob" => "Fort Worth",
                    "dob" => "2000-09-25",
                    "semester" => "5",
                    "phone" => "555-4566",
                ],
                "schedule" => [
                    "date" => "2024-06-13",
                    "time" => "14:30",
                    "location" => "Room M1313",
                ],
                "essay_title" => "The Use of Big Data in Business Decision Making",
                "applicant_sign" => "Mia H.",
            ],
            [
                "student" => [
                    "name" => "Noah Robinson",
                    "nim" => "123456014",
                    "pob" => "Columbus",
                    "dob" => "1999-11-29",
                    "semester" => "6",
                    "phone" => "555-5677",
                ],
                "schedule" => [
                    "date" => "2024-06-14",
                    "time" => "15:30",
                    "location" => "Room N1414",
                ],
                "essay_title" => "The Role of Social Media in Modern Politics",
                "applicant_sign" => "Noah R.",
            ],
            [
                "student" => [
                    "name" => "Olivia Walker",
                    "nim" => "123456015",
                    "pob" => "Charlotte",
                    "dob" => "2001-12-20",
                    "semester" => "4",
                    "phone" => "555-6788",
                ],
                "schedule" => [
                    "date" => "2024-06-15",
                    "time" => "16:30",
                    "location" => "Room O1515",
                ],
                "essay_title" => "Climate Change and Its Economic Impact",
                "applicant_sign" => "Olivia W.",
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
                    "date" => "2024-06-16",
                    "time" => "09:00",
                    "location" => "Room P1616",
                ],
                "essay_title" => "Innovations in Biotechnology",
                "applicant_sign" => "Paul Y.",
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
                    "date" => "2024-06-17",
                    "time" => "10:00",
                    "location" => "Room Q1717",
                ],
                "essay_title" => "The Ethics of Genetic Engineering",
                "applicant_sign" => "Quinn D.",
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
                    "date" => "2024-06-18",
                    "time" => "11:00",
                    "location" => "Room R1818",
                ],
                "essay_title" => "Sustainable Agriculture Practices",
                "applicant_sign" => "Rachel M.",
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
                    "date" => "2024-06-19",
                    "time" => "12:00",
                    "location" => "Room S1919",
                ],
                "essay_title" => "The Future of Space Exploration",
                "applicant_sign" => "Sam B.",
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
                    "date" => "2024-06-20",
                    "time" => "13:00",
                    "location" => "Room T2020",
                ],
                "essay_title" => "The Role of Education in Economic Development",
                "applicant_sign" => "Tina C.",
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
                    "date" => "2024-06-21",
                    "time" => "14:00",
                    "location" => "Room U2121",
                ],
                "essay_title" => "The Psychology of Consumer Behavior",
                "applicant_sign" => "Uma R.",
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
                    "date" => "2024-06-22",
                    "time" => "15:00",
                    "location" => "Room V2222",
                ],
                "essay_title" => "The Impact of Automation on Employment",
                "applicant_sign" => "Victor B.",
            ],
            [
                "student" => [
                    "name" => "Wendy Lee",
                    "nim" => "123456023",
                    "pob" => "Nashville",
                    "dob" => "2001-07-14",
                    "semester" => "4",
                    "phone" => "555-4563",
                ],
                "schedule" => [
                    "date" => "2024-06-23",
                    "time" => "16:00",
                    "location" => "Room W2323",
                ],
                "essay_title" => "The Role of Art in Society",
                "applicant_sign" => "Wendy L.",
            ],
            [
                "student" => [
                    "name" => "Xander White",
                    "nim" => "123456024",
                    "pob" => "Detroit",
                    "dob" => "2000-11-30",
                    "semester" => "5",
                    "phone" => "555-5674",
                ],
                "schedule" => [
                    "date" => "2024-06-24",
                    "time" => "09:00",
                    "location" => "Room X2424",
                ],
                "essay_title" => "The Evolution of Human Rights",
                "applicant_sign" => "Xander W.",
            ],
            [
                "student" => [
                    "name" => "Yara Clark",
                    "nim" => "123456025",
                    "pob" => "Portland",
                    "dob" => "1998-04-05",
                    "semester" => "7",
                    "phone" => "555-6785",
                ],
                "schedule" => [
                    "date" => "2024-06-25",
                    "time" => "10:00",
                    "location" => "Room Y2525",
                ],
                "essay_title" => "The Future of Work in the Digital Age",
                "applicant_sign" => "Yara C.",
            ]
        ];
        foreach ($proposals as $index => $proposal) {
            $newStudent = Student::create($proposal["student"]);
            $newSchedule = Schedule::create($proposal["schedule"]);
            Proposal::create([
                "student_id" => $newStudent->id,
                "schedule_id" => $newSchedule->id,
                "essay_title" => $proposal["essay_title"],
                "applicant_sign" => $proposal["applicant_sign"],
            ]);
        }
    }
}