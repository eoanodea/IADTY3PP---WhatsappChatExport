<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    public function task() {
        return $this->hasMany('App\DefaultTask');
    }
}
