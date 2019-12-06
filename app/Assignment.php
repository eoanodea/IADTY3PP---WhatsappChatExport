<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    public function client() {
        return $this->belongsTo('App\Client');
    }
    public function service() {
        return $this->belongsTo('App\Service');
    }
}
