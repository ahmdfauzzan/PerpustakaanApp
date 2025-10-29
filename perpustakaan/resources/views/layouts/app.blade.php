<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perpustakaan</title>
    @vite('resources/css/app.css')
</head>

<body class="bg-gray-100">
    @include('partials.navbar')

    <div class="max-w-6xl mx-auto mt-10 px-4">
        @yield('content')
    </div>
</body>

</html>