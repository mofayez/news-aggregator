<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::statement('ALTER TABLE articles ADD FULLTEXT fulltext_index (title, description, content)');
    }

    public function down()
    {
        DB::statement('ALTER TABLE articles DROP INDEX fulltext_index');
    }
};