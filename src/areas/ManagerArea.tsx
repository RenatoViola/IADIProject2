import { Link } from "react-router-dom";

export const ManagerArea = () => {

    return (
        <>
            <h3>---------------------------- MANAGER AREA -----------------------------------------</h3>

            <br />
            <br />

            <ul>
                <li>
                    <Link to='/apartments'>
                        <button className="btn">
                            Go to list of apartments
                        </button>
                    </Link>

                    {/* <Link to='/apartments'>
                        <button className="btn">
                            Go to list of reservations
                        </button>
                    </Link> */}
                </li>
            </ul>

        </>
    );
}