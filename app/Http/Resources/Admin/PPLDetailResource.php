<?php

namespace App\Http\Resources\Admin;

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
            "status" => $this->status->name,
            "status_description" => $this->status_description->description,
            "letter_number_mentor" => $this->letter_number_mentor,
            "letter_number_introduction" => $this->letter_number_introduction,
            "letter_date" => $this->letter_date,
            "addressed_to" => $this->addressed_to,
            "hod" => new LecturerResource($this->head_of_department),
            "mentor" => $this->mentor->name,

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
