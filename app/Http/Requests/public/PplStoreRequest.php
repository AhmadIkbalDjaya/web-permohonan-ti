<?php

namespace App\Http\Requests\public;

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
        $file_requirements = FileRequirement::select("name", "slug", "is_required")->where("request_type", "ppl")->get();
        foreach ($file_requirements as $file_requirement) {
            $fileRequirementRules[$file_requirement->slug] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        return [
            "start_date" => "required|date",
            "end_date" => "required|date",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "required|image",
            "student_count" => "required|numeric|min:1",

            "names" => "required|array|size:" . $this->student_count,
            "names.*" => "required|string",
            "nims" => "required|array|size:" . $this->student_count,
            "nims.*" => "required|numeric",
            "pobs" => "required|array|size:" . $this->student_count,
            "pobs.*" => "required|string",
            "dobs" => "required|array|size:" . $this->student_count,
            "dobs.*" => "required|date",
            "semesters" => "required|array|size:" . $this->student_count,
            "semesters.*" => "required|integer|min:0",
            "phones" => "required|array|size:" . $this->student_count,
            "phones.*" => "required|phone:ID",

            ...$fileRequirementRules,
        ];
    }
}
