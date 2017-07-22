<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Admin Area</title>
		<link rel="stylesheet" type="text/css" href="{{  URL::to('css/admin.css') }}">
		@yield('styles')
	</head>

	<body>
		@include('includes.admin-header')
		@yield('content')
	
		<script type="text/javascript">
			var baseUrl = " {{  URL::to('/') }} ";
		</script>
		@yield('scripts')
	</body>

</html>