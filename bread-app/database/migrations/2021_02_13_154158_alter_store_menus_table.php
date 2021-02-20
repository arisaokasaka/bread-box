<!-- １．カラム名stores_uuidをstore_uuidに変更 -->
<!-- ２．uuidカラム追加 -->

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterStoreMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('store_menus', function (Blueprint $table) {
            $table->renameColumn('stores_uuid', 'store_uuid');
            $table->string('uuid',38)->unique();
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
            $table->renameColumn('store_uuid', 'stores_uuid');
            $table->dropColumn('uuid');
        });
    }
}
