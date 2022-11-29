<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EnrollmentController extends Controller
{

    public function index(Request $request)
    {
        $data = Enrollment::with('course')->where('student_id',$request->student_id)->get();
        return response()->json($data,200);
    }

    public function getStatus(){
        $data = Enrollment::with(['student' => function($q){
            $q->with("user");
        }])->with('course')->get();
        return response()->json($data,200);
    }



    public function store(Request $request)
    {
        $data = Validator::make($request->all(),[
            'payment_id' => 'required',
            'student_id' => 'required',
            'course_id' => 'required|unique:enrollments,course_id,NULL,id,student_id,'.$request->student_id,
            'price_paid' => 'required',
        ]);

        if($data->fails()){
            return response()->json(["msg" => $data->errors()], 200);
        }
        else{
            if(Enrollment::create($data->validated())){
                $enrollments = Enrollment::with('course')->where('student_id',$request->student_id)->get();
                return response()->json($enrollments, 200);
            }
        }
    }
}
