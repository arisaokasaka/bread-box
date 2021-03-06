@extends('layouts.app')

@section('content')
    {{$name}}様
    <br>
    パンBOXです。<br>
    パスワード再設定の申請を受け付けました。<br>
    <br>
    パスワードの再設定をご希望の場合は、以下URLをクリックし、<br>
    新しいパスワードをご登録ください。<br>
    <br>
    ※パスワードリセットの申請に心当たりがない場合、ご対応は不要です。<br>
    <br>
    ----------------------------------------------------<br>
    ■パスワードの再設定URL<br>
    <a href="{{$reset_url}}">{{$reset_url}}</a>
    ----------------------------------------------------<br>
    上記URLは30分以内のみ有効です。<br>
    <br>    
    本メールに心当たりが無い場合は破棄をお願いいたします。<br>
    送信専用メールアドレスのため、直接の返信はできません。<br>
    <br>
    ―――――――――――――――――――――――――――<br>
    <br>
    パンBOX - お気に入りのパン屋さんを見つける、繋がる<br>
    <br>
    ―――――――――――――――――――――――――――<br>

@endsection