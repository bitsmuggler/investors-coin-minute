export default function Loading() {
    return <div className="flex flex-col items-center justify-center min-h-[200px]">
        <svg className="animate-spin h-10 w-10 text-gray-400" viewBox="0 0 24 24" role="status"
             aria-label="Loading">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
                    fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p>Generating report...</p>
    </div>
}