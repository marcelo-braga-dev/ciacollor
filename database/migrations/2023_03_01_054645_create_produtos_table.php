<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('doc');

            $table->foreignId('gerente_regional')->constrained('users');
            $table->foreignId('vendedor')->constrained('users');
            $table->string('cliente');

            $table->integer('cod_produto');
            $table->string('produto');

            $table->integer('litros')->nullable();
            $table->string('litros_unid', 8)->nullable();
            $table->float('kg')->nullable();
            $table->integer('qtd')->nullable();

            $table->integer('cod_grupo');
            $table->string('grupo');

            $table->timestamp('data_cadastro');
            $table->integer('prazo_medio')->default(0);

            $table->float('valor_sugerido', 11, 2)->nullable();
            $table->float('desconto', 8, 2)->nullable();
            $table->float('valor_total', 8, 2)->nullable();
            $table->float('custo', 8, 2)->nullable();
            $table->float('imposto', 8, 2)->nullable();
            $table->float('comissao', 8, 2)->nullable();
            $table->float('frete', 8, 2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produtos');
    }
};
