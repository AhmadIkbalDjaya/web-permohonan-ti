<?php

namespace Database\Seeders;

use App\Models\StatusDescription;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusDescriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statusDescriptions = [
            ['status_id' => 1, 'description' => 'Menunggu tinjauan', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['status_id' => 1, 'description' => 'Menunggu persetujuan', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['status_id' => 2, 'description' => 'Disetujui oleh manajer', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['status_id' => 2, 'description' => 'Disetujui untuk diproses', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['status_id' => 3, 'description' => 'Ditolak karena kesalahan', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['status_id' => 3, 'description' => 'Ditolak setelah tinjauan', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
        ];

        StatusDescription::insert($statusDescriptions);
    }
}
