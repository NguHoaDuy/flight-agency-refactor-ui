export const FORM_ERRORS = {
  usernameErrors: [
    { code: 'required', message: 'Vui lòng nhập username.' },
    { code: 'username', message: 'Username đã được đăng kí.' },
  ],
  emailErrors: [
    { code: 'email', message: 'Email đã được đăng kí.' },
    { code: 'required', message: 'Vui lòng nhập địa chỉ email.' },
    { code: 'format', message: 'Email không hợp lệ.' },
  ],
  passwordErrors: [
      {code: 'required', message: 'Vui lòng nhập mật khẩu.' },
      {code: 'notMatch', message: "Mật khẩu không trùng khớp."}
  ]
};
