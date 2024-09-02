<?php

namespace App\Http\Requests\admin\result;

use App\Models\FileRequirement;
use Illuminate\Foundation\Http\FormRequest;

class ResultUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $fileRequirementRules = [];
        $file_requirements = FileRequirement::where("request_type", "result")->get();
        foreach ($file_requirements as $file_requirement) {
            $fileRequirementRules[$file_requirement->name] = "nullable|mimes:pdf";
        }
        return [
            "status_id" => "nullable|exists:statuses,id",
            "status_description_id" => "nullable|exists:status_descriptions,id",
            "letter_number" => "nullable",
            "letter_date" => "nullable|date",
            "chairman_id" => "nullable|exists:lecturers,id",
            "secretary_id" => "nullable|exists:lecturers,id",
            "executor_id" => "nullable|exists:lecturers,id",

            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|phone:ID",
            "essay_title" => "required",
            "applicant_sign" => "nullable|image",

            "mentor_ids" => "array|min:2",
            "mentor_ids.*" => "required|string|exists:lecturers,id",

            "tester_ids" => "nullable|array",
            "tester_ids.*" => "nullable|string|exists:lecturers,id",

            "date" => "nullable|date",
            "time_zone" => "required|in:wib,wita,wit",
            "start_time" => "nullable|date_format:H:i",
            "end_time" => "nullable|date_format:H:i",
            "location" => "nullable|string",

            ...$fileRequirementRules,
        ];
    }
}
