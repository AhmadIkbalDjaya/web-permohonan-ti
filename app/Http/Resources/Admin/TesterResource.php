<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TesterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "lecturer_id" => $this->lecturer_id ?? null,
            "lecturer" => new LecturerResource($this->lecturer),
            "order" => $this->order,
            "description" => $this->description,
        ];
    }
}
