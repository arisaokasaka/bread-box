<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head prefix="og: http://ogp.me/ns#　website: http://ogp.me/ns/website#">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>パンBOX - お気に入りのパン屋さんを見つける、つながる</title>

    <!-- OGP -->
    <meta property="og:title" content="パンBOX - お気に入りのパン屋さんを見つける、つながる">
    <meta property="og:site_name" content="パンBOX - お気に入りのパン屋さんを見つける、つながる">
    <meta property="og:type" content="website">
    <meta property="og:description" content="お気に入りのパン屋さんを見つけ、つながることが出来るグルメサイトです。">
    <meta property="og:url" content="https://bread-box.net/">
    <meta property="og:image" content="/images/thumbnail.png">

    <!-- Scripts -->
    <script src="//bread-box.net/js/app.js" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="//bread-box.net/css/app.css" rel="stylesheet">

</head>
<body>
    <div id="app">
        @yield('content')
    </div>
</body>
</html>
