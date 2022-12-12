<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseVideo extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function courses(){
        return $this->hasOne(Courses::class,"id","course_id");
    }
}
