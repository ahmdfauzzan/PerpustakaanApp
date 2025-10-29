<?php

namespace App\Http\Controllers;

use App\Models\Loan;

class DashboardController extends Controller
{
    public function index()
    {
        $weeklyLoans = Loan::selectRaw('WEEK(created_at) as week, COUNT(*) as total')
            ->groupBy('week')
            ->pluck('total', 'week');

        return view('dashboard.index', compact('weeklyLoans'));
    }
}