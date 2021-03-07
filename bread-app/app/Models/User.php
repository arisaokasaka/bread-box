<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Log;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // 更新：店舗基本情報
    public function update_basicInfo_usersTable($request){
        return $this
        ->where('uuid', '=', $request['user_uuid'])
        ->update([
            'name' => $request['name'],
            'address' => $request['address'],
            'email' => $request['email'],
        ]);
    }

    /**
     * ユーザー新規登録
     *
     * @param [type] $user_info
     * @return void
     */
    public function create_user($user_info){
        $this->uuid = Str::uuid();
        $this->name = $user_info['name'];
        $this->email = $user_info['email'];
        $this->password = bcrypt($user_info['password']);
        $this->address = $user_info['address'];
        if($user_info['type_user']) $this->type_user = $user_info['type_user'];
        $this->save();
    }

    /**
     * ユーザー情報更新
     *
     * @param object $user_info
     * @return void
     */
    public function update_user(object $request) {
        $this
        ->where('uuid', '=', $request['uuid'])
        ->update([
            'name' => $request['name'],
            'email' => $request['email'],
            'address' => $request['address'],
        ]);
    }

    /**
     * ユーザー情報取得
     *
     * @param string $user_uuid
     * @return $query->get();
     */
    public function index_user(string $user_uuid) {
        $query = $this
        ->where('uuid', '=', $user_uuid)
        ->select([
            'name',
            'email',
            'address',
            'favorite',
            'interested'
        ]);
        return $query->get();
    }

    /**
     * 「お気に入り」登録済の店舗リストを取得
     *
     * @param string $user_uuid
     * @return void
     */
    public function index_favorite(string $user_uuid) {
        $query = $this
        ->where('uuid', '=', $user_uuid)
        ->select('favorite');
        return $query->get();
    }

    /**
     * お気に入り更新機能
     *
     * @param string $user_uuid
     * @param [type] $favorite
     * @return void
     */
    public function update_favorite($user_uuid, $favorite) {
        $query = $this
        ->where('uuid', '=', $user_uuid)
        ->update(['favorite' => $favorite]);
    }

    /**
     * 「行ってみたい」登録済の店舗リストを取得
     *
     * @param string $user_uuid
     * @return void
     */
    public function index_interested(string $user_uuid) {
        $query = $this
        ->where('uuid', '=', $user_uuid)
        ->select('interested');
        return $query->get();
    }

    /**
     * 行ってみたい更新機能
     *
     * @param string $user_uuid
     * @param [type] $interested
     * @return void
     */
    public function update_interested(string $user_uuid, $interested) {
        $query = $this
        ->where('uuid', '=', $user_uuid)
        ->update(['interested' => $interested]);
    }

    /**
     * 店舗UUIDから、店舗情報取得
     *
     * @param string $request
     * @return void
     */
    public function get_storeInfo(string $request){
        return $this
        ->newQuery()
        ->join('stores', 'users.uuid', '=', 'stores.user_uuid')
        ->where('stores.user_uuid', '=', $request)
        ->select([
            'users.name',
            'users.address',
            'stores.user_uuid',
            'stores.business_day',
            'stores.business_memo',
            'stores.message',
        ])
        ->first();
    }

    /**
     * UUIDから名前取得
     *
     * @param string $user_uuid
     * @return void
     */
    public function get_name(string $user_uuid){
        return $this
        ->newQuery()
        ->where('uuid', '=', $user_uuid)
        ->select([
            'name',
        ])
        ->get();
    }

    /**
     * レコード削除
     *
     * @param string $uuid
     * @return void
     */
    public function delete_user(string $uuid){
        return $this
        ->newQuery()
        ->where('uuid', '=', $uuid)
        ->delete();
    }

    /**
     * メールアドレスからユーザー情報取得
     *
     * @param string $email
     * @return void
     */
    public static function getUser_by_email(string $email) {
        return User::where('email', $email)->select([
            'uuid',
            'name',
            'email',
            'type_user',
        ])->first();
    }
    
    /**
     * パスワードのアップデート
     *
     * @param [type] $request
     * @return void
     */
    public static function update_password($request) {
        return User::where('email', $request->email)
        ->update([
            'password' => bcrypt($request->password)
        ]);
    }
}
