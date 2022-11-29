<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index()
    {
        $data = Student::with('user')->get();
        return response()->json($data,200);
    }

    public function store(Request $request)
    {
        $data = Validator::make($request->all(),[
            'user_id' => 'required',
            'gender' => 'required',
            'city' => 'required',
            'state' => 'required',
            'education' => 'required',
        ]);
        if($data->fails()){
            return response()->json(["msg" => $data->errors()], 404);
        }
        else{
            $student =  Student::create($data->validated());
            return response()->json($student,200);
        }
    
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function update(Request $request, Student $s)
    {
        $data = Validator::make($request->all(),[
            'user_id' => 'required',
            'gender' => 'required',
            'city' => 'required',
            'state' => 'required',
            'education' => 'required'
        ]);
        if($data->fails()){
            return response()->json(["msg" => $data->errors()], 200);
        }
        else{
            $s->user_id = $request->user_id;
            $s->address = $request->address;
            $s->gender = $request->gender;
            $s->city = $request->city;
            $s->state = $request->state;
            $s->education = $request->education;
            $s->dob = $request->dob;
            $s->save();
            return response()->json($s,200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $s)
    {
        $res = $s->delete();
        if($res){
            $students = Student::with('user')->get();
            return response()->json($students,200);
        }
    }
}
