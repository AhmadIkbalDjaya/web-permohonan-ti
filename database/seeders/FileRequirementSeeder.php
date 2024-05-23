<?php

namespace Database\Seeders;

use App\Models\FileRequirement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FileRequirementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file_requirements = [
            [
                "name" => "sk_pembimbing_skripsi",
                "is_required" => true,
                "request_type" => "proposals",
            ],
            [
                "name" => "lembar_konsultasi_kedua_pembimbing",
                "is_required" => true,
                "request_type" => "proposals",
            ],
            [
                "name" => "lembar_persetujuan_seminar_proposal",
                "is_required" => true,
                "request_type" => "proposals",
            ],
            [
                "name" => "lembar_pengesahan_proposal_skripsi",
                "is_required" => true,
                "request_type" => "results",
            ],
            [
                "name" => "lembar_konsultasi_kedua_pembimbing",
                "is_required" => true,
                "request_type" => "results",
            ],
            [
                "name" => "lembar_persetujuan_seminar_hasil",
                "is_required" => true,
                "request_type" => "results",
            ],
        ];
        foreach ($file_requirements as $index => $file_requirement) {
            FileRequirement::create($file_requirement);
        }
    }
}
