<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->float('total_price');
            $table->float('deposit');
            $table->float('discount');
            $table->date('date_of_completion');
            $table->date('deadline');
            $table->timestamps();
            $table->bigInteger('client_id')->unsigned();
            $table->bigInteger('service_id')->unsigned();

            $table->foreign('service_id')->references('id')->on('services')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('client_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assignments');
    }
}
