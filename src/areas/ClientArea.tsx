import { Link } from "react-router-dom";

export const ClientArea = () => {

    return (
        <>
            <h3>---------------------------- CLIENT AREA -----------------------------------------</h3>

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