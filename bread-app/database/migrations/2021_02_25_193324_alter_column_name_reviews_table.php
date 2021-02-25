<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterColumnNameReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->renameColumn('stores_uuid', 'store_uuid');
            $table->renameColumn('users_uuid', 'user_uuid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->renameColumn('store_uuid', 'stores_uuid');
            $table->renameColumn('user_uuid', 'users_uuid');
        });
    }
}
