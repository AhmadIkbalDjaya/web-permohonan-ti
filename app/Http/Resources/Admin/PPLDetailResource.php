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
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "location" => $this->location,
            "location_address" => $this->location_address,
            "applicant_sign" => $this->applicant_sign ? url("storage/$this->applicant_sign") : "",
            "mentor" => new MentorResource($this->mentor),
            "students" => StudentDetailResource::collection($this->students),
            "created_at" => $this->created_at,
        ];
    }
}
