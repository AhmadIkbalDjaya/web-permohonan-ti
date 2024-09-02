<?php

namespace App\Http\Requests\public;

use App\Models\FileRequirement;
use Illuminate\Foundation\Http\FormRequest;

class ComprehensiveStoreRequest extends FormRequest
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
        $filerequirementRules = [];
        $file_requirements = FileRequirement::select("name", "slug", "is_required")->where("request_type", "comprehensive")->get();
        foreach ($file_requirements as $file_requirement) {
            $filerequirementRules[$file_requirement->slug] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        return [
            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|phone:ID",
            "essay_title" => "required",
            "applicant_sign" => "required|image",

            ...$filerequirementRules,
        ];
    }
}
