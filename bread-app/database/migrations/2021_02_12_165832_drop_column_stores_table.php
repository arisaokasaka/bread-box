<!-- 店舗の基本情報をユーザーテーブルで管理するため、重複するカラムを削除
店舗テーブルをid,uuid以外はnullableに変更 -->

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropColumnStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->dropColumn(['name', 'email', 'password', 'address', 'email_verified_at', 'remember_token']);
            $table->string('tel')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at');
            $table->string('password');
            $table->string('address');
            $table->rememberToken();
            $table->string('tel')->nullable(false)->change();
        });
    }
}
