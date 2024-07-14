<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalendarScheduleResource extends JsonResource
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
            "date" => $this->date,
            "start_time" => $this->start_time,
            "name" => $this->get_schedule_relation() ? $this->get_schedule_relation()->student->name : "",
            "location" => $this->location,
            "type" => $this->get_schedule_type(),
            "relation_id" => $this->get_schedule_relation() ? $this->get_schedule_relation()->id : "",
        ];
    }

    public function get_schedule_relation()
    {
        if ($this->proposal) {
            return $this->proposal;
        } elseif ($this->result) {
            return $this->result;
        }
        return null;
    }

    public function get_schedule_type()
    {
        if ($this->result) {
            return "result";
        }
        return "proposal";

    }
}
