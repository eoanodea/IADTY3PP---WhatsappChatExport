<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActiveTask extends Model
{
    public function assignment() {
        return $this->hasOne('App\Assignment');
    }
}
