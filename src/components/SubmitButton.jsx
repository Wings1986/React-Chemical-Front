import LoadingSpinner from './LoadingSpinner';

export default function SubmitButton ({isLoading, text}) {
  return (
    <button className="bg-primary shadow-lg shadow-secondary text-white px-6 py-2 my-5 rounded-lg" type="submit">
      {isLoading && <LoadingSpinner /> }
      <span>{text}</span>
    </button>
  )
}