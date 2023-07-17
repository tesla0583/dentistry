<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TreatmentType extends Model
{
    use HasFactory;

    protected $fillable = [
      'code',
      'name',
      'duration',
      'price',
    ];

    public function treatments(): HasMany
    {
        return $this->hasMany(Treatment::class);
    }
}
