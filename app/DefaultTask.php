<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DefaultTask extends Model
{
    public function service() {
        return $this->hasOne('App\Service');
    }
}
