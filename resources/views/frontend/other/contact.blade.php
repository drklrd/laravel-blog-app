@extends('layouts.master')

@section('title')
	Contact
@endsection


@section('styles')
	<link rel="stylesheet" href="{{  URL::to('src/css/form/css') }}">
@endsection

@section('content')
	
	@include('includes.info-box')
	<form action="" method="post" id="contact-form">

		<div class="input-group">
			<label for="name"> Your name </label>
			<input type="text" name="name" id="name"/>
		</div>

		<div class="input-group">
			<label for="email"> Your email </label>
			<input type="email" name="email" id="email"/>
		</div>

		<div class="input-group">
			<label for="subject"> Subject </label>
			<input type="text" name="subject" id="subject"/>
		</div>

		<div class="input-group">
			<label for="message"> message </label>
			<textarea rows="10" name="message" id="message"> </textarea>
		</div>

		<button type="submit" class="btn">  Submit Message </button>

		<input type="hidden" value="{{ Session::token() }}" name="_token" />

	</form>

@endsection