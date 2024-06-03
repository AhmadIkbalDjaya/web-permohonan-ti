<?php

namespace Database\Seeders;

use App\Models\Lecturer;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LecturerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lecturers = [
            [
                "name" => "Mustikasari, S.Kom., M.Kom.",
                "gender" => "female",
                "nip" => "19781106 200604 2 001",
                "signature" => "head_signature.jpg",
                "role" => "head",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ]
        ];
        Lecturer::insert($lecturers);

    }
}
