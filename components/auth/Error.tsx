const Error = ({ errors, ...props }: { errors: Array<string> }) => {
  return errors && errors.length ? (
    <div {...props} className="bg-red-500 p-3 text-center text-sm">
      <ul className="space-y-1 text-white">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  )
}

export default Error
