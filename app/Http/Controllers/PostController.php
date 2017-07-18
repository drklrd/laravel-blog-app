<?php

namespace App\Http\Controllers;

class PostController extends Controller
{

	public function getBlogIndex()
	{
		return view('frontend.blog.index');
	}
}