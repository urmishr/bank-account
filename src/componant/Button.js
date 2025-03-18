export default function Button({ children, onClick, disabled, className }) {
    return (
        <button
            className={`btn btn-primary w-auto ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
