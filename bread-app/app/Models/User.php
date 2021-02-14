<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

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

    public function create_user($user_info){
        $this->uuid = Str::uuid();
        $this->name = $user_info['name'];
        $this->email = $user_info['email'];
        $this->password = bcrypt($user_info['password']);
        $this->address = $user_info['address'];
        if($user_info['type_user']) $this->type_user = $user_info['type_user'];
        $this->save();
    }
}
