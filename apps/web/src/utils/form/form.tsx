/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Form = ({ children, form, className }: { children: React.ReactNode; form: any; className?: string }) => {
  /***** FUNCTIONS *****/
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(e);
  };

  /***** RENDER *****/

  return (
    <form onSubmit={handleSubmit} className={className}>
      <form.AppForm>{children}</form.AppForm>
    </form>
  );
};
