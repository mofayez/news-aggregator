<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\AuthenticationException;

class Handler extends ExceptionHandler
{
    /**
     * Handle unauthenticated exceptions for API routes.
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        // Check if the request expects a JSON response
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Unauthenticated or invalid token.',
                'error' => 'Unauthorized',
            ], 401);
        }

        // Default behavior for web requests (redirect to login)
        return redirect()->guest(route('login'));
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
