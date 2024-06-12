<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentDetailResource extends JsonResource
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
            "name" => $this->name,
            "nim" => $this->nim,
            "pob" => $this->pob,
            "dob" => $this->dob,
            "semester" => $this->semester,
            "phone" => $this->phone,
        ];
    }
}
