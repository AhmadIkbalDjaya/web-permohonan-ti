<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <link rel="icon" href="{{ asset('images/uin_icon.jpg') }}" sizes="32x32">
  <link rel="icon" href="{{ asset('images/uin_icon.jpg') }}" sizes="192x192">
  <link rel="apple-touch-icon" href="{{ asset('images/uin_icon.jpg') }}">
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  @vite('resources/js/app.jsx')
  @routes()
  @inertiaHead
</head>

<body>
  @inertia
</body>

</html>
