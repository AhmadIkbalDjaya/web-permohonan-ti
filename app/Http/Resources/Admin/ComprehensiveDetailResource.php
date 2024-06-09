<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\IdNameResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComprehensiveDetailResource extends JsonResource
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
            "letter_number" => $this->letter_number ?? null,
            "letter_date" => $this->letter_date ?? null,
            "hod" => new LecturerResource($this->head_of_department),
            "chairman" => $this->chairman ? new LecturerResource($this->chairman) : null,
            "secretary" => $this->secretary ? new LecturerResource($this->secretary) : null,
            "essay_title" => $this->essay_title,
            "applicant_sign" => $this->applicant_sign ? url("storage/$this->applicant_sign") : "",
            "student" => new StudentDetailResource($this->student),
            "testers" => TesterResource::collection($this->testers),
            "created_at" => $this->created_at,
        ];
    }
}
