import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-sky-500 text-white px-6 py-4 flex items-center justify-between">

            <h1 className="font-bold text-xl">
                User Management
            </h1>

            <div className="flex gap-6">
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold underline"
                            : "hover:underline"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold underline"
                            : "hover:underline"
                    }
                >
                    Users
                </NavLink>
            </div>

        </nav>
    );
}

export default Navbar;