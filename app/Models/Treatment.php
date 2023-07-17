<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Treatment extends Model
{
    use HasFactory;

    protected $fillable = [
      'treatment_type_id',
        'user_id',
        'patient_id',
        'price',
        'hidden',
    ];

    public function patients(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function treatmentTypes(): BelongsTo
    {
        return $this->belongsTo(TreatmentType::class);
    }
}
