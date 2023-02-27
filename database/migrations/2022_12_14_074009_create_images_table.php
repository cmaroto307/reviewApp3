<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    
    public function down() {
        Schema::dropIfExists('image');
    }
    
    public function up() {
        Schema::create('image', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->foreignId('idreview');
            $table->foreign('idreview')->references('id')->on('review')->onDelete('cascade');
            $table->timestamps();
        });
    }
};
