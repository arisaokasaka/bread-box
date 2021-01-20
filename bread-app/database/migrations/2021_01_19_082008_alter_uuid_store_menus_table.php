<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUuidStoreMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('store_menus')){
            Schema::table('store_menus', function (Blueprint $table) {
                $table->string('stores_uuid', 38)->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('store_menus')){
            Schema::table('store_menus', function (Blueprint $table) {
                $table->string('stores_uuid')->change();
            });
        }
    }
}
