<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlumniController extends Controller
{
    public function index(){
        $data = Alumni::with(['student' => function($query){
            $query->with('user');
        }])->get();
        return response()->json($data,200);
    }

    public function store(Request $request){
        $data = Validator::make($request->all(),[
            'student_id' => 'required',
            'company_name' => 'required',
            'profile' => 'required'
        ]);
        if($data->fails()){
            return response()->json(["msg" => $data->errors()], 404);
        }
        else{
            $student =  Alumni::create($data->validated());
            return response()->json($student,200);
        }
    }
}
