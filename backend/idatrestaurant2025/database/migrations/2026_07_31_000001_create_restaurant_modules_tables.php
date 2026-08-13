<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('category', 60);
            $table->string('name', 120);
            $table->string('description', 500);
            $table->decimal('price', 8, 2);
            $table->string('image', 180)->nullable();
            $table->boolean('available')->default(true);
            $table->timestamps();
        });

        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120)->unique();
            $table->unsignedInteger('quantity')->default(0);
            $table->string('unit', 30)->default('unidades');
            $table->timestamps();
        });

        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name', 120);
            $table->string('order_reference', 80);
            $table->string('district', 120);
            $table->string('status', 40)->default('Solicitado');
            $table->timestamps();
        });

        $now = now();
        DB::table('menu_items')->insert([
            ['category'=>'Burgers','name'=>'Cheese Burger','description'=>'Carne artesanal, queso cheddar, lechuga, tomate y salsa de la casa.','price'=>19.90,'image'=>'Cheese Burger.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Burgers','name'=>'Bacon Burger','description'=>'Hamburguesa con tocino crocante, doble queso y papas al hilo.','price'=>19.90,'image'=>'hambuguersa_baccon.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Burgers','name'=>'Big Grill Burger','description'=>'Doble carne parrillera, cebolla caramelizada y crema especial.','price'=>18.90,'image'=>'hambuguersa_grill.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Salchipapas','name'=>'Clasico','description'=>'Papas doradas, hot dog, mayonesa, ketchup y mostaza.','price'=>15.90,'image'=>'salchipapa_clasico.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Salchipapas','name'=>'Salchipobre','description'=>'Papas, hot dog, huevo frito, platano y salsa criolla.','price'=>17.90,'image'=>'salchipapa_alopobre.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Salchipapas','name'=>'Salchibrasa','description'=>'Papas crocantes, pollo brasa deshilachado y cremas.','price'=>19.90,'image'=>'salchipapa_broaster.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Ensaladas','name'=>'Ensalada Cesar','description'=>'Pollo grillado, crutones, queso parmesano y salsa cesar.','price'=>19.90,'image'=>'ensalada_cesar.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Ensaladas','name'=>'Ensalada Caprese','description'=>'Tomate, queso fresco, albahaca y aceite de oliva.','price'=>19.90,'image'=>'ensalada_capresse.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Ensaladas','name'=>'Ensalada Griega','description'=>'Pepino, aceitunas, tomate, queso y vegetales frescos.','price'=>19.90,'image'=>'ensalada_griega.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Chaufas','name'=>'Chaufa Clasico','description'=>'Arroz salteado al wok con pollo, huevo y cebolla china.','price'=>14.90,'image'=>'chaufa_clasico.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Chaufas','name'=>'Chaufa de Carne','description'=>'Carne salteada, sillao, kion y verduras crocantes.','price'=>16.90,'image'=>'chaufa_carne.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Chaufas','name'=>'Chaufa Amazonico','description'=>'Arroz, cecina, platano frito y toque oriental.','price'=>18.90,'image'=>'chaufa_amazonico.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Bebidas','name'=>'Gaseosa 600 ml','description'=>'Inca Kola, Coca-Cola o Sprite helada.','price'=>5.00,'image'=>'gaseosa.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Bebidas','name'=>'Agua 750 ml','description'=>'Agua mineral sin gas o con gas.','price'=>3.00,'image'=>'agua.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
            ['category'=>'Bebidas','name'=>'Bebida de la casa 1 L','description'=>'Maracuya, chicha morada o limonada frozen.','price'=>8.90,'image'=>'bebidas_casa.jpeg','available'=>true,'created_at'=>$now,'updated_at'=>$now],
        ]);
        DB::table('inventories')->insert([
            ['name'=>'Pan hamburguesa','quantity'=>150,'unit'=>'unidades','created_at'=>$now,'updated_at'=>$now],
            ['name'=>'Papas fritas','quantity'=>85,'unit'=>'porciones','created_at'=>$now,'updated_at'=>$now],
            ['name'=>'Queso cheddar','quantity'=>220,'unit'=>'laminas','created_at'=>$now,'updated_at'=>$now],
            ['name'=>'Gaseosa Inca Kola 1L','quantity'=>65,'unit'=>'botellas','created_at'=>$now,'updated_at'=>$now],
            ['name'=>'Arroz','quantity'=>48,'unit'=>'kg','created_at'=>$now,'updated_at'=>$now],
        ]);
        DB::table('deliveries')->insert([
            ['customer_name'=>'Carlos Perez','order_reference'=>'Pedido #158','district'=>'San Miguel','status'=>'Solicitado','created_at'=>$now,'updated_at'=>$now],
            ['customer_name'=>'Maria Lopez','order_reference'=>'Pedido #159','district'=>'Lince','status'=>'En camino','created_at'=>$now,'updated_at'=>$now],
            ['customer_name'=>'Luis Ramos','order_reference'=>'Pedido #160','district'=>'Surco','status'=>'Solicitado','created_at'=>$now,'updated_at'=>$now],
            ['customer_name'=>'Ana Torres','order_reference'=>'Pedido #161','district'=>'San Borja','status'=>'Entregado','created_at'=>$now,'updated_at'=>$now],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('deliveries');
        Schema::dropIfExists('inventories');
        Schema::dropIfExists('menu_items');
    }
};
