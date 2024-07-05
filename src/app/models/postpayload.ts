export interface PostPayload {
  formData: {
    object?: any;
  };
  forward: boolean | false;
  currRoute: string | '';
}
