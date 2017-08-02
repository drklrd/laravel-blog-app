@extends('layouts.admin-master')



@section('styles')
	<link rel="stylesheet" href=" {{ URL::to('css/modal.css')  }} ">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
@endsection

@section('content')
	<div class="container">
		<section class="list">
		@if (count($contact_messages) ==0)
			No Messages
		@endif
		@foreach($contact_messages as $contact_message)
			<article data-message="{{ $contact_message->body }}" data-id="{{  $contact_message->id }}" class="contact-message" >
				<div class="message-info">
					<h3>  {{ $contact_message->subject }} </h3>
				</div>
				<div class="edit">
					<nav>
						<ul>
							<li><a href="">Show message</a></li>
							<li><a href="" class="danger">Delete</a></li>
						</ul>
					</nav>
				</div>
			</article>
		@endforeach
		</section>
		@if($contact_messages->lastPage() > 1)
			<section class="pagination">
				@if($contact_messages->currentPage() !== 1)
					<a href=" {{ $contact_messages->previousPageUrl() }} ">  <i class="fa fa-caret-left"></i> </a>
				@endif
				@if($contact_messages->currentPage() !== $contact_messages->lastPage())
					<a href=" {{ $contact_messages->nextPageUrl() }} ">  <i class="fa fa-caret-right"></i> </a>
				@endif
			</section>
		@endif
	</div>
@endsection


@section('scripts')
	<script type="text/javascript">
		var token = "{{  Session::token() }}";
	</script>
	<script src=" {{ URL::to('js/modal.js') }} "></script>
	<script src=" {{ URL::to('js/contact_messages.js') }} "></script>

@endsection