/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Form = ({ children, form }: { children: React.ReactNode; form: any }) => {
  /***** FUNCTIONS *****/
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(e);
  };

  /***** RENDER *****/

  return (
    <form onSubmit={handleSubmit}>
      <form.AppForm>{children}</form.AppForm>
    </form>
  );
};
