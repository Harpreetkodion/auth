import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session, status } = useSession();
    console.log('status', status)
    return (
        <nav className="w-full fixed top-0 bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-80 py-4 shadow-md z-50">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-3xl font-bold text-white">
                    SCANNER
                </Link>
                <div className="space-x-6">
                    <Link href="/" className="text-lg text-white hover:text-purple-200 transition-all">
                        Home
                    </Link>
                    {status === "authenticated" && (
                        <>
                            <Link href="/scan" className="text-lg text-white hover:text-purple-200 transition-all">
                                Scan
                            </Link>
                            <Link href="/scanHistory" className="text-lg text-white hover:text-purple-200 transition-all">
                                Scan History
                            </Link>

                            <Link href={`/profile/${session.id}`} className="text-lg text-white hover:text-purple-200 transition-all">
                                Profile
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="text-lg text-white hover:text-red-300 transition-all"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {status === "unauthenticated" && (
                        <>
                            <Link href="/login" className="text-lg text-white hover:text-purple-200 transition-all">
                                Login
                            </Link>
                            <Link href="/register" className="text-lg text-white hover:text-purple-200 transition-all">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;