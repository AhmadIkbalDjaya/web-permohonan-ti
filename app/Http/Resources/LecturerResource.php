<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerResource extends JsonResource
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
            "gender" => $this->gender,
            "nip" => $this->nip,
            "signature" => $this->signature ? url("storage/$this->signature") : "",
            "role" => $this->role,
        ];
    }
}
