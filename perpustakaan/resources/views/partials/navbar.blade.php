<nav class="bg-white shadow-md p-4 flex justify-between">
    <a href="/dashboard" class="text-lg font-semibold text-blue-600">📚 Perpustakaan</a>
    <div class="space-x-4">
        <a href="/books" class="text-gray-700 hover:text-blue-600">Buku</a>
        <a href="/members" class="text-gray-700 hover:text-blue-600">Anggota</a>
        <a href="/loans" class="text-gray-700 hover:text-blue-600">Peminjaman</a>
        <form action="{{ route('logout') }}" method="POST" class="inline">
            @csrf
            <button class="text-red-500 hover:underline">Logout</button>
        </form>
    </div>
</nav>