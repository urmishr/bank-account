import Button from "./Button";
import Display from "./Display";
import Header from "./Header";
import HandleAccount from "./HandleAccount";
import { useReducer } from "react";

const initialState = {
    isOpen: false,
    balance: 0,
    loan: 0,
    loanDepositAmount: null,
    loanWithdrawAmount: null,
    depositAmount: null,
    withdrawAmount: null,
    error: null,
};

const INITIAL_BANK_BALANCE = 500;
function reducer(state, action) {
    switch (action.type) {
        case "openAccount": {
            return {
                ...state,
                isOpen: true,
                balance: state.balance === 0 ? state.balance + INITIAL_BANK_BALANCE : state.balance,
            };
        }
        case "closeAccount": {
            return {
                ...state,
                isOpen: state.balance > 0 && true,
                error: state.balance > 0 ? "Please Withdraw Amount!!" : null,
            };
        }
        case "addDepositAmount": {
            return { ...state, balance: state.depositAmount + state.balance, depositAmount: 0 };
        }
        case "depositAmount": {
            return {
                ...state,
                depositAmount: isNaN(action.payload) ? state.depositAmount : action.payload,
                error: null,
            };
        }
        case "removeWithdrawAmount": {
            return {
                ...state,
                balance:
                    state.balance < state.withdrawAmount
                        ? state.balance
                        : state.balance - state.withdrawAmount,
                withdrawAmount: 0,
            };
        }
        case "withdrawAmount": {
            return {
                ...state,
                withdrawAmount: isNaN(action.payload) ? state.withdrawAmount : action.payload,
                error: null,
            };
        }
        case "loanAmount": {
            return {
                ...state,
                loanDepositAmount: isNaN(action.payload) ? state.depositAmount : action.payload,
                error: null,
            };
        }
        case "addLoanAmount": {
            return {
                ...state,
                loan: state.loanDepositAmount + state.loan,
                balance: state.loanDepositAmount + state.balance,
                loanDepositAmount: 0,
            };
        }

        case "loanWithdrawAmount": {
            return {
                ...state,
                loanWithdrawAmount: isNaN(action.payload)
                    ? state.loanWithdrawAmount
                    : action.payload,
                error: null,
            };
        }

        case "removeLoanWithdrawAmount": {
            return {
                ...state,
                loan:
                    state.loan < state.loanWithdrawAmount
                        ? state.loan
                        : state.loan - state.loanWithdrawAmount,
                balance:
                    state.loan !== 0 && state.loan >= state.loanWithdrawAmount
                        ? state.balance - state.loanWithdrawAmount
                        : state.balance,
                loanWithdrawAmount: 0,
            };
        }
        default:
            throw new Error(`Error at ${action.type}`);
    }
}

function App() {
    const [
        {
            balance,
            isOpen,
            loan,
            depositAmount,
            withdrawAmount,
            loanDepositAmount,
            loanWithdrawAmount,
            error,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    return (
        <>
            <Header />
            <Display balance={balance} loan={loan} error={error} />

            <HandleAccount>
                {!isOpen && (
                    <Button
                        dispatch={dispatch}
                        disabled={isOpen}
                        onClick={() => {
                            dispatch({ type: "openAccount" });
                        }}
                    >
                        Open Account
                    </Button>
                )}
                {isOpen && (
                    <>
                        <div className="hstack gap-2 justify-content-center">
                            <input
                                className="form-control w-25"
                                value={depositAmount}
                                disabled={!isOpen}
                                onChange={(e) =>
                                    dispatch({
                                        type: "depositAmount",
                                        payload: Number(e.target.value),
                                    })
                                }
                            />
                            <Button
                                dispatch={dispatch}
                                disabled={!isOpen}
                                className={"btn-success"}
                                onClick={() => {
                                    dispatch({ type: "addDepositAmount", payload: depositAmount });
                                }}
                            >
                                Deposit {depositAmount > 0 ? depositAmount : "Amount"}
                            </Button>
                        </div>

                        <div className="hstack gap-2 justify-content-center">
                            <input
                                className="form-control w-25"
                                value={withdrawAmount}
                                disabled={!isOpen}
                                onChange={(e) =>
                                    dispatch({
                                        type: "withdrawAmount",
                                        payload: Number(e.target.value),
                                    })
                                }
                            />
                            <Button
                                dispatch={dispatch}
                                className={"btn-warning"}
                                disabled={!isOpen}
                                onClick={() => {
                                    dispatch({ type: "removeWithdrawAmount" });
                                }}
                            >
                                Withdraw {withdrawAmount > 0 ? withdrawAmount : "Amount"}
                            </Button>
                        </div>

                        <div className="hstack gap-2 justify-content-center">
                            <input
                                className="form-control w-25"
                                value={loanDepositAmount}
                                disabled={!isOpen}
                                onChange={(e) =>
                                    dispatch({
                                        type: "loanAmount",
                                        payload: Number(e.target.value),
                                    })
                                }
                            />
                            <Button
                                dispatch={dispatch}
                                className={"btn-info"}
                                disabled={!isOpen}
                                onClick={() => {
                                    dispatch({ type: "addLoanAmount" });
                                }}
                            >
                                Request Loan{" "}
                                {loanDepositAmount > 0 ? `of ${loanDepositAmount}` : "Amount"}
                            </Button>
                        </div>

                        <div className="hstack gap-2 justify-content-center">
                            <input
                                className="form-control w-25"
                                value={loanWithdrawAmount}
                                disabled={!isOpen}
                                onChange={(e) =>
                                    dispatch({
                                        type: "loanWithdrawAmount",
                                        payload: Number(e.target.value),
                                    })
                                }
                            />
                            <Button
                                dispatch={dispatch}
                                className={"btn-info"}
                                disabled={!isOpen}
                                onClick={() => {
                                    dispatch({ type: "removeLoanWithdrawAmount" });
                                }}
                            >
                                Pay Loan {loanWithdrawAmount > 0 ? loanWithdrawAmount : "Amount"}
                            </Button>
                        </div>
                    </>
                )}
                {isOpen && (
                    <Button
                        dispatch={dispatch}
                        disabled={!isOpen}
                        className={"btn-danger"}
                        onClick={() => dispatch({ type: "closeAccount" })}
                    >
                        Close Account
                    </Button>
                )}
            </HandleAccount>
        </>
    );
}

export default App;
