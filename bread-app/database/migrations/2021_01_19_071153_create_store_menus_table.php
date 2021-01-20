<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_menus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('stores_uuid');
            $table->integer('menu_type');
            $table->string('bread_name')->nullable();
            $table->string('bread_kind')->nullable();
            $table->string('bread_detail')->nullable();
            $table->integer('bread_price')->nullable();
            $table->integer('bread_order')->nullable();
            $table->string('advantage')->nullable();
            $table->string('spirit')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('store_menus');
    }
}
