<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
        // Add CORS middleware
        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);

        // Configure CORS
        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Unauthenticated.',
                ], 401);
            }
        });
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return response()->json([
                'message' => 'Not Found',
            ], 404);
        });
        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            return response()->json([
                'message' => 'Method not allowed.',
            ], 405);
        });
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, Request $request) {
            return response()->json([
                'message' => 'Bad Request',
                'errors' => $e->errors(),
            ], 400);
        });
        $exceptions->render(function (\Exception $e, Request $request) {
            Log::error($e->getMessage());
            $statusCode = method_exists($e, 'getCode') ? $e->getCode() : 500;
            $statusCode = ($statusCode >= 100 && $statusCode < 600) ? $statusCode : 500;
                        
            if ($statusCode === 500) {
                Log::error($e->getMessage(), [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString()
                ]);
            }
    
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getTrace()
            ], $statusCode);
        });
    })->create();

