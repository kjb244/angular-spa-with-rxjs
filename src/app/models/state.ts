interface Benes {
  type: string;
  name: string;
}

interface AccountInfo {
  name: string;
  editing: boolean;
  benes: Benes[];
}

interface InitialState {
  type: string | null;
  currRoute: string | null;
  formData: { [key: string]: any};
  showPrev: boolean;
  showNext: boolean;
  accounts: AccountInfo[];
}

export {Benes, AccountInfo, InitialState}
