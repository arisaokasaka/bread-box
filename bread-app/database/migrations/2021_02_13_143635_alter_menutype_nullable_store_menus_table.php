<!-- menu_typeをnullableに変更 -->
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterMenutypeNullableStoreMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('store_menus', function (Blueprint $table) {
            $table->integer('menu_type')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('store_menus', function (Blueprint $table) {
            $table->integer('menu_type')->nullable(false)->change();
        });
    }
}
