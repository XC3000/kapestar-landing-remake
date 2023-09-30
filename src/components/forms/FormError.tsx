const FormError = ({ error }: { error: string | undefined }) => {
  return (
    <p className="mt-1.5 pl-1  text-xs text-red-600  dark:text-red-500 md:text-sm">
      {error}
    </p>
  );
};

export default FormError;
