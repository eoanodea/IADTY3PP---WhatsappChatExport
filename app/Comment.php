<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function assignment() {
        return $this->hasOne('App\Assignment');
    }
}
