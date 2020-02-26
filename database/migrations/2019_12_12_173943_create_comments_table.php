<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('progress');
            $table->bigInteger('assignment_id')->unsigned()->nullable();
            $table->bigInteger('task_id')->unsigned()->nullable();
            $table->bigInteger('user_id')->unsigned();
            $table->string('comment');
            $table->timestamps();

            $table->foreign('assignment_id')->references('id')->on('assignments')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('task_id')->references('id')->on('active_tasks')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
