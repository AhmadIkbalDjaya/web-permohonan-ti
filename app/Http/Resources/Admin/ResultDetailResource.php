<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultDetailResource extends JsonResource
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
            "essay_title" => $this->essay_title,
            "applicant_sign" => $this->applicant_sign ? url("storage/$this->applicant_sign") : "",
            "student" => new StudentDetailResource($this->student),
            "schedule" => new ScheduleResource($this->schedule),
            "mentors" => MentorResource::collection($this->mentors),
            "testers" => TesterResource::collection($this->testers),
            "files" => TesterResource::collection($this->files),
            "created_at" => $this->created_at,
        ];
    }
}
