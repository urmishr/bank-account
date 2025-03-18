export default function Display({ balance, loan, error }) {
    return (
        <div className="d-flex flex-column w-50 fs-4 border rounded mx-auto p-4 align-items-center text-center ">
            <p>
                Bank Balance: <strong>{balance}</strong>
            </p>

            <p>
                Loan Amount: <strong>{loan}</strong>
            </p>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}
