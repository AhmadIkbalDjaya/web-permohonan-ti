<?php

namespace App\Http\Requests\admin\lecturer;

use Illuminate\Foundation\Http\FormRequest;

class LecturerStoreRequest extends FormRequest
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
        return [
            "name" => "required",
            "gender" => "required|in:male,female",
            "nip" => "nullable",
            "role" => "required|in:head,secretary,lecturer,staff",
            "signature" => "required_if:role,head,secretary|image",
        ];
    }
}
