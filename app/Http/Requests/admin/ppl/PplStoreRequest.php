<?php

namespace App\Http\Requests\admin\ppl;

use App\Models\FileRequirement;
use Illuminate\Foundation\Http\FormRequest;

class PplStoreRequest extends FormRequest
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
        $file_requirements = FileRequirement::where("request_type", "ppl")->get();
        foreach ($file_requirements as $file_requirement) {
            $fileRequirementRules[$file_requirement->slug] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        return [
            "status_id" => "nullable|exists:statuses,id",
            "status_description_id" => "nullable|exists:status_descriptions,id",
            "letter_number_mentor" => "nullable",
            "letter_number_introduction" => "nullable",
            "letter_date" => "nullable|date",
            "addressed_to" => "nullable|string",
            "mentor_id" => "nullable|exists:lecturers,id",

            "start_date" => "required|date",
            "end_date" => "required|date",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "required|image",
            "student_count" => "required|numeric|min:1",

            "names" => "required|array|min:" . $this->student_count,
            "names.*" => "required|string",
            "nims" => "required|array|min:" . $this->student_count,
            "nims.*" => "required|numeric",
            "pobs" => "required|array|min:" . $this->student_count,
            "pobs.*" => "required|string",
            "dobs" => "required|array|min:" . $this->student_count,
            "dobs.*" => "required|date",
            "semesters" => "required|array|min:" . $this->student_count,
            "semesters.*" => "required|integer|min:0",
            "phones" => "required|array|min:" . $this->student_count,
            "phones.*" => "required|phone:ID",

            ...$fileRequirementRules,
        ];
    }
}
