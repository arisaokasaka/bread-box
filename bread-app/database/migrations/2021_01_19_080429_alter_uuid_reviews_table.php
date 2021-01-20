<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUuidReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('reviews')){
            Schema::table('reviews', function (Blueprint $table) {
                $table->string('users_uuid', 38)->change();
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
        if (Schema::hasTable('reviews')){
            Schema::table('reviews', function (Blueprint $table) {
                $table->string('users_uuid')->change();
                $table->string('stores_uuid')->change();
            });
        }
    }
}
