<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Vimeo\Laravel\Facades\Vimeo;

class VimeoController extends Controller
{
    public function uploadVideo(Request $request){
        $uri = Vimeo::upload($request->video,[
            'name' => "new title",
            'description' => 'new description'
        ]);

        $res = Vimeo::request($uri.'?fields=link');
        return response()->json($res['body']['link'],200);
    }

    public function getv(Request $request){
        return response()->json("hey",200);
    }
}
