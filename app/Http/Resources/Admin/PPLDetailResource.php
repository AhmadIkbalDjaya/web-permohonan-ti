<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\IdNameResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PPLDetailResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "code" => $this->code,
            "status" => new IdNameResource($this->status),
            "status_description" => new StatusDescriptionResource($this->status_description),
            "letter_number_mentor" => $this->letter_number_mentor ?? null,
            "letter_number_introduction" => $this->letter_number_introduction ?? null,
            "letter_date" => $this->letter_date ?? null,
            "addressed_to" => $this->addressed_to ?? null,
            "hod" => new LecturerResource($this->head_of_department),
            "mentor" => new LecturerResource($this->mentor),

            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "location" => $this->location,
            "location_address" => $this->location_address,
            "applicant_sign" => $this->applicant_sign ? url("storage/$this->applicant_sign") : "",
            "students" => StudentDetailResource::collection($this->students),
            "created_at" => $this->created_at,
        ];
    }
}
