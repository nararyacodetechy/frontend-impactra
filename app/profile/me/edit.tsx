'use client'

import { useEffect, useState } from 'react'
import { fetchPrivateProfile, Profile } from '@/lib/profileService'

export default function EditProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
        const data = await fetchPrivateProfile()
        setProfile(data)
        setLoading(false)
        }
        load()
    }, [])

    if (loading) return <p>Loading...</p>
    if (!profile) return <p>User not found.</p>

    return (
        <form className="space-y-4">
        <div>
            <label>Full Name</label>
            <input defaultValue={profile.full_name} className="w-full" />
        </div>
        <div>
            <label>Bio</label>
            <textarea defaultValue={profile.bio} className="w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
        </button>
        </form>
    )
}
