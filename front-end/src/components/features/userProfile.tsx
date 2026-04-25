import { IoPersonSharp } from "react-icons/io5";

export default function UserProfile({ user }: { user: any }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 items-center">
                {user.picture ? <img className="rounded-full border-2 text-warning h-35" src={user.picture} />
                    : <span className="rounded-full flex border-2 text-warning size-35 p-1 items-center justify-center"><IoPersonSharp size={100} /></span>}
                <h1 className="text-xl text-warning">{user.username}</h1>
                <h2>{user.email}</h2>
            </div>
            <div className="flex flex-col ">
                <h2 className="dark:text-gray-300">Permissions</h2>
                <p><span className="text-warning">  Register: </span> Up to 3 vehicles at once </p>
                <p><span className="text-warning">  Edit: </span> Only own vehicles </p>
                <p><span className="text-warning">  Delete: </span> Only own vehicles </p>
            </div>
        </div>
    )
}