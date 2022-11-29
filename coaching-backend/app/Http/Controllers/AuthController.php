<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','refresh','logout',"destroy"]]);
    }

    public function register(Request $req){
        $validated = Validator::make($req->all(),[
            'name' => 'required',
            'contact' => 'required|unique:users|digits:10',
            'email' => 'required|unique:users|email',
            'password' => 'required'
        ]);

        if($validated->fails()){
            return response()->json($validated->errors(),404);
        }
        else{
            $user = new User();
            $user->name = $req->name;
            $user->contact = $req->contact;
            $user->email = $req->email;
            $user->password = Hash::make($req->password);
            $user->save();

            $newStudent = new Student();
            $newStudent->user_id = $user->id;
            $newStudent->save();

            return response()->json($newStudent,200);

        }
    }

    public function login(Request $req){
        $validated = Validator::make($req->all(),[
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validated->fails()){
            return response()->json($validated->errors(),404);
        }
        else{   
            $token = Auth::attempt($req->all());
            if(!$token){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ], 401);
            }
            $user = Student::with('user')->where("user_id",Auth::user()->id)->get();
            return response()->json([
                    'status' => 'success',
                    'user' => $user,
                    'authorisation' => [
                        'token' => $token,
                        'type' => 'bearer',
                    ]
                ],200);
    
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        $user = Student::with('user')->where("user_id",Auth::user()->id)->get();
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function destroy(User $s)
    {
        $res = $s->delete();
        if($res){
            $students = Student::with('user')->get();
            return response()->json($students,200);
        }
    }

     
}
