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
                "name" => "Sk Pembimbing Skripsi",
                "is_required" => true,
                "request_type" => "proposal",
                // "slug" => "sk_pembimbing_skripsi"
            ],
            [
                "name" => "Lembar Konsultasi Kedua Pembimbing",
                "is_required" => true,
                "request_type" => "proposal",
                // "slug" => "lembar_konsultasi_kedua_pembimbing"
            ],
            [
                "name" => "Lembar Persetujuan Seminar Proposal",
                "is_required" => true,
                "request_type" => "proposal",
                // "slug" => "lembar_persetujuan_seminar_proposal"
            ],
            [
                "name" => "Lembar Pengesahan Proposal Skripsi",
                "is_required" => true,
                "request_type" => "result",
                // "slug" => "lembar_pengesahan_proposal_skripsi"
            ],
            [
                "name" => "Lembar Konsultasi Kedua Pembimbing",
                "is_required" => true,
                "request_type" => "result",
                // "slug" => "lembar_konsultasi_kedua_pembimbing"
            ],
            [
                "name" => "Lembar Persetujuan Seminar Hasil",
                "is_required" => true,
                "request_type" => "result",
                // "slug" => "lembar_persetujuan_seminar_hasil"
            ],
        ];
        foreach ($file_requirements as $index => $file_requirement) {
            FileRequirement::create($file_requirement);
        }
    }
}
