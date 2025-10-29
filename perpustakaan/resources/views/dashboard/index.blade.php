@extends('layouts.app')

@section('content')
<h1 class="text-2xl font-bold mb-6">Dashboard</h1>

<div class="bg-white p-6 rounded-lg shadow">
    <canvas id="loanChart" height="100"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const ctx = document.getElementById('loanChart');
const data = @json($weeklyLoans);
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Object.keys(data).map(w => 'Minggu ' + w),
        datasets: [{
            label: 'Jumlah Peminjaman',
            data: Object.values(data),
            backgroundColor: '#3b82f6',
        }]
    }
});
</script>
@endsection
