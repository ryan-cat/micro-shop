export const handleTextChange = <T = any>(
  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<T>>
) => {
  const name = event.target?.name;
  const value = event.target?.value ?? '';

  setter((prev) => ({
    ...prev,
    [name]: value
  }));
};
