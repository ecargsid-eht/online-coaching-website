<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\CourseVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CoursesController extends Controller
{
    public function index()
    {
        $data = Courses::all();
        return response()->json($data,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = Validator::make($request->all(),[
            'course_name' => 'required',
            'instructor' => 'required',
            'duration' => 'required',
            'image' => 'required',
            'video' => 'required',
            'price' => 'required',
            'description' => 'required',
        ]);

        if($data->fails()){
            return response()->json(["msg" => $data->errors()], 400);
        }
        else{
            $newcourse = Courses::create($data->safe()->except(['video']));
            foreach ($request->video as $key => $vid) {
                $cv = new CourseVideo();
                $cv->courses_id = $newcourse->id;
                $cv->video_serial  =$key+1;
                $cv->video_url = $vid;
                $cv->save();
            }
            $courses = Courses::all();
            return response()->json($courses, 200);
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
    public function update(Request $request, Courses $c)
    {
        $data = Validator::make($request->all(),[
            'title' => 'required',
            'duration' => 'required',
            'image' => 'required',
            'fees' => 'required',
            'discount_fees' => 'required',
            'description' => 'required',
        ]);
        if($data->fails()){
            return response()->json(["msg" => $data->errors()], 200);
        }
        else{
            $c->title = $request->title;
            $c->duration = $request->duration;
            $c->fees = $request->fees;
            $c->discount_fees = $request->discount_fees;
            $c->description = $request->description;
            $c->save();
            return response()->json($c, 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($c)
    {
        $course = Courses::find($c);
        if($course){
            $res = $course->delete();
            if($res){
                $data = Courses::all();
                return response()->json($data,200);
            }
        }
    }   
}
