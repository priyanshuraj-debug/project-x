import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Mail } from "lucide-react";

export default function Footer() {
    return (

        <footer className="border-t py-16">

            <div className="container mx-auto max-w-7xl px-6">

                <div className="grid gap-12 md:grid-cols-4">

                    <div>

                        <h2 className="text-2xl font-black">

                            Project X

                        </h2>

                        <p className="mt-4 text-muted-foreground">

                            Connecting student developers
                            across universities.

                        </p>

                    </div>

                    <div>

                        <h3 className="font-bold">

                            Product

                        </h3>

                        <div className="mt-5 space-y-3">

                            <Link href="/browse">

                                Browse Developers

                            </Link>

                            <br />

                            <Link href="/manage-request">

                                Requests

                            </Link>

                        </div>

                    </div>

                    <div>

                        <h3 className="font-bold">

                            Company

                        </h3>

                        <div className="mt-5 space-y-3">

                            <p>About</p>

                            <p>Blog</p>

                            <p>Contact</p>

                        </div>

                    </div>

                    <div>

                        <h3 className="font-bold">

                            Follow

                        </h3>

                        <div className="mt-5 flex gap-4">

                            <FaGithub className="h-5 w-5 cursor-pointer hover:text-primary" />
                            <FaLinkedin className="h-5 w-5 cursor-pointer hover:text-primary" />
                            <Mail className="h-5 w-5 cursor-pointer hover:text-primary" />

                        </div>

                    </div>

                </div>

                <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">

                    © {new Date().getFullYear()} Project X.
                    Built with ❤️ for student developers.

                </div>

            </div>

        </footer>

    )
}