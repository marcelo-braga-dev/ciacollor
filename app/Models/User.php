<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\src\Usuarios\Funcoes\AdminsUsuario;
use App\src\Usuarios\Funcoes\GerenteRegionalUsuario;
use App\src\Usuarios\Funcoes\VendedorUsuario;
use App\src\Usuarios\Status\AtivoStatusUsuario;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'codigo',
        'name',
        'email',
        'funcao',
        'status',
        'superior',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getVendedores()
    {
        return $this->newQuery()
            ->where('funcao', (new VendedorUsuario())->getFuncao())
            ->get();
    }

    public function getVendedoresNomes()
    {
        return $this->newQuery()
            ->where('funcao', (new VendedorUsuario())->getFuncao())
            ->get(['id', 'codigo', 'name']);
    }

    public function getGerentesNomes()
    {
        return $this->newQuery()
            ->where('funcao', (new GerenteRegionalUsuario())->getFuncao())
            ->get(['id', 'codigo', 'name']);
    }

    public function createVendedor($request, $funcao)
    {
        $user = (new User())
            ->create([
                'codigo' => $request->codigo,
                'name' => $request->nome,
                'funcao' => $funcao,
                'email' => $request->email,
                'password' => Hash::make($request->senha),
                'superior' => $request->gerente,
                'status' => (new AtivoStatusUsuario())->getStatus()
            ]);

        event(new Registered($user));
        (new MetaVendas())->atualizar($user->id, $request->meta);
    }

    public function createGerenteRegional($request, $funcao)
    {
        $user = (new User())
            ->create([
                'codigo' => $request->codigo,
                'name' => $request->nome,
                'funcao' => $funcao,
                'email' => $request->email,
                'password' => Hash::make($request->senha),
                'superior' => $request->gerente,
                'status' => (new AtivoStatusUsuario())->getStatus()
            ]);

        event(new Registered($user));
        (new MetaVendas())->atualizar($user->id, $request->meta);
    }

    public function getUser(int $id)
    {
        return $this->newQuery()->find($id);
    }

    public function updateVendedor($id, $request)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'codigo' => $request->codigo,
                'name' => $request->nome,
                'email' => $request->email,
                'superior' => $request->gerente,
            ]);

        (new MetaVendas())->atualizar($id, $request->meta);
    }

    public function getNomes()
    {
        $dados = $this->newQuery()->get();
        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->id] = [
                'id' => $dado->id,
                'codigo' => $dado->codigo,
                'nome' => $dado->name
            ];
        }
        return $items;
    }

    public function getGerentes()
    {
        return $this->newQuery()
            ->where('funcao', (new GerenteRegionalUsuario())->getFuncao())
            ->get();
    }

    public function getAdmins()
    {
        return $this->newQuery()
            ->where('funcao', (new AdminsUsuario())->getFuncao())
            ->get();
    }

    public function updateAdmin($id, $request)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'codigo' => $request->codigo,
                'name' => $request->nome,
                'email' => $request->email,
            ]);
    }

    public function createAdmin($request, string $funcao)
    {
        $user = $this
            ->create([
                'codigo' => $request->codigo,
                'name' => $request->nome,
                'funcao' => $funcao,
                'email' => $request->email,
                'password' => Hash::make($request->senha),
                'superior' => $request->gerente,
                'status' => (new AtivoStatusUsuario())->getStatus()
            ]);

        event(new Registered($user));
    }

    public function getIdsPelosCodigos()
    {
        $dados = $this->newQuery()->get(['id', 'codigo']);
        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->codigo] = $dado->id;
        }
        return $items;
    }

    public function cadastrarUsuarioImportacao($codigo, $nome, $funcao)
    {
        $this->newQuery()
            ->create([
                'codigo' => $codigo,
                'name' => utf8_encode($nome),
                'email' => uniqid() . '@user.com',
                'funcao' => $funcao,
                'status' => 'ativo',
                'password' => Hash::make('1234')
            ]);
    }

    public function get()
    {
        return $this->newQuery()->get();
    }

    public function getUserPeloSuperior($id)
    {
        return $this->newQuery()
            ->where('superior', $id)
            ->get();
    }
}
