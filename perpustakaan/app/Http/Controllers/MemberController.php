<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::all();
        return response()->json($members);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_member' => 'required|unique:members',
            'name' => 'required',
            'birth_date' => 'required|date'
        ]);

        $member = Member::create($validated);
        return response()->json(['message' => 'Member created', 'data' => $member], 201);
    }

    public function show(Member $member)
    {
        return response()->json($member);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'no_member' => 'required',
            'name' => 'required',
            'birth_date' => 'required|date'
        ]);

        $member->update($validated);
        return response()->json(['message' => 'Member updated', 'data' => $member]);
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return response()->json(['message' => 'Member deleted']);
    }
}
